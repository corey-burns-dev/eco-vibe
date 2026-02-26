import { Filter, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/useCart.js';
import { products } from '../data/products.js';

function ShopPage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const { addToCart, openCart } = useCart();

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    let list = products.filter((product) => {
      const matchCategory = category === 'All' || product.category === category;
      const matchQuery = normalized.length
        ? `${product.name} ${product.description} ${product.category}`
            .toLowerCase()
            .includes(normalized)
        : true;

      return matchCategory && matchQuery;
    });

    if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list = [...list].sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
      );
    }

    return list;
  }, [category, query, sortBy]);

  function handleAddToCart(productId) {
    addToCart(productId, 1);
    openCart();
  }

  return (
    <>
      <Header
        eyebrow="Shop"
        title="Curated Essentials for Low-Waste Living"
        description="Browse eco-forward products by category and build a routine that reduces waste without sacrificing style or function."
        image="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Sustainable clothing and accessories"
      />

      <section className="px-5 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-4 rounded-3xl border border-sand-200 bg-sand-100 p-5 md:grid-cols-[1fr_auto_auto] md:items-center">
            <label className="flex items-center gap-3 rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3">
              <Search size={16} className="text-forest-500" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products"
                className="w-full bg-transparent font-sans text-sm text-forest-800 placeholder:text-forest-400 focus:outline-none"
              />
            </label>

            <label className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest-700">
              <Filter size={14} />
              Sort
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-full border border-sand-300 bg-sand-50 px-3 py-2 text-[11px] uppercase tracking-[0.12em]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name</option>
              </select>
            </label>

            <p className="font-sans text-xs uppercase tracking-[0.2em] text-forest-500">
              {filteredProducts.length} items
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                  item === category
                    ? 'bg-forest-900 text-sand-50'
                    : 'border border-sand-300 bg-sand-100 text-forest-700 hover:border-fern-500 hover:text-fern-700'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="reveal-up"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ShopPage;
