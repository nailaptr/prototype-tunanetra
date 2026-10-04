# Accessibility & Security Rules

## Accessibility
- `lang="id"`.
- Gunakan semantic HTML dan landmark.
- Skip link harus menjadi fokus pertama.
- Heading harus berurutan.
- Semua fungsi harus bisa digunakan dengan keyboard.
- Fokus terlihat jelas dan tidak boleh terjebak.
- Setiap control harus memiliki accessible name.
- Ikon tanpa teks harus memiliki aria-label.
- Dynamic status menggunakan live region secara hati-hati agar tidak diumumkan dua kali.
- Navigasi antarhalaman harus mengumumkan halaman dan mengelola fokus ke h1 tanpa duplikasi pengumuman.
- Kontras teks minimal 4.5:1.
- Jangan menyampaikan informasi hanya melalui warna.
- Target sentuh minimal 44x44 px.
- Jangan memakai shortcut Insert atau CapsLock.
- Jangan membuat suara otomatis jika pengguna belum mengaktifkan fitur tersebut.
- Beri fallback teks jika browser tidak mendukung SpeechRecognition.

## Security
- AI API key hanya server-side.
- Tidak boleh ada secret di source code, client bundle, response API, atau log.
- Jangan gunakan service-role key untuk alur aplikasi biasa.
- Validasi input server-side dengan Zod.
- Batasi ukuran dan tipe gambar.
- Jangan menyimpan gambar.
- Rate limit endpoint AI.
- Semua tabel user-owned wajib memakai RLS.
- Jangan membocorkan apakah email tertentu sudah terdaftar melalui pesan error.
- Jangan log isi gambar atau secret.
