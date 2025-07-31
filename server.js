const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Configurar CORS
app.use(cors());
app.use(express.json());

// Configurar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Informações sobre Augusto Seabra (contexto base)
const augustoSeabraInfo = {
  nome: "Augusto Seabra",
  profissao: "Desenvolvedor Full Stack",
  areas_expertise: [
    "Desenvolvimento Web",
    "JavaScript/TypeScript",
    "React",
    "PHP",
    "NoSQL",
    "MongoDB",
    "Desenvolvimento de APIs",
    "Node.js",
    "Python",
    "Langchain",
    "CrewAI",
  ],
  contato: {
    email: "augusto.seabra@email.com",
    linkedin: "https://www.linkedin.com/in/augusto-seabra-desenvolvedor/",
    github: "https://github.com/skti-dev",
  },
  sobre:
    "Desenvolvedor apaixonado por tecnologia com experiência em desenvolvimento full stack, sempre buscando criar soluções inovadoras e eficientes.",
  sections: [
    {
      section: "Experiência Profissional",
      content:
        "Desenvolvedor Full Stack com experiência em projetos de grande escala, utilizando tecnologias modernas como Vue, React, Node.js e Python. Participação ativa em todas as fases do desenvolvimento, desde a concepção até a entrega final.",
    },
    {
      section: "Habilidades Técnicas",
      content:
        "Profundo conhecimento em JavaScript/TypeScript, com experiência em frameworks como React e Vue. Sólidos conhecimentos em desenvolvimento de APIs RESTful com Node.js e integração com bancos de dados NoSQL como MongoDB. Competências em Python para automação e scripts. Conhecimentos sólidos em chatbots e IA, incluindo Langchain e CrewAI.",
    },
    {
      section: "Formação Acadêmica",
      content:
        "Graduado em Sistemas para Internet pela FIAP (Faculdade de Informática e Administração Paulista) desde dezembro 2022. Estuda programação desde 2016 e diversos cursos de especialização em tecnologias web e desenvolvimento de software.",
    },
    {
      section: "Interesses",
      content:
        "Gosta de andar de skate como hobby e também é um entusiasta em criações com arduinos e outras tecnologias de hardware. Tem interesse em medidas tecnológicas que possam melhorar a vida das pessoas, como automação residencial e dispositivos inteligentes.",
    },
  ],
};

// Endpoint principal do chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { message, language = "pt", context = {} } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        error:
          language === "pt"
            ? "Mensagem não pode estar vazia"
            : "Message cannot be empty",
      });
    }

    const systemPrompt =
      language === "pt"
        ? `Você é um assistente virtual especializado no portfólio de Augusto Seabra. 
         Responda na lingua que for perguntado de forma amigável, profissional e objetiva.
         
         Use as informações fornecidas para responder sobre:
         - Experiência profissional e projetos
         - Habilidades técnicas e certificações
         - Formação acadêmica
         - Formas de contato
         
         Se não tiver informação específica sobre algo, seja honesto e sugira que a pessoa entre em contato diretamente com Augusto Seabra.
         
         Mantenha as respostas concisas mas informativas.`
        : `You are a virtual assistant specialized in Augusto Seabra's portfolio.
         Respond in the language that is asked in a friendly, professional and objective manner.
         
         Use the provided information to answer about:
         - Professional experience and projects
         - Technical skills and certifications
         - Academic background
         - Contact information
         
         If you don't have specific information about something, be honest and suggest contacting Augusto Seabra directly.
         
         Keep responses concise but informative.`;

    const contextInfo = `
Informações sobre Augusto Seabra:
Nome: ${augustoSeabraInfo.nome}
Profissão: ${augustoSeabraInfo.profissao}
Áreas de Expertise: ${augustoSeabraInfo.areas_expertise.join(", ")}
Sobre: ${augustoSeabraInfo.sobre}

Contato:
- Email: ${augustoSeabraInfo.contato.email}
- LinkedIn: ${augustoSeabraInfo.contato.linkedin}
- GitHub: ${augustoSeabraInfo.contato.github}

${
  context.sections
    ? context.sections
        .map((section) => `${section.section}: ${section.content}`)
        .join("\n\n")
    : ""
}
    `;

    const completion = await openai.chat.completions.create({
      model: process.env.MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt + `\n\nContexto do portfólio:\n${contextInfo}`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: parseInt(process.env.MAX_TOKENS) || 200,
      temperature: parseFloat(process.env.TEMPERATURE) || 0.7,
    });

    const response =
      completion.choices[0]?.message?.content ||
      (language === "pt"
        ? "Desculpe, não consegui processar sua pergunta. Tente reformular ou entre em contato diretamente com Augusto Seabra."
        : "Sorry, I couldn't process your question. Please try rephrasing or contact Augusto Seabra directly.");

    res.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro no chatbot:", error);

    const errorMessage =
      req.body.language === "pt"
        ? "Desculpe, ocorreu um erro interno. Tente novamente em alguns instantes."
        : "Sorry, an internal error occurred. Please try again in a few moments.";

    res.status(500).json({
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
});

// Endpoint para informações básicas sobre Augusto Seabra
app.get("/api/info", (req, res) => {
  res.json({
    ...augustoSeabraInfo,
    timestamp: new Date().toISOString(),
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Portfolio Chatbot - Augusto Seabra",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Middleware para rotas não encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint não encontrado",
    available_endpoints: ["POST /api/chat", "GET /api/info", "GET /health"],
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor do chatbot rodando na porta ${port}`);
  console.log(`📋 Health check: http://localhost:${port}/health`);
  console.log(`💬 Chatbot API: http://localhost:${port}/api/chat`);
  console.log(`ℹ️  Info API: http://localhost:${port}/api/info`);
});

module.exports = app;
