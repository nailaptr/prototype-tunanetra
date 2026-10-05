

/**
 * SkipLink Component
 * 
 * Provides a skip navigation link for keyboard and screen reader users.
 * This should be the first focusable element on the page.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-700 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
    >
      Lewati ke konten utama
    </a>
  );
}
