import Link from "next/link";

function Navbar() {
  return (
    <header className="w-full h-16 bg-indigo-700 text-white flex items-center justify-around">
      <div className="text-xl">Ecommerce</div>
      <nav>
        <ul className="flex gap-5">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/shop">Shop</NavLink>
          <NavLink href="/cart">Cart</NavLink>
        </ul>
      </nav>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <li className="">
      <Link className="hover:text-gray-100" href={href}>{children}</Link>
    </li>
  );
}

export default Navbar;
