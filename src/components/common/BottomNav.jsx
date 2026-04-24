import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const TABS = [
  { to: '/', icon: '🏠', label: 'Home' },
  { to: '/restaurants', icon: '🍽️', label: 'Explore' },
  { to: '/tracking', icon: '📍', label: 'Track' },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const { itemCount, setIsOpen } = useCart()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-800 border-t border-gray-100 dark:border-dark-600 bottom-nav z-40">
      <div className="flex items-center justify-around py-2">
        {TABS.map(tab => (
          <Link key={tab.to} to={tab.to} className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${pathname === tab.to ? 'text-flame-500' : 'text-gray-400'}`}>
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </Link>
        ))}
        <button onClick={() => setIsOpen(true)} className="relative flex flex-col items-center gap-0.5 px-4 py-1 text-gray-400">
          <span className="text-xl">🛒</span>
          <span className="text-xs font-medium">Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 bg-flame-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{itemCount}</span>
          )}
        </button>
      </div>
    </nav>
  )
}
