import type { Metadata } from "next";
import { logout } from "@/app/actions/auth";
import Navigation from "@/components/a11y/Navigation";

export const metadata: Metadata = {
  title: {
    template: "%s — Asisten AI Tunanetra",
    default: "Beranda — Asisten AI Tunanetra",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="font-semibold text-gray-900">Asisten AI Tunanetra</span>
          <Navigation />
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1"
          >
            Keluar
          </button>
        </form>
      </header>
      {children}
    </div>
  );
}
