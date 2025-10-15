import { useState } from 'react'
import { toast } from 'react-toastify'
import { sendDonationConfirmation, notifyOrganizationDonation } from '../services/simpleEmailService'
import './EmailTest.css'

const SimpleEmailTest = () => {
  const [loading, setLoading] = useState(false)

  const handleTest = async () => {
    setLoading(true)

    try {
      console.log('🚀 Iniciando teste SIMPLES de emails...')

      const testData = {
        nome: 'Teste Automático',
        email: 'andreykamilly15@gmail.com',
        telefone: '(11) 98883-9105',
        tipoDoacao: 'dinheiro',
        descricao: 'Teste de envio de email automático',
        valor: '50.00'
      }

      console.log('📋 Dados de teste:', testData)

      // Teste 1: Email de confirmação
      console.log('📧 Teste 1: Enviando confirmação para doador...')
      const confirmResult = await sendDonationConfirmation(testData)
      console.log('📧 Resultado confirmação:', confirmResult)

      // Teste 2: Notificação para organização
      console.log('📧 Teste 2: Enviando notificação para organização...')
      const notifyResult = await notifyOrganizationDonation(testData)
      console.log('📧 Resultado notificação:', notifyResult)

      console.log('🎉 Teste SIMPLES realizado com sucesso!')
      toast.success('🎉 Teste SIMPLES realizado! Verifique o console! ❤️')

    } catch (error) {
      console.error('❌ Erro no teste simples:', error)
      toast.error(`😢 Erro: ${error.message || 'Algo deu errado no teste.'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="email-test">
      <div className="email-test-container">
        <h2>🧪 Teste SIMPLES de Emails</h2>
        <p>Teste apenas o sistema de emails (sem banco de dados)</p>
        
        <div className="test-info">
          <h3>📋 O que acontece no teste SIMPLES:</h3>
          <ul>
            <li>✅ Simula envio de email de confirmação para <strong>andreykamilly15@gmail.com</strong></li>
            <li>✅ Simula notificação para a organização <strong>Maisdenoss@gmail.com</strong></li>
            <li>✅ Mostra logs detalhados no console do navegador</li>
            <li>✅ Exibe mensagem de sucesso</li>
          </ul>
          
          <div className="email-info">
            <h4>📧 Emails de Teste:</h4>
            <p><strong>Confirmação para doador:</strong> andreykamilly15@gmail.com</p>
            <p><strong>Notificação para organização:</strong> Maisdenoss@gmail.com</p>
          </div>
          
          <p><strong>Para ver os logs:</strong> Abra o console do navegador (F12 → Console)</p>
        </div>

        <button onClick={handleTest} className="test-button" disabled={loading}>
          {loading ? 'Testando...' : '🚀 Executar Teste SIMPLES'}
        </button>
      </div>
    </div>
  )
}

export default SimpleEmailTest
