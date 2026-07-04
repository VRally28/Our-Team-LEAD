import { useState, useEffect, useRef } from 'react'
import { departments } from '../data/departments'

function DepartmentSection() {
  const [openDept, setOpenDept] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const revealElements = section.querySelectorAll('.reveal')
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

  const toggleDepartment = (index) => {
    setOpenDept((current) => (current === index ? null : index))
  }

  return (
    <section className="dept-section section-padding" id="departments" ref={sectionRef}>
      <div className="container">
        <div className="section-header align-center">
          <div className="badge reveal">
            <span className="badge-dot" />
            <span className="badge-text">ORGANIZATIONAL MATRIX</span>
          </div>
          <h2 className="section-title reveal">Department Roster</h2>
          <p className="section-desc reveal">
            A dynamic index of domain experts collaborating on projects.
          </p>
        </div>

        <div className="accordion-container reveal">
          {departments.map((dept, index) => {
            const isOpen = openDept === index
            return (
              <div key={dept.title} className={`accordion-item ${isOpen ? 'active' : ''}`}>
                <button
                  type="button"
                  className="accordion-header"
                  aria-expanded={isOpen}
                  aria-controls={`${dept.title.toLowerCase().replace(/\s+/g, '-')}-body`}
                  onClick={() => toggleDepartment(index)}
                >
                  <span className="accordion-num">{String(index + 1).padStart(2, '0')} //</span>
                  <div className="accordion-title-block">
                    <h3 className="accordion-title">{dept.title}</h3>
                    <span className="dept-preview-text">{dept.subtitle}</span>
                  </div>
                  <div className="accordion-meta">
                    <span className="accordion-count">{dept.members.length} Members</span>
                    <span className="accordion-arrow">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </div>
                </button>
                <div
                  className="accordion-body"
                  id={`${dept.title.toLowerCase().replace(/\s+/g, '-')}-body`}
                  role="region"
                  style={{ maxHeight: isOpen ? '1000px' : '0px' }}
                >
                  <div className="accordion-content">
                    <div className="chips-grid">
                      {dept.members.map((member) => (
                        <span key={member} className="member-chip">
                          <span className="chip-dot" />
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default DepartmentSection