import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const isValid = useMemo(() => {
    const e = email.trim()
    return e.length > 3 && e.includes('@') && password.length >= 4
  }, [email, password])

  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    if (!isValid) {
      setError('Enter a valid email and password.')
      return
    }

    try {
      setSubmitting(true)
      // Demo login (no backend wired yet)
      await new Promise(r => setTimeout(r, 450))
      navigate('/', { replace: true })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-cream-50 dark:bg-dark-900 min-h-screen pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-dark-800/60 border border-gray-100 dark:border-dark-600 rounded-2xl px-4 py-2 shadow-sm">
              <span className="text-xl">🍔</span>
              <span className="font-display font-extrabold text-gray-900 dark:text-white">
                Welcome back to{' '}
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
                  className="gradient-text inline-block"
                >
                  Foodzilla
                </motion.span>
              </span>
            </div>

            <h1 className="mt-5 text-3xl md:text-4xl font-display font-extrabold text-gray-900 dark:text-white leading-tight">
              Sign in to save favorites
              <span className="text-flame-500">.</span>
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-lg">
              This is a demo login screen. Hook it to your API later—UI is ready.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
              {[
                { emoji: '⚡', title: 'Fast checkout', text: 'Skip typing next time' },
                { emoji: '❤️', title: 'Favorites', text: 'Save your go-to meals' },
                { emoji: '🎁', title: 'Offers', text: 'Unlock more deals' },
                { emoji: '📍', title: 'Track orders', text: 'Live delivery updates' },
              ].map((b) => (
                <div
                  key={b.title}
                  className="bg-white dark:bg-dark-700 rounded-2xl p-4 border border-gray-100 dark:border-dark-600 shadow-sm"
                >
                  <div className="text-2xl">{b.emoji}</div>
                  <div className="mt-2 font-semibold text-gray-900 dark:text-white text-sm">{b.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{b.text}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-white dark:bg-dark-800 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-dark-600 shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Login</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Use any email + password (demo).</p>
                </div>
                <span className="text-4xl">🔐</span>
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-700 rounded-2xl border border-transparent focus:border-flame-400 focus:outline-none dark:text-white dark:placeholder-gray-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="w-full px-4 py-3 pr-12 bg-gray-100 dark:bg-dark-700 rounded-2xl border border-transparent focus:border-flame-400 focus:outline-none dark:text-white dark:placeholder-gray-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(s => !s)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-dark-600 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-200 text-sm rounded-2xl px-4 py-3">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 select-none">
                    <input type="checkbox" className="accent-flame-500" defaultChecked />
                    Remember me
                  </label>
                  <button type="button" className="text-sm font-semibold text-flame-500 hover:underline">
                    Forgot password?
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!isValid || submitting}
                  className="w-full bg-flame-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:bg-flame-600 transition-colors btn-ripple"
                >
                  {submitting ? 'Signing in…' : 'Sign in'}
                </motion.button>

                <button
                  type="button"
                  onClick={() => navigate('/', { replace: true })}
                  className="w-full bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-gray-100 font-semibold px-6 py-3.5 rounded-2xl hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                >
                  Continue as guest
                </button>

                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  New here?{' '}
                  <Link to="/" className="font-semibold text-flame-500 hover:underline">
                    Create an account
                  </Link>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
