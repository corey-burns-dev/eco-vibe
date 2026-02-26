import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart.js';
import { formatUSD } from '../utils/format.js';

function CartPage() {
  const { lineItems, itemCount, subtotal, updateQuantity, removeFromCart } =
    useCart();

  const shipping = subtotal > 0 && subtotal < 75 ? 7 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (lineItems.length === 0) {
    return (
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-sand-200 bg-sand-100 p-8 text-center">
          <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-clay-700">
            Cart
          </p>
          <h1 className="mb-4 text-5xl font-light text-forest-900">
            Your bag is empty.
          </h1>
          <p className="mb-7 font-sans text-forest-600">
            Browse products and add a few low-waste essentials to get started.
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

  return (
    <section className="px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-clay-700">
          Cart
        </p>
        <h1 className="mb-8 text-6xl font-light text-forest-900">Your Bag</h1>

        <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            {lineItems.map((item) => (
              <article
                key={item.productId}
                className="rounded-3xl border border-sand-200 bg-sand-100 p-4 md:p-5"
              >
                <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-28 w-full rounded-2xl object-cover sm:h-32"
                    loading="lazy"
                  />
                  <div>
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-forest-500">
                          {item.product.category}
                        </p>
                        <h2 className="text-3xl font-light leading-tight text-forest-900">
                          {item.product.name}
                        </h2>
                      </div>
                      <p className="font-sans text-sm font-semibold text-forest-800">
                        {formatUSD(item.subtotal)}
                      </p>
                    </div>

                    <p className="mb-4 font-sans text-sm text-forest-600">
                      {item.product.description}
                    </p>

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

                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-sand-300 px-3 py-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-600 transition hover:border-clay-500 hover:text-clay-700"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        Remove
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-3xl border border-sand-200 bg-sand-100 p-5">
            <h2 className="mb-4 text-4xl font-light text-forest-900">
              Order Summary
            </h2>
            <div className="space-y-3 font-sans text-sm text-forest-700">
              <div className="flex items-center justify-between">
                <span>{itemCount} items</span>
                <span>{formatUSD(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatUSD(shipping)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated tax</span>
                <span>{formatUSD(tax)}</span>
              </div>
              <div className="mt-1 border-t border-sand-300 pt-3" />
              <div className="flex items-center justify-between text-base font-semibold text-forest-900">
                <span>Total</span>
                <span>{formatUSD(total)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-5 block rounded-full bg-forest-900 px-6 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:bg-forest-700"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/shop"
              className="mt-3 block rounded-full border border-sand-300 px-6 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest-700 transition hover:border-fern-500 hover:text-fern-700"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
