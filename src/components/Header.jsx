import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
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
                     <a onClick={() => scrollToSection('eventos')}>Eventos</a>
                     <a onClick={() => scrollToSection('sobre')}>Sobre</a>
                     <a onClick={() => scrollToSection('voluntario')}>Voluntários</a>
                     <a onClick={() => scrollToSection('galeria')}>Galeria</a>
                     <a onClick={() => scrollToSection('doar')}>Doar</a>
                   </>
                 ) : (
                   <Link to="/">Início</Link>
                 )}
               </nav>
      </div>
    </header>
  )
}

export default Header

