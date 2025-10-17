import './Hero.css'

const Hero = () => {
  const scrollToDoar = () => {
    const element = document.getElementById('doar')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-logo">
            <img src="/IMG/logo.png" alt="+1 Mais de Nós" className="hero-logo-image" />
          </div>
          
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span>Juntos por um futuro melhor</span>
          </div>

          <h1 className="hero-title">
            Transforme <span className="gradient-text">Sonhos</span> em{' '}
            <span className="gradient-text">Realidade</span>
          </h1>

          <p className="hero-description">
            Projeto social idealizado e enviado pelo coração de Cristo. Trazemos não apenas 
            assistência material, mas principalmente o <strong>amor de Cristo</strong> para tocar 
            o coração das famílias através das crianças. Seja <strong>+1</strong> conosco!
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-icon">✝️</div>
              <h3>Cristo</h3>
            </div>
            <div className="stat-item">
              <div className="stat-icon">👶</div>
              <h3>Crianças</h3>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🤝</div>
              <h3>+1</h3>
            </div>
          </div>

          <div className="hero-cta">
            <button className="btn-primary" onClick={scrollToDoar}>
              <span>💝</span>
              Fazer uma Doação
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' })}>
              Saiba Mais
            </button>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-placeholder">
            <div className="image-icon">🌈</div>
            <div className="floating-hearts">
              <span>❤️</span>
              <span>💙</span>
              <span>💚</span>
              <span>💛</span>
              <span>💜</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-wave">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

export default Hero

