type Props = {
  children: React.ReactNode;
};

export function PageContainer({ children }: Props) {
  return (
    <main className="mx-auto flex max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      {children}
    </main>
  );
}
