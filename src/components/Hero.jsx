import { ArrowRight, Droplets, Leaf, Sun, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';

const trustBadges = [
  { icon: Wind, label: 'Carbon Neutral', color: 'text-fern-600' },
  { icon: Droplets, label: 'Water Conscious', color: 'text-clay-500' },
  { icon: Sun, label: 'Solar Powered', color: 'text-honey-500' },
];

function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-12 md:px-10 md:pb-24 lg:pt-20">
      <div className="pointer-events-none absolute left-[10%] top-6 h-40 w-40 rounded-full bg-fern-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[8%] h-44 w-44 rounded-full bg-clay-200/60 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="reveal-up relative z-10">
          <h1 className="mb-6 text-6xl font-light leading-[1.05] text-forest-900 md:text-7xl">
            Live lightly on
            <span className="block italic text-fern-600">the earth.</span>
          </h1>
          <p className="mb-10 max-w-lg font-sans text-lg leading-relaxed text-forest-600">
            Curated essentials crafted from renewable materials. Less waste, more intention, and design that feels as good as it looks.
          </p>

          <div className="mb-14 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 rounded-full bg-forest-900 px-7 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:bg-fern-600"
            >
              Start Shopping
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/mission"
              className="inline-flex items-center rounded-full border border-forest-300 px-7 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest-700 transition hover:border-fern-600 hover:text-fern-700"
            >
              Learn More
            </Link>
          </div>

          <div className="grid max-w-md grid-cols-3 gap-4 border-t border-sand-300 pt-8">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="text-center">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-sand-200">
                    <Icon size={19} className={badge.color} />
                  </div>
                  <p className="font-sans text-[11px] font-semibold uppercase leading-tight tracking-[0.18em] text-forest-700">
                    {badge.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="reveal-up relative [animation-delay:140ms]">
          <div className="relative mx-auto aspect-[4/5] max-w-xl">
            <div className="absolute inset-0 rotate-[8deg] rounded-[40%] bg-sand-200" />
            <div className="absolute inset-0 -rotate-[5deg] rounded-[43%] bg-fern-100/70" />

            <img
              src="/images/hero-jungle.png"
              alt="Lush green jungle with a gentle waterfall"
              className="relative z-10 h-full w-full rounded-[5rem] object-cover shadow-soft"
            />

            <div className="absolute -bottom-6 -left-5 z-20 flex items-center gap-3 rounded-3xl border border-sand-200 bg-sand-50 p-4 shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-fern-100 text-fern-600">
                <Leaf size={21} />
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-forest-500">Impact</p>
                <p className="text-lg font-medium text-forest-900">10,000+ Trees Planted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
