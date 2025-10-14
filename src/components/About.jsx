import './About.css'

const About = () => {
  return (
    <section id="sobre" className="about">
      <div className="about-container">
        <div className="about-content">
          <div className="section-tag">
            <span className="tag-icon">✨</span>
            <span>Sobre Nós</span>
          </div>

          <h2 className="section-title">
            Quem é a <span className="highlight">Mais de Nós</span>?
          </h2>

          <p className="about-text">
            Um projeto social idealizado e enviado pelo coração de Cristo. Tudo começou em um 
            jantar, onde compartilhamos as coisas boas que Deus estava fazendo em nossas vidas. 
            Todos tinham o mesmo sentimento: <strong>o que vamos fazer para devolver isso que estamos recebendo?</strong>
          </p>

          <p className="about-text">
            Sem hesitar, pensamos em um projeto que tocasse o coração das famílias, não trazendo 
            apenas brinquedos, insumos ou itens alimentares, mas sim trazendo <strong>CRISTO</strong>. 
            Nossa estratégia é focar nas crianças, pois sabemos que para um bom pai, o acalento 
            é o acolhimento ao filho.
          </p>

          <p className="about-text">
            Iniciado no final de 2024, desenhamos nossa marca com traços de crianças, mantendo 
            cores primárias, mostrando que <strong>a criança vem primeiro</strong> em nosso projeto. 
            Não queremos foco nos mensageiros, mas sim no ato cooperativista - não é sobre os 
            idealizadores, é sobre o ideal.
          </p>

          <div className="about-features">
            <div className="feature-card">
              <div className="feature-icon">✝️</div>
              <h3>Palavra de Cristo</h3>
              <p>Levar o amor e os ensinamentos de Cristo para transformar vidas</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👶</div>
              <h3>Foco nas Crianças</h3>
              <p>Acolher os pequenos para alcançar o coração de toda a família</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Cooperativismo</h3>
              <p>Juntos somos +1, criando pontes de solidariedade e amor</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">❤️</div>
              <h3>Compartilhar Amor</h3>
              <p>Ser mais um na vida das pessoas, avançando sempre em amor</p>
            </div>
          </div>
        </div>

        <div className="about-image">
          <div className="image-card">
            <div className="card-content">
              <div className="big-icon">✝️</div>
              <h3>Nossa Missão</h3>
              <p>
                Ser +1 na vida das pessoas, compartilhando o amor de Cristo e 
                criando pontes de solidariedade. Vamos avante, avançando sempre 
                com foco nas crianças e no ato cooperativista.
              </p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="mini-stat">
              <div className="mini-stat-number">2024</div>
              <div className="mini-stat-label">Início</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-number">+1</div>
              <div className="mini-stat-label">Sempre</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-number">∞</div>
              <div className="mini-stat-label">Amor</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

