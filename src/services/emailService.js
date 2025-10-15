import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/emailConfig';

// Configuração do EmailJS (gratuito - 200 emails/mês)
const EMAILJS_SERVICE_ID = EMAIL_CONFIG.SERVICE_ID;
const EMAILJS_PUBLIC_KEY = EMAIL_CONFIG.PUBLIC_KEY;

// Função para simular envio de email em modo demo
const simulateEmail = (type, data) => {
  console.log(`📧 [MODO DEMO] Email ${type} seria enviado:`, data);
  return Promise.resolve({ 
    success: true, 
    demo: true,
    message: 'Email simulado (modo demo ativo)' 
  });
};

// Função para enviar email de teste usando API pública
const sendTestEmail = async (type, data) => {
  try {
    // Usando uma API pública gratuita para teste
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_maisdenos_test',
        template_id: 'template_test',
        user_id: 'test_key',
        template_params: {
          to_name: 'Equipe Mais de Nós',
          to_email: 'Maisdenoss@gmail.com',
          from_name: data.nome || 'Teste',
          from_email: data.email || 'teste@exemplo.com',
          message: `Teste de ${type}: ${JSON.stringify(data)}`,
          subject: `Teste - ${type}`
        }
      })
    });

    if (response.ok) {
      console.log(`📧 [TESTE] Email ${type} enviado com sucesso!`);
      return { success: true, test: true, message: 'Email de teste enviado!' };
    } else {
      throw new Error('Falha ao enviar email de teste');
    }
  } catch (error) {
    console.log(`📧 [TESTE] Email ${type} não enviado (normal em modo teste):`, error.message);
    return { success: false, test: true, message: 'Email de teste não enviado (normal)' };
  }
};

// Função para enviar email de confirmação de doação
export const sendDonationConfirmation = async (donationData) => {
  // Se estiver em modo demo, simula o envio
  if (EMAIL_CONFIG.DEMO_MODE) {
    return simulateEmail('Confirmação de Doação', {
      para: donationData.nome,
      email: donationData.email,
      tipo: donationData.tipoDoacao
    });
  }

  // Se estiver em modo de teste, tenta enviar email real
  if (EMAIL_CONFIG.TEST_MODE) {
    return sendTestEmail('Confirmação de Doação', donationData);
  }

  try {
    const templateParams = {
      to_name: donationData.nome,
      to_email: donationData.email,
      donation_type: donationData.tipoDoacao,
      donation_description: donationData.descricao,
      organization_email: 'Maisdenoss@gmail.com'
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAIL_CONFIG.TEMPLATES.DONATION_CONFIRMATION,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email de confirmação enviado:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Erro ao enviar email de confirmação:', error);
    return { success: false, error };
  }
};

// Função para enviar email de confirmação de voluntário
export const sendVolunteerConfirmation = async (volunteerData) => {
  // Se estiver em modo demo, simula o envio
  if (EMAIL_CONFIG.DEMO_MODE) {
    return simulateEmail('Confirmação de Voluntário', {
      para: volunteerData.nome,
      email: volunteerData.email,
      area: volunteerData.areaInteresse
    });
  }

  try {
    const templateParams = {
      to_name: volunteerData.nome,
      to_email: volunteerData.email,
      volunteer_area: volunteerData.areaInteresse,
      organization_email: 'Maisdenoss@gmail.com'
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAIL_CONFIG.TEMPLATES.VOLUNTEER_CONFIRMATION,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email de confirmação enviado:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Erro ao enviar email de confirmação:', error);
    return { success: false, error };
  }
};

// Função para notificar a organização sobre nova doação
export const notifyOrganizationDonation = async (donationData) => {
  // Se estiver em modo demo, simula o envio
  if (EMAIL_CONFIG.DEMO_MODE) {
    return simulateEmail('Notificação de Doação para Organização', {
      doador: donationData.nome,
      email: donationData.email,
      tipo: donationData.tipoDoacao
    });
  }

  // Se estiver em modo de teste, tenta enviar email real
  if (EMAIL_CONFIG.TEST_MODE) {
    return sendTestEmail('Notificação de Doação para Organização', donationData);
  }

  try {
    const templateParams = {
      donor_name: donationData.nome,
      donor_email: donationData.email,
      donor_phone: donationData.telefone,
      donation_type: donationData.tipoDoacao,
      donation_description: donationData.descricao,
      donation_value: donationData.valor || 'N/A',
      organization_email: 'Maisdenoss@gmail.com'
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAIL_CONFIG.TEMPLATES.ORGANIZATION_DONATION,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Notificação para organização enviada:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Erro ao enviar notificação para organização:', error);
    return { success: false, error };
  }
};

// Função para notificar a organização sobre novo voluntário
export const notifyOrganizationVolunteer = async (volunteerData) => {
  // Se estiver em modo demo, simula o envio
  if (EMAIL_CONFIG.DEMO_MODE) {
    return simulateEmail('Notificação de Voluntário para Organização', {
      voluntario: volunteerData.nome,
      email: volunteerData.email,
      area: volunteerData.areaInteresse
    });
  }

  try {
    const templateParams = {
      volunteer_name: volunteerData.nome,
      volunteer_email: volunteerData.email,
      volunteer_phone: volunteerData.telefone,
      volunteer_age: volunteerData.idade,
      volunteer_area: volunteerData.areaInteresse,
      volunteer_availability: volunteerData.disponibilidade,
      volunteer_experience: volunteerData.experiencia || 'Não informado',
      volunteer_motivation: volunteerData.motivacao,
      organization_email: 'Maisdenoss@gmail.com'
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAIL_CONFIG.TEMPLATES.ORGANIZATION_VOLUNTEER,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Notificação para organização enviada:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Erro ao enviar notificação para organização:', error);
    return { success: false, error };
  }
};
