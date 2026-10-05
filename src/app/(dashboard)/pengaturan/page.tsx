import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengaturan",
};

export default function PengaturanPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold text-gray-900">Pengaturan</h1>
      <p className="mt-4 text-gray-600 text-sm">
        Fitur pengaturan akan tersedia di tahap selanjutnya.
      </p>
    </main>
  );
}
