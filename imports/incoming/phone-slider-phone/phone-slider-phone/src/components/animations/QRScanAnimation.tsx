import React, { useState, useEffect } from 'react'
import { QrCode, Star, CheckCircle } from 'lucide-react'

interface QRScanAnimationProps {
  onComplete?: () => void
}

const QRScanAnimation: React.FC<QRScanAnimationProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1)
  const [rating, setRating] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 2500)
    const timer2 = setTimeout(() => setStep(3), 5000)
    const timer3 = setTimeout(() => {
      setStep(4)
      let currentRating = 0
      const ratingInterval = setInterval(() => {
        if (currentRating < 4) {
          currentRating++
          setRating(currentRating)
        } else {
          clearInterval(ratingInterval)
        }
      }, 300)
    }, 7500)
    const timer4 = setTimeout(() => setStep(5), 10500)
    const timer5 = setTimeout(() => {
      setStep(6)
      let currentProgress = 0
      const progressInterval = setInterval(() => {
        if (currentProgress < 75) {
          currentProgress += 5
          setProgress(currentProgress)
        } else {
          clearInterval(progressInterval)
        }
      }, 50)
    }, 12000)
    const timer6 = setTimeout(() => {
      setStep(1)
      setRating(0)
      setProgress(0)
      if (onComplete) onComplete()
    }, 15000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
      clearTimeout(timer6)
    }
  }, [step === 1])

  return (
    <div className="h-full bg-gray-950 text-white flex flex-col">
      {step === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fadeIn">
          <div className="relative mb-8">
            <QrCode className="w-48 h-48 text-white" />
            <div className="absolute inset-0 border-4 border-yellow-400 animate-pulse"></div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Scan QR Code</h3>
          <p className="text-gray-400 text-center mb-6">Point your camera at the QR code on the restaurant table</p>
          <div className="w-16 h-16 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 p-6 flex flex-col justify-center animate-fadeIn">
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 mb-6">
            <CheckCircle className="w-12 h-12 mb-3" />
            <h3 className="text-2xl font-bold mb-2">QR Scanned Successfully!</h3>
            <p className="text-sm opacity-90">Loading restaurant menu...</p>
          </div>
        </div>
      )}

      {(step === 3 || step === 4 || step === 5) && (
        <div className="flex-1 p-6 overflow-y-auto animate-fadeIn">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">The Spice Room</h2>
            <p className="text-gray-400 mb-1">Coimbatore, RS Puram</p>
            <p className="text-sm text-yellow-400">Discover Restaurant Menu</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🍽️</span> Menu Highlights
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                  alt="Biryani"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">Chicken Biryani</h4>
                  <p className="text-xs text-gray-400">Aromatic rice with spiced chicken</p>
                </div>
                <span className="text-yellow-400 font-bold">₹280</span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                  alt="Butter Chicken"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">Butter Chicken</h4>
                  <p className="text-xs text-gray-400">Creamy tomato curry with tender chicken</p>
                </div>
                <span className="text-yellow-400 font-bold">₹320</span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                  alt="Paneer Tikka"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">Paneer Tikka</h4>
                  <p className="text-xs text-gray-400">Grilled cottage cheese with spices</p>
                </div>
                <span className="text-yellow-400 font-bold">₹240</span>
              </div>
            </div>
          </div>

          {(step === 4 || step === 5) && (
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2 text-center">Rate Your Experience</h3>
              <p className="text-sm text-gray-400 text-center mb-4">How was your dining experience?</p>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-10 h-10 transition-all duration-300 ${
                      star <= rating ? 'fill-yellow-400 text-yellow-400 scale-110' : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              {step === 4 && rating === 4 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-8 h-8 bg-white rounded-full animate-ping"></div>
                </div>
              )}
              {step === 5 && (
                <div className="mt-4 animate-fadeIn">
                  <p className="text-sm text-gray-400 text-center mb-3">Auto-generated hashtags based on your rating</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <span className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">#musttry</span>
                    <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">#delicious</span>
                    <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">#worthit</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold py-3 rounded-xl">
                    Submit Rating
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {step === 6 && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fadeIn">
          <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
          <h3 className="text-2xl font-bold text-center mb-2">Rating Submitted!</h3>
          <p className="text-gray-400 text-center mb-8">Thank you for your feedback</p>
          <div className="w-full max-w-sm bg-gray-900 rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4 text-center">Earn Reward Points</h4>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Points Earned</span>
              <span className="text-3xl font-bold text-yellow-400">+50</span>
            </div>
            <div className="relative w-full h-6 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{ width: `${progress}%` }}
              >
                <span className="text-xs font-bold text-gray-900">75%</span>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>350 pts</span>
              <span className="text-yellow-400 font-semibold">425 pts</span>
              <span>500 pts</span>
            </div>
            <p className="text-xs text-center text-gray-500 mt-3">75 more points to unlock Gold tier rewards!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default QRScanAnimation
