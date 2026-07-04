import type { PortfolioData } from "@/lib/portfolio-data";

type Props = { data: PortfolioData };

function ResumeSection({ data, className = "" }: { data: PortfolioData; className?: string }) {
  return (
    <div className={`space-y-8 ${className}`}>
      {data.certifications && data.certifications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">자격증</h3>
          <div className="space-y-4">
            {data.certifications.map((c, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                <div className="sm:w-32 shrink-0 font-mono text-ink-soft text-sm mt-0.5">
                  {c.issueDate.slice(0, 7)}
                </div>
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-ink-soft text-sm">{c.organization}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.educations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">학력</h3>
          <div className="space-y-4">
            {data.educations.map((e, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                <div className="sm:w-32 shrink-0 font-mono text-ink-soft text-sm mt-0.5">
                  {e.admissionDate.slice(0, 7)} ~ {e.graduationDate.slice(0, 7)}
                </div>
                <div>
                  <div className="font-medium">{e.schoolName}</div>
                  <div className="text-ink-soft text-sm">{e.major} · {e.degree} ({e.status})</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.experiences.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">경력</h3>
          <div className="space-y-6">
            {data.experiences.map((e, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                <div className="sm:w-32 shrink-0 font-mono text-ink-soft text-sm mt-0.5">
                  {e.startDate.slice(0, 7)} ~ {e.endDate ? e.endDate.slice(0, 7) : "현재"}
                </div>
                <div>
                  <div className="font-medium text-base">{e.companyName}</div>
                  <div className="text-ink-soft text-sm font-medium mb-2">{e.position}</div>
                  <div className="text-ink-soft text-sm leading-relaxed whitespace-pre-line">{e.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
          <h1 className="text-5xl font-display font-semibold tracking-tight leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-ink to-ink-soft">{data.title}</h1>
          <p className="text-lg text-ink-soft leading-relaxed border-l-2 border-line pl-4">{data.oneLiner}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-ink-soft pt-4">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary/40" />{data.name}</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary/40" />{data.location}</span>
            <a className="hover:text-ink transition flex items-center gap-1.5" href={`mailto:${data.email}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />{data.email}
            </a>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary/40" />{data.github}</span>
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

        <Section title="학력 및 경력">
          <ResumeSection data={data} />
        </Section>

        <Section title="프로젝트">
          <div className="divide-y divide-line/40">
            {data.projects.map((p) => (
              <div key={p.title} className="py-8 first:pt-0 grid grid-cols-[120px_1fr] gap-6 group hover:bg-surface/30 px-4 -mx-4 rounded-xl transition duration-300">
                <div className="text-xs font-mono text-ink-soft mt-1">{p.period}</div>
                <div>
                  <h3 className="font-display text-xl font-semibold group-hover:text-primary transition">{p.title}</h3>
                  <div className="text-xs font-mono text-ink-soft mt-1">{p.role}</div>
                  <p className="text-ink-soft mt-3 leading-relaxed">{p.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.stacks.map((s) => <span key={s} className="chip bg-surface/50 border-line/50 group-hover:bg-surface group-hover:border-line transition">{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {data.customFields && data.customFields.map((f) => (
          <Section key={f.label} title={f.label}>
            <p className="text-ink-soft leading-relaxed whitespace-pre-line">{f.value}</p>
          </Section>
        ))}
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
            <div className="chip" style={{ borderColor: "var(--color-coral)", color: "var(--color-coral)", boxShadow: "0 2px 10px rgba(255, 107, 107, 0.15)" }}>
              <span className="h-1.5 w-1.5 rounded-full shadow-[0_0_8px_var(--color-coral)]" style={{ background: "var(--color-coral)" }} />
              Issue 01 · {data.name}
            </div>
            <h1 className="mt-8 text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[1.05] tracking-tighter drop-shadow-sm">
              {data.title}
            </h1>
            <p className="mt-8 text-xl text-ink-soft max-w-2xl leading-relaxed border-l-4 pl-6" style={{ borderColor: "var(--color-coral)" }}>
              {data.oneLiner}
            </p>
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
          <div className="grid md:grid-cols-2 gap-8">
            {data.projects.map((p, i) => (
              <article key={p.title} className="surface-card overflow-hidden group cursor-pointer border-line/60 hover:border-coral/50 transition-colors duration-500 shadow-sm hover:shadow-xl">
                <div className="h-48 grid-paper border-b border-line relative overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ background: `radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--color-coral) 20%, transparent), transparent 70%)` }} />
                  <div className="absolute left-5 top-4 font-mono text-xs text-ink-soft backdrop-blur-sm bg-background/50 px-2 py-1 rounded-md">#{(i+1).toString().padStart(2,"0")}</div>
                  <div className="absolute right-5 bottom-4 font-mono text-xs text-ink-soft backdrop-blur-sm bg-background/50 px-2 py-1 rounded-md">{p.period}</div>
                </div>
                <div className="p-8 space-y-4 bg-background/50 backdrop-blur-md">
                  <h3 className="text-3xl font-display font-bold group-hover:text-coral transition-colors">{p.title}</h3>
                  <div className="text-xs font-mono text-coral uppercase tracking-widest font-semibold">{p.role}</div>
                  <p className="text-ink-soft leading-relaxed text-base">{p.summary}</p>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {p.stacks.map((s) => <span key={s} className="chip bg-surface border-line/50">{s}</span>)}
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
          <ResumeSection data={data} className="max-w-4xl" />
        </div>
      </section>

      {data.customFields && data.customFields.map((f) => (
        <section key={f.label} className="border-t border-line">
          <div className="mx-auto max-w-6xl px-8 py-16">
            <h2 className="text-3xl font-display font-semibold mb-8">{f.label}</h2>
            <p className="text-xl text-ink-soft leading-relaxed whitespace-pre-line max-w-4xl">{f.value}</p>
          </div>
        </section>
      ))}
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
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/5 shadow-sm">
            <span className="h-3 w-3 rounded-full bg-[oklch(0.74_0.17_30)] shadow-[0_0_8px_oklch(0.74_0.17_30)]" />
            <span className="h-3 w-3 rounded-full bg-[oklch(0.85_0.15_85)] shadow-[0_0_8px_oklch(0.85_0.15_85)]" />
            <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.16_145)] shadow-[0_0_8px_oklch(0.78_0.16_145)]" />
            <span className="ml-4 text-xs font-medium opacity-60 tracking-wider">~/portfolio/{data.name} — zsh</span>
          </div>
          <div className="p-8 space-y-3 text-sm">
            <div className="animate-pulse"><span className="text-[oklch(0.78_0.16_145)] drop-shadow-[0_0_5px_oklch(0.78_0.16_145)] font-bold">➜</span> <span className="text-[oklch(0.7_0.13_220)]">~</span> cat about.md</div>
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
          <div className="flex flex-wrap gap-3">
            {data.stacks.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-md border border-white/20 bg-white/10 text-xs text-[oklch(0.86_0.16_145)] shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:bg-white/20 hover:scale-105 transition duration-300">{s}</span>
            ))}
          </div>
        </Block>

        <Block prompt="cat resume.log">
          <div className="space-y-6 text-sm opacity-85 leading-relaxed">
            {data.certifications && data.certifications.length > 0 && data.certifications.map((c, i) => (
              <div key={i}>
                <div className="text-[oklch(0.86_0.16_145)]">[CERT] {c.name}</div>
                <div className="opacity-70">{c.organization} ({c.issueDate.slice(0, 7)})</div>
              </div>
            ))}
            {data.educations.map((e, i) => (
              <div key={i}>
                <div className="text-[oklch(0.86_0.16_145)]">[EDU] {e.schoolName}</div>
                <div className="opacity-70">{e.major} · {e.degree} ({e.admissionDate.slice(0, 7)} ~ {e.graduationDate.slice(0, 7)})</div>
              </div>
            ))}
            {data.experiences.map((e, i) => (
              <div key={i}>
                <div className="text-[oklch(0.86_0.16_145)]">[EXP] {e.companyName}</div>
                <div className="opacity-70">{e.position} ({e.startDate.slice(0, 7)} ~ {e.endDate ? e.endDate.slice(0, 7) : "현재"})</div>
                <div className="mt-1 opacity-80 whitespace-pre-line">{e.description}</div>
              </div>
            ))}
          </div>
        </Block>

        <Block prompt="ls -lh projects/">
          <div className="space-y-6">
            {data.projects.map((p) => (
              <div key={p.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 shadow-md">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[oklch(0.86_0.16_145)] text-lg font-bold drop-shadow-[0_0_8px_oklch(0.86_0.16_145_/_0.5)]">{p.title}</span>
                  <span className="text-xs opacity-60">{p.period}</span>
                </div>
                <div className="text-xs opacity-60 mt-1">// {p.role}</div>
                <p className="text-sm opacity-90 mt-3 leading-relaxed">{p.summary}</p>
                <div className="flex flex-wrap gap-2 mt-4 text-xs">
                  {p.stacks.map((s) => <span key={s} className="opacity-80 px-2 py-1 bg-black/50 rounded text-[oklch(0.86_0.16_145)]">#{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Block>

        {data.customFields && data.customFields.map((f) => (
          <Block key={f.label} prompt={`cat "${f.label}.txt"`}>
            <p className="text-sm opacity-85 leading-relaxed whitespace-pre-line">{f.value}</p>
          </Block>
        ))}
      </div>
    </div>
  );
}

function Block({ prompt, children }: { prompt: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="text-sm flex items-center"><span className="text-[oklch(0.78_0.16_145)] drop-shadow-[0_0_5px_oklch(0.78_0.16_145)] font-bold mr-2">➜</span> <span className="text-[oklch(0.7_0.13_220)] mr-2">~</span> <span className="typing-effect">{prompt}</span><span className="animate-pulse w-2 h-4 bg-white/70 ml-1 inline-block align-middle" /></div>
      <div className="pl-5 border-l-2 border-white/10">{children}</div>
    </div>
  );
}

/* ───────── Playful ───────── */
function PlayfulTemplate({ data }: Props) {
  const blocks = ["var(--color-mint)", "var(--color-coral)", "var(--color-ink)"];
  return (
    <div className="bg-background text-ink">
      <div className="mx-auto max-w-6xl px-8 py-12 space-y-10">
        <header className="rounded-[2.5rem] p-12 md:p-16 relative overflow-hidden border-2 border-white/20 shadow-2xl"
          style={{ background: "linear-gradient(135deg, color-mix(in oklch, var(--color-mint) 60%, white), color-mix(in oklch, var(--color-coral) 50%, white))" }}>
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/40 blur-3xl animate-pulse" />
          <div className="absolute left-10 bottom-10 h-32 w-32 rounded-full bg-white/30 blur-2xl" />
          <div className="relative space-y-6 z-10">
            <div className="chip bg-white/80 backdrop-blur-md shadow-sm border-white/50 text-sm px-4 py-2">👋 안녕하세요, <span className="font-bold">{data.name}</span>이에요</div>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[1.1] max-w-4xl drop-shadow-md text-ink/90">{data.title}</h1>
            <p className="text-xl text-ink/80 max-w-2xl font-medium">{data.oneLiner}</p>
            <div className="flex flex-wrap gap-3 pt-4">
              {data.roles.map((r) => <span key={r} className="chip bg-white/90 shadow-sm border-white/50 text-sm px-3 py-1.5">{r}</span>)}
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
              <article key={p.title} className="rounded-3xl border-2 border-line/50 overflow-hidden bg-card shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col group">
                <div className="h-36 relative transition-transform duration-500 group-hover:scale-105 origin-bottom" style={{ background: `color-mix(in oklch, ${blocks[i % blocks.length]} 45%, white)` }}>
                  <div className="absolute left-5 bottom-4 font-mono text-sm text-ink/70 font-medium bg-white/30 px-2 py-1 rounded backdrop-blur-sm">{p.period}</div>
                  <div className="absolute right-5 top-4 font-mono text-sm text-ink/70 font-bold bg-white/30 h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-sm">0{i + 1}</div>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col z-10 bg-card">
                  <h3 className="font-display text-xl font-bold">{p.title}</h3>
                  <div className="text-xs font-mono text-ink-soft uppercase tracking-wider font-semibold">{p.role}</div>
                  <p className="text-sm text-ink-soft leading-relaxed flex-1">{p.summary}</p>
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-line/30 mt-auto">
                    {p.stacks.map((s) => <span key={s} className="chip bg-surface/80 border-line/50">{s}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-card p-6">
          <ResumeSection data={data} />
        </section>

        {data.customFields && data.customFields.map((f) => (
          <section key={f.label} className="surface-card p-6">
            <div className="text-xs font-mono uppercase tracking-widest text-ink-soft mb-3">{f.label}</div>
            <p className="whitespace-pre-line leading-relaxed text-ink-soft">{f.value}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
