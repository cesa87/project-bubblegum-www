# 🖥️ cNada - Retro Terminal Privacy Phone Store

[![Deploy to AWS CloudFront](https://github.com/cesa87/project-bubblegum-www/actions/workflows/deploy.yml/badge.svg)](https://github.com/cesa87/project-bubblegum-www/actions/workflows/deploy.yml)

A vintage computer terminal-themed e-commerce website for privacy-focused Pixel devices running cNadaOS. Features authentic CRT monitor effects, phosphor glow, and 80s-90s computer UI aesthetics.

🌐 **Live Site:** [https://project-bubblegum.shop](https://project-bubblegum.shop)

## 🎨 Features

- **Retro CRT Effects:** Scan lines, phosphor glow, screen curvature
- **Vintage Terminal UI:** ASCII art, green/amber monochrome display
- **Privacy-First Messaging:** Selling de-Googled Pixel devices
- **Responsive Design:** Works on all devices
- **Fast Performance:** Built with Vite + React

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

This project auto-deploys to AWS CloudFront on push to main branch.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup instructions.

## 🛠️ Tech Stack

- **Frontend:** React 19.1.1
- **Build Tool:** Vite 7.1.7
- **Routing:** React Router DOM
- **Styling:** Custom CSS with retro effects
- **Font:** VT323 (Google Fonts)
- **Deployment:** AWS S3 + CloudFront
- **CI/CD:** GitHub Actions

## 📁 Project Structure

```
project-bubblegum-web/
├── src/
│   ├── App.jsx          # Main app with routing
│   ├── Home.jsx         # Landing page
│   ├── Devices.jsx      # Device catalog
│   ├── App.css          # Main styles
│   ├── Devices.css      # Device page styles
│   └── index.css        # Global styles + CRT effects
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions CI/CD
├── scripts/
│   └── setup-s3-bucket.sh  # AWS setup helper
└── DEPLOYMENT.md        # Deployment documentation
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy:check` - Test build before deployment
- `npm run aws:setup` - Run S3 bucket setup script

## 🔧 Environment Setup

For deployment, you'll need to set up these GitHub secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🎨 Customizing the Retro Effects

The retro CRT effects can be customized in `src/index.css`:

- Scan lines animation speed
- Phosphor glow intensity
- Screen flicker rate
- Color scheme (green/amber)

## 📝 License

Private repository - All rights reserved

## 🤝 Contributing

This is a private project. Please contact the repository owner for contribution guidelines.

## 📧 Contact

For questions about the project or deployment, please open an issue in the repository.
