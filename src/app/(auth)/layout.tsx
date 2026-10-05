import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s — Asisten AI Tunanetra",
    default: "Autentikasi — Asisten AI Tunanetra",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* App name / logo area */}
        <div className="text-center mb-8">
          <span
            aria-hidden="true"
            className="text-4xl block mb-3"
          >
            👁️
          </span>
          <span className="text-2xl font-bold text-gray-900">
            Asisten AI Tunanetra
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-md px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
