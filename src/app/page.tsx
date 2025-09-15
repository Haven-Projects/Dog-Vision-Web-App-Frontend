'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPrediction(null);
    }
  };

  const handlePrediction = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    // Simulating API call - replace with actual backend endpoint
    setTimeout(() => {
      const breeds = ['Labrador Retriever', 'Golden Retriever', 'German Shepherd', 'Bulldog', 'Poodle', 'Beagle', 'Rottweiler', 'Yorkshire Terrier'];
      const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
      setPrediction(randomBreed);
      setLoading(false);
    }, 2000);
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
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
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

            {prediction && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Prediction Result:</h3>
                <p className="text-2xl font-bold text-green-700">{prediction}</p>
                <p className="text-sm text-green-600 mt-2">Confidence: 89.5%</p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose DogVision AI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">High Accuracy</h3>
              <p className="text-gray-600">Our AI model achieves over 90% accuracy in breed prediction, trained on extensive datasets.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Lightning Fast</h3>
              <p className="text-gray-600">Get results in seconds. Our optimized model processes images quickly and efficiently.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Privacy First</h3>
              <p className="text-gray-600">Your photos are processed securely and never stored on our servers.</p>
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
              DogVision AI uses state-of-the-art computer vision and machine learning to identify dog breeds from photos. 
              Our model has been trained on a comprehensive dataset of over 120 different dog breeds, 
              ensuring accurate predictions for most common and rare breeds alike.
            </p>
            <p className="text-gray-600">
              Whether you&apos;re a dog owner, veterinarian, or just curious about a dog you&apos;ve met, 
              DogVision AI provides instant, reliable breed identification to satisfy your curiosity.
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
          <p className="text-gray-400">© 2024 DogVision AI. Helping you identify dog breeds with AI technology.</p>
        </div>
      </footer>
    </div>
  );
}
