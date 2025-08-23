
import Link from "next/link";
import { auth } from "../lib/auth";
import Image from "next/image";
export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
            prefetch
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
            prefetch
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
              prefetch
            >
              <Image
                className="rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
                width={32}
                height={32}
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
              prefetch
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}