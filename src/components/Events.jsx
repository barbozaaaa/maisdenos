import './Events.css'

/**
 * Componente Events - Seção informativa sobre eventos
 * 
 * Este componente exibe uma mensagem informativa sobre eventos futuros.
 * A funcionalidade de inscrição foi removida pois não há eventos ativos no momento.
 * 
 * Funcionalidades:
 * - Exibe mensagem informativa sobre eventos futuros
 * - Redireciona para seção de voluntários
 */
const Events = () => {

  return (
    <section id="eventos" className="events">
      <div className="events-container">
        {/* Cabeçalho da seção de eventos */}
        <div className="events-header">
          <div className="section-tag">
            <span className="tag-icon">📅</span>
            <span>Eventos Futuros</span>
          </div>

          <h2 className="section-title">
            Nossos <span className="highlight">Eventos</span>
          </h2>

          <p className="section-description">
            Estamos organizando eventos incríveis para a comunidade. Fique atento às nossas redes sociais para não perder nenhuma novidade!
          </p>
        </div>

        {/* Mensagem informativa sobre eventos */}
        <div className="events-info">
          <div className="info-card">
            <div className="info-icon">📅</div>
            <h3>Eventos em Breve</h3>
            <p>
              Estamos preparando ações sociais especiais para a comunidade. 
              Em breve divulgaremos nossa programação de eventos.
            </p>
            <p>
              <strong>Fique conectado conosco:</strong><br/>
              • Siga nossas redes sociais<br/>
              • Cadastre-se como voluntário<br/>
              • Receba nossas notificações
            </p>
          </div>
        </div>

        {/* Call-to-action para se tornar voluntário */}
        <div className="events-cta">
          <p className="cta-text">
            Quer ser o primeiro a saber sobre nossos eventos?
          </p>
          <button 
            className="btn-events"
            onClick={() => document.getElementById('voluntario').scrollIntoView({ behavior: 'smooth' })}
          >
            🤝 Seja Voluntário
          </button>
        </div>
      </div>
    </section>
  )
}

export default Events
