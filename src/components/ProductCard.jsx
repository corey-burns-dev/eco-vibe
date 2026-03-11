import { ShoppingBag } from "lucide-react";
import { addToCart, openCart } from "../store/cart.js";
import { formatUSD } from "../utils/format.js";

function ProductCard({ product, compact = false, onAddToCart = null }) {
  const handleAdd = (e) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(product.id);
    } else {
      addToCart(product.id, 1);
      openCart();
    }
  };

  return (
    <article className="group relative">
      <div
        className={`hover-lift overflow-hidden rounded-[2.5rem] border border-forest-900/5 bg-sand-100 shadow-soft transition-all duration-500 group-hover:shadow-premium ${compact ? "p-2" : "p-2.5"}`}
      >
        <a href={`/shop/${product.id}`} className="block overflow-hidden rounded-[2rem]">
          <img
            src={product.image}
            alt={product.name}
            width={600}
            height={450}
            className={`w-full object-cover transition duration-1000 ease-out group-hover:scale-110 ${compact ? "aspect-square" : "aspect-[4/3]"}`}
            loading="lazy"
            decoding="async"
          />
        </a>
        <button
          type="button"
          onClick={handleAdd}
          className="glass absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full text-forest-900 opacity-0 shadow-premium transition-all duration-500 hover:bg-forest-900 hover:text-sand-50 hover:scale-110 group-hover:opacity-100 md:right-8 md:top-8"
          aria-label={`Add ${product.name} to bag`}
        >
          <ShoppingBag size={20} />
        </button>
      </div>

      <div className={`${compact ? "mt-4 px-2" : "mt-6 px-3"}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="mb-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-clay-700">
              {product.category}
            </p>
            <h3
              className={`font-light leading-tight text-forest-900 transition-colors ${compact ? "text-2xl" : "text-3xl"}`}
            >
              <a href={`/shop/${product.id}`} className="hover:text-fern-700">
                {product.name}
              </a>
            </h3>
          </div>
          <p
            className={`mt-1 font-sans font-bold text-forest-800 ${compact ? "text-base" : "text-lg"}`}
          >
            {formatUSD(product.price)}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
