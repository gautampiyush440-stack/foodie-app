import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RESTAURANTS, MENU_ITEMS } from '../data/mockData'
import MenuItemCard from '../components/menu/MenuItemCard'
import { useCart } from '../context/CartContext'

export default function RestaurantMenu() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { itemCount, setIsOpen, favorites, toggleFavorite } = useCart()
  const restaurant = RESTAURANTS.find(r => r.id === parseInt(id))
  const menu = MENU_ITEMS[parseInt(id)] || []
  const [activeCategory, setActiveCategory] = useState('All')

  if (!restaurant) return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-dark-900">
      <p className="text-5xl mb-4">😅</p>
      <p className="font-semibold text-gray-500">Restaurant not found</p>
      <button onClick={() => navigate('/restaurants')} className="mt-4 text-flame-500 font-semibold">← Back</button>
    </div>
  )

  const categories = ['All', ...new Set(menu.map(i => i.category))]
  const filtered = activeCategory === 'All' ? menu : menu.filter(i => i.category === activeCategory)
  const isFav = favorites.includes(restaurant.id)

  return (
    <div className="bg-cream-50 dark:bg-dark-900 min-h-screen pb-20 md:pb-8 page-enter">
      {/* Hero image */}
      <div className="relative h-52 md:h-72 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center font-bold text-gray-700 hover:bg-white transition-colors">
          ←
        </button>
        <button onClick={() => toggleFavorite(restaurant.id)} className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          {isFav ? '❤️' : '🤍'}
        </button>

        {/* Restaurant info overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl font-display font-extrabold mb-1">{restaurant.name}</h1>
          <p className="text-white/80 text-sm">{restaurant.cuisine}</p>
          <div className="flex items-center gap-3 mt-2 text-sm">
            <span className="bg-green-500 text-white px-2 py-0.5 rounded-lg font-bold text-xs">⭐ {restaurant.rating}</span>
            <span>🕐 {restaurant.deliveryTime}</span>
            <span>{restaurant.offer && `🎁 ${restaurant.offer}`}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-flame-500 text-white'
                  : 'bg-white dark:bg-dark-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <div className="space-y-3">
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <MenuItemCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sticky cart button */}
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 100 }} animate={{ y: 0 }}
          className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-30"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(true)}
            className="bg-flame-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-2xl shadow-flame-500/40 flex items-center gap-3 btn-ripple"
          >
            <span className="bg-white/20 rounded-lg px-2 py-0.5 text-sm">{itemCount}</span>
            View Cart
            <span>→</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
