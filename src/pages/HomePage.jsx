import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/useCart.js';
import { products } from '../data/products.js';

function HomePage() {
  const { addToCart, openCart } = useCart();
  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 4);

  function handleAddToCart(productId) {
    addToCart(productId, 1);
    openCart();
  }

  return (
    <>
      <Hero />

      <section className="bg-forest-900 px-5 py-16 text-sand-50 md:px-10">
        <div className="mx-auto max-w-4xl text-center reveal-up">
          <h2 className="text-4xl font-light leading-snug md:text-5xl">
            "We do not need a handful of people doing zero waste perfectly. We
            need millions doing it imperfectly."
          </h2>
          <p className="mt-6 font-sans text-xs uppercase tracking-[0.24em] text-fern-200">
            Anne-Marie Bonneau
          </p>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div className="reveal-up">
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-clay-700">
                Featured Collection
              </p>
              <h2 className="text-5xl font-light text-forest-900">
                Everyday Swaps
              </h2>
              <p className="mt-4 max-w-lg font-sans text-forest-600">
                Better alternatives to single-use habits, selected for practical
                use and long life.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest-700 transition hover:text-fern-700"
            >
              View All
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="reveal-up"
                style={{ animationDelay: `${80 + index * 70}ms` }}
              >
                <ProductCard
                  product={product}
                  compact
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-sand-200 bg-sand-100 px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="relative reveal-up">
            <img
              src="/images/natural-materials.png"
              alt="Natural materials"
              className="aspect-[5/4] w-full rounded-[2.2rem] object-cover shadow-soft"
              loading="lazy"
            />
            <img
              src="/images/beeswax-wraps.png"
              alt="Beeswax wraps"
              className="absolute -bottom-9 -right-3 hidden w-48 rounded-[1.7rem] border-4 border-sand-100 object-cover shadow-lg md:block"
              loading="lazy"
            />
          </div>

          <div className="reveal-up [animation-delay:120ms]">
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.23em] text-clay-700">
              Materials Matter
            </p>
            <h3 className="mb-6 text-5xl font-light leading-tight text-forest-900">
              Sourced with intention. Crafted to last.
            </h3>
            <p className="mb-7 max-w-lg font-sans text-forest-600">
              Every material is selected for durability, transparency, and lower
              lifecycle impact. We favor certified suppliers and traceable
              sourcing from farm to final product.
            </p>
            <ul className="space-y-3 font-sans text-sm text-forest-700">
              <li>100% plastic-free shipping materials</li>
              <li>Fair Trade certified production partners</li>
              <li>End-of-life recycling and take-back pilots</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[2.25rem] bg-fern-700 px-8 py-10 text-sand-50 md:grid-cols-3 md:px-12">
          <div className="reveal-up">
            <p className="text-4xl font-medium">152k</p>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-fern-100">
              Single-use items avoided
            </p>
          </div>
          <div className="reveal-up [animation-delay:100ms]">
            <p className="text-4xl font-medium">43</p>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-fern-100">
              Ethical supplier partners
            </p>
          </div>
          <div className="reveal-up [animation-delay:200ms]">
            <p className="text-4xl font-medium">98%</p>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-fern-100">
              Orders delivered plastic-free
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
