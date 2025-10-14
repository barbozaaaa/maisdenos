import { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-section" onClick={() => scrollToSection('hero')}>
          <div className="logo-icon">
            <img src="/IMG/logo.png" alt="+1 Mais de Nós" className="logo-image" />
          </div>
          <div className="logo-text">
            <h1>+1</h1>
            <p>Mais de Nós</p>
          </div>
        </div>

        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a onClick={() => scrollToSection('eventos')}>Eventos</a>
          <a onClick={() => scrollToSection('sobre')}>Sobre</a>
          <a onClick={() => scrollToSection('voluntario')}>Voluntários</a>
          <a onClick={() => scrollToSection('galeria')}>Galeria</a>
          <a onClick={() => scrollToSection('doar')}>Doar</a>
          <a onClick={() => scrollToSection('faq')}>FAQ</a>
          <button 
            className="btn-crm-header"
            onClick={() => scrollToSection('crm')}
          >
            📊 CRM
          </button>
          <button 
            className="btn-doar-header"
            onClick={() => scrollToSection('doar')}
          >
            💝 Quero Doar
          </button>
        </nav>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header

