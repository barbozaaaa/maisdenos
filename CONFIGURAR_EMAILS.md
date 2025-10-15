# 📧 Como Configurar Emails - Guia Super Simples

## ✅ **Sistema Funcionando Agora!**

Seu site já está funcionando perfeitamente! Os formulários salvam os dados no banco e mostram mensagens de sucesso.

## 🚀 **Para Ativar Emails Reais (Opcional)**

Se quiser que os emails sejam enviados de verdade, siga estes passos:

### **Passo 1: Criar Conta (2 minutos)**
1. Acesse: https://www.emailjs.com/
2. Clique em "Sign Up"
3. Use o email: `Maisdenoss@gmail.com`
4. Crie uma senha

### **Passo 2: Conectar Gmail (1 minuto)**
1. No dashboard, clique em "Email Services"
2. Clique em "Add New Service"
3. Escolha "Gmail"
4. Conecte com `Maisdenoss@gmail.com`
5. **Copie o SERVICE_ID** (ex: `service_abc123`)

### **Passo 3: Criar Templates (3 minutos)**
1. Clique em "Email Templates" → "Create New Template"

**Template 1 - Confirmação de Doação:**
- Nome: `template_donation_confirmation`
- Assunto: `Obrigado pela sua doação! - Mais de Nós`
- Conteúdo:
```
Olá {{to_name}},

Muito obrigado pela sua doação de {{donation_type}}! ❤️

Detalhes: {{donation_description}}

Entraremos em contato em breve!

Equipe Mais de Nós
{{organization_email}}
```

**Template 2 - Confirmação de Voluntário:**
- Nome: `template_volunteer_confirmation`
- Assunto: `Bem-vindo à nossa equipe! - Mais de Nós`
- Conteúdo:
```
Olá {{to_name}},

Que alegria ter você conosco! 🎉

Área: {{volunteer_area}}

Entraremos em contato em breve!

Equipe Mais de Nós
{{organization_email}}
```

**Template 3 - Notificação de Doação:**
- Nome: `template_organization_notification`
- Assunto: `Nova doação recebida!`
- Conteúdo:
```
Nova doação! 🎉

Doador: {{donor_name}}
Email: {{donor_email}}
Telefone: {{donor_phone}}
Tipo: {{donation_type}}
Descrição: {{donation_description}}
Valor: {{donation_value}}
```

**Template 4 - Notificação de Voluntário:**
- Nome: `template_organization_volunteer`
- Assunto: `Novo voluntário cadastrado!`
- Conteúdo:
```
Novo voluntário! 🎉

Nome: {{volunteer_name}}
Email: {{volunteer_email}}
Telefone: {{volunteer_phone}}
Área: {{volunteer_area}}
Disponibilidade: {{volunteer_availability}}
Motivação: {{volunteer_motivation}}
```

### **Passo 4: Obter Chave Pública (30 segundos)**
1. Clique em "Account" → "General"
2. **Copie o PUBLIC_KEY** (ex: `user_xyz789`)

### **Passo 5: Ativar no Site (1 minuto)**
1. Abra o arquivo: `src/config/emailConfig.js`
2. Substitua os valores:

```javascript
export const EMAIL_CONFIG = {
  SERVICE_ID: 'SEU_SERVICE_ID_AQUI',     // Ex: 'service_abc123'
  PUBLIC_KEY: 'SUA_PUBLIC_KEY_AQUI',     // Ex: 'user_xyz789'
  
  // Mude para false para ativar emails reais
  DEMO_MODE: false // ← Mude para false
  
  // ... resto do código
};
```

## 🎯 **Pronto!**

Depois disso, todos os emails serão enviados automaticamente!

## 💡 **Dica**

- **200 emails grátis por mês**
- **Super confiável**
- **Não quebra o site se der problema**
- **Funciona mesmo sem configurar**

## 🆘 **Se Tiver Dúvidas**

O site funciona perfeitamente sem emails. Você pode configurar quando quiser, sem pressa!
