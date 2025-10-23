import { useNavigate } from 'react-router-dom'
import './Events.css'

/**
 * Componente Events - Seção de eventos da página inicial
 * 
 * Este componente exibe informações sobre eventos disponíveis para participação.
 * Atualmente exibe um evento fixo (mock) já que não há eventos reais cadastrados.
 * 
 * Funcionalidades:
 * - Exibe informações do evento (título, data, local, vagas)
 * - Permite navegação para página de inscrição
 * - Redireciona para seção de voluntários
 */
const Events = () => {
  const navigate = useNavigate()

  // TODO: Substituir por dados reais do banco quando houver eventos cadastrados
  // Evento fixo do dia 19 - dados mockados para demonstração
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

  /**
   * Formata a data para exibição em português brasileiro
   * @param {string} dateString - Data no formato ISO (YYYY-MM-DD)
   * @returns {string} Data formatada (ex: "19 de janeiro de 2024")
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  /**
   * Formata o horário removendo os segundos
   * @param {string} timeString - Horário no formato HH:MM:SS
   * @returns {string} Horário formatado (ex: "10:00")
   */
  const formatTime = (timeString) => {
    return timeString.substring(0, 5)
  }

  /**
   * Navega para a página de inscrição do evento
   * TODO: Implementar rota real quando houver sistema de eventos
   */
  const goToRegistration = () => {
    navigate(`/evento/${evento.id}/inscricao`)
  }

  return (
    <section id="eventos" className="events">
      <div className="events-container">
        {/* Cabeçalho da seção de eventos */}
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

        {/* Card do evento único - atualmente exibe evento mockado */}
        <div className="event-single">
          <div className="event-card">
            <div className="event-content">
              {/* Data e horário do evento */}
              <div className="event-date">
                <span className="date-icon">📅</span>
                <span className="date-text">{formatDate(evento.data_evento)}</span>
                <span className="time-text">{formatTime(evento.hora_evento)}</span>
              </div>

              {/* Título do evento */}
              <h3 className="event-title">{evento.titulo}</h3>

              {/* Local do evento */}
              <div className="event-location">
                <span className="location-icon">📍</span>
                <span className="location-text">{evento.local}</span>
              </div>

              {/* Estatísticas de vagas com barra de progresso */}
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

              {/* Botão para participar do evento */}
              <button className="event-btn" onClick={goToRegistration}>
                <span>Participar</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Call-to-action para se tornar voluntário */}
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
