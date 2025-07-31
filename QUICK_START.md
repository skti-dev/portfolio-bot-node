# Guia de Configuração Rápida

## Passo 1: Configurar OpenAI API Key

1. Acesse [OpenAI API](https://platform.openai.com/api-keys)
2. Crie uma nova API key
3. Copie o arquivo `.env.example` para `.env`:
   ```bash
   copy .env.example .env
   ```
4. Edite o arquivo `.env` e substitua `sua_chave_openai_aqui` pela sua chave real

## Passo 2: Executar o Servidor

```bash
# Instalar dependências (já feito)
npm install

# Executar em modo desenvolvimento
npm run dev
```

## Passo 3: Testar o Chatbot

### Opção 1: Interface Web

1. Abra o arquivo `client/index.html` no navegador
2. Verifique se o status mostra "✅ Conectado ao servidor"
3. Faça perguntas sobre Augusto Seabra

### Opção 2: Teste via API

```bash
# Testar health check
curl http://localhost:3001/health

# Testar informações
curl http://localhost:3001/api/info

# Testar chatbot
curl -X POST http://localhost:3001/api/chat -H "Content-Type: application/json" -d "{\"message\":\"Quais são as habilidades do Augusto?\",\"language\":\"pt\"}"
```

## Passo 4: Configurar Ngrok (Opcional)

Para expor o servidor para a internet:

```bash
# Instalar ngrok
npm install -g ngrok

# Expor porta 3001
ngrok http 3001
```

## Perguntas de Exemplo

- "Quais são as principais habilidades do Augusto?"
- "Como posso entrar em contato com ele?"
- "Quais tecnologias ele domina?"
- "Me conte sobre a experiência profissional dele"

## Troubleshooting

### Erro de conexão

- Verifique se o arquivo `.env` está configurado
- Verifique se a API key da OpenAI é válida
- Certifique-se de que a porta 3001 está livre

### Erro 401 da OpenAI

- Verifique se a API key está correta
- Verifique se sua conta OpenAI tem créditos

### Interface não carrega

- Verifique se o servidor está rodando em localhost:3001
- Abra o console do navegador para ver erros
