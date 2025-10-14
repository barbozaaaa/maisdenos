import { useState } from 'react'
import './FAQ.css'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Como funciona o processo de doação?',
      answer: 'É muito simples! Basta preencher o formulário acima com seus dados e informações sobre a doação. Após o registro, nossa equipe entrará em contato para combinar os detalhes da entrega ou retirada.'
    },
    {
      question: 'Quais tipos de doação vocês aceitam?',
      answer: 'Aceitamos doações em dinheiro, roupas, brinquedos, alimentos não perecíveis e outros bens que possam beneficiar as crianças e suas famílias. Todas as doações são bem-vindas!'
    },
    {
      question: 'As doações têm algum valor mínimo?',
      answer: 'Não! Toda doação, independente do valor ou quantidade, é muito importante para nós. Cada contribuição faz a diferença na vida das crianças atendidas.'
    },
    {
      question: 'Como posso ter certeza que minha doação chegará às crianças?',
      answer: 'Trabalhamos com total transparência. Todas as doações são registradas e você pode acompanhar nosso trabalho através das redes sociais e relatórios periódicos que divulgamos.'
    },
    {
      question: 'Posso visitar a ONG e conhecer o trabalho de perto?',
      answer: 'Sim! Adoramos receber visitas. Entre em contato conosco através do e-mail ou telefone para agendar uma visita e conhecer nossos projetos e as crianças atendidas.'
    },
    {
      question: 'Como faço para me tornar um voluntário?',
      answer: 'Que maravilha que você quer ser voluntário! Entre em contato conosco através do formulário ou pelos nossos canais de comunicação. Teremos o prazer de recebê-lo em nossa equipe.'
    },
    {
      question: 'A ONG emite recibo de doação?',
      answer: 'Sim, emitimos comprovante para todas as doações registradas. Este documento pode ser utilizado para declaração de Imposto de Renda, conforme legislação vigente.'
    },
    {
      question: 'Posso fazer doações recorrentes mensalmente?',
      answer: 'Com certeza! Doações recorrentes nos ajudam muito no planejamento. Entre em contato conosco para estabelecermos um plano de doação mensal adequado às suas possibilidades.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="faq">
      <div className="faq-container">
        <div className="faq-header">
          <div className="section-tag">
            <span className="tag-icon">❓</span>
            <span>Dúvidas Frequentes</span>
          </div>

          <h2 className="section-title">
            Perguntas <span className="highlight">Frequentes</span>
          </h2>

          <p className="section-description">
            Aqui você encontra respostas para as principais dúvidas sobre doações 
            e nosso trabalho. Não encontrou o que procura? Entre em contato!
          </p>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`faq-item ${openIndex === index ? 'active' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="question-icon">
                    {openIndex === index ? '−' : '+'}
                  </span>
                  <span className="question-text">{faq.question}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-cta">
            <div className="cta-card">
              <div className="cta-icon">💬</div>
              <h3>Ainda tem dúvidas?</h3>
              <p>
                Nossa equipe está pronta para ajudar! Entre em contato através 
                dos nossos canais de comunicação.
              </p>
              <div className="contact-methods">
                <a href="mailto:contato@maisdenós.org.br" className="contact-btn">
                  <span>📧</span>
                  E-mail
                </a>
                <a href="https://wa.me/5511999999999" className="contact-btn" target="_blank" rel="noopener noreferrer">
                  <span>📱</span>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ

