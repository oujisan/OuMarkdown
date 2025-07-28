// src/app/loading.tsx
export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0d1117] z-50">
      <div className="text-white animate-pulse text-lg">Loading page...</div>
    </div>
  )
}
