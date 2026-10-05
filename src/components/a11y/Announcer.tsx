"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Announcer Component
 * 
 * Provides an aria-live region to announce route changes and dynamic content
 * updates to screen reader users. Essential for Single Page Applications (SPAs).
 */
export default function Announcer() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    // Announce route changes
    if (pathname) {
      // Small delay ensures the screen reader finishes reading the click action
      // before announcing the new page, and also bypasses the synchronous setState warning.
      const timeoutId = setTimeout(() => {
        setAnnouncement(`Navigasi ke halaman: ${pathname === "/" ? "Beranda" : pathname.replace("/", "")}`);
      }, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcement}
    </div>
  );
}
