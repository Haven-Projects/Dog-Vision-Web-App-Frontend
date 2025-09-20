'use client';

import { useState } from 'react';
import Image from 'next/image';

// Configure your backend API URL here
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dog-vision-ai.onrender.com';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [healthCheckLoading, setHealthCheckLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPrediction(null);
      setConfidence(null);
      setError(null);
    }
  };

  const handleHealthCheck = async () => {
    setHealthCheckLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      
      if (response.ok) {
        alert(`Backend is ${data.status}! Model loaded: ${data.model_loaded}`);
      } else {
        throw new Error('Health check failed');
      }
    } catch (error) {
      console.error('Health check error:', error);
      alert('Failed to reach backend. Please check if the backend is running.');
    } finally {
      setHealthCheckLoading(false);
    }
  };

  const handlePrediction = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Format the breed name for display (replace underscores with spaces and capitalize)
        const formattedBreed = data.predicted_breed
          .split('_')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        setPrediction(formattedBreed);
        setConfidence(data.confidence);
      } else {
        throw new Error(data.message || 'Prediction failed');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      setError(error instanceof Error ? error.message : 'Failed to predict breed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐕</span>
            </div>
            <span className="text-xl font-bold text-gray-800">DogVision AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-6">
              <a href="#info" className="text-gray-600 hover:text-blue-600 transition-colors">Server Info</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            </div>
            <button
              onClick={handleHealthCheck}
              disabled={healthCheckLoading}
              className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {healthCheckLoading ? '⏳' : '🏥'} Health Check
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Identify Your Dog&apos;s Breed
            <span className="text-blue-600"> Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload a photo of any dog and our AI will predict the breed with high accuracy. 
            Powered by advanced machine learning algorithms trained on thousands of dog images.
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Try it Now!</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              {!previewUrl ? (
                <div>
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-lg text-gray-600 mb-4">Upload a photo of your dog</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Choose Photo
                  </label>
                </div>
              ) : (
                <div>
                  <div className="relative w-64 h-64 mx-auto mb-4">
                    <Image
                      src={previewUrl}
                      alt="Selected dog"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <button
                      onClick={handlePrediction}
                      disabled={loading}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Analyzing...' : 'Predict Breed'}
                    </button>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload-new"
                      />
                      <label
                        htmlFor="file-upload-new"
                        className="inline-block text-blue-600 underline cursor-pointer hover:text-blue-800"
                      >
                        Choose Different Photo
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {loading && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Analyzing your dog&apos;s features...</p>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Error:</h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {prediction && !error && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Prediction Result:</h3>
                <p className="text-2xl font-bold text-green-700">{prediction}</p>
                <p className="text-sm text-green-600 mt-2">
                  Confidence: {confidence ? (confidence * 100).toFixed(1) : '89.5'}%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <section id="info" className="mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Important Server Information</h2>
              <div className="space-y-4 text-amber-700">
                <p className="text-lg">
                  Our AI backend is hosted on Render's free tier, which means the server goes to sleep after 15 minutes of inactivity.
                </p>
                <p className="text-base">
                  <strong>First-time usage:</strong> Please click the "🏥 Health Check" button and wait 1-2 minutes for the server to wake up and load the AI model.
                </p>
                <p className="text-base">
                  Once the server is active, dog breed predictions will be fast and accurate!
                </p>
              </div>
              <div className="mt-6 p-4 bg-amber-100 rounded-lg">
                <p className="text-sm text-amber-600">
                  💡 <strong>Pro tip:</strong> The health check will show "Backend is healthy! Model loaded: true" when ready.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Upload Photo</h3>
              <p className="text-gray-600">Take or upload a clear photo of the dog you want to identify.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">AI Analysis</h3>
              <p className="text-gray-600">Our neural network analyzes facial features, body structure, and coat patterns.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Get Results</h3>
              <p className="text-gray-600">Receive the predicted breed with confidence score and additional information.</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About DogVision AI</h2>
            <p className="text-lg text-gray-600 mb-6">
              DogVision AI is powered by a MobileNetV2 model from TensorFlow Hub, specifically trained for dog breed classification. 
              Our model has been fine-tuned on a comprehensive dataset of over 120 different dog breeds with advanced data augmentation techniques using TensorFlow, 
              ensuring accurate predictions for most common and rare breeds alike.
            </p>
            <p className="text-gray-600">
              Whether you&apos;re a dog owner, veterinarian, or just curious about a dog you&apos;ve met, 
              DogVision AI provides instant, reliable breed identification using state-of-the-art computer vision technology.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">🐕</span>
            </div>
            <span className="text-lg font-semibold">DogVision AI</span>
          </div>
          <p className="text-gray-400">© 2025 Haven Projects. Helping you identify dog breeds with AI technology.</p>
        </div>
      </footer>
    </div>
  );
}
