import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: '📱' },
  { id: 'card', label: 'Card', icon: '💳' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
]

export default function Checkout() {
  const { items, subtotal, deliveryFee, taxes, discount, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState('form') // form | success
  const [payment, setPayment] = useState('upi')
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: 'Noida' })

  const handleOrder = (e) => {
    e.preventDefault()
    setStep('success')
    setTimeout(() => {
      clearCart()
      navigate('/tracking')
    }, 3000)
  }

  if (step === 'success') return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900 flex items-center justify-center page-enter">
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
        <div className="relative w-28 h-28 mx-auto mb-6">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#22c55e" strokeWidth="6" />
            <path d="M25 50 L42 67 L75 33" fill="none" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="check-anim" />
          </svg>
        </div>
        <h2 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white mb-2">Order Placed! 🎉</h2>
        <p className="text-gray-500 dark:text-gray-400">Your food is being prepared. Redirecting to tracking...</p>
      </motion.div>
    </div>
  )

  return (
    <div className="bg-cream-50 dark:bg-dark-900 min-h-screen pb-8 page-enter">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <button onClick={() => navigate(-1)} className="text-flame-500 font-semibold mb-4 flex items-center gap-1">← Back</button>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">Checkout</h1>

        <form onSubmit={handleOrder} className="space-y-5">
          {/* Address */}
          <div className="bg-white dark:bg-dark-700 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">📍 Delivery Address</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Rahul Sharma' },
                { key: 'phone', label: 'Phone', placeholder: '+91 98765 43210' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{f.label}</label>
                  <input required value={form[f.key]} onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-500 dark:bg-dark-600 dark:text-white text-sm outline-none focus:border-flame-400 transition-colors"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Address</label>
                <textarea required value={form.address} onChange={e => setForm(p => ({...p, address: e.target.value}))}
                  placeholder="House/Flat No., Street, Area..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-500 dark:bg-dark-600 dark:text-white text-sm outline-none focus:border-flame-400 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white dark:bg-dark-700 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">💳 Payment Method</h3>
            <div className="space-y-2">
              {PAYMENT_METHODS.map(m => (
                <label key={m.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${payment === m.id ? 'border-flame-500 bg-flame-50 dark:bg-flame-500/10' : 'border-gray-100 dark:border-dark-500'}`}>
                  <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="accent-flame-500" />
                  <span>{m.icon}</span>
                  <span className="font-semibold text-sm text-gray-800 dark:text-white">{m.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-dark-700 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">🧾 Order Summary</h3>
            <div className="space-y-2 text-sm dark:text-gray-300">
              {items.map(i => (
                <div key={i.id} className="flex justify-between">
                  <span>{i.name} × {i.qty}</span>
                  <span className="font-semibold">₹{i.price * i.qty}</span>
                </div>
              ))}
              <div className="border-t dark:border-dark-500 pt-2 mt-2 space-y-1">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span className={deliveryFee===0?'text-green-500 font-semibold':''}>{deliveryFee===0?'FREE':`₹${deliveryFee}`}</span></div>
                <div className="flex justify-between"><span>Taxes</span><span>₹{taxes}</span></div>
                {discount>0 && <div className="flex justify-between text-green-500 font-semibold"><span>Discount</span><span>−₹{discount}</span></div>}
                <div className="flex justify-between font-bold text-base text-gray-900 dark:text-white pt-1 border-t dark:border-dark-500">
                  <span>Total</span><span>₹{total}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">🕐 Estimated delivery: <strong>30-40 minutes</strong></p>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-flame-500 text-white font-bold text-lg rounded-2xl hover:bg-flame-600 transition-colors shadow-xl shadow-flame-500/30 btn-ripple"
          >
            Place Order · ₹{total} 🎉
          </motion.button>
        </form>
      </div>
    </div>
  )
}
