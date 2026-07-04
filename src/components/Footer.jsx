function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <svg className="footer-watermark" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,5 H16 V29 H35 V35 H10 Z M42,5 H67 V11 H42 Z M42,17 H67 V23 H42 Z M42,29 H67 V35 H42 Z M86.5,5 L100,35 H93.5 L86.5,12 L79.5,35 H73 Z M109,5 H122 C129,5 134,10 134,17 V23 C134,30 129,35 122,35 H109 Z M115,11 V29 H122 C125,29 128,26 128,23 V17 C128,14 125,11 122,11 Z" fill="currentColor" />
      </svg>

      <div className="container footer-content">
        <div className="footer-brand-centered">
          <a href="#home" className="logo-container" aria-label="LEAD Home">
            <svg className="lead-logo-svg" width="128" height="32" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,5 H16 V29 H35 V35 H10 Z M42,5 H67 V11 H42 Z M42,17 H67 V23 H42 Z M42,29 H67 V35 H42 Z M86.5,5 L100,35 H93.5 L86.5,12 L79.5,35 H73 Z M109,5 H122 C129,5 134,10 134,17 V23 C134,30 129,35 122,35 H109 Z M115,11 V29 H122 C125,29 128,26 128,23 V17 C128,14 125,11 122,11 Z" fill="white" />
              <defs>
                <linearGradient id="footerLogoGlow" x1="10" y1="5" x2="134" y2="35" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00f0ff" />
                  <stop offset="1" stopColor="#0066ff" />
                </linearGradient>
              </defs>
            </svg>
          </a>
        </div>

        <nav className="footer-nav-minimal" aria-label="Footer navigation">
          <a href="#home">Home</a>
          <span className="nav-divider">//</span>
          <a href="#events">Events</a>
          <span className="nav-divider">//</span>
          <a href="#sponsors">Sponsors</a>
          <span className="nav-divider">//</span>
          <a href="#team" className="active">
            Our Team
          </a>
          <span className="nav-divider">//</span>
          <a href="#contact">Contact</a>
        </nav>

        <div className="footer-meta-block">
          <p className="footer-copyright">&copy; 2026 LEAD TIET. Created under zero-gravity protocol.</p>
          <div className="footer-social-minimal">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-btn-minimal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-btn-minimal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-btn-minimal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
