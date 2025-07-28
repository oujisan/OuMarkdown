"use client";

import { useRef, useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import hljs from "highlight.js";
import "highlight.js/styles/nord.css";

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState("Code");

  const handleCopy = async () => {
    const code = preRef.current?.innerText;
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }


  useEffect(() => {
    if (preRef.current) {
      const codeElement = preRef.current.querySelector("code");
      if (codeElement) {
        const langClass = [...codeElement.classList].find((cls) =>
          cls.startsWith("language-")
        );
        if (langClass) {
          const detected = langClass.replace("language-", "");
          setLanguage(capitalize(detected));
        }

        // Highlight
        hljs.highlightElement(codeElement as HTMLElement);
      }
    }
  }, []);

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-[var(--color-panel)]">
  {/* Header */}
  <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-panel)] text-xs text-[var(--color-text-dim)] font-mono border-b border-[var(--color-bg)]">
    <span className="tracking-wide">{language}</span>
    <button
      onClick={handleCopy}
      className="p-1 rounded hover:text-[var(--color-text-light)] hover:bg-[var(--color-gray)] transition opacity-40 group-hover:opacity-100"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  </div>

  {/* Code Block */}
    <pre
      ref={preRef}
      className="overflow-x-auto max-h-96 p-4 m-0 bg-[var(--color-panel)] text-[var(--color-text-light)] text-sm font-mono custom-scroll"
    >
      {children}
    </pre>
  </div>

  );
}
