import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CartPanel() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal, deliveryFee, taxes, discount, total, coupon, applyCoupon, setCoupon } = useCart()
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')
  const navigate = useNavigate()

  const handleCoupon = () => {
    const ok = applyCoupon(couponInput.toUpperCase())
    if (!ok) setCouponError('Invalid coupon code')
    else { setCouponError(''); setCouponInput('') }
  }

  const handleCheckout = () => {
    setIsOpen(false)
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-dark-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b dark:border-dark-600">
              <h2 className="text-lg font-bold dark:text-white">🛒 Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl">✕</button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-6xl mb-4">🛒</span>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mt-1">Add items to get started!</p>
                  <button onClick={() => { setIsOpen(false); navigate('/restaurants') }} className="mt-4 bg-flame-500 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-flame-600 transition-colors">
                    Browse Restaurants
                  </button>
                </div>
              ) : items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-700"
                >
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{item.name}</p>
                    <p className="text-sm text-flame-500 font-bold">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-lg bg-flame-100 dark:bg-dark-600 text-flame-500 font-bold text-lg flex items-center justify-center hover:bg-flame-200 transition-colors">−</button>
                    <span className="w-5 text-center text-sm font-bold dark:text-white">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-lg bg-flame-500 text-white font-bold text-lg flex items-center justify-center hover:bg-flame-600 transition-colors">+</button>
                  </div>
                </motion.div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="px-5 py-4 border-t dark:border-dark-600 space-y-3">
                {/* Coupon */}
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={e => { setCouponInput(e.target.value); setCouponError('') }}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 text-sm border rounded-xl dark:bg-dark-700 dark:border-dark-500 dark:text-white outline-none focus:border-flame-400"
                  />
                  <button onClick={handleCoupon} className="px-4 py-2 bg-flame-500 text-white text-sm font-semibold rounded-xl hover:bg-flame-600 transition-colors">Apply</button>
                </div>
                {couponError && <p className="text-xs text-red-500">{couponError}</p>}
                {coupon && <p className="text-xs text-green-500 font-semibold">✅ {coupon.code} applied! −₹{coupon.discount}</p>}

                {/* Bill */}
                <div className="space-y-1.5 text-sm dark:text-gray-300">
                  <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                  <div className="flex justify-between"><span>Delivery fee</span><span className={deliveryFee === 0 ? 'text-green-500 font-semibold' : ''}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
                  <div className="flex justify-between"><span>Taxes & fees</span><span>₹{taxes}</span></div>
                  {discount > 0 && <div className="flex justify-between text-green-500 font-semibold"><span>Discount</span><span>−₹{discount}</span></div>}
                  <div className="flex justify-between font-bold text-base text-gray-900 dark:text-white pt-2 border-t dark:border-dark-600">
                    <span>Total</span><span>₹{total}</span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-flame-500 text-white font-bold rounded-xl hover:bg-flame-600 transition-colors btn-ripple"
                >
                  Place Order · ₹{total}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
