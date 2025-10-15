// Configuração do Web3Forms para envio de emails reais
// Web3Forms é gratuito e permite 250 emails por mês

export const WEB3FORMS_CONFIG = {
  // INSTRUÇÕES PARA CONFIGURAR:
  // 1. Acesse: https://web3forms.com/
  // 2. Crie uma conta gratuita
  // 3. Gere uma chave de acesso
  // 4. Substitua 'YOUR_ACCESS_KEY_HERE' pela sua chave real
  
  ACCESS_KEY: '122de28b-410e-472e-b063-42e45c2b65b8', // Chave real do Web3Forms
  
  // URLs da API
  API_URL: 'https://api.web3forms.com/submit',
  
  // Configurações padrão
  DEFAULT_FROM_NAME: 'Mais de Nós',
  DEFAULT_FROM_EMAIL: 'Maisdenoss@gmail.com',
  ORGANIZATION_EMAIL: 'Maisdenoss@gmail.com',
  
  // Modo de teste (quando não há chave configurada)
  TEST_MODE: false // Chave real configurada - emails reais ativados!
};

// Instruções detalhadas:
/*
PASSO A PASSO PARA CONFIGURAR WEB3FORMS:

1. ACESSE: https://web3forms.com/
2. CLIQUE EM "Get Started" e crie uma conta gratuita
3. NO DASHBOARD:
   - Clique em "Access Keys"
   - Clique em "Create New Key"
   - Dê um nome (ex: "Mais de Nós - Site")
   - Copie a chave gerada

4. SUBSTITUA 'YOUR_ACCESS_KEY_HERE' pela sua chave real

5. TESTE: Faça uma doação para testar o envio

VANTAGENS DO WEB3FORMS:
- 100% gratuito (250 emails/mês)
- Não precisa de servidor
- Funciona direto do navegador
- Super simples de configurar
- Emails chegam na caixa de entrada
- Suporte a HTML nos emails
- Sem spam (emails vão direto para a caixa principal)

IMPORTANTE:
- Mantenha sua chave segura
- Não compartilhe a chave publicamente
- A chave é única para seu domínio
*/
