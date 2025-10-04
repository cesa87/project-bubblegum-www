#!/bin/bash

# S3 Bucket Setup Script for project-bubblegum.shop
# This script helps configure your S3 bucket for static website hosting

echo "================================================"
echo "S3 Bucket Setup for project-bubblegum.shop"
echo "================================================"
echo ""

# Configuration
BUCKET_NAME="project-bubblegum-shop"
REGION="us-east-1"

echo "This script will help you set up:"
echo "1. S3 bucket: $BUCKET_NAME"
echo "2. Static website hosting"
echo "3. Bucket policy for CloudFront access"
echo ""
echo "Prerequisites:"
echo "- AWS CLI configured with appropriate credentials"
echo "- Permissions to create S3 buckets and CloudFront distributions"
echo ""
read -p "Continue? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Setup cancelled."
    exit 1
fi

# Create S3 bucket
echo ""
echo "Creating S3 bucket..."
aws s3api create-bucket \
    --bucket $BUCKET_NAME \
    --region $REGION \
    2>/dev/null || echo "Bucket might already exist or there was an error."

# Enable static website hosting
echo "Configuring static website hosting..."
aws s3api put-bucket-website \
    --bucket $BUCKET_NAME \
    --website-configuration '{
        "IndexDocument": {
            "Suffix": "index.html"
        },
        "ErrorDocument": {
            "Key": "index.html"
        }
    }'

# Create bucket policy for CloudFront OAC (Origin Access Control)
echo "Setting up bucket policy for CloudFront..."
cat > /tmp/bucket-policy.json << EOF
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
            "Resource": "arn:aws:s3:::${BUCKET_NAME}/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::*:distribution/*"
                }
            }
        }
    ]
}
EOF

# Note: The actual CloudFront distribution ARN will need to be updated after creating the distribution
echo ""
echo "Bucket policy created at /tmp/bucket-policy.json"
echo "NOTE: You'll need to update this policy with your CloudFront distribution ARN after creating it."
echo ""

# Block public access (we'll use CloudFront OAC instead)
echo "Configuring bucket security..."
aws s3api put-public-access-block \
    --bucket $BUCKET_NAME \
    --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false"

echo ""
echo "================================================"
echo "S3 Bucket Setup Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Create a CloudFront distribution pointing to this S3 bucket"
echo "2. Configure Origin Access Control (OAC) in CloudFront"
echo "3. Update the bucket policy with your CloudFront distribution ARN"
echo "4. Set up Route 53 to point project-bubblegum.shop to CloudFront"
echo "5. Add these secrets to your GitHub repository:"
echo "   - AWS_ACCESS_KEY_ID"
echo "   - AWS_SECRET_ACCESS_KEY"
echo "   - S3_BUCKET_NAME=$BUCKET_NAME"
echo "   - CLOUDFRONT_DISTRIBUTION_ID"
echo ""