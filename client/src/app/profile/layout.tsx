import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 justify-between items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">
                Starters App
              </span>
            </Link>
          </div>
          <ThemeSwitcher />
        </div>
      </header>
      <main className="flex-1">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
