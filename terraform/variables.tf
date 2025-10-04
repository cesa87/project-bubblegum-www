variable "aws_region" {
  description = "AWS region for resources (except CloudFront which is global)"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (production, staging, development)"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "project-bubblegum"
}

variable "domain_name" {
  description = "Domain name for the website"
  type        = string
  default     = "project-bubblegum.shop"
}

variable "bucket_name" {
  description = "S3 bucket name for website hosting"
  type        = string
  default     = "project-bubblegum-shop"
}

variable "cloudfront_price_class" {
  description = "CloudFront distribution price class"
  type        = string
  default     = "PriceClass_All"
  # Options:
  # PriceClass_All - All edge locations (best performance)
  # PriceClass_200 - US, Canada, Europe, Asia, Middle East, Africa
  # PriceClass_100 - US, Canada, Europe
}