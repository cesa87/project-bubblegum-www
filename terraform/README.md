# Terraform Infrastructure for project-bubblegum.shop

This directory contains the complete Infrastructure as Code (IaC) for deploying the cNada website to AWS using Terraform.

## 🏗️ What Gets Created

- **S3 Bucket** - Static website hosting
- **CloudFront Distribution** - Global CDN with HTTPS
- **ACM Certificate** - SSL/TLS certificate for your domain
- **Route53 Records** - DNS configuration
- **Origin Access Control** - Secure S3 access
- **Terraform State Bucket** - Remote state management

## 🚀 Quick Start

### Prerequisites

1. **Install Terraform**
   ```bash
   brew install terraform
   ```

2. **Install AWS CLI** (optional but helpful)
   ```bash
   brew install awscli
   ```

3. **Domain Setup**
   - Ensure `project-bubblegum.shop` is registered
   - If using Route53, create a hosted zone first
   - If using external DNS, you'll configure CNAME records later

### Step 1: Configure AWS Credentials

**NEVER commit credentials to Git!** Use environment variables:

```bash
# Replace with your REAL credentials (not the placeholders)
export AWS_ACCESS_KEY_ID="your-real-access-key"
export AWS_SECRET_ACCESS_KEY="your-real-secret-key"
export AWS_DEFAULT_REGION="us-east-1"
```

For permanent setup, add to `~/.aws/credentials`:
```ini
[default]
aws_access_key_id = your-real-access-key
aws_secret_access_key = your-real-secret-key
```

### Step 2: Configure Terraform Variables

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
```

### Step 3: Initialize Terraform

```bash
terraform init
```

This will:
- Download required providers
- Create the state bucket (first run)
- Configure backend

### Step 4: Plan Infrastructure

Review what will be created:

```bash
terraform plan
```

### Step 5: Deploy Infrastructure

```bash
# Interactive deployment
terraform apply

# Or use the deployment script
chmod +x deploy.sh
./deploy.sh
```

### Step 6: Get Outputs

After deployment, get the values for GitHub Actions:

```bash
terraform output -json
```

Note the:
- `s3_bucket_name`
- `cloudfront_distribution_id`

### Step 7: Configure GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets):

- `AWS_ACCESS_KEY_ID` - Your AWS access key
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
- `S3_BUCKET_NAME` - From Terraform output
- `CLOUDFRONT_DISTRIBUTION_ID` - From Terraform output

## 📁 File Structure

```
terraform/
├── main.tf                 # Main infrastructure configuration
├── variables.tf            # Variable definitions
├── outputs.tf              # Output values
├── terraform.tfvars.example # Example variables file
├── deploy.sh               # Deployment script
└── README.md               # This file
```

## 🔒 Security Best Practices

### DO ✅

- Use IAM users with minimal permissions
- Store state in encrypted S3 bucket
- Use environment variables for credentials
- Enable MFA on AWS account
- Rotate access keys regularly
- Use `terraform plan` before `apply`
- Version control your Terraform files
- Use workspace for different environments

### DON'T ❌

- Commit AWS credentials to Git
- Commit `terraform.tfvars` with sensitive data
- Share Terraform state files
- Use root AWS account credentials
- Ignore Terraform warnings
- Skip code reviews for infrastructure changes
- Delete resources manually in AWS Console

## 🔐 IAM Permissions Required

Minimum IAM policy for Terraform user:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:*",
        "cloudfront:*",
        "acm:*",
        "route53:*",
        "iam:GetRole",
        "iam:PassRole"
      ],
      "Resource": "*"
    }
  ]
}
```

## 🔄 Common Operations

### Update Infrastructure
```bash
terraform plan
terraform apply
```

### Destroy Infrastructure (CAREFUL!)
```bash
terraform destroy
```

### Format Code
```bash
terraform fmt
```

### Validate Configuration
```bash
terraform validate
```

### Show Current State
```bash
terraform show
```

### Import Existing Resources
```bash
terraform import aws_s3_bucket.website project-bubblegum-shop
```

## 🐛 Troubleshooting

### State Lock Issues
```bash
terraform force-unlock <lock-id>
```

### Refresh State
```bash
terraform refresh
```

### Replace Resource
```bash
terraform apply -replace="aws_cloudfront_distribution.website"
```

## 📊 Cost Estimates

Monthly costs (approximate):
- S3: $0.50 - $2
- CloudFront: $5 - $50 (depends on traffic)
- Route53: $0.50 per hosted zone
- ACM: Free
- Total: ~$6 - $53/month

## 🆘 Getting Help

1. Check Terraform logs: `TF_LOG=DEBUG terraform apply`
2. Validate AWS credentials: `aws sts get-caller-identity`
3. Review AWS CloudTrail for API calls
4. Check CloudFront distribution status in AWS Console

## 🔄 CI/CD Integration

After Terraform creates the infrastructure, GitHub Actions will:
1. Build the React app
2. Upload to S3
3. Invalidate CloudFront cache

This happens automatically on push to `main` branch.

## 📝 Notes

- CloudFront distribution takes 15-20 minutes to deploy initially
- DNS propagation can take up to 48 hours
- ACM certificate validation requires DNS verification
- First deployment will be slower than subsequent updates

## ⚠️ Important

- The `terraform.tfstate` file contains sensitive information
- Never commit state files to Git
- Use remote state backend (S3) for team collaboration
- Always run `terraform plan` before `apply`
- Keep Terraform version consistent across team

## 🎯 Next Steps

After infrastructure is deployed:
1. Test the website at your domain
2. Set up monitoring (CloudWatch)
3. Configure alerts for errors
4. Plan for disaster recovery
5. Document any manual configurations