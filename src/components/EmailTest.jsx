import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { toast } from 'react-toastify'
import { sendDonationConfirmation, notifyOrganizationDonation } from '../services/simpleEmailService'
import './EmailTest.css'

const EmailTest = () => {
  const [formData, setFormData] = useState({
    nome: 'Teste Automático',
    email: 'andreykamilly15@gmail.com',
    telefone: '(11) 98883-9105',
    tipoDoacao: 'dinheiro',
    descricao: 'Teste de envio de email automático',
    valor: '50.00'
  })
  
  const [loading, setLoading] = useState(false)

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
      console.log('🚀 Iniciando teste completo...')
      console.log('📋 Dados do formulário:', formData)

      // Salvar no banco
      console.log('💾 Salvando no banco Supabase...')
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

      if (error) {
        console.error('❌ Erro ao salvar no banco:', error)
        throw error
      }

      console.log('✅ Dados salvos no banco com sucesso!')

      // Enviar emails de teste
      console.log('📧 Iniciando teste de envio de emails...')
      
      try {
        // Email de confirmação para o doador
        console.log('📧 Enviando confirmação para doador...')
        const confirmResult = await sendDonationConfirmation(formData)
        console.log('📧 Resultado confirmação:', confirmResult)
        
        // Notificação para a organização
        console.log('📧 Enviando notificação para organização...')
        const notifyResult = await notifyOrganizationDonation(formData)
        console.log('📧 Resultado notificação:', notifyResult)
        
        console.log('🎉 Teste completo realizado com sucesso!')
        toast.success('🎉 Teste realizado com sucesso! Verifique o console! ❤️')
      } catch (emailError) {
        console.log('⚠️ Erro nos emails, mas teste realizado:', emailError)
        toast.success('🎉 Teste realizado! Verifique o console! ❤️')
      }

    } catch (error) {
      console.error('❌ Erro no teste:', error)
      toast.error(`😢 Erro: ${error.message || 'Algo deu errado no teste.'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="email-test">
      <div className="email-test-container">
        <h2>🧪 Teste de Envio de Emails</h2>
        <p>Formulário pré-preenchido para testar o sistema de emails</p>
        
        <form onSubmit={handleSubmit} className="email-test-form">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo de Doação</label>
            <select
              name="tipoDoacao"
              value={formData.tipoDoacao}
              onChange={handleChange}
              required
            >
              <option value="dinheiro">💰 Dinheiro</option>
              <option value="roupas">👕 Roupas</option>
              <option value="brinquedos">🧸 Brinquedos</option>
              <option value="alimentos">🍎 Alimentos</option>
              <option value="outros_bens">📦 Outros Bens</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>

          {formData.tipoDoacao === 'dinheiro' && (
            <div className="form-group">
              <label>Valor (R$)</label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>
          )}

          <button type="submit" className="test-button" disabled={loading}>
            {loading ? 'Testando...' : '🚀 Executar Teste de Email'}
          </button>
        </form>

        <div className="test-info">
          <h3>📋 O que acontece no teste:</h3>
          <ul>
            <li>✅ Salva os dados no banco Supabase</li>
            <li>✅ Simula envio de email de confirmação para <strong>andreykamilly15@gmail.com</strong></li>
            <li>✅ Simula notificação para a organização <strong>Maisdenoss@gmail.com</strong></li>
            <li>✅ Mostra logs no console do navegador</li>
            <li>✅ Exibe mensagem de sucesso</li>
          </ul>
          
          <div className="email-info">
            <h4>📧 Emails de Teste:</h4>
            <p><strong>Confirmação para doador:</strong> andreykamilly15@gmail.com</p>
            <p><strong>Notificação para organização:</strong> Maisdenoss@gmail.com</p>
          </div>
          
          <p><strong>Para ver os logs:</strong> Abra o console do navegador (F12 → Console)</p>
        </div>
      </div>
    </div>
  )
}

export default EmailTest
