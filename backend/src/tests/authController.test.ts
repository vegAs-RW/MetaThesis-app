import request from "supertest";
import express from "express";
import { registerAdvisor, login, logout } from "../infrastructure/web/controllers/AuthController"; // Change le chemin
import { UserService } from "../domain/services/UserService"; // Change le chemin
import { AdvisorService } from "../domain/services/AdvisorService";
import bcrypt from 'bcrypt' // Change le chemin

const app = express();
app.use(express.json());
app.post("/register", registerAdvisor);
app.post("/login", login);
app.post("/logout", logout);

// Mock des services
jest.mock("../domain/services/UserService");
jest.mock("../domain/services/AdvisorService");

const UserServiceMock = UserService as jest.MockedClass<typeof UserService>;
const AdvisorServiceMock = AdvisorService as jest.MockedClass<typeof AdvisorService>;

describe("AuthController", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /register", () => {
        it("should register a new advisor", async () => {
            UserServiceMock.prototype.getUserByEmail.mockResolvedValue(undefined); // Simule l'absence de l'utilisateur
            UserServiceMock.prototype.createUser.mockResolvedValue({
                id: "1",
                 email: "jane.doe@example.com", 
                 firstname: "Jane", 
                 lastname: "Doe", 
                    password: "hashed-password"
                });
            AdvisorServiceMock.prototype.createAdvisor.mockResolvedValue(undefined); // Simule la création de l'advisor

            const response = await request(app)
                .post("/register")
                .send({
                    email: "jane.doe@example.com",
                    password: "password",
                    firstname: "Jane",
                    lastname: "Doe",
                    department: "Finance",
                    research_area: "Economics",
                    ifrs: "1456324",
                    costCenter: "CC-123",
                    establishment: "1",
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Advisor created successfully");
        });

        it("should return 409 if advisor already exists", async () => {
            UserServiceMock.prototype.getUserByEmail.mockResolvedValue({ id: "1" });

            const response = await request(app)
                .post("/register")
                .send({
                    email: "jane.doe@example.com",
                    password: "password",
                    firstname: "Jane",
                    lastname: "Doe",
                    department: "Finance",
                    research_area: "Economics",
                    ifrs: "1456324",
                    costCenter: "CC-123",
                    establishment: "1",
                });

            expect(response.status).toBe(409);
            expect(response.body.message).toBe("Advisor already exists");
        });

        it("should return 400 for invalid input", async () => {
            const response = await request(app)
                .post("/register")
                .send({
                    email: "", // Invalid email
                    password: "",
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Invalid email or password");
        });
    });

    describe("POST /login", () => {
        it("should log in an advisor", async () => {
            UserServiceMock.prototype.getUserByEmail.mockResolvedValue({
                id: "1",
                email: "jane.doe@example.com",
                password: await bcrypt.hash("password", 12), // Simule le mot de passe haché
            });

            const response = await request(app)
                .post("/login")
                .send({
                    email: "jane.doe@example.com",
                    password: "password",
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Login successful");
        });

        it("should return 401 for invalid password", async () => {
            UserServiceMock.prototype.getUserByEmail.mockResolvedValue({
                id: "1",
                email: "jane.doe@example.com",
                password: await bcrypt.hash("wrongpassword", 12),
            });

            const response = await request(app)
                .post("/login")
                .send({
                    email: "jane.doe@example.com",
                    password: "password",
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Invalid password");
        });

        it("should return 404 if user not found", async () => {
            UserServiceMock.prototype.getUserByEmail.mockResolvedValue(undefined);

            const response = await request(app)
                .post("/login")
                .send({
                    email: "non.existent@example.com",
                    password: "password",
                });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("User not found");
        });

        it("should return 400 for invalid input", async () => {
            const response = await request(app)
                .post("/login")
                .send({
                    email: "", // Invalid email
                    password: "",
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Invalid email or password");
        });
    });

    describe("POST /logout", () => {
        it("should log out an advisor", async () => {
            const response = await request(app).post("/logout");

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Logout successful");
        });
    });
});
