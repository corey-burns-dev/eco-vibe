import { ArrowRight, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const shopLinks = [
  { label: 'Kitchen', to: '/shop' },
  { label: 'Travel', to: '/shop' },
  { label: 'Home', to: '/shop' },
  { label: 'Personal Care', to: '/shop' },
];

const aboutLinks = [
  { label: 'Mission', to: '/mission' },
  { label: 'Journal', to: '/journal' },
  { label: 'Material Guide', to: '/mission' },
  { label: 'Impact Report', to: '/mission' },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-900 px-5 pb-10 pt-16 text-sand-50 md:px-10 md:pt-20">
      <div className="pointer-events-none absolute -left-28 top-0 h-64 w-64 rounded-full bg-fern-700/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-64 w-64 rounded-full bg-clay-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 border-b border-forest-700 pb-12 font-sans md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-5 flex items-center gap-2 font-serif text-3xl text-sand-50">
            <Leaf size={24} className="text-fern-300" />
            Eco<span className="text-fern-300">Vibe</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-forest-200">
            Thoughtfully designed essentials for low-waste homes and better daily habits.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-forest-300">Shop</h4>
          <div className="space-y-3 text-sm text-forest-200">
            {shopLinks.map((item) => (
              <Link key={item.label} to={item.to} className="block transition hover:text-sand-50">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-forest-300">About</h4>
          <div className="space-y-3 text-sm text-forest-200">
            {aboutLinks.map((item) => (
              <Link key={item.label} to={item.to} className="block transition hover:text-sand-50">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-forest-300">Newsletter</h4>
          <p className="mb-4 text-sm text-forest-200">Monthly tips, practical swaps, and new product stories.</p>
          <label className="flex items-center gap-2 border-b border-forest-600 pb-2">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent text-sm text-sand-50 placeholder:text-forest-400 focus:outline-none"
            />
            <button type="button" className="text-forest-300 transition hover:text-sand-50" aria-label="Subscribe">
              <ArrowRight size={17} />
            </button>
          </label>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 pt-8 font-sans text-[11px] uppercase tracking-[0.18em] text-forest-300 md:flex-row md:items-center">
        <p>Copyright {new Date().getFullYear()} EcoVibe. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://instagram.com" className="transition hover:text-sand-50">
            Instagram
          </a>
          <a href="https://pinterest.com" className="transition hover:text-sand-50">
            Pinterest
          </a>
          <a href="https://x.com" className="transition hover:text-sand-50">
            X
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
