import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const { role } = user.publicMetadata as { role?: string };

  if (role !== "admin") {
    return redirect("/");
  }

  return (
    <div>
      <header className="sticky top-0 z-50 flex justify-between items-center p-6 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        {/* Logo Section */}
        <div className="flex  items-center gap-4">
          <div className="flex  items-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 transition-transform hover:scale-110 duration-300 cursor-pointer">
            <Image
              src="https://ik.imagekit.io/umdiwr6ma/tlr%20logo.png?updatedAt=1706964634422"
              alt="Logo"
              width={50}
              height={50}
              className="hover:rotate-12 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {["Dashboard", "Users", "Settings", "Reports"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-white hover:bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text bg-transparent transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <h2 className="text-white text-lg font-bold group">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">
                {user.firstName} {user.lastName}
              </span>
            </h2>
            <p className="text-sm text-gray-400">Admin</p>
          </div>
          <div className="hover:scale-110 transition-transform duration-200">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
