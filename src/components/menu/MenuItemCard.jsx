import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'

export default function MenuItemCard({ item }) {
  const { items, addItem, updateQty } = useCart()
  const cartItem = items.find(i => i.id === item.id)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 p-4 bg-white dark:bg-dark-700 rounded-2xl border border-gray-100 dark:border-dark-600 hover:shadow-md transition-shadow"
    >
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={item.veg ? 'veg-dot' : 'nonveg-dot'} />
          {item.bestseller && (
            <span className="text-xs text-amber-500 font-bold">⭐ Bestseller</span>
          )}
        </div>
        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{item.name}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-2 line-clamp-2">{item.description}</p>
        <p className="font-bold text-gray-900 dark:text-white">₹{item.price}</p>
      </div>

      {/* Image + Add */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>

        <AnimatePresence mode="wait">
          {cartItem ? (
            <motion.div
              key="qty"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-flame-500 text-white rounded-xl px-2 py-1"
            >
              <button onClick={() => updateQty(item.id, cartItem.qty - 1)} className="font-bold text-lg w-5 text-center">−</button>
              <span className="text-sm font-bold w-4 text-center">{cartItem.qty}</span>
              <button onClick={() => addItem(item)} className="font-bold text-lg w-5 text-center">+</button>
            </motion.div>
          ) : (
            <motion.button
              key="add"
              onClick={handleAdd}
              whileTap={{ scale: 0.9 }}
              className={`px-4 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${
                added
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-flame-500 text-flame-500 hover:bg-flame-500 hover:text-white'
              }`}
            >
              {added ? '✓ Added' : '+ ADD'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
