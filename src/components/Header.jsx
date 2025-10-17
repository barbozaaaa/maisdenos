import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const { user, signOut, isAdmin } = useAuth()
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
    }
  }

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

        <nav className="nav-menu">
          {isHomePage ? (
            <>
              <a onClick={() => scrollToSection('eventos')}>📅 Eventos</a>
              {user && (
                <>
                  <a onClick={() => scrollToSection('sobre')}>ℹ️ Sobre</a>
                  <a onClick={() => scrollToSection('voluntario')}>👥 Voluntários</a>
                  <a onClick={() => scrollToSection('galeria')}>📸 Galeria</a>
                  <a onClick={() => scrollToSection('doar')}>💝 Doar</a>
                  <a onClick={() => scrollToSection('faq')}>❓ FAQ</a>
                </>
              )}
            </>
          ) : (
            <Link to="/">🏠 Início</Link>
          )}
          
          {user ? (
            <>
              {isAdmin && <Link to="/crm">CRM</Link>}
              <button 
                className="btn-logout-header"
                onClick={handleLogout}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/register">Cadastrar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header

