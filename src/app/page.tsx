import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
        The Panic Manual
      </h1>
      <p className="text-text-muted text-lg md:text-xl max-w-2xl text-center mb-8">
        AI-powered guides to fight back against confusing medical bills and collection letters
      </p>
      <div className="p-6 rounded-xl border-l-4 border-primary" style={{ backgroundColor: 'var(--color-breath)' }}>
        <p className="font-display text-xl mb-2">Take a breath.</p>
        <p className="text-text-muted">
          You&apos;re not going to jail. This is solvable. Let&apos;s figure it out together.
        </p>
      </div>
    </main>
  );
}
