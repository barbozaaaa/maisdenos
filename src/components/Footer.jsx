import './Footer.css'

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section about-section">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <span className="footer-logo-emoji">❤️</span>
              </div>
              <div className="footer-logo-text">
                <h3>+1</h3>
                <p>Mais de Nós</p>
              </div>
            </div>
            <p className="footer-description">
              Projeto social idealizado pelo coração de Cristo. Levando amor, fé e 
              solidariedade através das crianças. Seja +1 conosco, vamos avante!
            </p>
            <div className="social-links">
              <a href="https://www.instagram.com/maisdenosps" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <span>📷</span>
              </a>
              <a href="https://www.instagram.com/maisdenosps" target="_blank" rel="noopener noreferrer" aria-label="Instagram Stories">
                <span>✨</span>
              </a>
              <a href="mailto:contato@maisdenós.org.br" target="_blank" rel="noopener noreferrer" aria-label="Email">
                <span>📧</span>
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <span>💬</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul className="footer-links">
              <li><a onClick={() => scrollToSection('sobre')}>Sobre Nós</a></li>
              <li><a onClick={() => scrollToSection('impacto')}>Nosso Impacto</a></li>
              <li><a onClick={() => scrollToSection('doar')}>Fazer Doação</a></li>
              <li><a onClick={() => scrollToSection('faq')}>FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Como Ajudar</h4>
            <ul className="footer-links">
              <li><a onClick={() => scrollToSection('doar')}>Doar Dinheiro</a></li>
              <li><a onClick={() => scrollToSection('doar')}>Doar Roupas</a></li>
              <li><a onClick={() => scrollToSection('doar')}>Doar Brinquedos</a></li>
              <li><a href="#voluntario">Ser Voluntário</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📧</span>
                <a href="mailto:contato@maisdenós.org.br">contato@maisdenós.org.br</a>
              </li>
              <li>
                <span className="contact-icon">📱</span>
                <a href="tel:+5511999999999">(11) 99999-9999</a>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>São Paulo, SP - Brasil</span>
              </li>
              <li>
                <span className="contact-icon">⏰</span>
                <span>Seg-Sex: 8h às 18h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-copyright">
            <p>
              © 2025 <strong>Mais de Nós</strong> - Todos os direitos reservados.
            </p>
            <p className="made-with-love">
              Feito com <span className="heart">❤️</span> para fazer a diferença
            </p>
          </div>
        </div>
      </div>

      <div className="footer-wave">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 73.3C480 67 600 73 720 76.7C840 80 960 80 1080 73.3C1200 67 1320 53 1380 46.7L1440 40V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z" fill="url(#gradient)"/>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#667eea"/>
              <stop offset="1" stopColor="#764ba2"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </footer>
  )
}

export default Footer


