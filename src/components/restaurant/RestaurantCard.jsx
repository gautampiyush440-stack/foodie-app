import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function RestaurantCard({ restaurant, index = 0 }) {
  const { favorites, toggleFavorite } = useCart()
  const isFav = favorites.includes(restaurant.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/restaurant/${restaurant.id}`} className="block">
        <div className="bg-white dark:bg-dark-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
          {/* Image */}
          <div className="relative overflow-hidden h-44">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Offer badge */}
            {restaurant.offer && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                <span className="text-white text-xs font-bold">{restaurant.offer}</span>
              </div>
            )}
            {/* Favorite */}
            <button
              onClick={e => { e.preventDefault(); toggleFavorite(restaurant.id) }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            >
              <span className="text-sm">{isFav ? '❤️' : '🤍'}</span>
            </button>
            {/* Tags */}
            <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
              {restaurant.tags.map(tag => (
                <span key={tag} className="text-xs bg-white/90 text-gray-700 font-semibold px-2 py-0.5 rounded-full shadow-sm">{tag}</span>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight">{restaurant.name}</h3>
              <div className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg flex-shrink-0">
                ⭐ {restaurant.rating}
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{restaurant.cuisine}</p>
            <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
              <span>🕐 {restaurant.deliveryTime}</span>
              <span>·</span>
              <span>Min ₹{restaurant.minOrder}</span>
              <span>·</span>
              <span>₹{restaurant.priceForTwo} for 2</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
