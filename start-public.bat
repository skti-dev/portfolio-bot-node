@echo off
echo 🚀 Iniciando Portfolio Chatbot com Ngrok
echo.

echo 📋 Passo 1: Verificando se o servidor está rodando...
curl -s http://localhost:3001/health > nul
if %errorlevel% neq 0 (
    echo ❌ Servidor não está rodando na porta 3001
    echo 💡 Execute 'npm start' em outro terminal primeiro
    pause
    exit /b 1
)

echo ✅ Servidor está rodando!
echo.

echo 📋 Passo 2: Expondo servidor com ngrok...
echo 🌐 URL pública: https://good-monster-socially.ngrok-free.app
echo.

echo 📋 Endpoints disponíveis:
echo   Health Check: https://good-monster-socially.ngrok-free.app/health
echo   Chat API:     https://good-monster-socially.ngrok-free.app/api/chat
echo   Info API:     https://good-monster-socially.ngrok-free.app/api/info
echo.

echo 📋 Passo 3: Testando conexão...
curl -s https://good-monster-socially.ngrok-free.app/health > nul
if %errorlevel% neq 0 (
    echo ❌ Ngrok URL não está acessível
    echo 💡 Verifique se o ngrok está rodando: ngrok http 3001
    pause
    exit /b 1
)

echo ✅ API está acessível publicamente!
echo.

echo 📋 Como usar:
echo   1. Abra client/index.html no navegador para interface web
echo   2. Ou use a API diretamente:
echo.
echo   curl -X POST https://good-monster-socially.ngrok-free.app/api/chat \
echo        -H "Content-Type: application/json" \
echo        -d "{\"message\":\"Olá, quais são as habilidades do Augusto?\",\"language\":\"pt\"}"
echo.

echo 🎉 Chatbot está pronto para uso público!
pause
