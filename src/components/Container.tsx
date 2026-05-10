export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl p-4 space-y-4">
      {children}
    </div>
  );
}
