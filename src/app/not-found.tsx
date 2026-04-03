'use client';
import React, { useState, useEffect } from 'react'

const NotFound = () => {
  const [clicked, setClicked] = useState(false)
  const [currentJoke, setCurrentJoke] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const jokes = [
    "Why did the web page go to therapy? It had too many broken links! 🔗",
    "What do you call a sleeping website? A NAP-plication! 😴",
    "Why don't websites ever get cold? They have plenty of cache! ❄️",
    "What's a 404 error's favorite music? Heavy metal... because it's always breaking! 🎸",
    "Why did the URL break up with the server? It wasn't getting enough response! 💔"
  ]

  const handleRocketClick = () => {
    setClicked(true)
    setShowConfetti(true)
    setCurrentJoke((prev) => (prev + 1) % jokes.length)
    
    setTimeout(() => {
      setClicked(false)
      setShowConfetti(false)
    }, 2000)
  }

  const confettiPieces = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-bounce ${
        showConfetti ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${1 + Math.random() * 2}s`
      }}
    />
  ))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {confettiPieces}

      <div className="text-center z-10 max-w-2xl mx-auto">
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 animate-pulse">
            4
            <span className={`inline-block transition-transform duration-500 ${clicked ? 'animate-spin' : 'animate-bounce'}`}>
              0
            </span>
            4
          </h1>
        </div>

        {/* Fun message */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            Oops! You've discovered a black hole! 🕳️
          </h2>
          <p className="text-xl text-purple-200 mb-6 animate-fade-in">
            Don't worry, even astronauts get lost sometimes...
          </p>
        </div>

        {/* Interactive rocket */}
        <div className="mb-8">
          <button
            onClick={handleRocketClick}
            className={`text-6xl transition-all duration-300 hover:scale-110 ${
              clicked ? 'animate-ping' : 'animate-bounce'
            }`}
          >
            🚀
          </button>
          <p className="text-purple-200 mt-2 text-sm">
            Click the rocket for a cosmic joke!
          </p>
        </div>

        {/* Joke display */}
        <div className="mb-12 min-h-[60px] flex items-center justify-center">
          <p className={`text-lg text-yellow-300 font-medium px-6 py-3 rounded-lg bg-black/20 backdrop-blur-sm transition-all duration-500 ${
            clicked ? 'scale-105 shadow-lg shadow-purple-500/25' : ''
          }`}>
            {jokes[currentJoke]}
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            🏠 Go Back Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            🔄 Try Again
          </button>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 text-4xl animate-float">🌙</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-float" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute bottom-1/4 left-1/3 text-2xl animate-float" style={{ animationDelay: '2s' }}>🪐</div>
        <div className="absolute bottom-1/3 right-1/3 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🌟</div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
}

export default NotFound