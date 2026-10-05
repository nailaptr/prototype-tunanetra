import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun Asisten AI Tunanetra Anda.",
};

export default function MasukPage() {
  return (
    <main id="main-content">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Masuk</h1>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-gray-600">
        Belum punya akun?{" "}
        <Link
          href="/daftar"
          className="font-medium text-blue-700 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
        >
          Daftar sekarang
        </Link>
      </p>
    </main>
  );
}
