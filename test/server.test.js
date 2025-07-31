const request = require("supertest");
const app = require("./server");

describe("Portfolio Chatbot API", () => {
  // Test health endpoint
  describe("GET /health", () => {
    it("should return health status", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.body).toHaveProperty("status", "OK");
      expect(response.body).toHaveProperty("service");
      expect(response.body).toHaveProperty("timestamp");
    });
  });

  // Test info endpoint
  describe("GET /api/info", () => {
    it("should return Augusto Seabra info", async () => {
      const response = await request(app).get("/api/info").expect(200);

      expect(response.body).toHaveProperty("nome", "Augusto Seabra");
      expect(response.body).toHaveProperty("profissao");
      expect(response.body).toHaveProperty("areas_expertise");
      expect(response.body).toHaveProperty("contato");
    });
  });

  // Test chat endpoint validation
  describe("POST /api/chat", () => {
    it("should return error for empty message", async () => {
      const response = await request(app)
        .post("/api/chat")
        .send({ message: "" })
        .expect(400);

      expect(response.body).toHaveProperty("error");
    });

    it("should return error for missing message", async () => {
      const response = await request(app)
        .post("/api/chat")
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty("error");
    });
  });

  // Test 404 for unknown routes
  describe("Unknown routes", () => {
    it("should return 404 for unknown endpoint", async () => {
      const response = await request(app).get("/unknown").expect(404);

      expect(response.body).toHaveProperty("error");
      expect(response.body).toHaveProperty("available_endpoints");
    });
  });
});
