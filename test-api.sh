#!/bin/bash

# Script para testar a API pública do Portfolio Chatbot
echo "🧪 Testando Portfolio Chatbot API Pública"
echo "URL: https://good-monster-socially.ngrok-free.app"
echo

# Teste 1: Health Check
echo "📋 Teste 1: Health Check"
curl -s "https://good-monster-socially.ngrok-free.app/health" | jq .
echo
echo

# Teste 2: Informações do Portfólio
echo "📋 Teste 2: Informações do Portfólio"
curl -s "https://good-monster-socially.ngrok-free.app/api/info" | jq .
echo
echo

# Teste 3: Pergunta em Português
echo "📋 Teste 3: Pergunta em Português"
curl -s -X POST "https://good-monster-socially.ngrok-free.app/api/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Quais são as principais habilidades técnicas do Augusto Seabra?",
    "language": "pt"
  }' | jq .
echo
echo

# Teste 4: Pergunta em Inglês
echo "📋 Teste 4: Pergunta em Inglês"
curl -s -X POST "https://good-monster-socially.ngrok-free.app/api/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How can I contact Augusto Seabra?",
    "language": "en"
  }' | jq .
echo
echo

# Teste 5: Pergunta com Contexto
echo "📋 Teste 5: Pergunta com Contexto"
curl -s -X POST "https://good-monster-socially.ngrok-free.app/api/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Me conte sobre os projetos",
    "language": "pt",
    "context": {
      "sections": [
        {
          "section": "Projetos",
          "content": "Sistema de e-commerce desenvolvido em React e Node.js com integração de pagamentos"
        }
      ]
    }
  }' | jq .

echo
echo "✅ Testes concluídos!"
