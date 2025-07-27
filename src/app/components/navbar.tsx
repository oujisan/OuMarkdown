'use client';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-bg)] text-[var(--color-text-light)] shadow-sm backdrop-blur-md">
      <nav className="w-full">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 md:px-10 lg:px-16">
          
          <div className="grid grid-cols-3 items-center mb-6">
            {/* Logo Fumori */}
            <div className="flex items-center">
              <a href="/" className="flex items-center h-full" aria-label="Fumori Home">
                <img src="/fumori.svg" alt="Fumori Logo" className="h-5 w-auto" />
              </a>
            </div>

            {/* Title */}
            <div className="text-center">
              <p className="font-semibold">OuMarkdown</p>
            </div>

            {/* GitHub */}
            <div className="flex items-center justify-end gap-4">
              <a
                href="https://github.com/oujisan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-1 rounded-md border border-transparent transition-all hover:border-[var(--color-gray)]"
              >
                <img src="/github.svg" alt="GitHub" className="h-6 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}