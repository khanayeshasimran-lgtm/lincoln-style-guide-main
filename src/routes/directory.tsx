import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, SlidersHorizontal, X } from "lucide-react";
import { alumni } from "@/data/alumni";
import { AlumniCard } from "@/components/site/AlumniCard";

export const Route = createFileRoute("/directory")({
  component: Directory,
  head: () => ({
    meta: [
      { title: "Alumni Directory — Lincoln Alumni Network" },
      {
        name: "description",
        content:
          "Search and connect with Lincoln alumni by name, role, industry, country or department.",
      },
    ],
  }),
});

function Directory() {
  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const industries = Array.from(new Set(alumni.map((a) => a.industry))).sort();
  const years = Array.from(new Set(alumni.map((a) => a.year))).sort(
    (a, b) => b - a
  );
  const countries = Array.from(new Set(alumni.map((a) => a.country))).sort();

  const filtered = useMemo(() => {
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    return alumni.filter((a) => {
      if (industry && a.industry !== industry) return false;
      if (year && String(a.year) !== year) return false;
      if (country && a.country !== country) return false;
      if (!tokens.length) return true;
      const hay = [
        a.name, a.role, a.company, a.industry, a.country,
        a.department, String(a.year), ...a.skills,
      ]
        .join(" ")
        .toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [q, industry, year, country]);

  const activeFilterCount = [industry, year, country].filter(Boolean).length;

  const clearAll = () => {
    setIndustry(""); setYear(""); setCountry(""); setQ("");
  };

  return (
    <>
      {/* ── Hero / Search ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(255,255,255,.015) 0px, rgba(255,255,255,.015) 1px, transparent 1px, transparent 40px)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,.1) 0%, transparent 70%)",
          }}
        />

        <div className="container-page relative z-10">
          <span className="pill bg-white/10 border border-white/20 text-white mb-5">
            Alumni Directory
          </span>
          <h1
            className="font-display text-6xl md:text-7xl font-bold text-white"
            style={{ letterSpacing: "-0.025em" }}
          >
            Find your people.
          </h1>
          <p className="mt-4 text-white/70 max-w-lg leading-relaxed">
            Try natural queries like{" "}
            <span className="text-white/90 italic">"software engineer in Malaysia"</span>{" "}
            or{" "}
            <span className="text-white/90 italic">"finance alumni 2018"</span>.
          </p>

          {/* Premium search box */}
          <div className="mt-10 max-w-2xl">
            <div className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex items-center gap-2 flex-1 px-3">
                <Sparkles className="h-4 w-4 text-primary shrink-0" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search name, role, industry, graduation year…"
                  className="flex-1 bg-transparent outline-none py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                />
                {q && (
                  <button
                    onClick={() => setQ("")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button className="rounded-xl bg-primary text-white px-5 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="mt-3 inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? "Hide filters" : "Advanced filters"}
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-gray-900 text-[10px] font-bold grid place-items-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter dropdowns — collapsible */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-3 max-w-2xl">
              <SelectFilter
                label="Industry"
                value={industry}
                onChange={setIndustry}
                options={industries}
                dark
              />
              <SelectFilter
                label="Year"
                value={year}
                onChange={setYear}
                options={years.map(String)}
                dark
              />
              <SelectFilter
                label="Country"
                value={country}
                onChange={setCountry}
                options={countries}
                dark
              />
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 text-white px-4 py-3 text-sm hover:bg-white/20 transition-colors"
                >
                  <X className="h-3.5 w-3.5" /> Clear all
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Results ───────────────────────────────────────── */}
      <section className="container-page py-16">
        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {industry && (
              <Chip label={industry} onRemove={() => setIndustry("")} />
            )}
            {year && <Chip label={`Class of ${year}`} onRemove={() => setYear("")} />}
            {country && <Chip label={country} onRemove={() => setCountry("")} />}
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <strong className="text-foreground font-semibold">
              {filtered.length}
            </strong>{" "}
            alumni
            {q && (
              <span>
                {" "}
                for <em className="text-primary not-italic font-medium">"{q}"</em>
              </span>
            )}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <AlumniCard key={a.id} a={a} />
            ))}
          </div>
        ) : (
          <div className="text-center py-28">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
              No matches found
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Try different keywords or clear your active filters.
            </p>
            <button
              onClick={clearAll}
              className="mt-6 rounded-full bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}

function Chip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary-light text-primary px-3.5 py-1.5 text-xs font-semibold">
      {label}
      <button onClick={onRemove} className="hover:text-primary-hover">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

function SelectFilter({
  label,
  value,
  onChange,
  options,
  dark = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  dark?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-xl px-4 py-3 text-sm outline-none appearance-none cursor-pointer ${
        dark
          ? "border border-white/20 bg-white/10 text-white"
          : "border border-border bg-card text-foreground focus:ring-2 focus:ring-primary/30"
      }`}
    >
      <option value="" className="text-gray-800">
        All {label}s
      </option>
      {options.map((o) => (
        <option key={o} value={o} className="text-gray-800">
          {o}
        </option>
      ))}
    </select>
  );
}