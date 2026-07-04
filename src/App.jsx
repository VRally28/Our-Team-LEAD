import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ExecutiveSection from './components/ExecutiveSection'
import DepartmentSection from './components/DepartmentSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import OrbCanvas from './components/OrbCanvas/OrbCanvas'
import { useOrbState, useExecSignal } from './hooks/useOrbState'

function App() {
  const [navbarScrolled, setNavbarScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cursorGlowRef = useRef(null)
  const orbStateRef = useOrbState()

  // Shared hover/active signal between the executive ring (DOM) and the
  // orb's shard fragments (Three.js) — see useOrbState.js for details.
  const execSignalRef = useExecSignal()

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const cursorGlow = cursorGlowRef.current
    if (!cursorGlow) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let animationFrame = 0

    const updateCursorPosition = () => {
      currentX += (mouseX - currentX) * 0.1
      currentY += (mouseY - currentY) * 0.1
      cursorGlow.style.left = `${currentX}px`
      cursorGlow.style.top = `${currentY}px`
      animationFrame = requestAnimationFrame(updateCursorPosition)
    }

    const handleMouseMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationFrame = requestAnimationFrame(updateCursorPosition)

    const interactiveSelectors = ['a', 'button', '.btn', '.exec-item', '.member-chip', '.accordion-header', '.station-card']
    const interactives = Array.from(document.querySelectorAll(interactiveSelectors.join(',')))

    const handleEnter = () => {
      cursorGlow.style.width = '550px'
      cursorGlow.style.height = '550px'
      cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.11) 0%, rgba(0, 102, 255, 0.03) 50%, rgba(0, 0, 0, 0) 70%)'
    }

    const handleLeave = () => {
      cursorGlow.style.width = '400px'
      cursorGlow.style.height = '400px'
      cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.07) 0%, rgba(0, 102, 255, 0.02) 50%, rgba(0, 0, 0, 0) 70%)'
    }

    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    revealElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app-shell">
      <div className="cursor-glow" ref={cursorGlowRef} />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="bg-glow bg-glow-3" />
      <div className="grid-overlay" />
      <OrbCanvas orbStateRef={orbStateRef} execSignalRef={execSignalRef} />

      <div className={`navbar-wrapper ${navbarScrolled ? 'scrolled' : ''}`}>
        <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      </div>

      <main>
        <Hero />
        <ExecutiveSection execSignalRef={execSignalRef} />
        <DepartmentSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

export default App
