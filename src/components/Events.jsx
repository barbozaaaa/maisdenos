import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { toast } from 'react-toastify'
import './Events.css'

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [registrationData, setRegistrationData] = useState({
    nome: '',
    email: '',
    telefone: ''
  })

  // Carregar eventos do banco de dados
  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .gte('data_evento', new Date().toISOString().split('T')[0])
        .order('data_evento', { ascending: true })

      if (error) {
        throw error
      }

      setEvents(data || [])
    } catch (error) {
      console.error('Erro ao carregar eventos:', error)
      toast.error('Erro ao carregar eventos. Tente novamente.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setLoading(false)
    }
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
    return timeString.substring(0, 5) // Remove os segundos
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'aberto': return '#22c55e'
      case 'lotado': return '#f59e0b'
      case 'encerrado': return '#ef4444'
      case 'cancelado': return '#6b7280'
      default: return '#6b7280'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'aberto': return 'Aberto'
      case 'lotado': return 'Lotado'
      case 'encerrado': return 'Encerrado'
      case 'cancelado': return 'Cancelado'
      default: return 'Indisponível'
    }
  }

  const getTypeIcon = (tipoEvento) => {
    switch (tipoEvento) {
      case 'acao_social': return '🤝'
      case 'reuniao': return '👥'
      case 'campanha': return '📢'
      case 'espiritual': return '✝️'
      default: return '📅'
    }
  }

  const getTypeText = (tipoEvento) => {
    switch (tipoEvento) {
      case 'acao_social': return 'Ação Social'
      case 'reuniao': return 'Reunião'
      case 'campanha': return 'Campanha'
      case 'espiritual': return 'Espiritual'
      default: return 'Evento'
    }
  }

  const openEventModal = (event) => {
    setSelectedEvent(event)
  }

  const closeEventModal = () => {
    setSelectedEvent(null)
  }

  const handleRegistrationChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    })
  }

  const registerForEvent = async (eventId) => {
    if (!registrationData.nome || !registrationData.email || !registrationData.telefone) {
      toast.error('Por favor, preencha todos os campos obrigatórios.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    }

    try {
      const { data, error } = await supabase
        .from('inscricoes_eventos')
        .insert([
          {
            evento_id: eventId,
            nome: registrationData.nome,
            email: registrationData.email,
            telefone: registrationData.telefone
          }
        ])

      if (error) {
        throw error
      }

      toast.success('Inscrição realizada com sucesso! Entraremos em contato em breve.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      // Recarregar eventos para atualizar as vagas
      await loadEvents()
      closeEventModal()
      
      // Limpar dados do formulário
      setRegistrationData({
        nome: '',
        email: '',
        telefone: ''
      })

    } catch (error) {
      console.error('Erro ao inscrever no evento:', error)
      toast.error('Erro ao realizar inscrição. Tente novamente.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  return (
    <section id="eventos" className="events">
      <div className="events-container">
        <div className="events-header">
          <div className="section-tag">
            <span className="tag-icon">📅</span>
            <span>Próximos Eventos</span>
          </div>

          <h2 className="section-title">
            Participe dos Nossos <span className="highlight">Eventos</span>
          </h2>

          <p className="section-description">
            Junte-se a nós em ações que transformam vidas! Cada evento é uma oportunidade 
            de compartilhar amor e fazer a diferença na comunidade.
          </p>
        </div>

        <div className="events-grid">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Carregando eventos...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="no-events">
              <div className="no-events-icon">📅</div>
              <h3>Nenhum evento disponível</h3>
              <p>Novos eventos serão anunciados em breve!</p>
            </div>
          ) : (
            events.map((event, index) => (
              <div 
                key={event.id} 
                className="event-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openEventModal(event)}
              >
                <div className="event-image">
                  <img src={event.imagem_url} alt={event.titulo} />
                  <div className="event-type">
                    <span className="type-icon">{getTypeIcon(event.tipo_evento)}</span>
                    <span className="type-text">{getTypeText(event.tipo_evento)}</span>
                  </div>
                  <div className="event-status" style={{ backgroundColor: getStatusColor(event.status) }}>
                    {getStatusText(event.status)}
                  </div>
                </div>

                <div className="event-content">
                  <div className="event-date">
                    <span className="date-icon">📅</span>
                    <span className="date-text">{formatDate(event.data_evento)}</span>
                    <span className="time-text">{formatTime(event.hora_evento)}</span>
                  </div>

                  <h3 className="event-title">{event.titulo}</h3>

                  <div className="event-location">
                    <span className="location-icon">📍</span>
                    <span className="location-text">{event.local}</span>
                  </div>

                  <p className="event-description">{event.descricao}</p>

                  <div className="event-stats">
                    <div className="spots-info">
                      <span className="spots-icon">👥</span>
                      <span className="spots-text">
                        {event.vagas_preenchidas}/{event.vagas_totais} vagas
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${(event.vagas_preenchidas / event.vagas_totais) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  <button className="event-btn">
                    <span>Participar</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="events-cta">
          <p className="cta-text">
            Quer receber notificações sobre nossos eventos?
          </p>
          <button 
            className="btn-events"
            onClick={() => document.getElementById('voluntario').scrollIntoView({ behavior: 'smooth' })}
          >
            📧 Cadastre-se como Voluntário
          </button>
        </div>
      </div>

      {/* Modal do Evento */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={closeEventModal}>
          <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeEventModal}>
              ✕
            </button>
            
            <div className="modal-image">
              <img src={selectedEvent.imagem_url} alt={selectedEvent.titulo} />
              <div className="modal-event-type">
                <span className="type-icon">{getTypeIcon(selectedEvent.tipo_evento)}</span>
                <span className="type-text">{getTypeText(selectedEvent.tipo_evento)}</span>
              </div>
            </div>

            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">{selectedEvent.titulo}</h3>
                <div className="modal-status" style={{ backgroundColor: getStatusColor(selectedEvent.status) }}>
                  {getStatusText(selectedEvent.status)}
                </div>
              </div>

              <div className="modal-details">
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <div className="detail-content">
                    <span className="detail-label">Data e Hora</span>
                    <span className="detail-value">
                      {formatDate(selectedEvent.data_evento)} às {formatTime(selectedEvent.hora_evento)}
                    </span>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <div className="detail-content">
                    <span className="detail-label">Local</span>
                    <span className="detail-value">{selectedEvent.local}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">👥</span>
                  <div className="detail-content">
                    <span className="detail-label">Vagas</span>
                    <span className="detail-value">
                      {selectedEvent.vagas_preenchidas} de {selectedEvent.vagas_totais} vagas preenchidas
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-description">
                <h4>Descrição do Evento</h4>
                <p>{selectedEvent.descricao}</p>
              </div>

              {selectedEvent.status === 'aberto' && (
                <div className="registration-form">
                  <h4>Dados para Inscrição</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="modal-nome">Nome Completo *</label>
                      <input
                        type="text"
                        id="modal-nome"
                        name="nome"
                        value={registrationData.nome}
                        onChange={handleRegistrationChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="modal-email">E-mail *</label>
                      <input
                        type="email"
                        id="modal-email"
                        name="email"
                        value={registrationData.email}
                        onChange={handleRegistrationChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="modal-telefone">Telefone *</label>
                    <input
                      type="tel"
                      id="modal-telefone"
                      name="telefone"
                      value={registrationData.telefone}
                      onChange={handleRegistrationChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button 
                  className="btn-register"
                  onClick={() => registerForEvent(selectedEvent.id)}
                  disabled={selectedEvent.status !== 'aberto'}
                >
                  {selectedEvent.status === 'aberto' ? 'Quero Participar' : 
                   selectedEvent.status === 'lotado' ? 'Evento Lotado' :
                   selectedEvent.status === 'encerrado' ? 'Inscrições Encerradas' :
                   'Evento Indisponível'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Events
