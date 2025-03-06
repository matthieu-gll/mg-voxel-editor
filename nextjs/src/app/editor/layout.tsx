import { InteractionMenu } from "@/components/InteractionMenu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-svh w-full bg-neutral-500">
      {children}
      <InteractionMenu />
    </main>
  );
}
