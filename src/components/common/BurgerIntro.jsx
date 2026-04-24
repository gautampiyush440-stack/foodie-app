import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function BurgerIntro() {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState('idle') // idle | intro | expanding
  const closeTimerRef = useRef(null)

  useEffect(() => {
    // Show only once per tab/session
    const key = 'foodzilla_intro_seen'
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {
      // If storage is blocked, just show it once per mount
    }

    setOpen(true)
    setPhase('intro')
    closeTimerRef.current = setTimeout(() => setOpen(false), 1400)
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const handleBurgerClick = () => {
    if (phase !== 'intro') return
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setPhase('expanding')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="burger-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.6, y: 30, rotate: -10, opacity: 0 }}
            animate={
              phase === 'expanding'
                ? { scale: 14, y: 0, rotate: 0, opacity: 0.95 }
                : { scale: 1, y: 0, rotate: 0, opacity: 1 }
            }
            exit={{ scale: 0.8, y: -20, opacity: 0 }}
            transition={
              phase === 'expanding'
                ? { duration: 0.5, ease: 'easeInOut' }
                : { type: 'spring', stiffness: 380, damping: 22 }
            }
            onAnimationComplete={() => {
              if (phase === 'expanding') setOpen(false)
            }}
            className="select-none"
          >
            <motion.div
              role="button"
              tabIndex={0}
              onClick={handleBurgerClick}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleBurgerClick()}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[96px] drop-shadow-2xl cursor-pointer"
            >
              🍔
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              className="mt-2 text-center text-white font-semibold tracking-wide"
            >
              Foodzilla
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

