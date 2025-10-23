import { useState } from 'react'
import { toast } from 'react-toastify'
import './EmailTest.css'

const Web3FormsTest = () => {
  const [loading, setLoading] = useState(false)
  const [accessKey, setAccessKey] = useState('YOUR_ACCESS_KEY_HERE')

  const handleTest = async () => {
    if (!accessKey.trim() || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      toast.error('Por favor, insira sua chave de acesso real do Web3Forms!')
      return
    }

    setLoading(true)

    try {
      console.log('🚀 Enviando email REAL via Web3Forms...')

      // Dados do formulário (exatamente como o exemplo)
      const formData = new FormData()
      formData.append('access_key', accessKey)
      formData.append('subject', 'Teste de Doação - Mais de Nós')
      formData.append('from_name', 'Site Mais de Nós')
      formData.append('name', 'Teste Automático')
      formData.append('email', 'andreykamilly15@gmail.com')
      formData.append('message', `
Nova doação recebida! 🎉

DADOS DA DOAÇÃO:
- Nome: Teste Automático
- Email: andreykamilly15@gmail.com
- Telefone: (11) 98883-9105
- Tipo: Dinheiro
- Valor: R$ 50,00
- Descrição: Teste de envio de email REAL automático

---
Enviado automaticamente pelo site Mais de Nós
      `.trim())

      console.log('📧 Enviando para Web3Forms...')

      // Enviar usando fetch (como no exemplo)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        console.log('✅ Email REAL enviado com sucesso!', result)
        toast.success('🎉 Email REAL enviado! Verifique sua caixa de entrada! ❤️')
      } else {
        console.error('❌ Erro ao enviar email:', result)
        toast.error(`Erro: ${result.message || 'Falha ao enviar email'}`)
      }

    } catch (error) {
      console.error('❌ Erro no envio:', error)
      toast.error(`Erro: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="email-test">
      <div className="email-test-container">
        <h2>📧 Teste Web3Forms - Email REAL</h2>
        <p>Este teste envia um email REAL para sua caixa de entrada!</p>
        
        <div className="test-info">
          <h3>🔑 Sua Chave de Acesso:</h3>
          <p>Cole sua chave real do Web3Forms abaixo:</p>
          
          <div className="form-group">
            <label>Chave de Acesso Web3Forms:</label>
            <input
              type="text"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="Cole sua chave aqui..."
              style={{ 
                width: '100%', 
                padding: '15px', 
                marginTop: '5px',
                border: '2px solid #e1e5e9',
                borderRadius: '10px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div className="email-info">
            <h4>📋 O que vai acontecer:</h4>
            <ul>
              <li>✅ Envia email REAL para <strong>andreykamilly15@gmail.com</strong></li>
              <li>✅ Assunto: "Teste de Doação - Mais de Nós"</li>
              <li>✅ Conteúdo: Dados da doação de teste</li>
              <li>✅ Mostra logs no console</li>
            </ul>
          </div>
        </div>

        <button 
          onClick={handleTest} 
          className="test-button" 
          disabled={loading || !accessKey.trim() || accessKey === 'YOUR_ACCESS_KEY_HERE'}
        >
          {loading ? 'Enviando email real...' : '📧 Enviar Email REAL'}
        </button>

        <div className="test-info">
          <h3>📝 Instruções:</h3>
          <ol>
            <li>Substitua "YOUR_ACCESS_KEY_HERE" pela sua chave real</li>
            <li>Clique em "Enviar Email REAL"</li>
            <li>Verifique sua caixa de entrada em <strong>andreykamilly15@gmail.com</strong></li>
            <li>Abra o console (F12) para ver os logs</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Web3FormsTest


