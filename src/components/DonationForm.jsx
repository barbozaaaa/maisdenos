import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { toast } from 'react-toastify'
import './DonationForm.css'

const DonationForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoDoacao: '',
    descricao: '',
    valor: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const tiposDoacao = [
    { value: 'dinheiro', label: 'Dinheiro', icon: '💰', color: '#4caf50' },
    { value: 'roupas', label: 'Roupas', icon: '👕', color: '#2196f3' },
    { value: 'brinquedos', label: 'Brinquedos', icon: '🧸', color: '#ff9800' },
    { value: 'alimentos', label: 'Alimentos', icon: '🍎', color: '#f44336' },
    { value: 'outros_bens', label: 'Outros Bens', icon: '📦', color: '#9c27b0' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('doacoes')
        .insert([
          {
            nome_doador: formData.nome,
            email_doador: formData.email,
            telefone_doador: formData.telefone,
            tipo_doacao: formData.tipoDoacao,
            descricao: formData.descricao,
            valor: formData.tipoDoacao === 'dinheiro' && formData.valor ? parseFloat(formData.valor) : null
          }
        ])

      if (error) throw error

      setShowSuccess(true)
      
      setTimeout(() => {
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          tipoDoacao: '',
          descricao: '',
          valor: ''
        })
        setShowSuccess(false)
      }, 3000)

      toast.success('🎉 Doação registrada com sucesso! Muito obrigado! ❤️')
    } catch (error) {
      console.error('Erro ao registrar doação:', error)
      toast.error('😢 Ops! Algo deu errado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="doar" className="donation-section">
      {showSuccess && (
        <div className="success-animation">
          <div className="success-circle">
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            <div className="confetti"></div>
            ✓
          </div>
          <h2>Obrigado por doar! ❤️</h2>
          <p>Sua generosidade transforma vidas!</p>
        </div>
      )}
      
      <div className="donation-container">
        <div className="donation-header">
          <div className="section-tag">
            <span className="tag-icon">💝</span>
            <span>Faça sua Doação</span>
          </div>

          <h2 className="section-title">
            Sua <span className="highlight">Doação</span> Faz a Diferença
          </h2>

          <p className="section-description">
            Seja +1 conosco! Preencha o formulário abaixo e registre sua contribuição. 
            Juntos, levamos o amor de Cristo e criamos pontes de solidariedade!
          </p>
        </div>

        <div className="donation-content">
          <form onSubmit={handleSubmit} className="donation-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">
                  <span className="label-icon">👤</span>
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <span className="label-icon">📧</span>
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seuemail@exemplo.com"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">
                  <span className="label-icon">📱</span>
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <span className="label-icon">🎁</span>
                Tipo de Doação
              </label>
              <div className="tipo-doacao-grid">
                {tiposDoacao.map((tipo) => (
                  <label
                    key={tipo.value}
                    className={`tipo-card ${formData.tipoDoacao === tipo.value ? 'selected' : ''}`}
                    style={formData.tipoDoacao === tipo.value ? { borderColor: tipo.color } : {}}
                  >
                    <input
                      type="radio"
                      name="tipoDoacao"
                      value={tipo.value}
                      checked={formData.tipoDoacao === tipo.value}
                      onChange={handleChange}
                      required
                    />
                    <span className="tipo-icon">{tipo.icon}</span>
                    <span className="tipo-label">{tipo.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.tipoDoacao === 'dinheiro' && (
              <div className="form-group valor-group">
                <label htmlFor="valor">
                  <span className="label-icon">💵</span>
                  Valor da Doação (opcional)
                </label>
                <div className="valor-input-wrapper">
                  <span className="currency-symbol">R$</span>
                  <input
                    type="number"
                    id="valor"
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                    placeholder="0,00"
                    min="0"
                    step="0.01"
                    className="form-input valor-input"
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="descricao">
                <span className="label-icon">📝</span>
                Descrição da Doação
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Conte-nos mais sobre sua doação..."
                rows="4"
                className="form-textarea"
              />
            </div>

            <button 
              type="submit" 
              className={`submit-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Registrando...
                </>
              ) : (
                <>
                  <span>❤️</span>
                  Registrar Doação
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          <div className="donation-info">
            <div className="info-card">
              <div className="info-icon">✝️</div>
              <h3>Por que doar?</h3>
              <p>
                Sua doação leva Cristo e amor para as famílias através das crianças. 
                Seja +1 neste projeto cooperativista de fé e solidariedade.
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">🔒</div>
              <h3>Segurança</h3>
              <p>
                Seus dados são protegidos e utilizados apenas para registro 
                e acompanhamento das doações.
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">📊</div>
              <h3>Transparência</h3>
              <p>
                Todas as doações são registradas e você pode acompanhar 
                o impacto da sua contribuição.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DonationForm
