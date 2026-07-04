import { useEffect } from 'react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Events', href: '#events' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Our Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  useEffect(() => {
    const closeMenu = () => {
      setMobileMenuOpen(false)
    }

    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeMenu()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setMobileMenuOpen])

  return (
    <nav className="navbar container" aria-label="Primary navigation">
      <a href="#home" className="logo-container" aria-label="LEAD Home">
        <svg className="lead-logo-svg" width="112" height="28" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,5 H16 V29 H35 V35 H10 Z M42,5 H67 V11 H42 Z M42,17 H67 V23 H42 Z M42,29 H67 V35 H42 Z M86.5,5 L100,35 H93.5 L86.5,12 L79.5,35 H73 Z M109,5 H122 C129,5 134,10 134,17 V23 C134,30 129,35 122,35 H109 Z M115,11 V29 H122 C125,29 128,26 128,23 V17 C128,14 125,11 122,11 Z" fill="white" />
          <defs>
            <linearGradient id="logoGlow" x1="10" y1="5" x2="134" y2="35" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00f0ff" />
              <stop offset="1" stopColor="#0066ff" />
            </linearGradient>
          </defs>
        </svg>
      </a>

      <button
        type="button"
        className="mobile-nav-toggle"
        aria-controls="nav-menu"
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen((current) => !current)}
      >
        <span className="sr-only">Menu</span>
        <div className="hamburger">
          <span />
          <span />
        </div>
      </button>

      <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} id="nav-menu">
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} className={`nav-link ${item.label === 'Our Team' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
