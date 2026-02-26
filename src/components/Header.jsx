function Header({ eyebrow, title, description, image, imageAlt }) {
  return (
    <section className="relative overflow-hidden border-b border-sand-200 bg-gradient-to-b from-sand-50 to-sand-100 px-5 py-14 md:px-10 md:py-20">
      <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-fern-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-2 h-64 w-64 rounded-full bg-clay-200/60 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="reveal-up">
          <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.26em] text-clay-700">
            {eyebrow}
          </p>
          <h1 className="mb-5 max-w-xl text-5xl font-light leading-tight text-forest-900 md:text-6xl">
            {title}
          </h1>
          <p className="max-w-xl font-sans text-lg leading-relaxed text-forest-600">
            {description}
          </p>
        </div>

        <div className="relative reveal-up [animation-delay:140ms]">
          <div className="absolute -inset-3 rounded-[2.5rem] border border-sand-200/80 bg-sand-200/50" />
          <img
            src={image}
            alt={imageAlt}
            className="relative aspect-[16/11] w-full rounded-[2.5rem] object-cover shadow-soft"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default Header;
