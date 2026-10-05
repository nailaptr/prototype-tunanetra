"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/chat", label: "Chat AI" },
  { href: "/pengaturan", label: "Pengaturan" },
];

/**
 * Navigation Component
 * 
 * Accessible navigation menu using semantic <nav> and <ul> structure,
 * and aria-current="page" to indicate the active route to screen readers.
 */
export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigasi Utama">
      <ul className="flex space-x-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
