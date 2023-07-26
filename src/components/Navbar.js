"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  const { data: auth, status } = useSession();
  console.log(auth, status);
  return (
    <header className="fixed w-full h-16 bg-brand-700 text-white flex items-center justify-around">
      <div className="text-xl">Ecommerce</div>
      <nav>
        <ul className="flex gap-5 items-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/shop">Shop</NavLink>
          <NavLink href="/cart">Cart</NavLink>
          {auth ? (
            <Link href="/profile">
              <Image
                height={35}
                width={35}
                className="rounded-full"
                src={auth.user.image}
                alt={auth.user.name}
              />
            </Link>
          ) : (
            <NavLink href="/api/auth/signin">Sign In</NavLink>
          )}
        </ul>
      </nav>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <li className="">
      <Link className="hover:text-gray-100" href={href}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
