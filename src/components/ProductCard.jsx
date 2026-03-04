import { ShoppingBag } from 'lucide-react';
import { addToCart, openCart } from '../store/cart.js';
import { formatUSD } from '../utils/format.js';

function ProductCard({ product, compact = false, onAddToCart }) {
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
      <div className={`overflow-hidden rounded-[2rem] border border-sand-200 bg-sand-100 ${compact ? 'p-2' : 'p-2.5'}`}>
        <a href={`/shop/${product.id}`} className="block overflow-hidden rounded-[1.6rem]">
          <img
            src={product.image}
            alt={product.name}
            width={600}
            height={450}
            className={`w-full object-cover transition duration-700 group-hover:scale-110 ${compact ? 'aspect-square' : 'aspect-[4/3]'}`}
            loading="lazy"
          />
        </a>
        <button
          type="button"
          onClick={handleAdd}
          className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-sand-50/90 text-forest-900 opacity-0 shadow-sm transition-all duration-300 hover:bg-forest-900 hover:text-sand-50 group-hover:opacity-100 md:right-7 md:top-7"
          aria-label={`Add ${product.name} to bag`}
        >
          <ShoppingBag size={19} />
        </button>
      </div>

      <div className={`${compact ? 'mt-3 px-1' : 'mt-5 px-2'}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-clay-700">
              {product.category}
            </p>
            <h3 className={`font-light leading-tight text-forest-900 ${compact ? 'text-2xl' : 'text-3xl'}`}>
              <a href={`/shop/${product.id}`} className="hover:text-fern-700">
                {product.name}
              </a>
            </h3>
          </div>
          <p className={`font-sans font-semibold text-forest-800 ${compact ? 'text-sm' : 'text-base'}`}>
            {formatUSD(product.price)}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
