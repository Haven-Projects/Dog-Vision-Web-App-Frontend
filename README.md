# Dog Vision AI - Frontend
Demo - https://dog-vision-web-app-frontend-k1yv.vercel.app/ 

A modern, responsive web application for identifying dog breeds using AI-powered image recognition. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🐕 **AI-Powered Breed Detection**: Upload a photo and get instant breed predictions
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- ⚡ **Fast Performance**: Optimized with Next.js for lightning-fast loading
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations
- 🔒 **Privacy First**: Secure image processing without storing user photos

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Haven-Projects/Dog-Vision-Web-App-Frontend.git
cd Dog-Vision-Web-App-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## Usage

1. **Upload Image**: Click "Choose Photo" to upload a dog image
2. **AI Analysis**: Click "Predict Breed" to analyze the image
3. **Get Results**: View the predicted breed with confidence score

## Project Structure

```
src/
  app/
    layout.tsx      # Root layout with metadata
    page.tsx        # Main landing page component
    globals.css     # Global styles and Tailwind imports
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
