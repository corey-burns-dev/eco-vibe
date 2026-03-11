import { persistentAtom } from "@nanostores/persistent";
import { atom, computed } from "nanostores";
import { products } from "../data/products.js";

export const cart = persistentAtom("eco-vibe-cart-v1", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const isCartOpen = atom(false);

export const lineItems = computed(cart, ($cart) => {
  return $cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) return null;
      return {
        ...item,
        product,
        subtotal: product.price * item.quantity,
      };
    })
    .filter(Boolean);
});

export const itemCount = computed(lineItems, ($lineItems) => {
  return $lineItems.reduce((count, item) => count + item.quantity, 0);
});

export const subtotal = computed(lineItems, ($lineItems) => {
  return $lineItems.reduce((total, item) => total + item.subtotal, 0);
});

export function addToCart(productId, quantity = 1) {
  const resolvedId = Number(productId);
  const resolvedQuantity = Math.max(1, Math.floor(Number(quantity)));

  if (!products.some((p) => p.id === resolvedId)) return;

  const current = cart.get();
  const existing = current.find((item) => item.productId === resolvedId);

  if (!existing) {
    cart.set([...current, { productId: resolvedId, quantity: resolvedQuantity }]);
  } else {
    cart.set(
      current.map((item) =>
        item.productId === resolvedId
          ? { ...item, quantity: item.quantity + resolvedQuantity }
          : item,
      ),
    );
  }
}

export function updateQuantity(productId, quantity) {
  const resolvedId = Number(productId);
  const resolvedQuantity = Math.floor(Number(quantity));

  if (resolvedQuantity <= 0) {
    removeFromCart(resolvedId);
    return;
  }

  const current = cart.get();
  cart.set(
    current.map((item) =>
      item.productId === resolvedId ? { ...item, quantity: resolvedQuantity } : item,
    ),
  );
}

export function removeFromCart(productId) {
  const resolvedId = Number(productId);
  const current = cart.get();
  cart.set(current.filter((item) => item.productId !== resolvedId));
}

export function clearCart() {
  cart.set([]);
}

export function openCart() {
  isCartOpen.set(true);
}

export function closeCart() {
  isCartOpen.set(false);
}
