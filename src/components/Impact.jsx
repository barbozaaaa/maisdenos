import { useState } from 'react'
import { toast } from 'react-toastify'
import { sendVolunteerConfirmation, notifyOrganizationVolunteer } from '../services/simpleEmailService'
import './Impact.css'

const Impact = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    idade: '',
    areaInteresse: '',
    disponibilidade: '',
    experiencia: '',
    motivacao: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simular salvamento de voluntário (sem Supabase)
      console.log('Voluntário registrado:', {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        idade: parseInt(formData.idade),
        area_interesse: formData.areaInteresse,
        disponibilidade: formData.disponibilidade,
        experiencia: formData.experiencia || null,
        motivacao: formData.motivacao
      })

      // Enviar emails de confirmação
      try {
        // Email de confirmação para o voluntário
        await sendVolunteerConfirmation(formData)
        
        // Notificação para a organização
        await notifyOrganizationVolunteer(formData)
        
        toast.success('Cadastro realizado com sucesso! Email de confirmação processado!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      } catch (emailError) {
        console.log('Email não enviado, mas cadastro realizado:', emailError)
        toast.success('Cadastro realizado com sucesso! Entraremos em contato em breve.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }

      setIsSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          idade: '',
          areaInteresse: '',
          disponibilidade: '',
          experiencia: '',
          motivacao: ''
        })
      }, 3000)

    } catch (error) {
      console.error('Erro ao cadastrar voluntário:', error)
      toast.error('Erro ao realizar cadastro. Tente novamente.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="voluntario" className="impact">
      <div className="impact-container">
        <div className="impact-header">
          <div className="section-tag">
            <span className="tag-icon">🤝</span>
            <span>Seja Voluntário</span>
          </div>

          <h2 className="section-title">
            Faça Parte da <span className="highlight">Nossa Família</span>
          </h2>

          <p className="section-description">
            Seja +1 conosco! Junte-se à nossa missão de amor e ajude a transformar vidas através de Cristo.
          </p>
        </div>

        <div className="volunteer-content">
          <div className="volunteer-info">
            <div className="volunteer-card">
              <div className="volunteer-icon">✝️</div>
              <h3>Missão Cristã</h3>
              <p>Amor de Jesus transformando vidas</p>
            </div>

            <div className="volunteer-card">
              <div className="volunteer-icon">👶</div>
              <h3>Foco nas Crianças</h3>
              <p>Priorizamos o bem-estar infantil</p>
            </div>

            <div className="volunteer-card">
              <div className="volunteer-icon">🤝</div>
              <h3>Cooperativismo</h3>
              <p>Juntos fazemos a diferença</p>
            </div>
          </div>

          <div className="volunteer-form-container">
            <div className="form-header">
              <h3>Cadastro de Voluntário</h3>
              <p>Preencha o formulário e entraremos em contato!</p>
            </div>

            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h4>Cadastro Realizado!</h4>
                <p>Obrigado por se voluntariar! Entraremos em contato em breve.</p>
              </div>
            ) : (
              <form className="volunteer-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nome">Nome Completo *</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-mail *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone *</label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="idade">Idade *</label>
                    <input
                      type="number"
                      id="idade"
                      name="idade"
                      value={formData.idade}
                      onChange={handleChange}
                      min="16"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="areaInteresse">Área de Interesse *</label>
                  <select
                    id="areaInteresse"
                    name="areaInteresse"
                    value={formData.areaInteresse}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione uma área</option>
                    <option value="atendimento">Atendimento às Famílias</option>
                    <option value="criancas">Atividades com Crianças</option>
                    <option value="logistica">Logística e Organização</option>
                    <option value="comunicacao">Comunicação e Marketing</option>
                    <option value="administrativo">Administrativo</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="disponibilidade">Disponibilidade *</label>
                  <select
                    id="disponibilidade"
                    name="disponibilidade"
                    value={formData.disponibilidade}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione sua disponibilidade</option>
                    <option value="finais-semana">Finais de Semana</option>
                    <option value="feriados">Feriados</option>
                    <option value="manha">Manhãs</option>
                    <option value="tarde">Tardes</option>
                    <option value="noite">Noites</option>
                    <option value="flexivel">Flexível</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="experiencia">Experiência Anterior</label>
                  <textarea
                    id="experiencia"
                    name="experiencia"
                    value={formData.experiencia}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Conte-nos sobre sua experiência em trabalho voluntário ou social..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="motivacao">Motivação *</label>
                  <textarea
                    id="motivacao"
                    name="motivacao"
                    value={formData.motivacao}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Por que você quer ser voluntário do projeto Mais de Nós?"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-volunteer-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      🤝 Quero Ser Voluntário
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Impact

