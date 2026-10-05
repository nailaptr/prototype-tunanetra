import { AiProvider, AssistRequest, AssistResponse } from "./types";

export class StubProvider implements AiProvider {
  async assist(request: AssistRequest): Promise<AssistResponse> {
    if (request.message.toLowerCase().includes("error")) {
      return { text: "", error: "Simulated error" };
    }
    
    if (request.image) {
      return { text: "Gambar diterima. Ini adalah respons simulasi." };
    }
    
    return { text: "Ini adalah respons simulasi dari asisten AI." };
  }
}
