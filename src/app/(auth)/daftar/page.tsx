import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Buat akun baru untuk menggunakan Asisten AI Tunanetra.",
};

export default function DaftarPage() {
  return (
    <main id="main-content">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Buat akun</h1>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-gray-600">
        Sudah punya akun?{" "}
        <Link
          href="/masuk"
          className="font-medium text-blue-700 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
        >
          Masuk di sini
        </Link>
      </p>
    </main>
  );
}
