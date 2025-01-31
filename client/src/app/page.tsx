import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const token = (await cookies()).get("token")?.value;
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold">Starters App</span>
          </div>
          <Link href={token ? "/profile" : "/login"}>
            <Button variant="secondary">{token ? "Profile" : "Login"}</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              An example app built using Next.js
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              I&apos;m building a web app with Next.js 13 and open sourcing
              everything. Follow along as we figure this out together.
            </p>
            <div className="space-x-4">
              <Link href="/protected">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
