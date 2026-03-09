'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { AlertCircle, Zap, Gift, X, Check } from 'lucide-react'

export default function FeedbackPage() {
  const router = useRouter()
  const [activeForm, setActiveForm] = useState<'beta' | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const feedbackCards = [
    {
      id: 'problem',
      title: 'Report a Problem',
      description: 'Help us improve by reporting issues you encounter',
      icon: AlertCircle,
      color: 'from-red-500 to-orange-500',
      borderColor: 'border-red-500/30',
    },
    {
      id: 'beta',
      title: 'Beta Access',
      description: 'Request early access to new features',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      borderColor: 'border-yellow-500/30',
    },
    {
      id: 'bounty',
      title: 'Bug Bounty',
      description: 'Report security vulnerabilities responsibly',
      icon: Gift,
      color: 'from-green-500 to-teal-500',
      borderColor: 'border-green-500/30',
    },
  ]

  const handleCardClick = (id: string) => {
    if (id === 'problem') {
      window.location.href = 'http://localhost:5173/general-feedback'
      return
    }
    if (id === 'bounty') {
      window.location.href = 'http://localhost:5173/bug-bounty'
      return
    }
    setActiveForm(id as 'beta')
    setFormData({})
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeForm,
          ...formData,
        }),
      })

      if (response.ok) {
        setSuccessMessage(`Beta request submitted successfully! Thank you.`)
        setShowSuccess(true)
        setFormData({})
        setTimeout(() => {
          setShowSuccess(false)
          setActiveForm(null)
        }, 4000)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <a
        href="/"
        className="fixed top-4 left-4 z-[70] group inline-flex items-center gap-2 rounded-full border border-yellow-400/70 bg-yellow-50/90 px-4 py-2 text-sm font-semibold text-yellow-900 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-100 hover:shadow-xl active:translate-y-0 active:scale-[0.98] dark:border-yellow-300/50 dark:bg-zinc-900/85 dark:text-yellow-200 dark:hover:bg-zinc-800"
      >
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5">
          ←
        </span>
        <span>back to home</span>
      </a>
      {/* Fixed Header with Logo */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 relative flex items-center justify-center">
          <h1 className="text-xl font-bold text-gray-900">Feedback & Support</h1>
          <Image
            src="/wwf-logo.png"
            alt="WWF Logo"
            width={40}
            height={40}
            className="h-10 w-auto absolute right-6 top-1/2 -translate-y-1/2"
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              We Value Your Feedback
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help us improve by sharing your thoughts, requesting features, or reporting issues
            </p>
          </motion.div>

          {/* Card Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {feedbackCards.map((card, index) => {
              const IconComponent = card.icon
              return (
                <motion.button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`relative group p-8 rounded-2xl border-2 ${card.borderColor} bg-white hover:bg-gray-50 transition-all duration-300 text-left`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    <div className="inline-flex items-center text-sm font-semibold bg-gray-100 px-3 py-1 rounded-full group-hover:bg-gray-200 transition-colors">
                      Open Form →
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {activeForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveForm(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveForm(null)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>

              {/* Form Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {activeForm === 'beta' && 'Request Beta Access'}
              </h3>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Beta Access Form */}
                {activeForm === 'beta' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Feature Name *
                      </label>
                      <input
                        type="text"
                        value={formData.featureName || ''}
                        onChange={(e) => handleInputChange('featureName', e.target.value)}
                        placeholder="What feature would you like to try?"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Expected Launch Date
                      </label>
                      <input
                        type="date"
                        value={formData.expectedDate || ''}
                        onChange={(e) => handleInputChange('expectedDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </>
                )}

                {/* Common Fields */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Please provide detailed information..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-lg hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed bottom-6 right-6 z-60 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
            initial={{ opacity: 0, y: 100, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 100, x: 100 }}
            transition={{ spring: { stiffness: 100, damping: 15 } }}
          >
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5" />
              <span className="font-semibold">{successMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
