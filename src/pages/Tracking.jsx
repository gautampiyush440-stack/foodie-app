import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const STEPS = [
  { icon: '✅', label: 'Order Placed', desc: 'Your order has been received' },
  { icon: '👨‍🍳', label: 'Preparing', desc: 'Restaurant is preparing your food' },
  { icon: '🛵', label: 'On the Way', desc: 'Rider is heading to you' },
  { icon: '🏠', label: 'Delivered', desc: 'Enjoy your meal!' },
]

export default function Tracking() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(s => s < 3 ? s + 1 : s)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900 pb-20 md:pb-8 page-enter">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Order Tracking 📍</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Order #FRD{Math.floor(Math.random()*100000)}</p>

        {/* Map placeholder */}
        <div className="relative bg-gradient-to-br from-green-100 to-blue-100 dark:from-dark-700 dark:to-dark-600 rounded-2xl h-48 mb-8 overflow-hidden flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-2 animate-float">🛵</div>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Rider is on the way!</p>
          </div>
          <div className="absolute bottom-3 right-3 bg-white dark:bg-dark-700 rounded-xl px-3 py-2 shadow-md">
            <p className="text-xs font-bold text-gray-700 dark:text-white">ETA: ~15 min</p>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white dark:bg-dark-700 rounded-2xl p-6 shadow-sm space-y-4 mb-6">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 transition-all duration-500 ${i <= currentStep ? 'bg-flame-500 scale-110' : 'bg-gray-100 dark:bg-dark-600 opacity-40'}`}>
                {step.icon}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${i <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{step.label}</p>
                <p className="text-xs text-gray-400">{step.desc}</p>
              </div>
              {i < currentStep && <span className="text-green-500 text-sm font-bold">✓</span>}
              {i === currentStep && (
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2.5 h-2.5 rounded-full bg-flame-500" />
              )}
            </div>
          ))}
        </div>

        {/* Rider info */}
        <div className="bg-white dark:bg-dark-700 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-flame-100 dark:bg-dark-600 flex items-center justify-center text-2xl">👨</div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 dark:text-white">Ramesh Kumar</p>
            <p className="text-xs text-gray-400">Your delivery partner</p>
          </div>
          <a href="tel:+919876543210" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors">📞</a>
        </div>

        <Link to="/" className="mt-6 block text-center text-flame-500 font-semibold hover:underline">← Back to Home</Link>
      </div>
    </div>
  )
}
