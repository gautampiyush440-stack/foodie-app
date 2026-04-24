import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import BottomNav from './components/common/BottomNav'
import CartPanel from './components/cart/CartPanel'
import BurgerIntro from './components/common/BurgerIntro'
import Home from './pages/Home'
import Restaurants from './pages/Restaurants'
import RestaurantMenu from './pages/RestaurantMenu'
import Checkout from './pages/Checkout'
import Tracking from './pages/Tracking'
import Login from './pages/Login'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <BurgerIntro />
          <Navbar />
          <CartPanel />
          <main className="flex-1 pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurant/:id" element={<RestaurantMenu />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <div className="mb-16 md:mb-0">
            <Footer />
          </div>
          <BottomNav />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}
