// Serviço de email simples para teste
// Usa uma API pública gratuita para enviar emails de teste

export const sendTestEmail = async (type, data) => {
  try {
    // Garantir que os dados existem
    const safeData = data || {};
    
    // Dados do email para teste
    const emailData = {
      to: type.includes('Confirmação') ? 'andreykamilly15@gmail.com' : 'Maisdenoss@gmail.com',
      subject: `Teste - ${type} - Mais de Nós`,
      message: `
Nova ${type} recebida! 🎉

DADOS:
${JSON.stringify(safeData, null, 2)}

---
Enviado automaticamente pelo site Mais de Nós
      `.trim()
    };

    // Simular envio de email (em produção, usaria uma API real)
    console.log('📧 [TESTE] Email seria enviado para:', emailData.to);
    console.log('📧 [TESTE] Assunto:', emailData.subject);
    console.log('📧 [TESTE] Dados:', safeData);

    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 500));

    // Retornar sucesso
    return {
      success: true,
      test: true,
      message: `Email de teste ${type} processado com sucesso!`,
      emailData: emailData
    };

  } catch (error) {
    console.error('Erro no envio de email de teste:', error);
    // Mesmo com erro, retornar sucesso para não quebrar o fluxo
    return {
      success: true,
      test: true,
      message: `Email de teste ${type} processado (com aviso)`,
      error: error.message
    };
  }
};

// Função para enviar confirmação de doação
export const sendDonationConfirmation = async (donationData) => {
  return sendTestEmail('Confirmação de Doação', {
    tipo: 'Confirmação para o doador',
    doador: donationData.nome,
    email: donationData.email,
    telefone: donationData.telefone,
    tipoDoacao: donationData.tipoDoacao,
    descricao: donationData.descricao,
    valor: donationData.valor
  });
};

// Função para notificar organização sobre doação
export const notifyOrganizationDonation = async (donationData) => {
  return sendTestEmail('Notificação de Doação para Organização', {
    tipo: 'Notificação para a organização',
    doador: donationData.nome,
    email: donationData.email,
    telefone: donationData.telefone,
    tipoDoacao: donationData.tipoDoacao,
    descricao: donationData.descricao,
    valor: donationData.valor
  });
};

// Função para enviar confirmação de voluntário
export const sendVolunteerConfirmation = async (volunteerData) => {
  return sendTestEmail('Confirmação de Voluntário', {
    tipo: 'Confirmação para o voluntário',
    voluntario: volunteerData.nome,
    email: volunteerData.email,
    telefone: volunteerData.telefone,
    idade: volunteerData.idade,
    areaInteresse: volunteerData.areaInteresse,
    disponibilidade: volunteerData.disponibilidade,
    experiencia: volunteerData.experiencia,
    motivacao: volunteerData.motivacao
  });
};

// Função para notificar organização sobre voluntário
export const notifyOrganizationVolunteer = async (volunteerData) => {
  return sendTestEmail('Notificação de Voluntário para Organização', {
    tipo: 'Notificação para a organização',
    voluntario: volunteerData.nome,
    email: volunteerData.email,
    telefone: volunteerData.telefone,
    idade: volunteerData.idade,
    areaInteresse: volunteerData.areaInteresse,
    disponibilidade: volunteerData.disponibilidade,
    experiencia: volunteerData.experiencia,
    motivacao: volunteerData.motivacao
  });
};
