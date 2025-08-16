# AWS S3 Static Website Hosting Setup

## Learning Objective

Deploy React app to S3 and understand S3 static website hosting concepts.

## Prerequisites

- AWS CLI installed and configured
- AWS account with appropriate permissions

## Steps

### 1. Create S3 Bucket

```bash
# Replace with your unique bucket name
aws s3 mb s3://mydpjg-react-kanban-app-2024 --region us-east-1
```

### 2. Configure Bucket for Static Website Hosting

```bash
aws s3 website s3://mydpjg-react-kanban-app-2024 --index-document index.html --error-document index.html
```

### 3. Set Bucket Policy (already done)

The bucket policy in `bucket-policy.json` allows public read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mydpjg-react-kanban-app-2024/*"
    }
  ]
}
```

Apply the policy:

```bash
aws s3api put-bucket-policy --bucket mydpjg-react-kanban-app-2024 --policy file://bucket-policy.json
```

### 4. Upload Build Files

```bash
aws s3 sync build/ s3://mydpjg-react-kanban-app-2024 --delete
```

### 5. Access Your App

Website URL: `http://mydpjg-react-kanban-app-2024.s3-website-us-east-1.amazonaws.com`

## AWS Concepts Learned

- **S3 Static Website Hosting**: How to host static websites on S3
- **Bucket Policies**: IAM policies for S3 resources
- **AWS CLI**: Command line interface for AWS services
- **Public vs Private Access**: Understanding S3 permissions

## Cost Considerations

- S3 storage: ~$0.023 per GB/month
- Data transfer: Free for first 1 GB/month outbound
- Requests: $0.0004 per 1,000 GET requests
