import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { CUISINES, RESTAURANTS, OFFERS, REVIEWS } from '../data/mockData'
import RestaurantCard from '../components/restaurant/RestaurantCard'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

export default function Home() {
  const [activeOffer, setActiveOffer] = useState(0)
  const navigate = useNavigate()

  return (
    <div className="bg-cream-50 dark:bg-dark-900 min-h-screen pb-20 md:pb-0">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-flame-500 via-flame-400 to-ember-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute text-4xl animate-float" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, animationDelay: `${Math.random()*3}s` }}>
              {['🍕','🍔','🍜','🍣','🌮'][i % 5]}
            </div>
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
          <motion.div
            initial="hidden" animate="show" variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="flex-1 text-white text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4"
            >
              🚀 30-min delivery guaranteed
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-tight mb-4">
              Hungry? <br />
              <span className="text-yellow-300">We've got you!</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-md">
              Order from 500+ restaurants near you. Fresh, fast, and always delicious.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/restaurants')}
              className="bg-white text-flame-500 font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl hover:shadow-flame-500/30 transition-all btn-ripple"
            >
              Order Now 🍔
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
              <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center text-9xl">
                🍔
              </div>
              {/* Floating badges */}
              {[{ text: '⭐ 4.9 Rating', pos: '-top-4 -right-4' },{ text: '🚀 30 min', pos: 'bottom-4 -left-8' },{ text: '💰 Best Price', pos: 'top-1/2 -right-10' }].map((b, i) => (
                <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ delay: i * 0.5, repeat: Infinity, duration: 2 }}
                  className={`absolute ${b.pos} bg-white text-xs font-bold text-gray-800 px-3 py-2 rounded-full shadow-lg whitespace-nowrap`}>
                  {b.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">

        {/* ── Offers Carousel ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 Hot Deals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {OFFERS.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`bg-gradient-to-br ${offer.color} text-white rounded-2xl p-4 cursor-pointer shadow-lg`}
              >
                <div className="text-3xl mb-2">{offer.emoji}</div>
                <div className="font-display font-extrabold text-2xl">{offer.title}</div>
                <div className="text-white/80 text-xs">{offer.subtitle}</div>
                <div className="mt-2 bg-white/20 rounded-lg px-2 py-1 text-xs font-mono font-bold inline-block">{offer.code}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Cuisines ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🍽️ What's on your mind?</h2>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {CUISINES.map((c, i) => (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/restaurants')}
                className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-dark-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{c.emoji}</span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">{c.name}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ── Top Restaurants ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">🏆 Top Restaurants</h2>
            <Link to="/restaurants" className="text-flame-500 text-sm font-semibold hover:underline">See all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESTAURANTS.slice(0, 3).map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} index={i} />
            ))}
          </div>
        </section>

        {/* ── Reviews ── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">💬 What people say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-dark-700 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-dark-600"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-flame-500 text-white font-bold flex items-center justify-center text-sm">{r.avatar}</div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.location}</p>
                  </div>
                  <div className="ml-auto text-yellow-400 text-sm">{'⭐'.repeat(r.rating)}</div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">"{r.text}"</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative bg-gradient-to-r from-flame-500 to-ember-500 rounded-3xl p-8 text-white overflow-hidden">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-8xl opacity-20 animate-float">🛵</div>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-display font-extrabold mb-2">Become a Delivery Partner 🏍️</h2>
            <p className="text-white/80 mb-4">Earn ₹25,000+ per month. Flexible hours. Join 10,000+ delivery partners.</p>
            <button className="bg-white text-flame-500 font-bold px-6 py-2.5 rounded-xl hover:scale-105 transition-transform btn-ripple">
              Join Now →
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
