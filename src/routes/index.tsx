import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Users, Globe2, Briefcase, Calendar, Sparkles, Quote } from "lucide-react";
import heroImg from "@/assets/hero-alumni.jpg";
import { alumni, events, stats } from "@/data/alumni";
import { AlumniCard } from "@/components/site/AlumniCard";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Lincoln Alumni Network — Stay Connected Forever" },
      {
        name: "description",
        content:
          "Join 25,000+ Lincoln University College alumni across 85 countries. Network, mentor, and grow together.",
      },
    ],
  }),
});

function Home() {
  const featured = alumni.slice(0, 3);
  const upcoming = events.slice(0, 3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[92vh] flex items-center">
        <img
          src={heroImg}
          alt="Lincoln University College graduation"
          className="absolute inset-0 h-full w-full object-cover scale-105"
          style={{ filter: "saturate(0.9) brightness(0.55)" }}
          width={1600}
          height={900}
        />

        {/* Layered overlays for cinematic depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(180,10,30,.55) 0%, rgba(8,10,22,.85) 60%, rgba(8,10,22,.95) 100%)",
          }}
        />
        {/* Decorative diagonal stripe */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(255,255,255,.015) 0px, rgba(255,255,255,.015) 1px, transparent 1px, transparent 40px)",
          }}
        />

        <div className="container-page relative z-10 py-28 md:py-0">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="animate-fade-up">
              <span className="pill bg-white/10 backdrop-blur text-white border border-white/20">
                <Sparkles className="h-3 w-3 text-amber-400" />
                Lincoln University College Malaysia
              </span>
            </div>

            {/* Headline */}
            <h1
              className="mt-7 font-display text-6xl md:text-8xl font-bold leading-[0.95] text-white animate-fade-up-2"
              style={{ letterSpacing: "-0.02em" }}
            >
              Stay{" "}
              <em
                className="not-italic"
                style={{
                  background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Connected.
              </em>
              <br />
              Forever.
            </h1>

            <p className="mt-7 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed animate-fade-up-3">
              The global home for Lincoln graduates. Reconnect with classmates,
              mentor the next generation, and unlock a worldwide network spanning{" "}
              <strong className="text-white font-semibold">85 countries</strong>.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-semibold text-gray-900 hover:bg-amber-400 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Join Alumni Network
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/directory"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/60 backdrop-blur transition-all"
              >
                Explore Directory
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #f9fafb, transparent)",
          }}
        />
      </section>

      {/* ── Stats Bar ────────────────────────────────────── */}
      <section className="relative" style={{ background: "#161B26" }}>
        <div className="container-page relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: Users, label: "Alumni Worldwide", value: stats.total, suffix: "+" },
              { icon: Globe2, label: "Countries", value: stats.countries },
              { icon: Briefcase, label: "Industries", value: stats.industries + "+" },
              { icon: Calendar, label: "Events / Year", value: stats.events },
            ].map(({ icon: Icon, label, value, suffix = "" }, i) => (
              <div
                key={label}
                className="group relative flex flex-col items-center justify-center gap-2 py-10 px-6 text-center"
                style={{
                  borderRight:
                    i < 3 ? "1px solid rgba(255,255,255,.08)" : undefined,
                }}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[.03] transition-colors rounded-none" />
                <Icon className="h-5 w-5 text-amber-400 opacity-80" />
                <div
                  className="font-display text-4xl md:text-5xl font-bold text-white"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {value}
                  {suffix}
                </div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-white/45 font-medium">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Alumni ───────────────────────────────── */}
      <section className="container-page py-24">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3"
            >
              Success Stories
            </span>
            <h2
              className="font-display text-4xl md:text-5xl font-bold"
              style={{ letterSpacing: "-0.02em" }}
            >
              Alumni Making <em className="italic not-italic text-primary">Waves.</em>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">
              Meet the graduates reshaping industries and rewriting the rules of
              what's possible.
            </p>
          </div>
          <Link
            to="/directory"
            className="group text-sm font-semibold text-primary inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            View all alumni
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((a) => (
            <AlumniCard key={a.id} a={a} />
          ))}
        </div>
      </section>

      {/* ── Quote / Pull-quote section ────────────────────── */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "hsl(var(--primary-light))" }}
      >
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "hsl(var(--primary))" }}
        />
        <div className="container-page relative z-10 max-w-3xl mx-auto text-center">
          <Quote
            className="h-10 w-10 mx-auto mb-6 text-primary opacity-60"
            strokeWidth={1.5}
          />
          <blockquote
            className="font-display text-3xl md:text-4xl font-semibold leading-snug text-foreground"
            style={{ letterSpacing: "-0.015em" }}
          >
            "Lincoln didn't just give me a degree — it gave me a community that
            has opened every door since."
          </blockquote>
          <footer className="mt-6">
            <p className="font-semibold text-foreground text-sm">Dr. Priya Nair</p>
            <p className="text-muted-foreground text-sm mt-0.5">
              MBBS '09 · Consultant Cardiologist, Singapore General Hospital
            </p>
          </footer>
        </div>
      </section>

      {/* ── Why Join ──────────────────────────────────────── */}
      <section className="container-page py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
            Why Join
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ letterSpacing: "-0.02em" }}
          >
            Built for lifelong impact.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Network Globally",
              d: "Connect with alumni across 85 countries and 40+ industries through our searchable directory and curated events.",
            },
            {
              n: "02",
              t: "Accelerate Your Career",
              d: "Access a private job board, warm referrals, and exclusive opportunities sourced directly from fellow graduates.",
            },
            {
              n: "03",
              t: "Give Back",
              d: "Mentor students, sponsor scholarships, or speak at campus events — your journey inspires the next generation.",
            },
          ].map((b) => (
            <div
              key={b.t}
              className="card-premium group p-8 relative"
            >
<div
  className="absolute -top-2 -right-2 font-display text-8xl font-bold text-primary opacity-[0.06] select-none pointer-events-none leading-none"
>
  {b.n}
</div>
              <div
                className="w-10 h-10 grid place-items-center rounded-xl text-white text-sm font-bold font-display mb-6"
                style={{ background: "hsl(var(--primary))" }}
              >
                {b.n}
              </div>
              <h3
                className="font-display text-2xl font-semibold mb-3"
                style={{ letterSpacing: "-0.01em" }}
              >
                {b.t}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {b.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "hsl(var(--muted))" }}
      >
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
                What's On
              </span>
              <h2
                className="font-display text-4xl md:text-5xl font-bold"
                style={{ letterSpacing: "-0.02em" }}
              >
                Upcoming Events.
              </h2>
            </div>
            <Link
              to="/events"
              className="group text-sm font-semibold text-primary inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              All events
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {upcoming.map((e, idx) => (
              <Link
                key={e.id}
                to="/events"
                className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-elegant transition-all hover:-translate-y-1"
              >
                {/* Date stripe */}
                <div
                  className="relative h-44 flex items-end p-5"
                  style={{
                    background:
                      idx === 0
                        ? "linear-gradient(135deg, hsl(350 85% 30%) 0%, hsl(220 40% 20%) 100%)"
                        : idx === 1
                        ? "linear-gradient(135deg, hsl(220 40% 18%) 0%, hsl(350 60% 25%) 100%)"
                        : "linear-gradient(135deg, hsl(28 85% 35%) 0%, hsl(350 85% 28%) 100%)",
                  }}
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white">
                    <div className="font-display text-3xl font-bold leading-none">
                      {new Date(e.date).getDate()}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest font-semibold opacity-80 mt-0.5">
                      {new Date(e.date).toLocaleString("en", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <span className="absolute top-4 right-4 pill bg-white/15 border border-white/20 text-white text-[10px]">
                    {e.mode}
                  </span>
                </div>
                <div className="p-6">
                  <h3
                    className="font-display text-xl font-semibold group-hover:text-primary transition-colors"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {e.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 font-medium">
                    {e.location}
                  </p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">
                    {e.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="container-page py-24">
        <div
          className="relative overflow-hidden rounded-3xl px-10 md:px-20 py-20 text-center text-white"
          style={{ background: "var(--gradient-hero)" }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10 pointer-events-none"
            style={{ background: "hsl(var(--accent))" }}
          />
          <div
            className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full opacity-10 pointer-events-none"
            style={{ background: "white" }}
          />

          <div className="relative z-10">
            <span className="pill bg-white/15 border border-white/20 text-white mb-5 mx-auto">
              🎓 Join 25,000+ Alumni
            </span>
            <h2
              className="font-display text-4xl md:text-6xl font-bold max-w-2xl mx-auto mt-4 leading-tight"
              style={{ letterSpacing: "-0.025em" }}
            >
              Your story didn't end at graduation.
            </h2>
            <p className="mt-5 opacity-80 max-w-lg mx-auto leading-relaxed">
              Join the Lincoln Alumni Network and unlock a lifetime of
              connections, opportunities, and impact.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-semibold text-gray-900 hover:bg-amber-400 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 group"
            >
              Become a Member
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}