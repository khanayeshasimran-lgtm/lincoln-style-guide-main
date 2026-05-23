import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, Heart, Target, TrendingUp, MapPin, BookOpen } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Lincoln Alumni Network" },
      {
        name: "description",
        content:
          "Our mission, history, and how the Lincoln University College Alumni Association serves graduates worldwide.",
      },
    ],
  }),
});

function About() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28"
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
          className="absolute -bottom-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,.12) 0%, transparent 70%)",
          }}
        />

        <div className="container-page relative z-10">
          <span className="pill bg-white/10 border border-white/20 text-white mb-5">
            About Us
          </span>
          <h1
            className="mt-4 font-display text-6xl md:text-8xl font-bold text-white max-w-3xl leading-[0.95]"
            style={{ letterSpacing: "-0.025em" }}
          >
            A community built over{" "}
            <em
              className="not-italic"
              style={{
                background: "linear-gradient(90deg, #f59e0b, #fcd34d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              23 years.
            </em>
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-white/75 leading-relaxed">
            The Lincoln Alumni Association connects every graduate of Lincoln
            University College, Malaysia — from our first cohort in 2002 to
            today's global network of 25,000+ professionals.
          </p>

          {/* Inline stat strip */}
          <div className="mt-14 flex flex-wrap gap-8">
            {[
              { v: "25K+", l: "Active Members" },
              { v: "85", l: "Countries" },
              { v: "#196", l: "In Asia (QS 2026)" },
              { v: "2008", l: "Association Founded" },
            ].map((s) => (
              <div key={s.l}>
                <div
                  className="font-display text-3xl font-bold text-white"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {s.v}
                </div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-white/45 font-medium mt-0.5">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────── */}
      <section className="container-page py-24 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-4">
            Our Story
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-bold leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            From a classroom to the world.
          </h2>
          <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Lincoln University College was founded in 2002 with a vision to
              deliver world-class, accessible education from Petaling Jaya,
              Malaysia. Today we're ranked{" "}
              <strong className="text-foreground font-semibold">#638 globally</strong>{" "}
              and{" "}
              <strong className="text-foreground font-semibold">#196 in Asia</strong>{" "}
              by QS.
            </p>
            <p>
              The Alumni Association launched in 2008 to formalize the bonds
              graduates were already forming — a single, lifelong network for
              medicine, business, engineering, hospitality and beyond.
            </p>
            <p>
              Today, Lincoln alumni lead hospitals, startups, MNCs, and
              ministries across{" "}
              <strong className="text-foreground font-semibold">85 countries</strong>,
              carrying the values of their education into every field they
              touch.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 space-y-0">
          <div
            className="absolute left-3 top-3 bottom-3 w-px"
            style={{
              background:
                "linear-gradient(to bottom, #b91c1c, rgba(185,28,28,0.1))",
            }}
          />
          {[
            {
              year: "2002",
              icon: BookOpen,
              title: "University Founded",
              desc: "Lincoln University College opens its doors in Petaling Jaya with a commitment to accessible global education.",
            },
            {
              year: "2008",
              icon: Users,
              title: "Alumni Association Established",
              desc: "The formal alumni network launches to unite graduates across all faculties and generations.",
            },
            {
              year: "2015",
              icon: MapPin,
              title: "Went International",
              desc: "Alumni chapters established across Southeast Asia, the Middle East, and East Africa.",
            },
            {
              year: "2026",
              icon: TrendingUp,
              title: "#196 in Asia",
              desc: "QS World University Rankings places Lincoln in the top 200 institutions across Asia.",
            },
          ].map(({ year, icon: Icon, title, desc }) => (
            <div key={year} className="relative flex gap-6 pb-10 last:pb-0">
              <div
                className="relative z-10 shrink-0 w-6 h-6 rounded-full border-2 border-primary bg-background grid place-items-center -ml-8 mt-0.5"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="pb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  {year}
                </span>
                <h3
                  className="font-display text-xl font-semibold mt-1"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Vision & Mission Cards ────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "#f3f4f6" }}
      >
        <div className="container-page">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Target,
                t: "Vision",
                d: "A connected global community of Lincoln graduates driving measurable impact in every field.",
                accent: true,
              },
              {
                icon: Heart,
                t: "Mission",
                d: "Foster lifelong relationships through mentorship, landmark events, and giving back.",
              },
              {
                icon: Users,
                t: "25K+",
                d: "Active alumni members worldwide — and growing every year.",
              },
              {
                icon: Award,
                t: "Top 200",
                d: "QS Ranking in Asia, 2026. Recognised globally for research and teaching excellence.",
              },
            ].map(({ icon: Icon, t, d, accent }) => (
              <div
                key={t}
                className="rounded-2xl p-7"
                style={
                  accent
                    ? { background: "linear-gradient(135deg, #991b1b 0%, #1e2a4a 100%)", color: "#fff" }
                    : { background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,.05)" }
                }
              >
                <div
                  className="w-11 h-11 rounded-xl grid place-items-center mb-5"
                  style={{ background: accent ? "rgba(255,255,255,.15)" : "#fff1f2" }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: accent ? "#fcd34d" : "#b91c1c" }}
                  />
                </div>
                <div
                  className="font-display text-2xl font-bold mb-2"
                  style={{ letterSpacing: "-0.01em", color: accent ? "#fff" : "#111827" }}
                >
                  {t}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: accent ? "rgba(255,255,255,.75)" : "#6b7280" }}
                >
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────── */}
      <section className="container-page py-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
            Member Benefits
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ letterSpacing: "-0.02em" }}
          >
            Everything you've earned.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Networking",
              d: "Searchable global directory, regional chapters, and signature events that put you in the room.",
              emoji: "🤝",
            },
            {
              t: "Career Growth",
              d: "Private job board, warm referrals, executive coaching, and continued learning resources.",
              emoji: "📈",
            },
            {
              t: "Mentorship",
              d: "Give or receive — connect directly with students or find peer mentors at your career stage.",
              emoji: "🎯",
            },
            {
              t: "Exclusive Events",
              d: "Reunions, founder nights, industry roundtables, and global alumni summits.",
              emoji: "🌍",
            },
            {
              t: "Recognition",
              d: "Annual alumni awards celebrating excellence, innovation, and community impact.",
              emoji: "🏆",
            },
            {
              t: "Giving Back",
              d: "Scholarship sponsorship, guest lectures, and collaborative research with the university.",
              emoji: "💛",
            },
          ].map((b) => (
            <div
              key={b.t}
              className="group p-7"
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "1.25rem",
                boxShadow: "0 2px 8px rgba(0,0,0,.05)",
                transition: "box-shadow .3s, transform .3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,.10)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,.05)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div className="text-3xl mb-5">{b.emoji}</div>
              <h3
                className="font-display text-xl font-semibold mb-2.5"
                style={{ letterSpacing: "-0.01em", color: "#b91c1c" }}
              >
                {b.t}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                {b.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}