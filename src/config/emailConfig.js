// Configuração do EmailJS
// Para configurar, siga estes passos simples:

// 1. Acesse: https://www.emailjs.com/
// 2. Crie uma conta gratuita (200 emails/mês)
// 3. Crie um serviço de email (Gmail, Outlook, etc.)
// 4. Crie os templates de email
// 5. Substitua os valores abaixo com suas credenciais

export const EMAIL_CONFIG = {
  // CONFIGURAÇÃO PARA TESTE - EMAILS REAIS
  SERVICE_ID: 'service_maisdenos_test', 
  PUBLIC_KEY: 'test_key',     
  
  // IDs dos templates
  TEMPLATES: {
    DONATION_CONFIRMATION: 'template_donation_confirmation',
    VOLUNTEER_CONFIRMATION: 'template_volunteer_confirmation',
    ORGANIZATION_DONATION: 'template_organization_notification',
    ORGANIZATION_VOLUNTEER: 'template_organization_volunteer'
  },
  
  // Modo de teste ativo - vai tentar enviar emails reais
  DEMO_MODE: false,
  TEST_MODE: true // Modo de teste especial
};

// Instruções detalhadas:
/*
PASSO A PASSO PARA CONFIGURAR:

1. ACESSE: https://www.emailjs.com/
2. CLIQUE EM "Sign Up" e crie uma conta gratuita
3. NO DASHBOARD:
   - Clique em "Email Services" → "Add New Service"
   - Escolha Gmail (mais fácil)
   - Conecte sua conta Gmail (Maisdenoss@gmail.com)
   - Copie o SERVICE_ID

4. CRIE OS TEMPLATES:
   - Clique em "Email Templates" → "Create New Template"
   - Crie 4 templates com estes nomes:
     * template_donation_confirmation
     * template_volunteer_confirmation  
     * template_organization_notification
     * template_organization_volunteer

5. CONFIGURAÇÕES:
   - Clique em "Account" → "General"
   - Copie o PUBLIC_KEY

6. SUBSTITUA OS VALORES ACIMA com suas credenciais reais

7. TESTE: Faça uma doação ou cadastro de voluntário para testar

IMPORTANTE: 
- É 100% gratuito (200 emails/mês)
- Não precisa de servidor
- Funciona direto do navegador
- Super seguro e confiável
*/
