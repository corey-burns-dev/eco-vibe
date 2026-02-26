import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart.js';
import { formatUSD } from '../utils/format.js';

function CartDrawer() {
  const {
    lineItems,
    itemCount,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <div
      className={`fixed inset-0 z-[60] transition ${isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!isCartOpen}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-forest-900/45 transition ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
        aria-label="Close cart"
        onClick={closeCart}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-sand-200 bg-sand-50 shadow-2xl transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-sand-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-forest-700" />
            <h2 className="text-3xl font-medium text-forest-900">Your Bag</h2>
          </div>
          <button
            type="button"
            className="rounded-full p-2 text-forest-600 transition hover:bg-sand-200 hover:text-forest-900"
            aria-label="Close cart"
            onClick={closeCart}
          >
            <X size={18} />
          </button>
        </header>

        {lineItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="mb-3 text-4xl font-light text-forest-900">
              Your bag is empty
            </p>
            <p className="mb-6 font-sans text-sm text-forest-600">
              Add a few low-waste essentials to get started.
            </p>
            <Link
              to="/shop"
              className="rounded-full bg-forest-900 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sand-50"
              onClick={closeCart}
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {lineItems.map((item) => (
                <article
                  key={item.productId}
                  className="rounded-2xl border border-sand-200 bg-sand-100 p-3"
                >
                  <div className="mb-3 flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-20 rounded-xl object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-2xl font-medium leading-tight text-forest-900">
                        {item.product.name}
                      </h3>
                      <p className="mt-1 font-sans text-xs uppercase tracking-[0.17em] text-forest-500">
                        {item.product.category}
                      </p>
                      <p className="mt-2 font-sans text-sm font-semibold text-forest-700">
                        {formatUSD(item.product.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 rounded-full border border-sand-300 bg-sand-50 p-1">
                      <button
                        type="button"
                        className="rounded-full p-1.5 text-forest-700 transition hover:bg-sand-200"
                        aria-label={`Decrease ${item.product.name} quantity`}
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-7 text-center font-sans text-sm font-semibold text-forest-700">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="rounded-full p-1.5 text-forest-700 transition hover:bg-sand-200"
                        aria-label={`Increase ${item.product.name} quantity`}
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="font-sans text-sm font-semibold text-forest-800">
                        {formatUSD(item.subtotal)}
                      </p>
                      <button
                        type="button"
                        className="rounded-full p-1.5 text-forest-500 transition hover:bg-sand-200 hover:text-clay-700"
                        aria-label={`Remove ${item.product.name}`}
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <footer className="border-t border-sand-200 p-5">
              <div className="mb-4 flex items-center justify-between font-sans">
                <p className="text-xs uppercase tracking-[0.18em] text-forest-600">
                  {itemCount} items
                </p>
                <p className="text-lg font-semibold text-forest-900">
                  {formatUSD(subtotal)}
                </p>
              </div>

              <Link
                to="/checkout"
                className="mb-3 block w-full rounded-full bg-forest-900 px-6 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:bg-forest-700"
                onClick={closeCart}
              >
                Checkout
              </Link>

              <Link
                to="/cart"
                className="mb-3 block w-full rounded-full border border-sand-300 px-6 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest-700 transition hover:border-fern-500 hover:text-fern-700"
                onClick={closeCart}
              >
                View Cart
              </Link>

              <button
                type="button"
                className="w-full rounded-full border border-sand-300 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest-700 transition hover:border-clay-500 hover:text-clay-700"
                onClick={clearCart}
              >
                Clear Bag
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
