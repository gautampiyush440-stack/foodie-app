export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-dark-600 bg-white dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} Piyush. All rights reserved.
      </div>
    </footer>
  )
}

