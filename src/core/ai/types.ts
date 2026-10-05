export interface AssistRequest {
  message: string;
  image?: {
    base64: string;
    mimeType: string;
  };
  context: {
    platform: string;
    screenReader: string;
  };
}

export interface AssistResponse {
  text: string;
  error?: string;
}

export interface AiProvider {
  assist(request: AssistRequest, systemPrompt: string): Promise<AssistResponse>;
}
