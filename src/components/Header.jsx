import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

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

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.nav-menu') && !event.target.closest('.mobile-menu-btn')) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const isHomePage = location.pathname === '/'

  return (
    <>
      {/* Overlay para menu mobile */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
        <div className="logo-section" onClick={() => isHomePage ? scrollToSection('hero') : navigate('/')}>
          <div className="logo-icon">
            <img src="/IMG/logo.png" alt="+1 Mais de Nós" className="logo-image" />
          </div>
          <div className="logo-text">
            <h1>+1</h1>
            <p>Mais de Nós</p>
          </div>
        </div>

        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {isHomePage ? (
            <>
              <a onClick={() => scrollToSection('eventos')}>📅 Eventos</a>
              <a onClick={() => scrollToSection('sobre')}>ℹ️ Sobre</a>
              <a onClick={() => scrollToSection('voluntario')}>👥 Voluntários</a>
              <a onClick={() => scrollToSection('galeria')}>📸 Galeria</a>
              <a onClick={() => scrollToSection('doar')}>💝 Doar</a>
              <a onClick={() => scrollToSection('faq')}>❓ FAQ</a>
              <a onClick={() => scrollToSection('crm')}>📊 CRM</a>
              <button 
                className="btn-doar-header"
                onClick={() => scrollToSection('doar')}
              >
                💝 Quero Doar
              </button>
            </>
          ) : (
            <>
              <Link to="/">🏠 Início</Link>
              {user ? (
                <>
                  <Link to="/crm">📊 CRM</Link>
                  <button 
                    className="btn-logout-header"
                    onClick={handleLogout}
                  >
                    🚪 Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">🔑 Entrar</Link>
                  <Link to="/register">📝 Cadastrar</Link>
                </>
              )}
            </>
          )}
        </nav>

        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
    </>
  )
}

export default Header

