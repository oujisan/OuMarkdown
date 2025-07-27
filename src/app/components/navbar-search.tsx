'use client';

import { useState } from 'react';

interface NavbarProps {
  onSearchChange?: (search: string) => void;
}

export default function Navbar({ onSearchChange }: NavbarProps) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

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

          {/* Search Bar */}
          <div className="flex justify-center mb-2">
            <div className="flex items-center border-x-2 border-[#2a6fd1] rounded-full px-4 py-2 bg-[#161b22] gap-3 w-full max-w-2xl">
              <img src="/search.svg" className="h-6 w-auto" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
                className="w-full outline-none bg-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}