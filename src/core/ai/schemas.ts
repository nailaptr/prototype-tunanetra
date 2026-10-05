import { z } from "zod";

export const assistRequestSchema = z.object({
  message: z.string().min(1, "Pesan tidak boleh kosong").max(2000, "Pesan terlalu panjang"),
  image: z.object({
    base64: z.string().min(1),
    mimeType: z.enum(["image/jpeg", "image/png", "image/webp"])
  }).optional(),
  context: z.object({
    platform: z.string().default("Tidak diketahui"),
    screenReader: z.string().default("Tidak diketahui"),
  }).default({ platform: "Tidak diketahui", screenReader: "Tidak diketahui" })
});
