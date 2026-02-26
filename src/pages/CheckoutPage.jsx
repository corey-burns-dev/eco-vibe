import { ArrowLeft, CheckCircle2, Tag, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart.js';
import { formatUSD } from '../utils/format.js';

const initialForm = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  shipping: 'standard',
  payment: 'card',
};

const promoCodes = {
  GREEN10: {
    type: 'percent',
    value: 0.1,
    label: '10% off order',
  },
  EARTH15: {
    type: 'percent',
    value: 0.15,
    minSubtotal: 100,
    label: '15% off orders over $100',
  },
  FREESHIP: {
    type: 'shipping',
    label: 'Free standard shipping',
  },
};

function validateField(name, value) {
  const trimmed = String(value ?? '').trim();

  if (name === 'email') {
    if (!trimmed) {
      return 'Email is required.';
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      return 'Enter a valid email address.';
    }

    return '';
  }

  if (name === 'firstName') {
    if (!trimmed) {
      return 'First name is required.';
    }

    if (trimmed.length < 2) {
      return 'First name is too short.';
    }

    return '';
  }

  if (name === 'lastName') {
    if (!trimmed) {
      return 'Last name is required.';
    }

    if (trimmed.length < 2) {
      return 'Last name is too short.';
    }

    return '';
  }

  if (name === 'address') {
    if (!trimmed) {
      return 'Address is required.';
    }

    if (trimmed.length < 5) {
      return 'Enter a fuller street address.';
    }

    return '';
  }

  if (name === 'city') {
    if (!trimmed) {
      return 'City is required.';
    }

    return '';
  }

  if (name === 'state') {
    if (!trimmed) {
      return 'State is required.';
    }

    if (trimmed.length < 2) {
      return 'Use a 2-letter state code.';
    }

    return '';
  }

  if (name === 'zip') {
    if (!trimmed) {
      return 'ZIP code is required.';
    }

    if (!/^\d{5}(?:-\d{4})?$/.test(trimmed)) {
      return 'Use ZIP format 12345 or 12345-6789.';
    }

    return '';
  }

  return '';
}

function validateForm(form) {
  const fields = [
    'email',
    'firstName',
    'lastName',
    'address',
    'city',
    'state',
    'zip',
  ];

  return fields.reduce((result, field) => {
    result[field] = validateField(field, form[field]);
    return result;
  }, {});
}

function CheckoutPage() {
  const { lineItems, itemCount, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const discount = useMemo(() => {
    if (!appliedPromo) {
      return 0;
    }

    if (appliedPromo.type === 'percent') {
      return subtotal * appliedPromo.value;
    }

    return 0;
  }, [appliedPromo, subtotal]);

  const shipping = useMemo(() => {
    if (itemCount === 0) {
      return 0;
    }

    const defaultShipping =
      form.shipping === 'express' ? 15 : subtotal >= 75 ? 0 : 7;

    if (appliedPromo?.type === 'shipping' && form.shipping === 'standard') {
      return 0;
    }

    return defaultShipping;
  }, [appliedPromo, form.shipping, itemCount, subtotal]);

  const taxableSubtotal = Math.max(subtotal - discount, 0);
  const tax = taxableSubtotal * 0.08;
  const total = taxableSubtotal + shipping + tax;

  function setField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));

    if (touched[name]) {
      setErrors((current) => ({
        ...current,
        [name]: validateField(name, value),
      }));
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setField(name, value);
  }

  function handleBlur(event) {
    const { name, value } = event.target;

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));

    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value),
    }));
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();

    if (!code) {
      setPromoError('Enter a promo code.');
      return;
    }

    const promo = promoCodes[code];

    if (!promo) {
      setPromoError('Promo code not recognized.');
      return;
    }

    if (promo.minSubtotal && subtotal < promo.minSubtotal) {
      setPromoError(
        `Code requires at least ${formatUSD(promo.minSubtotal)} subtotal.`,
      );
      return;
    }

    setAppliedPromo({ code, ...promo });
    setPromoInput('');
    setPromoError('');
  }

  function removePromo() {
    setAppliedPromo(null);
    setPromoError('');
  }

  function inputClass(name) {
    const hasError = touched[name] && errors[name];

    return `w-full rounded-xl border bg-sand-50 px-3 py-2.5 font-sans text-sm text-forest-800 outline-none focus:border-fern-500 ${
      hasError ? 'border-clay-500' : 'border-sand-300'
    }`;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm(form);
    const hasErrors = Object.values(nextErrors).some(Boolean);

    setErrors(nextErrors);
    setTouched({
      email: true,
      firstName: true,
      lastName: true,
      address: true,
      city: true,
      state: true,
      zip: true,
    });

    if (hasErrors) {
      return;
    }

    const orderId = `EV-${Date.now().toString().slice(-6)}`;

    setSubmittedOrder({
      id: orderId,
      email: form.email,
      firstName: form.firstName,
      itemCount,
      total,
      placedAt: new Date().toLocaleString(),
      promoCode: appliedPromo?.code ?? null,
      discount,
    });

    clearCart();
    setForm(initialForm);
    setErrors({});
    setTouched({});
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError('');
  }

  if (submittedOrder) {
    return (
      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-sand-200 bg-sand-100 p-8 text-center">
          <CheckCircle2 className="mx-auto mb-4 text-fern-600" size={42} />
          <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-clay-700">
            Order Confirmed
          </p>
          <h1 className="mb-4 text-5xl font-light text-forest-900">
            Thanks for your order.
          </h1>
          <p className="mb-6 font-sans text-forest-600">
            {submittedOrder.firstName || 'Customer'}, your order{' '}
            <strong>{submittedOrder.id}</strong> was placed on{' '}
            {submittedOrder.placedAt}.
          </p>
          <div className="mx-auto mb-7 max-w-sm rounded-2xl border border-sand-300 bg-sand-50 p-4 text-left font-sans text-sm text-forest-700">
            <p>Email: {submittedOrder.email}</p>
            <p>Items: {submittedOrder.itemCount}</p>
            {submittedOrder.promoCode ? (
              <p>Promo: {submittedOrder.promoCode}</p>
            ) : null}
            {submittedOrder.discount > 0 ? (
              <p>Discount: -{formatUSD(submittedOrder.discount)}</p>
            ) : null}
            <p>Total: {formatUSD(submittedOrder.total)}</p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-forest-900 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sand-50"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  if (lineItems.length === 0) {
    return (
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-sand-200 bg-sand-100 p-8 text-center">
          <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-clay-700">
            Checkout
          </p>
          <h1 className="mb-4 text-5xl font-light text-forest-900">
            Your bag is empty.
          </h1>
          <p className="mb-7 font-sans text-forest-600">
            Add products before starting checkout.
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
          Checkout
        </p>
        <h1 className="mb-8 text-6xl font-light text-forest-900">
          Mock Checkout
        </h1>

        <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-sand-200 bg-sand-100 p-5 md:p-6"
            noValidate
          >
            <h2 className="text-4xl font-light text-forest-900">
              Contact & Shipping
            </h2>

            <label className="block">
              <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-600">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass('email')}
                aria-invalid={Boolean(touched.email && errors.email)}
              />
              {touched.email && errors.email ? (
                <p className="mt-1.5 font-sans text-xs text-clay-700">
                  {errors.email}
                </p>
              ) : null}
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-600">
                  First Name
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('firstName')}
                  aria-invalid={Boolean(touched.firstName && errors.firstName)}
                />
                {touched.firstName && errors.firstName ? (
                  <p className="mt-1.5 font-sans text-xs text-clay-700">
                    {errors.firstName}
                  </p>
                ) : null}
              </label>
              <label className="block">
                <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-600">
                  Last Name
                </span>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('lastName')}
                  aria-invalid={Boolean(touched.lastName && errors.lastName)}
                />
                {touched.lastName && errors.lastName ? (
                  <p className="mt-1.5 font-sans text-xs text-clay-700">
                    {errors.lastName}
                  </p>
                ) : null}
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-600">
                Address
              </span>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass('address')}
                aria-invalid={Boolean(touched.address && errors.address)}
              />
              {touched.address && errors.address ? (
                <p className="mt-1.5 font-sans text-xs text-clay-700">
                  {errors.address}
                </p>
              ) : null}
            </label>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-600">
                  City
                </span>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('city')}
                  aria-invalid={Boolean(touched.city && errors.city)}
                />
                {touched.city && errors.city ? (
                  <p className="mt-1.5 font-sans text-xs text-clay-700">
                    {errors.city}
                  </p>
                ) : null}
              </label>
              <label className="block">
                <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-600">
                  State
                </span>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('state')}
                  aria-invalid={Boolean(touched.state && errors.state)}
                />
                {touched.state && errors.state ? (
                  <p className="mt-1.5 font-sans text-xs text-clay-700">
                    {errors.state}
                  </p>
                ) : null}
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-600">
                ZIP Code
              </span>
              <input
                type="text"
                name="zip"
                value={form.zip}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass('zip')}
                aria-invalid={Boolean(touched.zip && errors.zip)}
              />
              {touched.zip && errors.zip ? (
                <p className="mt-1.5 font-sans text-xs text-clay-700">
                  {errors.zip}
                </p>
              ) : null}
            </label>

            <fieldset>
              <legend className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-600">
                Shipping Method
              </legend>
              <div className="grid gap-2">
                <label className="flex items-center justify-between rounded-xl border border-sand-300 bg-sand-50 px-3 py-2.5 font-sans text-sm text-forest-700">
                  <span>
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={form.shipping === 'standard'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Standard (3-5 days)
                  </span>
                  <span>
                    {subtotal >= 75 || appliedPromo?.type === 'shipping'
                      ? 'Free'
                      : formatUSD(7)}
                  </span>
                </label>
                <label className="flex items-center justify-between rounded-xl border border-sand-300 bg-sand-50 px-3 py-2.5 font-sans text-sm text-forest-700">
                  <span>
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={form.shipping === 'express'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Express (1-2 days)
                  </span>
                  <span>{formatUSD(15)}</span>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-600">
                Payment
              </legend>
              <div className="grid gap-2">
                <label className="rounded-xl border border-sand-300 bg-sand-50 px-3 py-2.5 font-sans text-sm text-forest-700">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={form.payment === 'card'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Card (mock)
                </label>
                <label className="rounded-xl border border-sand-300 bg-sand-50 px-3 py-2.5 font-sans text-sm text-forest-700">
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={form.payment === 'wallet'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Wallet (mock)
                </label>
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-full rounded-full bg-forest-900 px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:bg-forest-700"
            >
              Place Mock Order
            </button>
          </form>

          <aside className="h-fit rounded-3xl border border-sand-200 bg-sand-100 p-5">
            <h2 className="mb-4 text-4xl font-light text-forest-900">
              Order Summary
            </h2>
            <div className="mb-5 space-y-3">
              {lineItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3 rounded-2xl border border-sand-300 bg-sand-50 p-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-16 w-16 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-2xl font-light text-forest-900">
                      {item.product.name}
                    </p>
                    <p className="font-sans text-xs text-forest-500">
                      Qty {item.quantity}
                    </p>
                  </div>
                  <p className="font-sans text-sm font-semibold text-forest-700">
                    {formatUSD(item.subtotal)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-4 rounded-2xl border border-sand-300 bg-sand-50 p-3">
              <label
                htmlFor="promo-code"
                className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-600"
              >
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  id="promo-code"
                  type="text"
                  value={promoInput}
                  onChange={(event) => setPromoInput(event.target.value)}
                  placeholder="GREEN10"
                  className="min-w-0 flex-1 rounded-xl border border-sand-300 bg-sand-50 px-3 py-2 font-sans text-sm text-forest-800 outline-none focus:border-fern-500"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  className="rounded-xl border border-forest-300 px-3 py-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-forest-700 transition hover:border-fern-500 hover:text-fern-700"
                >
                  Apply
                </button>
              </div>
              {promoError ? (
                <p className="mt-2 font-sans text-xs text-clay-700">
                  {promoError}
                </p>
              ) : null}
              {appliedPromo ? (
                <div className="mt-3 flex items-center justify-between rounded-xl border border-fern-300 bg-fern-100/60 px-3 py-2">
                  <p className="flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-fern-700">
                    <Tag size={13} />
                    {appliedPromo.code}: {appliedPromo.label}
                  </p>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="rounded-full p-1 text-fern-700 transition hover:bg-fern-200"
                    aria-label="Remove promo code"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <p className="mt-2 font-sans text-[11px] text-forest-500">
                  Try: GREEN10, EARTH15, FREESHIP
                </p>
              )}
            </div>

            <div className="space-y-3 font-sans text-sm text-forest-700">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatUSD(subtotal)}</span>
              </div>
              {discount > 0 ? (
                <div className="flex items-center justify-between text-fern-700">
                  <span>Discount</span>
                  <span>-{formatUSD(discount)}</span>
                </div>
              ) : null}
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatUSD(shipping)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated tax</span>
                <span>{formatUSD(tax)}</span>
              </div>
              <div className="border-t border-sand-300 pt-3" />
              <div className="flex items-center justify-between text-base font-semibold text-forest-900">
                <span>Total</span>
                <span>{formatUSD(total)}</span>
              </div>
            </div>

            <Link
              to="/cart"
              className="mt-5 block rounded-full border border-sand-300 px-6 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest-700 transition hover:border-fern-500 hover:text-fern-700"
            >
              Back to Cart
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
