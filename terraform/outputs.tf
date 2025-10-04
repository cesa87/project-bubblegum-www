output "website_url" {
  description = "Website URL"
  value       = "https://${var.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.website.id
}

output "cloudfront_distribution_domain" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.website.id
}

output "s3_bucket_arn" {
  description = "S3 bucket ARN"
  value       = aws_s3_bucket.website.arn
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN"
  value       = aws_acm_certificate.website.arn
}

output "github_secrets_info" {
  description = "GitHub Secrets to configure"
  value = {
    AWS_ACCESS_KEY_ID = "Your AWS access key"
    AWS_SECRET_ACCESS_KEY = "Your AWS secret key"
    S3_BUCKET_NAME = aws_s3_bucket.website.id
    CLOUDFRONT_DISTRIBUTION_ID = aws_cloudfront_distribution.website.id
  }
}