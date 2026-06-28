import type { PortfolioData } from "@/lib/portfolio-data";

type Props = { data: PortfolioData };

export function PortfolioTemplate({ id, data }: { id: string; data: PortfolioData }) {
  switch (id) {
    case "editorial":
      return <EditorialTemplate data={data} />;
    case "terminal":
      return <TerminalTemplate data={data} />;
    case "playful":
      return <PlayfulTemplate data={data} />;
    case "minimal":
    default:
      return <MinimalTemplate data={data} />;
  }
}

/* ───────── Minimal ───────── */
function MinimalTemplate({ data }: Props) {
  return (
    <div className="bg-background text-ink">
      <div className="mx-auto max-w-3xl px-8 py-20 space-y-16">
        <header className="space-y-6">
          <div className="text-xs font-mono text-ink-soft uppercase tracking-[0.2em]">Portfolio · {data.roles.join(" / ")}</div>
          <h1 className="text-5xl font-display font-semibold tracking-tight leading-[1.1]">{data.title}</h1>
          <p className="text-lg text-ink-soft leading-relaxed">{data.oneLiner}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-ink-soft pt-2">
            <span>{data.name}</span>
            <span>{data.location}</span>
            <a className="hover:text-ink" href={`mailto:${data.email}`}>{data.email}</a>
            <span>{data.github}</span>
          </div>
        </header>

        <Section title="소개">
          <p className="text-ink-soft leading-relaxed whitespace-pre-line">{data.detail}</p>
          <p className="text-ink-soft leading-relaxed mt-4 whitespace-pre-line">{data.intro}</p>
        </Section>

        <Section title="기술 스택">
          <div className="flex flex-wrap gap-2">
            {data.stacks.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
        </Section>

        <Section title="경력">
          <pre className="text-ink-soft leading-relaxed whitespace-pre-wrap font-sans text-sm">{data.career}</pre>
        </Section>

        <Section title="프로젝트">
          <div className="divide-y divide-line">
            {data.projects.map((p) => (
              <div key={p.title} className="py-6 first:pt-0 grid grid-cols-[120px_1fr] gap-6">
                <div className="text-xs font-mono text-ink-soft">{p.period}</div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <div className="text-xs font-mono text-ink-soft mt-1">{p.role}</div>
                  <p className="text-ink-soft mt-2 leading-relaxed">{p.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.stacks.map((s) => <span key={s} className="chip text-[11px]">{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-soft">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

/* ───────── Editorial ───────── */
function EditorialTemplate({ data }: Props) {
  return (
    <div className="bg-background text-ink">
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-8 py-14 grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <div className="chip" style={{ borderColor: "var(--color-coral)", color: "var(--color-coral)" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-coral)" }} />
              Issue 01 · {data.name}
            </div>
            <h1 className="mt-5 text-6xl md:text-7xl font-display font-bold leading-[1.02] tracking-tight">
              {data.title}
            </h1>
            <p className="mt-5 text-xl text-ink-soft max-w-2xl leading-relaxed">{data.oneLiner}</p>
          </div>
          <div className="text-sm font-mono text-ink-soft text-right space-y-1">
            <div>{data.location}</div>
            <div>{data.email}</div>
            <div>{data.github}</div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-8 py-16 grid md:grid-cols-3 gap-10">
        <div className="text-sm font-mono uppercase tracking-[0.2em] text-coral">About</div>
        <div className="md:col-span-2 space-y-5 text-lg leading-relaxed text-ink-soft">
          <p className="whitespace-pre-line">{data.detail}</p>
          <p className="whitespace-pre-line">{data.intro}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {data.stacks.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-3xl font-display font-semibold">Selected Works</h2>
            <span className="font-mono text-xs text-ink-soft">{data.projects.length.toString().padStart(2, "0")} projects</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((p, i) => (
              <article key={p.title} className="surface-card overflow-hidden">
                <div className="h-40 grid-paper border-b border-line relative">
                  <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 70% 40%, color-mix(in oklch, var(--color-coral) 35%, transparent), transparent 60%)` }} />
                  <div className="absolute left-5 top-4 font-mono text-xs text-ink-soft">#{(i+1).toString().padStart(2,"0")}</div>
                  <div className="absolute right-5 bottom-4 font-mono text-xs text-ink-soft">{p.period}</div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-display font-semibold">{p.title}</h3>
                  <div className="text-xs font-mono text-coral uppercase tracking-wider">{p.role}</div>
                  <p className="text-ink-soft leading-relaxed">{p.summary}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.stacks.map((s) => <span key={s} className="chip text-[11px]">{s}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <h2 className="text-3xl font-display font-semibold mb-8">Career</h2>
          <pre className="text-ink-soft leading-relaxed whitespace-pre-wrap font-sans text-base max-w-3xl">{data.career}</pre>
        </div>
      </section>
    </div>
  );
}

/* ───────── Terminal ───────── */
function TerminalTemplate({ data }: Props) {
  const Line = ({ k, v }: { k: string; v: string }) => (
    <div className="grid grid-cols-[120px_1fr] gap-4">
      <span className="text-mint">{k}</span>
      <span className="text-ink">{v}</span>
    </div>
  );
  return (
    <div className="bg-[oklch(0.16_0.015_260)] text-[oklch(0.92_0.01_95)] min-h-screen font-mono">
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-10">
        <div className="rounded-lg border border-white/10 bg-black/40 overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/10 bg-white/[0.03]">
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.74_0.17_30)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.15_85)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_145)]" />
            <span className="ml-3 text-xs opacity-60">~/portfolio/{data.name} — zsh</span>
          </div>
          <div className="p-6 space-y-2 text-sm">
            <div><span className="text-[oklch(0.78_0.16_145)]">➜</span> <span className="text-[oklch(0.7_0.13_220)]">~</span> cat about.md</div>
            <Line k="name" v={data.name} />
            <Line k="title" v={data.title} />
            <Line k="role" v={data.roles.join(", ")} />
            <Line k="location" v={data.location} />
            <Line k="email" v={data.email} />
            <Line k="github" v={data.github} />
            <div className="pt-3 opacity-80 whitespace-pre-line leading-relaxed">{data.oneLiner}</div>
            <div className="opacity-70 whitespace-pre-line leading-relaxed">{data.detail}</div>
          </div>
        </div>

        <Block prompt="ls stacks/">
          <div className="flex flex-wrap gap-2">
            {data.stacks.map((s) => (
              <span key={s} className="px-2 py-1 rounded border border-white/15 bg-white/5 text-xs text-[oklch(0.86_0.16_145)]">{s}</span>
            ))}
          </div>
        </Block>

        <Block prompt="cat career.log">
          <pre className="whitespace-pre-wrap text-sm opacity-85 leading-relaxed">{data.career}</pre>
        </Block>

        <Block prompt="ls -lh projects/">
          <div className="space-y-4">
            {data.projects.map((p) => (
              <div key={p.title} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[oklch(0.86_0.16_145)]">{p.title}</span>
                  <span className="text-xs opacity-60">{p.period}</span>
                </div>
                <div className="text-xs opacity-60 mt-1">// {p.role}</div>
                <p className="text-sm opacity-85 mt-2 leading-relaxed">{p.summary}</p>
                <div className="flex flex-wrap gap-1.5 mt-3 text-xs">
                  {p.stacks.map((s) => <span key={s} className="opacity-70">#{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Block>
      </div>
    </div>
  );
}

function Block({ prompt, children }: { prompt: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="text-sm"><span className="text-[oklch(0.78_0.16_145)]">➜</span> <span className="text-[oklch(0.7_0.13_220)]">~</span> {prompt}</div>
      <div className="pl-4 border-l border-white/10">{children}</div>
    </div>
  );
}

/* ───────── Playful ───────── */
function PlayfulTemplate({ data }: Props) {
  const blocks = ["var(--color-mint)", "var(--color-coral)", "var(--color-ink)"];
  return (
    <div className="bg-background text-ink">
      <div className="mx-auto max-w-6xl px-8 py-12 space-y-10">
        <header className="rounded-3xl p-10 md:p-14 relative overflow-hidden border border-line"
          style={{ background: "linear-gradient(135deg, color-mix(in oklch, var(--color-mint) 35%, transparent), color-mix(in oklch, var(--color-coral) 25%, transparent))" }}>
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/30 blur-2xl" />
          <div className="relative space-y-5">
            <div className="chip bg-white/60">👋 안녕하세요, {data.name}이에요</div>
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-[1.05] max-w-3xl">{data.title}</h1>
            <p className="text-lg text-ink-soft max-w-2xl">{data.oneLiner}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {data.roles.map((r) => <span key={r} className="chip bg-white/70">{r}</span>)}
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="surface-card p-6 md:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest text-ink-soft mb-3">About me</div>
            <p className="whitespace-pre-line leading-relaxed text-ink-soft">{data.detail}</p>
            <p className="whitespace-pre-line leading-relaxed text-ink-soft mt-3">{data.intro}</p>
          </div>
          <div className="surface-card p-6 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-ink-soft">Contact</div>
            <div className="text-sm space-y-1.5">
              <div>📍 {data.location}</div>
              <div>✉️ {data.email}</div>
              <div>🐙 {data.github}</div>
              <div>🔗 {data.website}</div>
            </div>
            <div className="pt-3 border-t border-line">
              <div className="text-xs font-mono uppercase tracking-widest text-ink-soft mb-2">Stacks</div>
              <div className="flex flex-wrap gap-1.5">
                {data.stacks.map((s) => <span key={s} className="chip text-[11px]">{s}</span>)}
              </div>
            </div>
          </div>
        </div>

        <section className="space-y-5">
          <h2 className="text-3xl font-display font-semibold">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.projects.map((p, i) => (
              <article key={p.title} className="rounded-2xl border border-line overflow-hidden bg-card">
                <div className="h-28 relative" style={{ background: `color-mix(in oklch, ${blocks[i % blocks.length]} 35%, white)` }}>
                  <div className="absolute left-4 bottom-3 font-mono text-xs text-ink">{p.period}</div>
                  <div className="absolute right-4 top-3 font-mono text-xs text-ink">0{i + 1}</div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <div className="text-xs font-mono text-ink-soft">{p.role}</div>
                  <p className="text-sm text-ink-soft leading-relaxed">{p.summary}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.stacks.map((s) => <span key={s} className="chip text-[11px]">{s}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-card p-6">
          <div className="text-xs font-mono uppercase tracking-widest text-ink-soft mb-3">Career</div>
          <pre className="whitespace-pre-wrap font-sans text-ink-soft leading-relaxed">{data.career}</pre>
        </section>
      </div>
    </div>
  );
}
