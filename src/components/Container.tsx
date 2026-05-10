export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl p-4 lg:px-8 lg:py-8 space-y-8">
      {children}
    </div>
  );
}
