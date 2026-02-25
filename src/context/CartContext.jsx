import { useEffect, useMemo, useState } from 'react';
import CartContext from './cart-context.js';
import { products } from '../data/products.js';

const CART_STORAGE_KEY = 'eco-vibe-cart-v1';

function loadStoredCart() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? '[]');

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
      }))
      .filter((item) => Number.isInteger(item.productId) && item.quantity > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const lineItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          if (!product) {
            return null;
          }

          return {
            ...item,
            product,
            subtotal: product.price * item.quantity,
          };
        })
        .filter(Boolean),
    [cart],
  );

  const itemCount = useMemo(
    () => lineItems.reduce((count, item) => count + item.quantity, 0),
    [lineItems],
  );

  const subtotal = useMemo(
    () => lineItems.reduce((total, item) => total + item.subtotal, 0),
    [lineItems],
  );

  function addToCart(productId, quantity = 1) {
    const resolvedId = Number(productId);
    const resolvedQuantity = Number.isFinite(Number(quantity)) ? Math.max(1, Math.floor(Number(quantity))) : 1;

    if (!products.some((product) => product.id === resolvedId)) {
      return;
    }

    setCart((current) => {
      const existing = current.find((item) => item.productId === resolvedId);

      if (!existing) {
        return [...current, { productId: resolvedId, quantity: resolvedQuantity }];
      }

      return current.map((item) =>
        item.productId === resolvedId
          ? { ...item, quantity: item.quantity + resolvedQuantity }
          : item,
      );
    });
  }

  function updateQuantity(productId, quantity) {
    const resolvedId = Number(productId);
    const resolvedQuantity = Math.floor(Number(quantity));

    if (resolvedQuantity <= 0 || !Number.isFinite(resolvedQuantity)) {
      setCart((current) => current.filter((item) => item.productId !== resolvedId));
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.productId === resolvedId ? { ...item, quantity: resolvedQuantity } : item,
      ),
    );
  }

  function removeFromCart(productId) {
    const resolvedId = Number(productId);
    setCart((current) => current.filter((item) => item.productId !== resolvedId));
  }

  function clearCart() {
    setCart([]);
  }

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  const value = {
    lineItems,
    itemCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
