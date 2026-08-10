export function PageLayout({ children }) {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-transparent text-[var(--text-primary)] transition-colors duration-300">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  )
}
