import { useNavigate } from 'react-router-dom'
import './Events.css'

const Events = () => {
  const navigate = useNavigate()

  // Evento fixo do dia 19
  const evento = {
    id: 1,
    titulo: "Ação Social +1 Mais de Nós",
    data_evento: "2024-01-19",
    hora_evento: "10:00:00",
    local: "Quadra do Nelson Ramos",
    vagas_totais: 50,
    vagas_preenchidas: 0,
    status: "aberto",
    tipo_evento: "acao_social"
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    return timeString.substring(0, 5)
  }

  const goToRegistration = () => {
    navigate(`/evento/${evento.id}/inscricao`)
  }

  return (
    <section id="eventos" className="events">
      <div className="events-container">
        <div className="events-header">
          <div className="section-tag">
            <span className="tag-icon">📅</span>
            <span>Próximo Evento</span>
          </div>

          <h2 className="section-title">
            Participe do Nosso <span className="highlight">Evento</span>
          </h2>

          <p className="section-description">
            Venha participar da nossa ação social! Uma oportunidade de compartilhar amor e fazer a diferença.
          </p>
        </div>

        <div className="event-single">
          <div className="event-card">
            <div className="event-content">
              <div className="event-date">
                <span className="date-icon">📅</span>
                <span className="date-text">{formatDate(evento.data_evento)}</span>
                <span className="time-text">{formatTime(evento.hora_evento)}</span>
              </div>

              <h3 className="event-title">{evento.titulo}</h3>

              <div className="event-location">
                <span className="location-icon">📍</span>
                <span className="location-text">{evento.local}</span>
              </div>

              <div className="event-stats">
                <div className="spots-info">
                  <span className="spots-icon">👥</span>
                  <span className="spots-text">
                    {evento.vagas_preenchidas}/{evento.vagas_totais} vagas
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${(evento.vagas_preenchidas / evento.vagas_totais) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              <button className="event-btn" onClick={goToRegistration}>
                <span>Participar</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="events-cta">
          <p className="cta-text">
            Quer receber notificações sobre nossos eventos?
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
