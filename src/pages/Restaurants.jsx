import { useState } from 'react'
import { motion } from 'framer-motion'
import { RESTAURANTS } from '../data/mockData'
import RestaurantCard from '../components/restaurant/RestaurantCard'

const FILTERS = ['All', 'Top Rated', 'Fast Delivery', 'Offers', 'Pure Veg']
const SORTS = ['Relevance', 'Rating', 'Delivery Time', 'Price: Low to High']

export default function Restaurants() {
  const [active, setActive] = useState('All')
  const [sort, setSort] = useState('Relevance')
  const [search, setSearch] = useState('')

  const filtered = RESTAURANTS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-cream-50 dark:bg-dark-900 min-h-screen pb-20 md:pb-8 page-enter">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">
            Restaurants near you
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{filtered.length} restaurants found</p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search restaurants or dishes..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-700 dark:text-white rounded-2xl border border-gray-200 dark:border-dark-500 outline-none focus:border-flame-400 transition-colors text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {FILTERS.map(f => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                active === f
                  ? 'bg-flame-500 text-white shadow-md shadow-flame-500/30'
                  : 'bg-white dark:bg-dark-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-500'
              }`}
            >
              {f}
            </motion.button>
          ))}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-dark-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-500 outline-none cursor-pointer"
          >
            {SORTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r, i) => (
            <RestaurantCard key={r.id} restaurant={r} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-gray-500 dark:text-gray-400 font-semibold">No restaurants found</p>
          </div>
        )}
      </div>
    </div>
  )
}
