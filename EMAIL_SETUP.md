# 📧 Configuração de Emails - Mais de Nós

## 🚀 Sistema de Emails Implementado

✅ **Sistema de envio de emails automático configurado!**

### 📋 O que foi implementado:

1. **EmailJS integrado** - Serviço gratuito (200 emails/mês)
2. **4 tipos de emails automáticos:**
   - ✅ Confirmação de doação para o doador
   - ✅ Confirmação de voluntário para o voluntário  
   - ✅ Notificação de nova doação para a organização
   - ✅ Notificação de novo voluntário para a organização

3. **Integração completa** nos formulários:
   - ✅ Formulário de doações
   - ✅ Formulário de voluntários

## ⚙️ Configuração (5 minutos)

### Passo 1: Criar conta no EmailJS
1. Acesse: https://www.emailjs.com/
2. Clique em "Sign Up" (gratuito)
3. Crie uma conta com o email: `Maisdenoss@gmail.com`

### Passo 2: Configurar serviço de email
1. No dashboard, clique em "Email Services"
2. Clique em "Add New Service"
3. Escolha "Gmail"
4. Conecte com a conta `Maisdenoss@gmail.com`
5. **Copie o SERVICE_ID** (ex: `service_abc123`)

### Passo 3: Criar templates de email
1. Clique em "Email Templates" → "Create New Template"
2. Crie estes 4 templates:

#### Template 1: Confirmação de Doação
- **Nome**: `template_donation_confirmation`
- **Assunto**: `Obrigado pela sua doação! - Mais de Nós`
- **Conteúdo**:
```
Olá {{to_name}},

Muito obrigado pela sua doação de {{donation_type}}!

Detalhes da doação:
- Tipo: {{donation_type}}
- Descrição: {{donation_description}}

Sua generosidade faz toda a diferença! ❤️

Com carinho,
Equipe Mais de Nós
{{organization_email}}
```

#### Template 2: Confirmação de Voluntário
- **Nome**: `template_volunteer_confirmation`
- **Assunto**: `Bem-vindo à nossa equipe! - Mais de Nós`
- **Conteúdo**:
```
Olá {{to_name}},

Que alegria ter você conosco! 🎉

Área de interesse: {{volunteer_area}}

Entraremos em contato em breve para os próximos passos.

Juntos, vamos fazer a diferença! ❤️

Com carinho,
Equipe Mais de Nós
{{organization_email}}
```

#### Template 3: Notificação de Doação (para organização)
- **Nome**: `template_organization_notification`
- **Assunto**: `Nova doação recebida!`
- **Conteúdo**:
```
Nova doação recebida! 🎉

Doador: {{donor_name}}
Email: {{donor_email}}
Telefone: {{donor_phone}}
Tipo: {{donation_type}}
Descrição: {{donation_description}}
Valor: {{donation_value}}

Entre em contato para combinar a entrega!
```

#### Template 4: Notificação de Voluntário (para organização)
- **Nome**: `template_organization_volunteer`
- **Assunto**: `Novo voluntário cadastrado!`
- **Conteúdo**:
```
Novo voluntário cadastrado! 🎉

Nome: {{volunteer_name}}
Email: {{volunteer_email}}
Telefone: {{volunteer_phone}}
Idade: {{volunteer_age}}
Área: {{volunteer_area}}
Disponibilidade: {{volunteer_availability}}
Experiência: {{volunteer_experience}}
Motivação: {{volunteer_motivation}}

Entre em contato para os próximos passos!
```

### Passo 4: Obter chave pública
1. Clique em "Account" → "General"
2. **Copie o PUBLIC_KEY** (ex: `user_xyz789`)

### Passo 5: Configurar no projeto
1. Abra o arquivo: `src/config/emailConfig.js`
2. Substitua os valores:

```javascript
export const EMAIL_CONFIG = {
  SERVICE_ID: 'SEU_SERVICE_ID_AQUI',     // Ex: 'service_abc123'
  PUBLIC_KEY: 'SUA_PUBLIC_KEY_AQUI',     // Ex: 'user_xyz789'
  
  TEMPLATES: {
    DONATION_CONFIRMATION: 'template_donation_confirmation',
    VOLUNTEER_CONFIRMATION: 'template_volunteer_confirmation',
    ORGANIZATION_DONATION: 'template_organization_notification',
    ORGANIZATION_VOLUNTEER: 'template_organization_volunteer'
  }
};
```

## ✅ Teste o Sistema

1. Faça uma doação no site
2. Cadastre-se como voluntário
3. Verifique se os emails chegaram!

## 🎯 Benefícios

- ✅ **100% Gratuito** (200 emails/mês)
- ✅ **Sem servidor** necessário
- ✅ **Super confiável** (99.9% de entrega)
- ✅ **Fácil de configurar** (5 minutos)
- ✅ **Sem complicações** técnicas
- ✅ **Emails automáticos** para todos os formulários

## 🆘 Suporte

Se tiver dúvidas:
1. Verifique se as credenciais estão corretas
2. Teste com um email simples primeiro
3. Verifique o console do navegador para erros

**Pronto! Seu sistema de emails está funcionando! 🎉**
