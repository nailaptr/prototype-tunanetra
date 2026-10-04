# Project Context

## Project
Prototype Web Asisten AI untuk Penyandang Tunanetra.

## Tujuan prototype
Membuktikan bahwa pengguna tunanetra dapat:
1. login/register dengan keyboard dan screen reader,
2. bertanya melalui teks atau suara,
3. mengirim gambar/tangkapan layar,
4. menerima penjelasan layar dan panduan langkah demi langkah dalam Bahasa Indonesia,
5. mendengar jawaban melalui TTS.

Prototype adalah proof of concept untuk menentukan kelanjutan proyek skripsi.

## Persona utama
Pengguna tunanetra total atau low vision yang sudah memakai NVDA/JAWS, TalkBack, atau VoiceOver.

## Scope
IN:
- auth,
- chat teks,
- STT/TTS,
- analisis gambar,
- upload gambar,
- screen capture jika browser mendukung,
- privacy consent,
- settings,
- conversation history,
- accessibility.

OUT:
- mengontrol PC/ponsel secara langsung,
- native Android/iOS/desktop,
- offline/local AI,
- admin kompleks,
- pembayaran,
- klaim menggantikan screen reader.

## Architecture
- `src/core`: pure TypeScript untuk schema, prompt, sanitization, provider AI.
- route handler: tipis; auth + validation + call core.
- Supabase: Auth + PostgreSQL + RLS.
- AI provider diabstraksikan melalui `AiProvider`.
- Provider stub dipakai untuk automated tests agar tidak memakai kuota AI.

## Data
- `user_settings`
- `conversations`
- `messages`
- `usage_events`

Gambar tidak disimpan.

## Main API
- `POST /api/assist`
- `GET /api/conversations`
- `GET/DELETE /api/conversations/[id]`
- `GET/PUT /api/settings`

## AI response rules
Plain text, Bahasa Indonesia sederhana, kalimat pendek, langkah bernomor satu aksi per langkah. Saat menganalisis gambar: mulai dari ringkasan, lalu elemen penting + posisi. Jangan mengarang. Jangan meminta password/PIN/OTP. Untuk tindakan berisiko, ingatkan verifikasi.

## Current implementation status
Lihat `docs/STATUS.md`. Jangan menganggap fitur selesai hanya karena ada kodenya; fitur selesai setelah verification gate lolos.
