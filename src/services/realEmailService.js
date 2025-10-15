// Serviço de email real usando Web3Forms (gratuito e simples)
// Este serviço realmente envia emails!

const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE'; // Substitua pela sua chave real

export const sendRealEmail = async (type, data) => {
  try {
    // Dados do email
    const emailData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `${type} - Mais de Nós`,
      from_name: data.nome || 'Site Mais de Nós',
      from_email: data.email || 'noreply@maisdenos.com',
      to_email: type.includes('Confirmação') ? 'andreykamilly15@gmail.com' : 'Maisdenoss@gmail.com',
      message: `
Nova ${type} recebida! 🎉

DADOS:
${JSON.stringify(data, null, 2)}

---
Enviado automaticamente pelo site Mais de Nós
      `.trim()
    };

    console.log('📧 [REAL] Enviando email real para:', emailData.to_email);
    console.log('📧 [REAL] Assunto:', emailData.subject);

    // Enviar email real usando Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ [REAL] Email enviado com sucesso!', result);
      return {
        success: true,
        real: true,
        message: 'Email real enviado com sucesso!',
        result: result
      };
    } else {
      throw new Error(result.message || 'Falha ao enviar email');
    }

  } catch (error) {
    console.error('❌ [REAL] Erro ao enviar email real:', error);
    return {
      success: false,
      real: true,
      message: 'Erro ao enviar email real',
      error: error.message
    };
  }
};

// Função para enviar confirmação de doação REAL
export const sendRealDonationConfirmation = async (donationData) => {
  return sendRealEmail('Confirmação de Doação', {
    tipo: 'Confirmação para o doador',
    doador: donationData.nome,
    email: donationData.email,
    telefone: donationData.telefone,
    tipoDoacao: donationData.tipoDoacao,
    descricao: donationData.descricao,
    valor: donationData.valor
  });
};

// Função para notificar organização sobre doação REAL
export const sendRealOrganizationDonation = async (donationData) => {
  return sendRealEmail('Notificação de Doação para Organização', {
    tipo: 'Notificação para a organização',
    doador: donationData.nome,
    email: donationData.email,
    telefone: donationData.telefone,
    tipoDoacao: donationData.tipoDoacao,
    descricao: donationData.descricao,
    valor: donationData.valor
  });
};
