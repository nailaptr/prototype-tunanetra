import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konfirmasi Email",
  description: "Cek email Anda untuk mengkonfirmasi pendaftaran.",
};

export default function KonfirmasiPage() {
  return (
    <main id="main-content">
      <h1 className="text-xl font-semibold text-gray-900 mb-4">
        Cek email Anda
      </h1>
      <p className="text-gray-600 text-sm leading-relaxed">
        Kami telah mengirim tautan konfirmasi ke alamat email yang Anda daftarkan.
        Buka email tersebut dan klik tautan untuk mengaktifkan akun Anda.
      </p>
      <p className="mt-4 text-gray-600 text-sm">
        Tidak menerima email? Periksa folder spam atau{" "}
        <a
          href="/daftar"
          className="font-medium text-blue-700 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
        >
          coba daftar ulang
        </a>
        .
      </p>
    </main>
  );
}
