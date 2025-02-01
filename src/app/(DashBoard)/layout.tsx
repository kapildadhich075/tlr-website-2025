import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await auth();

  if (!userId) {
    return redirect("/");
  }

  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const { role } = user.publicMetadata as { role?: string };

  if (role === "admin") {
    return redirect("/admin");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm"
              >
                <span className="text-yellow-300">🏠</span>
                <span className="bg-gradient-to-r from-yellow-200 to-pink-200 text-transparent bg-clip-text">
                  Home
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/services"
                className="flex items-center space-x-2  transition-all transform 
                backdrop-blur-sm "
              >
                <span className="text-xl">🤖</span>
                <span className="font-semibold bg-gradient-to-r from-blue-200 to-cyan-200 text-transparent bg-clip-text">
                  Twitter Bot
                </span>
                <span className="animate-pulse text-xs bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 rounded-full font-bold">
                  Live
                </span>
              </Link>

              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <UserButton />
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
