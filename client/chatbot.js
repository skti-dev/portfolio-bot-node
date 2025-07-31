/**
 * Exemplo de integração do chatbot com frontend
 *
 * Esta classe fornece uma interface simples para integrar o chatbot
 * do portfólio de Augusto Seabra com qualquer aplicação frontend.
 */

class PortfolioChatbot {
  constructor(apiUrl = "http://localhost:3001") {
    this.apiUrl = apiUrl;
    this.defaultLanguage = "pt";
  }

  /**
   * Envia uma mensagem para o chatbot
   * @param {string} message - Mensagem do usuário
   * @param {string} language - Idioma da resposta ('pt' ou 'en')
   * @param {object} context - Contexto adicional da página
   * @returns {Promise<string>} - Resposta do chatbot
   */
  async sendMessage(message, language = this.defaultLanguage, context = {}) {
    try {
      const response = await fetch(`${this.apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          language,
          context,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Erro ao consultar chatbot:", error);
      return language === "pt"
        ? "Desculpe, ocorreu um erro. Tente novamente."
        : "Sorry, an error occurred. Please try again.";
    }
  }

  /**
   * Obtém informações básicas sobre Augusto Seabra
   * @returns {Promise<object>} - Informações do portfólio
   */
  async getPortfolioInfo() {
    try {
      const response = await fetch(`${this.apiUrl}/api/info`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao obter informações do portfólio:", error);
      return null;
    }
  }

  /**
   * Verifica se o servidor está funcionando
   * @returns {Promise<boolean>} - Status do servidor
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.apiUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error("Erro ao verificar health do servidor:", error);
      return false;
    }
  }

  /**
   * Define o idioma padrão
   * @param {string} language - 'pt' ou 'en'
   */
  setDefaultLanguage(language) {
    this.defaultLanguage = language;
  }

  /**
   * Extrai contexto da página atual para enviar ao chatbot
   * @returns {object} - Contexto da página
   */
  extractPageContext() {
    const context = {
      sections: [],
    };

    // Extrair seções com base em elementos da página
    const sections = document.querySelectorAll("section[data-section]");
    sections.forEach((section) => {
      const sectionName = section.getAttribute("data-section");
      const content = section.textContent.trim().substring(0, 500); // Limitar tamanho

      if (sectionName && content) {
        context.sections.push({
          section: sectionName,
          content: content,
        });
      }
    });

    // Extrair informações de meta tags
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      context.pageDescription = description.getAttribute("content");
    }

    const title = document.title;
    if (title) {
      context.pageTitle = title;
    }

    return context;
  }
}

// Exemplo de uso
/*
// Inicializar o chatbot
const chatbot = new PortfolioChatbot('https://sua-url-ngrok.ngrok.io');

// Fazer uma pergunta
chatbot.sendMessage('Quais são as principais habilidades do Augusto?', 'pt')
  .then(response => {
    console.log('Resposta:', response);
  });

// Obter informações do portfólio
chatbot.getPortfolioInfo()
  .then(info => {
    console.log('Informações:', info);
  });

// Verificar se o servidor está funcionando
chatbot.checkHealth()
  .then(isHealthy => {
    console.log('Servidor funcionando:', isHealthy);
  });

// Usar contexto da página atual
const context = chatbot.extractPageContext();
chatbot.sendMessage('Me fale sobre esta seção', 'pt', context)
  .then(response => {
    console.log('Resposta com contexto:', response);
  });
*/

// Para uso em Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = PortfolioChatbot;
}

// Para uso no browser
if (typeof window !== "undefined") {
  window.PortfolioChatbot = PortfolioChatbot;
}
