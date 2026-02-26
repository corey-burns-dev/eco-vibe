import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatUSD } from '../utils/format.js';

function ProductCard({ product, compact = false, onAddToCart }) {
  return (
    <article className="group rounded-3xl border border-sand-200 bg-sand-50 p-3 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative overflow-hidden rounded-3xl bg-sand-200">
        <Link to={`/shop/${product.id}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            className={`w-full object-cover transition duration-700 group-hover:scale-105 ${compact ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}
            loading="lazy"
          />
        </Link>
        <span className="absolute left-3 top-3 rounded-full bg-sand-50/90 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-forest-700">
          {product.category}
        </span>
      </div>

      <div className="px-2 pb-1 pt-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-2xl font-medium leading-tight text-forest-900">
            <Link
              to={`/shop/${product.id}`}
              className="transition hover:text-fern-700"
            >
              {product.name}
            </Link>
          </h3>
          <p className="font-sans text-sm font-semibold text-forest-700">
            {formatUSD(product.price)}
          </p>
        </div>
        <p className="mb-4 font-sans text-sm leading-relaxed text-forest-600">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-forest-300 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-700 transition hover:border-fern-500 hover:text-fern-700"
            onClick={() => onAddToCart?.(product.id)}
          >
            Add to Bag
            <Plus size={14} />
          </button>

          <Link
            to={`/shop/${product.id}`}
            className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-600 transition hover:text-forest-900"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
