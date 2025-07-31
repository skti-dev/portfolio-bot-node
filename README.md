# Portfolio Chatbot - Augusto Seabra

Este é um servidor Node.js que implementa um chatbot inteligente para responder questões sobre o portfólio de **Augusto Seabra**. O chatbot utiliza a API da OpenAI para fornecer respostas contextualizadas e profissionais.

## 🚀 Funcionalidades

- ✅ Responde perguntas sobre experiência profissional, projetos e habilidades
- ✅ Suporte a português e inglês
- ✅ Integração com OpenAI GPT-3.5-turbo
- ✅ API REST para integração com frontend
- ✅ Configuração flexível via variáveis de ambiente
- ✅ Health check endpoint
- ✅ Tratamento de erros robusto
- ✅ CORS configurado para requisições do frontend

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- Conta na OpenAI com API Key
- npm ou yarn

## ⚙️ Configuração

### 1. Clone e configure o projeto

```bash
# Navegue até o diretório do projeto
cd portfolio-bot

# Instale as dependências
npm install
```

### 2. Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo
copy .env.example .env
```

Edite o arquivo `.env` e configure:

```env
OPENAI_API_KEY=sua_chave_openai_aqui
PORT=3001
MAX_TOKENS=200
TEMPERATURE=0.7
MODEL=gpt-3.5-turbo
```

### 3. Execute o servidor

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

O servidor estará disponível em `http://localhost:3001`

## 🌐 Endpoints da API

### POST `/api/chat`

Endpoint principal do chatbot

**Request Body:**

```json
{
  "message": "Quais são as principais habilidades do Augusto?",
  "language": "pt",
  "context": {
    "sections": [
      {
        "section": "Projetos",
        "content": "Lista de projetos relevantes..."
      }
    ]
  }
}
```

**Response:**

```json
{
  "response": "Augusto Seabra possui expertise em desenvolvimento full stack...",
  "timestamp": "2025-01-31T10:30:00Z"
}
```

### GET `/api/info`

Retorna informações básicas sobre Augusto Seabra

### GET `/health`

Health check do servidor

## 🔗 Integração com ngrok

Para expor o servidor localmente:

```bash
# Instale o ngrok globalmente
npm install -g ngrok

# Exponha o servidor na porta 3001
ngrok http 3001
```

Copie a URL gerada (ex: `https://abc123.ngrok.io`) para usar no frontend.

## 📝 Exemplos de Uso

### Usando curl:

```bash
# Fazer uma pergunta em português
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Quais tecnologias o Augusto domina?",
    "language": "pt"
  }'

# Fazer uma pergunta em inglês
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are Augusto'\''s main skills?",
    "language": "en"
  }'
```

### Integração com JavaScript:

```javascript
async function askChatbot(message, language = "pt") {
  try {
    const response = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        language,
        context: {
          sections: [
            // Adicione contexto da página atual aqui
          ],
        },
      }),
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Erro ao consultar chatbot:", error);
    return "Erro ao processar pergunta";
  }
}

// Uso
askChatbot("Como posso entrar em contato com o Augusto?").then((response) =>
  console.log(response)
);
```

## 📊 Informações do Portfólio

O chatbot tem conhecimento sobre:

- **Nome:** Augusto Seabra
- **Profissão:** Desenvolvedor Full Stack
- **Expertise:** JavaScript/TypeScript, React, Node.js, Python, Banco de Dados
- **Contato:** Email, LinkedIn, GitHub

## 🔒 Segurança

Para uso em produção, considere implementar:

- ✅ Rate limiting para prevenir spam
- ✅ Autenticação/autorização
- ✅ Validação robusta de dados de entrada
- ✅ Logs estruturados para monitoramento
- ✅ Sanitização de inputs
- ✅ HTTPS obrigatório
- ✅ Monitoramento de custos da API OpenAI

## 🛠️ Desenvolvimento

```bash
# Instalar dependências de desenvolvimento
npm install

# Executar em modo desenvolvimento
npm run dev

# Verificar health check
curl http://localhost:3001/health
```

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🤝 Contribuição

Este é um projeto personalizado para o portfólio de Augusto Seabra. Para sugestões ou melhorias, entre em contato diretamente.

---

**Desenvolvido para o portfólio de Augusto Seabra** 🚀
