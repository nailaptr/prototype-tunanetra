import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { AiProvider, AssistRequest, AssistResponse } from "./types";

export class GeminiProvider implements AiProvider {
  private genAI: GoogleGenerativeAI;
  
  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async assist(request: AssistRequest, systemPrompt: string): Promise<AssistResponse> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systemPrompt
      });

      const parts: Part[] = [{ text: request.message }];
      
      if (request.image) {
        // Remove data:image/...;base64, prefix if present
        const base64Data = request.image.base64.replace(/^data:image\/\w+;base64,/, "");
        
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: request.image.mimeType
          }
        });
      }

      const result = await model.generateContent(parts);
      const response = await result.response;
      const text = response.text();

      return { text };
    } catch (error) {
      console.error("Gemini API Error:", error);
      return { 
        text: "",
        error: "Maaf, terjadi kesalahan saat memproses permintaan Anda. Coba lagi nanti."
      };
    }
  }
}
