import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { assistRequestSchema } from "@/core/ai/schemas";
import { getSystemPrompt } from "@/core/ai/prompt";
import { sanitizeResponse } from "@/core/ai/sanitize";
import { GeminiProvider } from "@/core/ai/gemini-provider";
import { StubProvider } from "@/core/ai/stub-provider";
import { checkRateLimit } from "@/lib/rate-limit";

const isTest = process.env.NODE_ENV === "test" || process.env.USE_STUB_PROVIDER === "true";
const apiKey = process.env.GEMINI_API_KEY || "";

const provider = isTest || !apiKey 
  ? new StubProvider() 
  : new GeminiProvider(apiKey);

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Anda harus login untuk menggunakan fitur ini." }, { status: 401 });
    }

    // Rate limit: 10 requests per minute
    if (!checkRateLimit(user.id, 10, 60000)) {
      return NextResponse.json({ error: "Terlalu banyak permintaan. Silakan tunggu sebentar." }, { status: 429 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Format data tidak valid." }, { status: 400 });
    }
    
    const validationResult = assistRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({ error: "Data permintaan tidak valid." }, { status: 400 });
    }

    const { message, image, context } = validationResult.data;
    const systemPrompt = getSystemPrompt(context.platform, context.screenReader);

    const aiResponse = await provider.assist({ message, image, context }, systemPrompt);

    if (aiResponse.error) {
      return NextResponse.json({ error: aiResponse.error }, { status: 500 });
    }

    const cleanText = sanitizeResponse(aiResponse.text);

    return NextResponse.json({ result: cleanText });

  } catch (error) {
    console.error("Assist API Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal server." },
      { status: 500 }
    );
  }
}
