import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { addToCart, openCart } from '../store/cart.js';

function ProductDetailActions({ product }) {
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    addToCart(product.id, quantity);
    openCart();
  }

  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="flex items-center gap-1 rounded-full border border-sand-300 bg-sand-100 p-1">
        <button
          type="button"
          className="rounded-full p-2 text-forest-700 transition hover:bg-sand-200"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((current) => Math.max(1, current - 1))}
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
  );
}

export default ProductDetailActions;
