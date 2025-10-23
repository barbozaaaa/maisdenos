import { useState } from 'react'
import { toast } from 'react-toastify'
import { sendRealDonationConfirmation, sendRealOrganizationDonation } from '../services/realEmailService'
import './EmailTest.css'

const RealEmailTest = () => {
  const [loading, setLoading] = useState(false)
  const [accessKey, setAccessKey] = useState('')

  const handleTest = async () => {
    if (!accessKey.trim()) {
      toast.error('Por favor, insira a chave de acesso do Web3Forms!')
      return
    }

    setLoading(true)

    try {
      console.log('🚀 Iniciando teste de emails REAIS...')

      const testData = {
        nome: 'Teste Automático',
        email: 'andreykamilly15@gmail.com',
        telefone: '(11) 98883-9105',
        tipoDoacao: 'dinheiro',
        descricao: 'Teste de envio de email REAL automático',
        valor: '50.00'
      }

      console.log('📋 Dados de teste:', testData)

      // Teste 1: Email de confirmação REAL
      console.log('📧 Teste 1: Enviando confirmação REAL para doador...')
      const confirmResult = await sendRealDonationConfirmation(testData)
      console.log('📧 Resultado confirmação REAL:', confirmResult)

      // Teste 2: Notificação para organização REAL
      console.log('📧 Teste 2: Enviando notificação REAL para organização...')
      const notifyResult = await sendRealOrganizationDonation(testData)
      console.log('📧 Resultado notificação REAL:', notifyResult)

      if (confirmResult.success || notifyResult.success) {
        console.log('🎉 Teste REAL realizado com sucesso!')
        toast.success('🎉 Emails REAIS enviados! Verifique sua caixa de entrada! ❤️')
      } else {
        toast.warning('⚠️ Teste realizado, mas emails podem não ter sido enviados. Verifique o console.')
      }

    } catch (error) {
      console.error('❌ Erro no teste real:', error)
      toast.error(`😢 Erro: ${error.message || 'Algo deu errado no teste.'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="email-test">
      <div className="email-test-container">
        <h2>📧 Teste de Emails REAIS</h2>
        <p>Este teste envia emails reais para sua caixa de entrada!</p>
        
        <div className="test-info">
          <h3>🔑 Configuração Necessária:</h3>
          <p>Para enviar emails reais, você precisa de uma chave gratuita do Web3Forms:</p>
          
          <div className="email-info">
            <h4>📋 Passos para obter a chave:</h4>
            <ol>
              <li>Acesse: <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer">https://web3forms.com</a></li>
              <li>Clique em "Get Started" (gratuito)</li>
              <li>Insira seu email: <strong>andreykamilly15@gmail.com</strong></li>
              <li>Copie a chave de acesso gerada</li>
              <li>Cole a chave no campo abaixo</li>
            </ol>
          </div>

          <div className="form-group">
            <label>Chave de Acesso Web3Forms:</label>
            <input
              type="text"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="Cole sua chave aqui..."
              style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            />
          </div>
        </div>

        <div className="test-info">
          <h3>📋 O que acontece no teste REAL:</h3>
          <ul>
            <li>✅ Envia email REAL de confirmação para <strong>andreykamilly15@gmail.com</strong></li>
            <li>✅ Envia email REAL de notificação para <strong>Maisdenoss@gmail.com</strong></li>
            <li>✅ Mostra logs detalhados no console do navegador</li>
            <li>✅ Exibe mensagem de sucesso</li>
          </ul>
          
          <p><strong>Para ver os logs:</strong> Abra o console do navegador (F12 → Console)</p>
        </div>

        <button onClick={handleTest} className="test-button" disabled={loading || !accessKey.trim()}>
          {loading ? 'Enviando emails reais...' : '📧 Enviar Emails REAIS'}
        </button>
      </div>
    </div>
  )
}

export default RealEmailTest


