import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/useCart.js';
import { products } from '../data/products.js';
import { formatUSD } from '../utils/format.js';

const benefitsByCategory = {
  Kitchen: [
    'Ideal for meal prep and lunch packing',
    'Safe materials made for repeat daily use',
    'Pairs with reusable storage and cleaning kits',
  ],
  Lifestyle: [
    'Designed for long-term durability',
    'Lightweight and easy to carry daily',
    'Crafted with low-impact fibers',
  ],
  Travel: [
    'Built to reduce disposable travel waste',
    'Compact profile for on-the-go routines',
    'Ready for commutes and weekend trips',
  ],
  Cleaning: [
    'Helps replace single-use wipes and plastics',
    'Works with refill and concentrate systems',
    'Easy to maintain between uses',
  ],
  'Personal Care': [
    'Gentle on skin and daily routines',
    'Plastic-free alternatives to common disposables',
    'Minimal packaging and recyclable materials',
  ],
  Home: [
    'Timeless styling to reduce replacement cycles',
    'Comfort-first construction and quality materials',
    'Low-impact production and finishing',
  ],
};

function ProductDetailPage() {
  const { productId } = useParams();
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const resolvedId = Number(productId);
  const product = products.find((entry) => entry.id === resolvedId);

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter((entry) => entry.id !== product.id)
      .sort(
        (a, b) =>
          Number(a.category !== product.category) -
          Number(b.category !== product.category),
      )
      .slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-sand-200 bg-sand-100 p-8 text-center">
          <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-clay-700">
            Product Not Found
          </p>
          <h1 className="mb-4 text-5xl font-light text-forest-900">
            This product is no longer available.
          </h1>
          <p className="mb-7 font-sans text-forest-600">
            Browse the full collection to discover current low-waste essentials.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-forest-900 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sand-50"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  const benefits = benefitsByCategory[product.category] ?? [
    'Curated for durability and repeat use',
    'Made to simplify low-waste routines',
    'Designed with practical everyday function',
  ];

  function handleAddToCart() {
    addToCart(product.id, quantity);
    openCart();
  }

  return (
    <>
      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/shop"
            className="mb-8 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest-600 transition hover:text-forest-900"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="overflow-hidden rounded-[2.2rem] border border-sand-200 bg-sand-100 p-3">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-[4/5] w-full rounded-[1.7rem] object-cover"
              />
            </div>

            <div>
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-clay-700">
                {product.category}
              </p>
              <h1 className="mb-4 text-6xl font-light leading-[1.02] text-forest-900">
                {product.name}
              </h1>
              <p className="mb-4 font-sans text-2xl font-semibold text-forest-800">
                {formatUSD(product.price)}
              </p>
              <p className="mb-8 max-w-xl font-sans text-base leading-relaxed text-forest-600">
                {product.description}
              </p>

              <div className="mb-8 flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full border border-sand-300 bg-sand-100 p-1">
                  <button
                    type="button"
                    className="rounded-full p-2 text-forest-700 transition hover:bg-sand-200"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                  >
                    <Minus size={16} />
                  </button>
                  <span className="min-w-8 text-center font-sans text-sm font-semibold text-forest-700">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="rounded-full p-2 text-forest-700 transition hover:bg-sand-200"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((current) => current + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  type="button"
                  className="rounded-full bg-forest-900 px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:bg-fern-600"
                  onClick={handleAddToCart}
                >
                  Add to Bag
                </button>
              </div>

              <div className="rounded-3xl border border-sand-200 bg-sand-100 p-5">
                <h2 className="mb-3 text-3xl font-light text-forest-900">
                  Why you will love it
                </h2>
                <ul className="space-y-2 font-sans text-sm text-forest-700">
                  {benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-sand-200 bg-sand-100 px-5 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-7 text-5xl font-light text-forest-900">
            You May Also Like
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedProducts.map((entry, index) => (
              <div
                key={entry.id}
                className="reveal-up"
                style={{ animationDelay: `${80 + index * 60}ms` }}
              >
                <ProductCard
                  product={entry}
                  compact
                  onAddToCart={(targetProductId) => {
                    addToCart(targetProductId, 1);
                    openCart();
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetailPage;
