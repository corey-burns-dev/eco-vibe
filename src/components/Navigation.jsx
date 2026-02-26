import { Leaf, Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/useCart.js';

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/mission', label: 'Mission' },
  { to: '/journal', label: 'Journal' },
];

function navClass(isActive) {
  return `transition-colors ${isActive ? 'text-forest-800' : 'text-forest-600 hover:text-forest-900'}`;
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200/70 bg-sand-50/85 backdrop-blur-lg">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <button
          className="rounded-full p-2 text-forest-700 transition hover:bg-sand-200 md:hidden"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((state) => !state)}
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => navClass(isActive)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/"
          className="flex items-center gap-2 text-3xl font-medium tracking-tight text-forest-900"
        >
          <Leaf className="text-fern-500" size={27} />
          Eco<span className="text-fern-600">Vibe</span>
        </NavLink>

        <button
          className="relative rounded-full p-2 text-forest-700 transition hover:bg-sand-200"
          type="button"
          aria-label="Open bag"
          onClick={openCart}
        >
          <ShoppingBag size={21} />
          {itemCount > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-clay-500 text-[10px] font-bold text-sand-50">
              {Math.min(itemCount, 99)}
            </span>
          ) : null}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-sand-200 bg-sand-100 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.2em]">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => navClass(isActive)}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navigation;
