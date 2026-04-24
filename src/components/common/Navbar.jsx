import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const { itemCount, setIsOpen, darkMode, toggleDark } = useCart()
  const [location, setLocation] = useState('Integral University, Lko')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-white dark:bg-dark-800 border-b border-gray-100 dark:border-dark-600 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <motion.span
            initial={{ rotate: -6, scale: 0.9, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            whileHover={{ rotate: [0, -8, 8, -6, 6, 0], scale: 1.06 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-2xl select-none"
          >
            🍔
          </motion.span>
          <motion.span
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
            className="font-display font-bold text-xl text-flame-500"
          >
            Food<span className="text-gray-800 dark:text-white">zilla</span>
          </motion.span>
        </Link>

        {/* Location */}
        <button className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-flame-500 transition-colors flex-shrink-0">
          <svg className="w-4 h-4 text-flame-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="max-w-[120px] truncate">{location}</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && navigate('/restaurants')}
            placeholder="Search restaurants or dishes..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-dark-700 rounded-xl border border-transparent focus:border-flame-400 focus:outline-none dark:text-white dark:placeholder-gray-500 transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Login */}
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-dark-600 hover:border-flame-400 hover:text-flame-500 dark:hover:text-flame-400 transition-colors bg-white/60 dark:bg-dark-800/40"
          >
            <span className="text-base">👤</span>
            Login
          </Link>

          {/* Dark mode */}
          <button
            onClick={toggleDark}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Cart */}
          <motion.button
            onClick={() => setIsOpen(true)}
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center gap-2 bg-flame-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-flame-600 transition-colors btn-ripple"
          >
            🛒
            <span className="hidden sm:inline">Cart</span>
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full flex items-center justify-center animate-bounce-cart"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
