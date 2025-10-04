# Deployment Guide - project-bubblegum.shop

This guide covers the complete setup for deploying the cNada website to AWS CloudFront with automated CI/CD via GitHub Actions.

## Architecture Overview

```
GitHub Repo → GitHub Actions → Build → S3 Bucket → CloudFront CDN → project-bubblegum.shop
```

## Prerequisites

1. AWS Account with appropriate permissions
2. Domain name (project-bubblegum.shop) 
3. AWS CLI installed locally (optional, for manual setup)
4. GitHub repository access

## Step-by-Step Setup

### 1. Create IAM User for GitHub Actions

Create an IAM user with programmatic access:

1. Go to AWS IAM Console
2. Create a new user: `github-actions-deployer`
3. Attach these policies (or create a custom policy):
   - `AmazonS3FullAccess` (or limited to your bucket)
   - `CloudFrontFullAccess` (or limited to invalidations)

Custom IAM Policy (more secure):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:GetObjectAcl",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::project-bubblegum-shop",
                "arn:aws:s3:::project-bubblegum-shop/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation",
                "cloudfront:GetDistribution"
            ],
            "Resource": "*"
        }
    ]
}
```

### 2. Create S3 Bucket

Run the provided script or manually:

```bash
chmod +x scripts/setup-s3-bucket.sh
./scripts/setup-s3-bucket.sh
```

Or manually in AWS Console:
1. Create bucket: `project-bubblegum-shop`
2. Region: `us-east-1` (for CloudFront compatibility)
3. Enable static website hosting
4. Keep bucket private (CloudFront will access it)

### 3. Create CloudFront Distribution

1. Go to CloudFront Console
2. Create Distribution with these settings:

**Origin Settings:**
- Origin Domain: `project-bubblegum-shop.s3.amazonaws.com`
- Origin Path: leave empty
- Origin Access: Origin Access Control (recommended)
- Create new OAC with default settings

**Default Cache Behavior:**
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Allowed HTTP Methods: GET, HEAD
- Cache Policy: CachingOptimized
- Origin Request Policy: CORS-S3Origin (if needed)

**Distribution Settings:**
- Price Class: Use all edge locations
- Alternate Domain Names (CNAMEs): `project-bubblegum.shop`, `www.project-bubblegum.shop`
- Custom SSL Certificate: Request or import ACM certificate for your domain
- Default Root Object: `index.html`

**Error Pages (Important for React SPA):**
- 404 Error: Redirect to `/index.html` with 200 response code
- 403 Error: Redirect to `/index.html` with 200 response code

### 4. Update S3 Bucket Policy

After creating CloudFront, update the bucket policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::project-bubblegum-shop/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
                }
            }
        }
    ]
}
```

### 5. Configure Route 53 (or your DNS provider)

If using Route 53:
1. Create a hosted zone for `project-bubblegum.shop`
2. Create A record:
   - Type: A - IPv4 address
   - Alias: Yes
   - Route traffic to: CloudFront distribution
   - Select your distribution

If using external DNS:
- Create CNAME record pointing to your CloudFront distribution domain
- Example: `dxxxxxxxxxxxxx.cloudfront.net`

### 6. Set up GitHub Secrets

In your GitHub repository, go to Settings → Secrets and variables → Actions

Add these secrets:
- `AWS_ACCESS_KEY_ID`: Your IAM user's access key
- `AWS_SECRET_ACCESS_KEY`: Your IAM user's secret key
- `S3_BUCKET_NAME`: `project-bubblegum-shop`
- `CLOUDFRONT_DISTRIBUTION_ID`: Your distribution ID (e.g., `E1XXXXXXXXXXXX`)

### 7. SSL Certificate

For HTTPS on your custom domain:

1. Request certificate in ACM (AWS Certificate Manager)
   - **IMPORTANT**: Must be in `us-east-1` region for CloudFront
2. Add domain: `project-bubblegum.shop`
3. Add additional name: `*.project-bubblegum.shop`
4. Validate via DNS or email
5. Once validated, select it in CloudFront distribution settings

## Deployment Workflow

### Automatic Deployment
Every push to `main` branch triggers deployment:
1. GitHub Actions builds the project
2. Uploads built files to S3
3. Invalidates CloudFront cache
4. Site updates globally within minutes

### Manual Deployment
Trigger deployment manually from GitHub:
1. Go to Actions tab
2. Select "Deploy to AWS CloudFront"
3. Click "Run workflow"

### Local Testing Before Deployment
```bash
npm run build
npm run preview
```

## Monitoring & Troubleshooting

### Check Deployment Status
- GitHub Actions: Check workflow runs in Actions tab
- CloudFront: Monitor distribution status in AWS Console
- S3: Verify files in bucket

### Common Issues

**CloudFront 403 Error:**
- Check S3 bucket policy
- Verify OAC configuration
- Ensure distribution has correct origin settings

**Site Not Updating:**
- Wait for CloudFront invalidation (5-10 minutes)
- Check if GitHub Action completed successfully
- Verify S3 has latest files

**SSL Certificate Issues:**
- Certificate must be in us-east-1
- Domain validation must be complete
- Certificate must include both apex and www domains

### Cache Management

CloudFront cache strategy:
- Static assets (JS, CSS): Long cache (1 year)
- HTML files: Short cache (1 hour)
- Invalidation on each deployment

Manual cache clear:
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Security Best Practices

1. ✅ Use IAM roles with minimal permissions
2. ✅ Keep S3 bucket private (access only via CloudFront)
3. ✅ Enable CloudFront Origin Access Control (OAC)
4. ✅ Use HTTPS only
5. ✅ Rotate IAM credentials regularly
6. ✅ Enable AWS CloudTrail for audit logging
7. ✅ Set up billing alerts

## Performance Optimization

1. **CloudFront Settings:**
   - Enable compression
   - Use all edge locations
   - Set appropriate cache headers

2. **Build Optimization:**
   - Code splitting enabled by default in Vite
   - Minification in production build
   - Tree shaking for unused code

3. **Monitoring:**
   - CloudWatch metrics for CloudFront
   - Real User Monitoring (RUM) can be added

## Costs

Estimated monthly costs (varies by traffic):
- S3 Storage: ~$0.50
- S3 Requests: ~$1-5
- CloudFront: ~$5-20 (depends on traffic)
- Route 53: $0.50 per hosted zone
- Total: ~$7-30/month for moderate traffic

## Support

For issues:
1. Check GitHub Actions logs
2. Review CloudFront distribution settings
3. Verify S3 bucket configuration
4. Check AWS CloudWatch logs

## Next Steps

After deployment:
1. ✅ Test site at https://project-bubblegum.shop
2. ✅ Set up monitoring and alerts
3. ✅ Configure backup strategy
4. ✅ Plan for scaling if needed
5. ✅ Consider adding CDN for images if traffic grows