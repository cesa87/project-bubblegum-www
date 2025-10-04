#!/bin/bash

# Terraform Deployment Script for project-bubblegum.shop
# This script deploys the AWS infrastructure using Terraform

set -e

echo "================================================"
echo "🚀 Project Bubblegum - Terraform Deployment"
echo "================================================"
echo ""

# Check if AWS credentials are set
if [[ -z "$AWS_ACCESS_KEY_ID" || -z "$AWS_SECRET_ACCESS_KEY" ]]; then
    echo "❌ Error: AWS credentials not found!"
    echo ""
    echo "Please export your AWS credentials:"
    echo "  export AWS_ACCESS_KEY_ID='your-access-key'"
    echo "  export AWS_SECRET_ACCESS_KEY='your-secret-key'"
    echo ""
    exit 1
fi

# Check if terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "❌ Error: Terraform is not installed!"
    echo ""
    echo "Please install Terraform:"
    echo "  brew install terraform"
    echo ""
    exit 1
fi

echo "✅ AWS credentials found"
echo "✅ Terraform is installed"
echo ""

# Navigate to terraform directory
cd "$(dirname "$0")"

# Initialize Terraform (first time only)
if [ ! -d ".terraform" ]; then
    echo "📦 Initializing Terraform..."
    terraform init
    echo ""
fi

# Format Terraform files
echo "🎨 Formatting Terraform files..."
terraform fmt
echo ""

# Validate Terraform configuration
echo "✔️ Validating Terraform configuration..."
terraform validate
echo ""

# Create terraform plan
echo "📋 Creating Terraform plan..."
terraform plan -out=tfplan
echo ""

# Ask for confirmation
echo "================================================"
echo "⚠️  IMPORTANT: Review the plan above carefully!"
echo "================================================"
echo ""
read -p "Do you want to apply this plan? (yes/no): " -r
echo ""

if [[ $REPLY =~ ^[Yy]es$ ]]; then
    echo "🏗️ Applying Terraform plan..."
    terraform apply tfplan
    
    echo ""
    echo "================================================"
    echo "✅ Infrastructure deployment complete!"
    echo "================================================"
    echo ""
    
    # Display outputs
    echo "📊 Deployment Information:"
    echo "------------------------"
    terraform output -json | jq '.'
    
    echo ""
    echo "🎯 Next Steps:"
    echo "1. Note the CloudFront distribution ID and S3 bucket name"
    echo "2. Add these values to your GitHub repository secrets:"
    echo "   - S3_BUCKET_NAME"
    echo "   - CLOUDFRONT_DISTRIBUTION_ID"
    echo "3. Push code to trigger GitHub Actions deployment"
    echo "4. Your site will be live at: https://project-bubblegum.shop"
    echo ""
else
    echo "❌ Deployment cancelled"
    rm tfplan
    exit 1
fi

# Clean up plan file
rm -f tfplan

echo "🎉 Done!"