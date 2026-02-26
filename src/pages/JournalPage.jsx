import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import { journalPosts } from '../data/journal.js';

function JournalPage() {
  const [activeTopic, setActiveTopic] = useState('All');
  const topics = useMemo(
    () => ['All', ...new Set(journalPosts.map((post) => post.topic))],
    [],
  );

  const visiblePosts = useMemo(
    () =>
      journalPosts.filter(
        (post) => activeTopic === 'All' || post.topic === activeTopic,
      ),
    [activeTopic],
  );

  return (
    <>
      <Header
        eyebrow="Journal"
        title="Stories, Guides, and Progress Notes"
        description="Explore practical sustainability guides, transparent sourcing updates, and field notes from our design and supplier teams."
        image="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Notebook and cup on desk"
      />

      <section className="px-5 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setActiveTopic(topic)}
                className={`rounded-full px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                  topic === activeTopic
                    ? 'bg-forest-900 text-sand-50'
                    : 'border border-sand-300 bg-sand-100 text-forest-700 hover:border-fern-500 hover:text-fern-700'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visiblePosts.map((post, index) => (
              <article
                key={post.id}
                className="reveal-up group overflow-hidden rounded-3xl border border-sand-200 bg-sand-50"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between font-sans text-[11px] uppercase tracking-[0.16em] text-forest-500">
                    <span>{post.topic}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mb-3 text-3xl font-light leading-tight text-forest-900">
                    {post.title}
                  </h2>
                  <p className="mb-5 font-sans text-sm leading-relaxed text-forest-600">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-xs uppercase tracking-[0.18em] text-clay-700">
                      {post.date}
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-700 transition group-hover:text-fern-700"
                    >
                      Read
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default JournalPage;
