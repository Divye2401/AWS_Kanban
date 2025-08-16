# 🚀 AWS Full-Stack Kanban Task Manager

A modern, serverless task management application built with React and deployed on AWS infrastructure. This project demonstrates a complete full-stack development workflow using AWS cloud services.

![Kanban Board](https://img.shields.io/badge/Status-Live-brightgreen)
![AWS](https://img.shields.io/badge/AWS-Serverless-orange)
![React](https://img.shields.io/badge/React-18-blue)

🌐 **Live Demo**: [https://dpjgreact.art](https://dpjgreact.art)

## ✨ Features

- **Drag & Drop Interface**: Intuitive task management with visual feedback
- **Real-time Persistence**: Tasks automatically sync with cloud database
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Glass Morphism UI**: Modern, aesthetic interface with backdrop filters
- **Auto-save**: Changes are automatically saved as you work
- **Fallback Support**: Dropdown alternative for accessibility

## 🏗️ Architecture

This application showcases a modern serverless architecture using AWS services:

```
Frontend (React) → CloudFront → S3 Static Hosting
                ↓
            API Gateway → Lambda Functions → DynamoDB
                ↓
            Route 53 (Custom Domain) + ACM (SSL)
                ↓
            CodePipeline (CI/CD) + CodeBuild
```

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with Hooks
- **CSS3** - Glass morphism design with animations
- **HTML5 Drag & Drop API** - Native browser interactions

### Backend & Infrastructure

- **AWS Lambda** - Serverless functions for API endpoints
- **Amazon DynamoDB** - NoSQL database for task storage
- **API Gateway** - RESTful API with CORS configuration
- **Amazon S3** - Static website hosting
- **CloudFront** - Global CDN for fast content delivery
- **Route 53** - DNS management with custom domain
- **AWS Certificate Manager** - SSL/TLS certificates
- **CodePipeline & CodeBuild** - Automated CI/CD deployment

### DevOps

- **Git** - Version control
- **GitHub** - Source code repository
- **AWS CodePipeline** - Continuous integration and deployment
- **Infrastructure as Code** - AWS services configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- AWS Account (for deployment)
- Git

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/react-kanban-aws.git
   cd react-kanban-aws/React_Basics_List
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Local API Configuration

To connect to your own AWS backend:

1. Update the API URL in `src/api.js`:

   ```javascript
   const API_BASE_URL = "your-api-gateway-url";
   ```

2. Configure AWS credentials for local testing (optional)

## ☁️ AWS Deployment Guide

### 1. Frontend Deployment (S3 + CloudFront)

```bash
# Build the application
npm run build

# Deploy to S3 (configure AWS CLI first)
aws s3 sync build/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### 2. Backend Setup

1. **DynamoDB Table**

   - Table name: `kanban-tasks`
   - Partition key: `userId` (String)
   - Sort key: `taskId` (String)

2. **Lambda Functions**

   - Deploy `lambda/get-kanban-tasks.js`
   - Deploy `lambda/store-kanban-tasks.js`
   - Configure DynamoDB permissions

3. **API Gateway**
   - Create REST API
   - Configure `/tasks` resource with GET and POST methods
   - Enable CORS
   - Deploy to production stage

### 3. CI/CD Pipeline

The project includes automated deployment using AWS CodePipeline:

- **Source Stage**: GitHub repository integration
- **Test Stage**: Automated testing with Jest
- **Build Stage**: React application build process
- **Deploy Stage**: S3 upload and CloudFront invalidation

Configuration files:

- `buildspec.yml` - Build and deploy commands
- `buildspec-test.yml` - Testing configuration

## 🔧 Configuration

### Environment Variables

For production deployment, configure these in your CI/CD pipeline:

```bash
S3_BUCKET=your-s3-bucket-name
CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id
API_BASE_URL=your-api-gateway-url
```

### CORS Configuration

API Gateway CORS settings:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Content-Type,X-Amz-Date,Authorization,X-Api-Key
Access-Control-Allow-Methods: GET,POST,OPTIONS
```

## 📊 Project Structure

```
React_Basics_List/
├── public/
│   └── index.html
├── src/
│   ├── App.js              # Main React component
│   ├── App.css             # Styling and animations
│   ├── Board.js            # Board component
│   ├── Task.js             # Individual task component
│   ├── api.js              # API service layer
│   └── index.js            # React app entry point
├── lambda/
│   ├── get-kanban-tasks.js  # Lambda function for GET requests
│   └── store-kanban-tasks.js # Lambda function for POST requests
├── aws-deployment/
│   └── *.md                # AWS setup documentation
├── buildspec.yml           # CodeBuild configuration
├── buildspec-test.yml      # Testing configuration
└── package.json            # Dependencies and scripts
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in CI mode
npm test -- --ci --watchAll=false
```

## 🎨 Key Features Implementation

### Drag and Drop

- HTML5 Drag and Drop API integration
- Visual feedback during drag operations
- Cross-board task movement
- Fallback dropdown for accessibility

### Data Persistence

- Automatic save with debouncing (500ms delay)
- Optimistic UI updates
- Error handling with graceful fallbacks
- Real-time synchronization with DynamoDB

### Responsive Design

- Mobile-first approach
- CSS Grid and Flexbox layouts
- Touch-friendly interface
- Adaptive card sizing

## 🚀 Performance Optimizations

- **CloudFront CDN** - Global content delivery
- **S3 Static Hosting** - Fast, scalable frontend hosting
- **Lambda Cold Start Optimization** - Efficient serverless functions
- **DynamoDB Single-Table Design** - Optimized database queries
- **CSS Animations** - Hardware-accelerated transforms
- **Code Splitting** - Optimized bundle loading

## 🔐 Security

- **HTTPS Only** - SSL/TLS encryption via CloudFront
- **CORS Configuration** - Proper cross-origin resource sharing
- **IAM Roles** - Least privilege access for AWS services
- **Input Validation** - Client and server-side validation
- **API Rate Limiting** - Built-in AWS API Gateway throttling

## 📈 Monitoring & Analytics

- **CloudWatch Logs** - Lambda function monitoring
- **API Gateway Metrics** - Request/response analytics
- **CloudFront Reports** - Global usage statistics
- **Error Tracking** - Comprehensive error logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [https://dpjgreact.art](https://dpjgreact.art)

## 🙏 Acknowledgments

- AWS Documentation and best practices
- React team for excellent documentation
- Modern CSS design patterns and Glass Morphism trends
- Open source community for inspiration

---

⭐ **Star this repository if you found it helpful!**

This project demonstrates proficiency in:

- Modern React development
- AWS cloud architecture
- Serverless computing
- CI/CD pipelines
- Full-stack development
- DevOps practices
