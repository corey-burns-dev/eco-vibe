import { Leaf, Recycle, Sprout } from 'lucide-react';
import Header from '../components/Header.jsx';

const pillars = [
  {
    icon: Leaf,
    title: 'Conscious Design',
    detail:
      'Products are selected for long-term utility, renewable inputs, and minimal mixed materials.',
  },
  {
    icon: Recycle,
    title: 'Circular Systems',
    detail:
      'We test refill, repair, and take-back loops so products stay useful after first ownership.',
  },
  {
    icon: Sprout,
    title: 'Regenerative Sourcing',
    detail:
      'Supplier scorecards prioritize soil health, water stewardship, and fair labor standards.',
  },
];

const timeline = [
  {
    year: '2021',
    milestone:
      'EcoVibe launched with 12 kitchen staples and carbon-neutral shipping.',
  },
  {
    year: '2023',
    milestone:
      'Expanded into personal care and introduced 100% recycled mailers.',
  },
  {
    year: '2025',
    milestone:
      'Built supplier tracing dashboard covering 92% of product materials.',
  },
  {
    year: '2026',
    milestone:
      'Piloting regional reuse drop-off points in three US metro areas.',
  },
];

function MissionPage() {
  return (
    <>
      <Header
        eyebrow="Mission"
        title="Designing Better Habits for the Planet"
        description="EcoVibe exists to make sustainable living practical and beautiful. We focus on daily products that remove waste from the routines people already have."
        image="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Small plants and reusable goods on table"
      />

      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl reveal-up">
            <h2 className="mb-5 text-5xl font-light text-forest-900">
              How We Work
            </h2>
            <p className="font-sans text-lg leading-relaxed text-forest-600">
              We partner with makers, mills, and workshops that publish material
              origins and pay fair wages. Every launch is evaluated for
              durability, traceability, and packaging impact before it goes
              live.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="reveal-up rounded-3xl border border-sand-200 bg-sand-100 p-6"
                  style={{ animationDelay: `${70 + index * 70}ms` }}
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-fern-100 text-fern-700">
                    <Icon size={22} />
                  </div>
                  <h3 className="mb-3 text-3xl font-light text-forest-900">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-forest-600">
                    {pillar.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-sand-200 bg-sand-100 px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="reveal-up">
            <h3 className="mb-5 text-4xl font-light text-forest-900">
              Impact Snapshot
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-sand-50 p-5">
                <p className="text-3xl font-medium text-forest-900">312k</p>
                <p className="mt-2 font-sans text-xs uppercase tracking-[0.18em] text-forest-500">
                  Plastic units displaced
                </p>
              </div>
              <div className="rounded-2xl bg-sand-50 p-5">
                <p className="text-3xl font-medium text-forest-900">11.4M</p>
                <p className="mt-2 font-sans text-xs uppercase tracking-[0.18em] text-forest-500">
                  Liters water saved
                </p>
              </div>
              <div className="rounded-2xl bg-sand-50 p-5">
                <p className="text-3xl font-medium text-forest-900">92%</p>
                <p className="mt-2 font-sans text-xs uppercase tracking-[0.18em] text-forest-500">
                  Traceable material spend
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-up [animation-delay:140ms]">
            <h3 className="mb-4 text-4xl font-light text-forest-900">
              Milestones
            </h3>
            <ul className="space-y-4">
              {timeline.map((item) => (
                <li
                  key={item.year}
                  className="rounded-2xl border border-sand-200 bg-sand-50 p-4"
                >
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-clay-700">
                    {item.year}
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-forest-600">
                    {item.milestone}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default MissionPage;
