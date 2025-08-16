# CloudFront CDN Setup - Learning Notes

## What I Just Did

✅ Created a CloudFront distribution for my React Kanban app  
✅ Connected it to my S3 website  
✅ Enabled HTTPS redirect  
✅ Disabled WAF (to keep it simple and free)

## Current Status

- **Status**: Deploying (takes 15-20 minutes)
- **S3 URL**: http://mydpjg-react-kanban-app-2024.s3-website-us-east-1.amazonaws.com
- **CloudFront URL**: https://[YOUR-DISTRIBUTION-ID].cloudfront.net (add your actual URL here)

## What CloudFront Does

- **Global CDN**: Copies my website to 200+ locations worldwide
- **HTTPS**: Provides free SSL certificate (secure connection)
- **Speed**: Users download from closest location to them
- **Caching**: Files load faster on repeat visits

## AWS Concepts Learned

- **Edge Locations**: AWS servers around the world
- **Distribution**: CloudFront's term for a CDN setup
- **Origin**: Where CloudFront gets the original files (my S3 bucket)
- **Deployment Time**: CDN setup takes time because it's global

## Next Steps (Once Deployed)

- [ ] Test the CloudFront HTTPS URL
- [ ] Compare speed vs direct S3 access
- [ ] Learn about cache invalidation
