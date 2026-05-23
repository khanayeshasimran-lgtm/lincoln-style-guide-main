import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { events } from "@/data/alumni";

export const Route = createFileRoute("/events")({
  component: Events,
  head: () => ({
    meta: [
      { title: "Events — Lincoln Alumni Network" },
      {
        name: "description",
        content:
          "Reunions, webinars, mentorship mixers and founder nights for Lincoln alumni.",
      },
    ],
  }),
});

function Events() {
  const [mode, setMode] = useState<"All" | "Online" | "Offline">("All");
  const filtered = events.filter((e) => mode === "All" || e.mode === mode);

  const GRADIENTS = [
    "linear-gradient(135deg, hsl(350 85% 28%) 0%, hsl(220 50% 18%) 100%)",
    "linear-gradient(135deg, hsl(220 45% 20%) 0%, hsl(350 70% 24%) 100%)",
    "linear-gradient(135deg, hsl(28 75% 32%) 0%, hsl(350 80% 26%) 100%)",
    "linear-gradient(135deg, hsl(190 60% 24%) 0%, hsl(350 85% 22%) 100%)",
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24"
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
          className="absolute right-0 top-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(245,158,11,.12) 0%, transparent 60%)",
          }}
        />

        <div className="container-page relative z-10">
          <span className="pill bg-white/10 border border-white/20 text-white mb-5">
            Events
          </span>
          <h1
            className="font-display text-6xl md:text-7xl font-bold text-white max-w-2xl leading-[0.95]"
            style={{ letterSpacing: "-0.025em" }}
          >
            Reconnect.{" "}
            <em
              className="not-italic"
              style={{
                background: "linear-gradient(90deg, #f59e0b, #fcd34d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Inspire.
            </em>
            <br />
            Belong.
          </h1>
          <p className="mt-6 text-white/70 max-w-lg leading-relaxed">
            From intimate founder dinners to international alumni summits —
            there's always somewhere to be.
          </p>
        </div>
      </section>

      {/* ── Filter + List ─────────────────────────────────── */}
      <section className="container-page py-16">
        {/* Mode tabs */}
        <div className="flex gap-2 mb-12 p-1.5 bg-muted rounded-2xl w-fit">
          {(["All", "Online", "Offline"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${
                mode === m
                  ? "bg-white text-foreground shadow-card"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m}
              {m !== "All" && (
                <span
                  className={`ml-2 rounded-full text-[10px] px-1.5 py-0.5 font-bold ${
                    mode === m
                      ? "bg-primary text-white"
                      : "bg-muted-foreground/20"
                  }`}
                >
                  {events.filter((e) => e.mode === m).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filtered.map((e, idx) => (
            <article
              key={e.id}
              className="group grid md:grid-cols-[220px_1fr_auto] gap-0 items-stretch bg-card border border-border rounded-2xl overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-0.5"
            >
              {/* Left — date panel */}
              <div
                className="relative flex flex-col items-center justify-center py-8 px-6 text-white shrink-0"
                style={{ background: GRADIENTS[idx % GRADIENTS.length] }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(-45deg, rgba(255,255,255,.025) 0px, rgba(255,255,255,.025) 1px, transparent 1px, transparent 20px)",
                  }}
                />
                <span
                  className="font-display text-7xl font-bold leading-none relative z-10"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {new Date(e.date).getDate()}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] opacity-70 mt-1.5 relative z-10">
                  {new Date(e.date).toLocaleString("en", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="mt-4 pill bg-white/15 border border-white/20 text-white relative z-10 text-[10px]">
                  {e.mode}
                </span>
              </div>

              {/* Middle — content */}
              <div className="p-8 flex flex-col justify-center border-l border-border">
                <h3
                  className="font-display text-2xl font-semibold group-hover:text-primary transition-colors"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {e.title}
                </h3>
                <p className="text-muted-foreground mt-2.5 leading-relaxed text-sm max-w-xl">
                  {e.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {e.location}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    {new Date(e.date).toDateString()}
                  </span>
                  {e.speakers?.length > 0 && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      {e.speakers.join(", ")}
                    </span>
                  )}
                </div>
              </div>

              {/* Right — CTA */}
              <div className="flex items-center px-8 py-6 border-l border-border">
                <button className="group/btn rounded-full bg-primary text-white px-6 py-3 font-semibold text-sm hover:bg-primary-hover transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2">
                  RSVP
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-28">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground text-sm">
              Try switching to a different filter.
            </p>
            <button
              onClick={() => setMode("All")}
              className="mt-6 rounded-full bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors"
            >
              Show all events
            </button>
          </div>
        )}
      </section>

      {/* ── CTA strip ─────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "hsl(var(--primary-light))" }}
      >
        <div className="container-page text-center max-w-xl mx-auto">
          <h2
            className="font-display text-3xl md:text-4xl font-bold"
            style={{ letterSpacing: "-0.02em" }}
          >
            Want to host an alumni event?
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed text-sm">
            We partner with local chapters and industry leaders to bring
            meaningful experiences to our community worldwide.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-white px-8 py-4 text-sm font-semibold hover:bg-primary-hover transition-all hover:-translate-y-0.5 shadow-md hover:shadow-xl group"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </>
  );
}