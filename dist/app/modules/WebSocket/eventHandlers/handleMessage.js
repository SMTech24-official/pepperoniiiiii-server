"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ai = void 0;
exports.handleMessage = handleMessage;
const genai_1 = require("@google/genai");
const prisma_1 = __importDefault(require("../../../../shared/prisma"));
exports.ai = new genai_1.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "AIzaSyAWRd6fkxz6AsmSIFn97AZw3OMawd8QTP0",
});
function handleMessage(ws, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { message } = data;
        const userId = ws.userId;
        if (!userId)
            return ws.send(JSON.stringify({ event: "error", message: "User not found" }));
        const wordCount = message.trim().split(/\s+/).length;
        // if (wordCount <= 10) {
        //   const warning = "🚫 Please write more than 10 words.";
        //   await prisma.chat.create({
        //     data: { userId, message: warning, role: "AI" },
        //   });
        //   ws.send(JSON.stringify({ event: "message", data: warning }));
        // }
        yield prisma_1.default.chat.create({
            data: { userId, message, role: "USER" },
        });
        // const isFitnessRelated = fitnessKeywords.some((word) =>
        //   message.toLowerCase().includes(word)
        // );
        // if (!isFitnessRelated) {
        //   const warning =
        //     "🚫 This is a fitness assistant. Please ask fitness-related questions only!";
        //   await prisma.chat.create({
        //     data: { userId, message: warning, role: "AI" },
        //   });
        //   ws.send(JSON.stringify({ event: "message", data: warning }));
        // }
        // ✅ Prompt is fitness-related, continue with AI generation
        const contents = [
            {
                role: "user",
                parts: [
                    {
                        text: `
You are an AI assistant trained to help users detect and understand chicken illnesses, as well as engage in friendly, casual conversation.

Primary responsibilities:
- Give accurate, practical advice about chicken health based on symptoms described by the user.
- Help users recognize signs of common poultry diseases (e.g., Newcastle disease, avian flu, Marek's disease, coccidiosis, respiratory infections).
- Suggest preventive actions, basic treatments (non-prescription), and when to consult a veterinarian.
- Use simple, clear language — avoid technical jargon unless the user seems advanced.
- Be supportive, calm, and informative in all health-related responses.

Secondary responsibilities:
- Engage casually and warmly when users want to chat.
- You can talk about chickens, farming, weather, or other light topics.
- Keep the tone friendly, helpful, and professional — you're like a smart, reliable farm buddy.

Rules:
- If the user asks about chicken symptoms or health concerns, prioritize expert guidance.
- If the input is casual or unrelated to health, reply in a relaxed and cheerful tone.
- If unsure about a diagnosis, encourage the user to consult a vet — never guess.
        `.trim(),
                    },
                ],
            },
            {
                role: "user",
                parts: [{ text: `${message}` }],
            },
        ];
        const response = yield exports.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
        });
        if (response.text) {
            yield prisma_1.default.chat.create({
                data: { userId, message: response.text, role: "AI" },
            });
            ws.send(JSON.stringify({ event: "message", data: response.text }));
        }
        else {
            ws.send(JSON.stringify({
                event: "message",
                data: "Failed to generate tips. Please try again later.",
            }));
        }
    });
}
