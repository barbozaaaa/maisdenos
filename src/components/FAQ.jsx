import { useState } from 'react'
import './FAQ.css'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Como funciona o processo de doação?',
      answer: 'Basta preencher o formulário com seus dados. Nossa equipe entrará em contato para combinar os detalhes da entrega.'
    },
    {
      question: 'Quais tipos de doação vocês aceitam?',
      answer: 'Aceitamos doações em dinheiro, roupas, brinquedos, alimentos e outros bens que beneficiem as crianças e famílias.'
    },
    {
      question: 'As doações têm valor mínimo?',
      answer: 'Não! Toda doação é importante. Cada contribuição faz a diferença na vida das crianças atendidas.'
    },
    {
      question: 'Como ter certeza que minha doação chegará às crianças?',
      answer: 'Trabalhamos com total transparência. Todas as doações são registradas e você pode acompanhar nosso trabalho.'
    },
    {
      question: 'Como me tornar um voluntário?',
      answer: 'Preencha o formulário de voluntário ou entre em contato conosco. Teremos prazer em recebê-lo em nossa equipe!'
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
            Principais dúvidas sobre doações e nosso trabalho. Não encontrou o que procura? Entre em contato!
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
                <a href="mailto:Maisdenoss@gmail.com" className="contact-btn">
                  <span>📧</span>
                  E-mail
                </a>
                <a href="https://wa.me/5511988839105" className="contact-btn" target="_blank" rel="noopener noreferrer">
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

