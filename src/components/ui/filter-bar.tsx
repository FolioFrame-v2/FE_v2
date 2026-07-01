import { useMemo, useState, useRef, useEffect } from "react";

export type FilterGroup = {
  key: string;
  label: string;
  options: string[];
};

export type FilterState = Record<string, string>;

export function FilterBar({
  groups,
  value,
  onChange,
  search,
  onSearchChange,
  searchPlaceholder = "검색...",
  sortOptions,
  sort,
  onSortChange,
}: {
  groups: FilterGroup[];
  value: FilterState;
  onChange: (next: FilterState) => void;
  search: string;
  onSearchChange: (v: string) => void;
  searchPlaceholder?: string;
  sortOptions?: string[];
  sort?: string;
  onSortChange?: (v: string) => void;
}) {
  const activeCount = useMemo(
    () => Object.values(value).filter((v) => v && v !== "전체").length,
    [value]
  );

  return (
    <div className="surface-card p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-line bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
        {sortOptions && onSortChange && sort && (
          <CustomSortSelect value={sort} options={sortOptions} onChange={onSortChange} />
        )}
        {activeCount > 0 && (
          <button
            onClick={() => onChange(Object.fromEntries(groups.map((g) => [g.key, "전체"])))}
            className="chip hover:text-ink"
          >
            필터 초기화 · {activeCount}
          </button>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div key={g.key} className="space-y-1.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">{g.label}</div>
            <div className="flex flex-wrap gap-1.5">
              {g.options.map((opt) => {
                const active = (value[g.key] ?? "전체") === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => onChange({ ...value, [g.key]: opt })}
                    className={
                      "px-2.5 py-1 rounded-full text-xs border transition " +
                      (active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-surface border-line text-ink-soft hover:text-ink hover:border-ink-soft")
                    }
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomSortSelect({ value, options, onChange }: { value: string, options: string[], onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button 
        onClick={() => setOpen(!open)}
        className="h-10 px-3 rounded-lg border border-line bg-surface text-sm flex items-center gap-2 hover:border-ink/40 focus:outline-none focus:border-ink/50 transition-colors text-ink min-w-[90px] justify-between"
      >
        <span>{value}</span>
        <svg className="w-4 h-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      {open && (
        <div className="absolute top-full mt-1.5 right-0 w-32 bg-surface border border-line rounded-lg shadow-lg z-50 py-1 overflow-hidden animate-in fade-in slide-in-from-top-1">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${value === opt ? "bg-primary/5 text-primary font-medium" : "text-ink hover:bg-surface-2"}`}
            >
              {opt}
              {value === opt && (
                <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
