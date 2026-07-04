import mascot from '../assets/mascot.png'

function CTASection() {
  return (
    <section className="final-cta-section section-padding" id="cta-portal">
      <div className="container final-cta-container">
        <div className="mascot-glow-wrapper reveal">
          <div className="mascot-radial-glow" />
          <img src={mascot} className="mascot-vector-placeholder" alt="LEAD Cybernetic Falcon Mascot" />
        </div>

        <h2 className="final-cta-heading reveal">Want to build with us?</h2>

        <div className="reveal">
          <a href="#apply" className="btn-premium-apply">
            <span className="btn-text">Apply</span>
            <span className="arrow-symbol">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTASection
