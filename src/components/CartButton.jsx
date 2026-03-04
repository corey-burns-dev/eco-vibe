import { useStore } from '@nanostores/react';
import { ShoppingBag } from 'lucide-react';
import { itemCount as itemCountStore, openCart } from '../store/cart.js';

function CartButton() {
  const $itemCount = useStore(itemCountStore);

  return (
    <button
      className="relative rounded-full p-2 text-forest-700 transition hover:bg-sand-200"
      type="button"
      aria-label="Open bag"
      onClick={openCart}
    >
      <ShoppingBag size={21} />
      {$itemCount > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-clay-500 text-[10px] font-bold text-sand-50">
          {Math.min($itemCount, 99)}
        </span>
      ) : null}
    </button>
  );
}

export default CartButton;
