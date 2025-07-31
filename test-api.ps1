# Script PowerShell para testar a API pública do Portfolio Chatbot

Write-Host "🧪 Testando Portfolio Chatbot API Pública" -ForegroundColor Green
Write-Host "URL: https://good-monster-socially.ngrok-free.app" -ForegroundColor Cyan
Write-Host ""

# Teste 1: Health Check
Write-Host "📋 Teste 1: Health Check" -ForegroundColor Yellow
try {
  $response = Invoke-RestMethod -Uri "https://good-monster-socially.ngrok-free.app/health" -Method Get
  $response | ConvertTo-Json -Depth 3
  Write-Host "✅ Health Check OK" -ForegroundColor Green
}
catch {
  Write-Host "❌ Erro no Health Check: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Teste 2: Informações do Portfólio
Write-Host "📋 Teste 2: Informações do Portfólio" -ForegroundColor Yellow
try {
  $response = Invoke-RestMethod -Uri "https://good-monster-socially.ngrok-free.app/api/info" -Method Get
  $response | ConvertTo-Json -Depth 3
  Write-Host "✅ Info API OK" -ForegroundColor Green
}
catch {
  Write-Host "❌ Erro na Info API: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Teste 3: Pergunta em Português
Write-Host "📋 Teste 3: Pergunta em Português" -ForegroundColor Yellow
try {
  $body = @{
    message  = "Quais são as principais habilidades técnicas do Augusto Seabra?"
    language = "pt"
  } | ConvertTo-Json

  $response = Invoke-RestMethod -Uri "https://good-monster-socially.ngrok-free.app/api/chat" -Method Post -Body $body -ContentType "application/json"
  $response | ConvertTo-Json -Depth 3
  Write-Host "✅ Chat em Português OK" -ForegroundColor Green
}
catch {
  Write-Host "❌ Erro no Chat PT: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Teste 4: Pergunta em Inglês
Write-Host "📋 Teste 4: Pergunta em Inglês" -ForegroundColor Yellow
try {
  $body = @{
    message  = "How can I contact Augusto Seabra?"
    language = "en"
  } | ConvertTo-Json

  $response = Invoke-RestMethod -Uri "https://good-monster-socially.ngrok-free.app/api/chat" -Method Post -Body $body -ContentType "application/json"
  $response | ConvertTo-Json -Depth 3
  Write-Host "✅ Chat em Inglês OK" -ForegroundColor Green
}
catch {
  Write-Host "❌ Erro no Chat EN: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Teste 5: Pergunta com Contexto
Write-Host "📋 Teste 5: Pergunta com Contexto" -ForegroundColor Yellow
try {
  $body = @{
    message  = "Me conte sobre os projetos"
    language = "pt"
    context  = @{
      sections = @(
        @{
          section = "Projetos"
          content = "Sistema de e-commerce desenvolvido em React e Node.js com integração de pagamentos"
        }
      )
    }
  } | ConvertTo-Json -Depth 4

  $response = Invoke-RestMethod -Uri "https://good-monster-socially.ngrok-free.app/api/chat" -Method Post -Body $body -ContentType "application/json"
  $response | ConvertTo-Json -Depth 3
  Write-Host "✅ Chat com Contexto OK" -ForegroundColor Green
}
catch {
  Write-Host "❌ Erro no Chat com Contexto: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "✅ Testes concluídos!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Para usar a interface web, abra client/index.html no navegador" -ForegroundColor Cyan
