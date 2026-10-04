# Project Constitution — Prototype Asisten AI Tunanetra

## Source of truth
- `docs/PROJECT-CONTEXT.md` = konteks ringkas yang wajib dipahami sebelum coding.
- `docs/PRD-SUMMARY.md` = kebutuhan produk yang sudah dipadatkan dari PRD.
- `docs/STATUS.md` = status implementasi terbaru.
- `docs/DECISIONS.md` = keputusan teknis yang sudah disepakati.
- PRD lengkap hanya dibaca jika tugas memang membutuhkan detail yang tidak tersedia di summary.

## Tujuan
Membangun prototype web asisten AI berbahasa Indonesia untuk membantu pengguna tunanetra memahami layar PC/ponsel dan mendapatkan panduan langkah demi langkah.

## Prinsip utama
1. Accessibility first. Target WCAG 2.2 AA.
2. Keyboard + screen reader adalah jalur utama, bukan fitur tambahan.
3. Jangan mengklaim web dapat mengendalikan perangkat secara langsung. Prototype hanya melihat input yang dibagikan pengguna.
4. Jawaban AI harus plain text, singkat, jelas, dan cocok dibacakan screen reader.
5. Jangan mengarang informasi yang tidak terlihat pada gambar.
6. Jangan meminta password, PIN, atau kode verifikasi.
7. Jangan menyimpan gambar layar.
8. Rahasia hanya di server environment. Jangan gunakan `NEXT_PUBLIC_` untuk API key AI.
9. RLS Supabase wajib aktif dan akses data harus mengikuti user yang sedang login.
10. `src/core` harus framework-agnostic: tidak boleh mengimpor React atau Next.js.
11. Hindari dependensi tambahan jika native/browser API atau dependency yang sudah ada cukup.
12. Setiap perubahan yang relevan harus memiliki test.
13. Jangan mengerjakan tahap berikutnya sebelum tahap saat ini lolos verification gate.
14. Jangan melakukan refactor besar tanpa alasan dan persetujuan.
15. Jangan menghapus atau mengubah fitur yang sudah lolos gate hanya untuk mempermudah implementasi fitur baru.

## Stack
- TypeScript strict
- Next.js App Router
- React
- Tailwind CSS
- React Aria Components
- Supabase Auth + PostgreSQL + RLS
- Zod
- Gemini melalui SDK resmi Google, server-side only
- Web Speech API untuk STT/TTS
- Vitest
- Playwright + axe
- ESLint + jsx-a11y
- Prettier
- pnpm

## Cara kerja AI
- Kerjakan hanya scope yang diminta.
- Sebelum coding: inspect file yang relevan, lalu jelaskan rencana singkat.
- Setelah coding: jalankan test/check yang relevan.
- Laporkan file yang berubah, hasil test, dan masalah yang tersisa.
- Jika requirement ambigu, tanyakan satu pertanyaan paling penting sebelum mengubah arsitektur.
- Jangan menempelkan isi seluruh PRD ke jawaban.
