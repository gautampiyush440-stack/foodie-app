import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [coupon, setCoupon] = useState(null)

  const addItem = useCallback((item) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1 }]
    })
  }, [])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }, [])

  const applyCoupon = useCallback((code) => {
    const coupons = { FIRST50: 50, FREEDEL: 0, BOGO: 30, SAVE100: 100 }
    if (coupons[code] !== undefined) {
      setCoupon({ code, discount: coupons[code] })
      return true
    }
    return false
  }, [])

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const deliveryFee = subtotal > 299 ? 0 : 40
  const taxes = Math.round(subtotal * 0.05)
  const discount = coupon?.discount || 0
  const total = subtotal + deliveryFee + taxes - discount
  const itemCount = items.reduce((s, i) => s + i.qty, 0)

  // Toggle dark mode on document
  const toggleDark = useCallback(() => {
    setDarkMode(d => {
      document.documentElement.classList.toggle('dark', !d)
      return !d
    })
  }, [])

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      isOpen, setIsOpen,
      darkMode, toggleDark,
      favorites, toggleFavorite,
      coupon, applyCoupon, setCoupon,
      subtotal, deliveryFee, taxes, discount, total, itemCount,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
