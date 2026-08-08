import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Navbar } from './components/ui/Navbar'
import { Footer } from './components/ui/Footer'
import { initLenis } from './utils/smoothScroll'

function App() {
  useEffect(() => {
    const lenis = initLenis()
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Helmet>
        <title>Happy Birthday | Architecture</title>
        <meta name="description" content="A scalable mobile-first architecture for a birthday experience app." />
      </Helmet>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
