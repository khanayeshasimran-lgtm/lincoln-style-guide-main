import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Calendar,
  Users,
  X,
  ArrowRight,
  Check,
  Clock,
  ChevronLeft,
  ChevronRight,
  Play,
  Mic2,
  Wifi,
  Building2,
  Briefcase,
  Network,
  Send,
  Image as ImageIcon,
} from "lucide-react";
import { events } from "@/data/alumni";

export const Route = createFileRoute("/events")({
  component: Events,
  head: () => ({
    meta: [
      { title: "Events — Lincoln Alumni Network" },
      {
        name: "description",
        content:
          "Reunions, webinars, mentorship mixers, and founder nights for Lincoln University College alumni worldwide.",
      },
    ],
  }),
});

// ─── TYPES ───────────────────────────────────────────────────────────────────

type RSVPState = "idle" | "loading" | "done";
type FilterTab = "All" | "Upcoming" | "Past" | "Online" | "Offline" | "Networking" | "Career";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  mode: string;
  description: string;
  speakers: string[];
}

// ─── STATIC DATA ─────────────────────────────────────────────────────────────

const pastEventsGallery = [
  {
    year: "2025",
    title: "Global Alumni Reunion — KL",
    tag: "Reunion",
    tagColor: "bg-red-500/20 text-red-400 border-red-400/20",
    attendees: "1,200+",
    gradient: "from-red-900 to-rose-950",
  },
  {
    year: "2025",
    title: "Fintech Founders Night",
    tag: "Career",
    tagColor: "bg-amber-500/20 text-amber-400 border-amber-400/20",
    attendees: "340",
    gradient: "from-amber-900 to-orange-950",
  },
  {
    year: "2024",
    title: "Virtual Mentorship Summit",
    tag: "Online",
    tagColor: "bg-blue-500/20 text-blue-400 border-blue-400/20",
    attendees: "3,100+",
    gradient: "from-blue-900 to-indigo-950",
  },
  {
    year: "2024",
    title: "Medical Alumni Gala",
    tag: "Networking",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-400/20",
    attendees: "580",
    gradient: "from-emerald-900 to-teal-950",
  },
  {
    year: "2024",
    title: "Engineering Hackathon",
    tag: "Career",
    tagColor: "bg-purple-500/20 text-purple-400 border-purple-400/20",
    attendees: "260",
    gradient: "from-purple-900 to-violet-950",
  },
  {
    year: "2023",
    title: "Scholarship Fundraising Gala",
    tag: "Reunion",
    tagColor: "bg-pink-500/20 text-pink-400 border-pink-400/20",
    attendees: "820",
    gradient: "from-pink-900 to-rose-950",
  },
];

const HIGHLIGHT_VIDEOS = [
  { title: "Global Reunion 2025 — Official Highlight Reel", duration: "4:32", views: "12.4K" },
  { title: "Alumni Founders Night — Panel Recap", duration: "18:07", views: "5.8K" },
  { title: "LUC Class of 2024 Graduation Ceremony", duration: "1:24:55", views: "34.1K" },
];

const FILTER_TABS: FilterTab[] = ["All", "Upcoming", "Past", "Online", "Offline", "Networking", "Career"];

// ─── COUNTDOWN HOOK ───────────────────────────────────────────────────────────

function useCountdown(targetDate: string) {
  const calc = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, [targetDate]);
  return time;
}

// ─── EVENT DETAIL MODAL (S4) ─────────────────────────────────────────────────

function EventModal({ event, onClose }: { event: Event; onClose: () => void }) {
  const [rsvpState, setRsvpState] = useState<RSVPState>("idle");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  const agenda = [
    { time: "09:00", item: "Registration & Networking Breakfast" },
    { time: "10:00", item: "Opening Remarks — Alumni President" },
    { time: "10:30", item: "Keynote: Industry Trends 2026" },
    { time: "11:30", item: "Panel Discussion with Speakers" },
    { time: "13:00", item: "Lunch & Informal Networking" },
    { time: "14:30", item: "Breakout Sessions" },
    { time: "16:00", item: "Closing & Networking Reception" },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl relative"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          boxShadow: "0 40px 80px -12px rgba(190,24,55,0.22), 0 12px 32px rgba(0,0,0,0.18)",
          animation: "modalIn 320ms cubic-bezier(.22,.68,0,1.2) both",
        }}
      >
        {/* Header gradient */}
        <div
          className="relative h-40 flex items-end p-7 shrink-0"
          style={{ background: "linear-gradient(135deg, hsl(350 85% 22%) 0%, hsl(220 40% 14%) 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 bg-white/15 border border-white/20 text-white">
              {event.mode}
            </span>
            <h2 className="font-display text-2xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
              {event.title}
            </h2>
          </div>
        </div>

        <div className="p-7 grid md:grid-cols-[1fr_auto] gap-8">
          {/* Left: details */}
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{event.description}</p>

            <ul className="space-y-3 mb-8">
              {[
                { icon: Calendar, text: new Date(event.date).toDateString() },
                { icon: Clock, text: "9:00 AM – 5:00 PM (MYT)" },
                { icon: MapPin, text: event.location },
                { icon: Users, text: event.speakers.join(" · ") },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-foreground/80">{text}</span>
                </li>
              ))}
            </ul>

            {/* Agenda */}
            <div>
              <h3 className="font-display font-semibold text-sm uppercase tracking-widest mb-4 text-muted-foreground">Agenda</h3>
              <div className="space-y-2">
                {agenda.map((a) => (
                  <div key={a.time} className="flex items-center gap-3 text-sm">
                    <span className="tabular-nums text-xs font-bold text-primary w-12 shrink-0">{a.time}</span>
                    <span className="text-muted-foreground">{a.item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: register */}
          <div className="md:w-52 flex flex-col gap-3">
            <div className="rounded-2xl border border-border p-5 text-center">
              <div className="font-display text-4xl font-bold text-primary leading-none">
                {new Date(event.date).getDate()}
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold mt-1 text-muted-foreground">
                {new Date(event.date).toLocaleString("en", { month: "long", year: "numeric" })}
              </div>
            </div>
            <button
              onClick={() => {
                if (rsvpState !== "idle") return;
                setRsvpState("loading");
                setTimeout(() => setRsvpState("done"), 1500);
              }}
              disabled={rsvpState !== "idle"}
              className="w-full rounded-full font-semibold py-3.5 text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-75"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              {rsvpState === "idle" && "Register Now"}
              {rsvpState === "loading" && (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Reserving…
                </span>
              )}
              {rsvpState === "done" && (
                <span className="flex items-center justify-center gap-2">
                  <Check className="h-4 w-4" /> Registered!
                </span>
              )}
            </button>
            <Link
              to="/contact"
              className="w-full rounded-full border border-border py-3 text-xs font-semibold text-center hover:bg-muted transition-colors"
            >
              Share Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CALENDAR VIEW (S5) ───────────────────────────────────────────────────────

function CalendarView({ events: evts, onSelectEvent }: { events: Event[]; onSelectEvent: (e: Event) => void }) {
  const today = new Date();
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
  const monthName = new Date(current.year, current.month).toLocaleString("en", { month: "long", year: "numeric" });

  // Map date → events
  const eventMap: Record<number, Event[]> = {};
  evts.forEach((e) => {
    const d = new Date(e.date);
    if (d.getFullYear() === current.year && d.getMonth() === current.month) {
      const day = d.getDate();
      if (!eventMap[day]) eventMap[day] = [];
      eventMap[day].push(e);
    }
  });

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Month header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <button
          onClick={() => setCurrent((c) => {
            const d = new Date(c.year, c.month - 1);
            return { year: d.getFullYear(), month: d.getMonth() };
          })}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h3 className="font-display font-semibold text-base">{monthName}</h3>
        <button
          onClick={() => setCurrent((c) => {
            const d = new Date(c.year, c.month + 1);
            return { year: d.getFullYear(), month: d.getMonth() };
          })}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 bg-muted/50">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-2 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          const isToday = day === today.getDate() && current.month === today.getMonth() && current.year === today.getFullYear();
          const hasEvents = day !== null && eventMap[day];
          return (
            <div
              key={i}
              onClick={() => { if (hasEvents && day !== null) onSelectEvent(eventMap[day][0]); }}
              className={`relative min-h-[60px] md:min-h-[80px] p-2 border-b border-r border-border/50 transition-colors
                ${day === null ? "bg-muted/20" : ""}
                ${hasEvents ? "cursor-pointer hover:bg-primary/5" : ""}
              `}
            >
              {day !== null && (
                <>
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold
                      ${isToday ? "bg-primary text-white" : "text-foreground"}
                    `}
                  >
                    {day}
                  </span>
                  {hasEvents && (
                    <div className="mt-1 space-y-0.5">
                      {eventMap[day].slice(0, 2).map((e) => (
                        <div
                          key={e.id}
                          className="hidden md:block text-[9px] font-semibold truncate rounded px-1 py-0.5 leading-tight"
                          style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}
                        >
                          {e.title}
                        </div>
                      ))}
                      <div className="flex md:hidden gap-0.5 mt-0.5">
                        {eventMap[day].map((e) => (
                          <span key={e.id} className="w-1.5 h-1.5 rounded-full bg-primary" />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN EVENTS PAGE ────────────────────────────────────────────────────────

function Events() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [filterKey, setFilterKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [rsvpStates, setRsvpStates] = useState<Record<string, RSVPState>>({});
  const [galleryYear, setGalleryYear] = useState("All");
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [hostIdea, setHostIdea] = useState("");
  const [hostSubmit, setHostSubmit] = useState<"idle" | "loading" | "done">("idle");

  // Featured event = first upcoming
  const featuredEvent = events[0];
  const countdown = useCountdown(featuredEvent?.date ?? "2026-12-31");

  // Filter logic
  const getFiltered = () => {
    const now = new Date();
    if (activeTab === "All") return events;
    if (activeTab === "Upcoming") return events.filter((e) => new Date(e.date) >= now);
    if (activeTab === "Past") return events.filter((e) => new Date(e.date) < now);
    if (activeTab === "Online") return events.filter((e) => e.mode === "Online");
    if (activeTab === "Offline") return events.filter((e) => e.mode === "Offline");
    if (activeTab === "Networking") return events.filter((_, i) => i % 3 === 0);
    if (activeTab === "Career") return events.filter((_, i) => i % 3 === 1);
    return events;
  };
  const filtered = getFiltered();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 750);
    return () => clearTimeout(t);
  }, []);

  const handleFilterChange = (tab: FilterTab) => {
    setActiveTab(tab);
    setFilterKey((k) => k + 1);
  };

  const handleRSVP = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (rsvpStates[id] && rsvpStates[id] !== "idle") return;
    setRsvpStates((p) => ({ ...p, [id]: "loading" }));
    setTimeout(() => setRsvpStates((p) => ({ ...p, [id]: "done" })), 1600);
  };

  const handleHostSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hostSubmit !== "idle") return;
    setHostSubmit("loading");
    setTimeout(() => setHostSubmit("done"), 1800);
  };

  const galleryYears = ["All", "2025", "2024", "2023"];
  const filteredGallery = galleryYear === "All" ? pastEventsGallery : pastEventsGallery.filter((g) => g.year === galleryYear);

  const tabIcons: Partial<Record<FilterTab, React.ReactNode>> = {
    Online: <Wifi className="h-3.5 w-3.5" />,
    Offline: <Building2 className="h-3.5 w-3.5" />,
    Networking: <Network className="h-3.5 w-3.5" />,
    Career: <Briefcase className="h-3.5 w-3.5" />,
  };

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93) translateY(14px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeUpE {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes filterFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .filter-fade { animation: filterFade 280ms ease-out both; }
        .hero-fade-1 { animation: fadeUpE 380ms ease-out 80ms  both; }
        .hero-fade-2 { animation: fadeUpE 380ms ease-out 200ms both; }
        .hero-fade-3 { animation: fadeUpE 380ms ease-out 320ms both; }
        .hero-fade-4 { animation: fadeUpE 380ms ease-out 440ms both; }

        .event-card-main {
          transition: transform 280ms ease-out, box-shadow 280ms ease-out, border-color 280ms ease-out;
          cursor: pointer;
        }
        .event-card-main:hover {
          transform: translateY(-6px) scale(1.005);
          box-shadow: 0 20px 48px rgba(190,24,55,0.10), 0 6px 18px rgba(0,0,0,0.07);
          border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
        }
        .rsvp-btn-main {
          transition: transform 240ms ease-out, box-shadow 240ms ease-out;
        }
        .rsvp-btn-main:not(:disabled):hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px -3px color-mix(in srgb, var(--color-primary) 50%, transparent);
        }
        .gallery-card {
          transition: transform 280ms ease-out, box-shadow 280ms ease-out;
          cursor: pointer;
        }
        .gallery-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 16px 40px rgba(0,0,0,0.25);
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }
        .gallery-overlay {
          opacity: 0;
          transition: opacity 280ms ease-out;
        }
      `}</style>

      {/* ── S1: EVENT HERO / BANNER ──────────────────────────────────── */}
      <section
        id="event-hero"
        className="relative overflow-hidden py-36 lg:py-48"
        style={{ background: "linear-gradient(160deg, #7f0d18 0%, #1a0306 60%, #0d0d14 100%)" }}
      >
        {/* Texture */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute -top-24 -right-24 w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
        />

        <div className="container-page relative z-10">
          <div className="max-w-3xl">
            <span className="hero-fade-1 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Featured Event
            </span>

            <h1
              className="hero-fade-2 font-display text-5xl md:text-7xl font-bold text-white leading-[0.95]"
              style={{ letterSpacing: "-0.025em" }}
            >
              {featuredEvent?.title ?? "Global Alumni"}{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                2026.
              </span>
            </h1>

            <p className="hero-fade-3 mt-6 text-white/65 text-lg leading-relaxed max-w-xl">
              {featuredEvent?.description ?? "The largest Lincoln alumni gathering of the year — connect with 1,000+ graduates from 40+ industries across the globe."}
            </p>

            <div className="hero-fade-3 mt-5 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber-400" />
                {featuredEvent ? new Date(featuredEvent.date).toDateString() : "TBD"}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-amber-400" />
                {featuredEvent?.location ?? "Kuala Lumpur, Malaysia"}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-amber-400" />
                {featuredEvent?.speakers?.join(" · ")}
              </span>
            </div>

            {/* Countdown */}
            <div className="hero-fade-4 mt-10 flex flex-wrap gap-3">
              {[
                { val: countdown.days, label: "Days" },
                { val: countdown.hours, label: "Hours" },
                { val: countdown.minutes, label: "Min" },
                { val: countdown.seconds, label: "Sec" },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur border border-white/15"
                >
                  <span className="font-display text-3xl font-bold text-white tabular-nums leading-none">
                    {String(val).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/45 mt-1 font-medium">{label}</span>
                </div>
              ))}
            </div>

            <div className="hero-fade-4 mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedEvent(featuredEvent)}
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 hover:bg-amber-400 transition-all shadow-xl hover:-translate-y-0.5"
              >
                Register Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("events-grid");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                Browse All Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── S2: FILTER TABS ──────────────────────────────────────────── */}
      <section
        id="filter-tabs"
        className="sticky top-0 z-30 border-b border-border"
        style={{ background: "hsl(var(--background)/0.95)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      >
        <div className="container-page">
          <div className="flex items-center gap-1.5 overflow-x-auto py-3 scrollbar-hide no-scrollbar">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleFilterChange(tab)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all shrink-0
                  ${activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
              >
                {tabIcons[tab]}
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3: UPCOMING EVENTS GRID ─────────────────────────────────── */}
      <section id="events-grid" className="container-page py-20">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
              {activeTab === "All" ? "All Events" : activeTab}
            </span>
            <h2
              className="font-display text-4xl md:text-5xl font-bold"
              style={{ letterSpacing: "-0.02em" }}
            >
              {activeTab === "Past" ? "Past Events." : "Upcoming Events."}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              {filtered.length} event{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        <div key={filterKey} className="filter-fade grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden" style={{ animation: `filterFade 300ms ease-out ${i * 60}ms both` }}>
                  <div className="h-44 bg-muted animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 w-3/4 bg-muted animate-pulse rounded-lg" />
                    <div className="h-4 w-full bg-muted animate-pulse rounded-lg" />
                    <div className="h-4 w-2/3 bg-muted animate-pulse rounded-lg" />
                    <div className="h-10 w-28 bg-muted animate-pulse rounded-full mt-4" />
                  </div>
                </div>
              ))
            : filtered.map((e, i) => {
                const rsvp = rsvpStates[e.id] ?? "idle";
                const gradients = [
                  "linear-gradient(135deg, hsl(350 85% 28%) 0%, hsl(220 40% 18%) 100%)",
                  "linear-gradient(135deg, hsl(220 40% 16%) 0%, hsl(350 60% 23%) 100%)",
                  "linear-gradient(135deg, hsl(28 80% 32%) 0%, hsl(350 85% 26%) 100%)",
                  "linear-gradient(135deg, hsl(260 50% 22%) 0%, hsl(220 40% 16%) 100%)",
                  "linear-gradient(135deg, hsl(180 40% 18%) 0%, hsl(220 50% 16%) 100%)",
                  "linear-gradient(135deg, hsl(350 85% 24%) 0%, hsl(28 70% 28%) 100%)",
                ];
                return (
                  <div
                    key={e.id}
                    className="event-card-main rounded-2xl border border-border bg-card overflow-hidden"
                    style={{ animation: `filterFade 320ms ease-out ${i * 60}ms both` }}
                    onClick={() => setSelectedEvent(e)}
                  >
                    {/* Date banner */}
                    <div className="relative h-44 flex items-end p-5" style={{ background: gradients[i % 6] }}>
                      <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                          backgroundImage: "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                      <div className="bg-white/12 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white z-10 relative">
                        <div className="font-display text-3xl font-bold leading-none">
                          {new Date(e.date).getDate()}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest font-semibold opacity-80 mt-0.5">
                          {new Date(e.date).toLocaleString("en", { month: "long", year: "numeric" })}
                        </div>
                      </div>
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-white">
                        {e.mode === "Online" ? <Wifi className="h-2.5 w-2.5" /> : <Building2 className="h-2.5 w-2.5" />}
                        {e.mode}
                      </span>
                      {i === 0 && (
                        <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="p-6">
                      <h3
                        className="font-display text-xl font-semibold leading-snug hover:text-primary transition-colors"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {e.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5 font-medium">
                        <MapPin className="h-3 w-3" /> {e.location}
                      </p>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">
                        {e.description}
                      </p>

                      {/* Speakers chips */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {e.speakers.slice(0, 2).map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground"
                          >
                            <Mic2 className="h-2.5 w-2.5" /> {s}
                          </span>
                        ))}
                        {e.speakers.length > 2 && (
                          <span className="text-[10px] text-muted-foreground px-2 py-1">+{e.speakers.length - 2} more</span>
                        )}
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <button
                          className={`rsvp-btn-main rounded-full px-5 py-2.5 text-sm font-semibold transition-all
                            ${rsvp === "done" ? "bg-emerald-500/15 text-emerald-600 border border-emerald-400/30" : "bg-primary text-primary-foreground"}`}
                          onClick={(ev) => handleRSVP(ev, e.id)}
                          disabled={rsvp !== "idle"}
                        >
                          {rsvp === "idle" && "RSVP"}
                          {rsvp === "loading" && (
                            <span className="flex items-center gap-1.5">
                              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                              Saving…
                            </span>
                          )}
                          {rsvp === "done" && (
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3.5 w-3.5" /> Reserved
                            </span>
                          )}
                        </button>
                        <button
                          className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all group"
                          onClick={(ev) => { ev.stopPropagation(); setSelectedEvent(e); }}
                        >
                          Details <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Calendar className="h-10 w-10 mx-auto mb-4 opacity-30" />
            <p className="font-semibold">No events found for this filter.</p>
          </div>
        )}
      </section>

      {/* ── S4: EVENT DETAIL DRAWER/MODAL — rendered at root ─────────── */}

      {/* ── S5: CALENDAR VIEW ────────────────────────────────────────── */}
      <section
        id="calendar"
        className="py-20"
        style={{ background: "hsl(var(--muted))" }}
      >
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
                Calendar View
              </span>
              <h2
                className="font-display text-4xl md:text-5xl font-bold"
                style={{ letterSpacing: "-0.02em" }}
              >
                Events at a glance.
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                Click any highlighted date to see event details. Navigate between months to explore the full schedule.
              </p>
            </div>
          </div>
          <CalendarView events={events} onSelectEvent={(e) => setSelectedEvent(e)} />
        </div>
      </section>

      {/* ── S6: PAST EVENTS GALLERY ──────────────────────────────────── */}
      <section id="past-events" className="container-page py-20">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
              Past Events
            </span>
            <h2
              className="font-display text-4xl md:text-5xl font-bold"
              style={{ letterSpacing: "-0.02em" }}
            >
              Memories made together.
            </h2>
          </div>
          {/* Year filter */}
          <div className="flex items-center gap-2">
            {galleryYears.map((y) => (
              <button
                key={y}
                onClick={() => setGalleryYear(y)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all
                  ${galleryYear === y ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Photo masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredGallery.map((g, i) => (
            <div
              key={i}
              className={`gallery-card relative rounded-2xl overflow-hidden ${i === 0 || i === 3 ? "row-span-2 min-h-[320px]" : "min-h-[160px]"}`}
              style={{ background: `linear-gradient(135deg, ${g.gradient.replace("from-", "").replace(" to-", ", ")})` }}
            >
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Overlay on hover */}
              <div className="gallery-overlay absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <ImageIcon className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border mb-2 ${g.tagColor}`}>
                  {g.tag}
                </span>
                <h3 className="font-display text-sm font-bold text-white leading-snug">{g.title}</h3>
                <p className="text-[10px] text-white/60 mt-0.5 flex items-center gap-1">
                  <Users className="h-2.5 w-2.5" /> {g.attendees} attendees · {g.year}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video highlights */}
        <div className="mt-14">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-6">
            Video Highlights
          </span>
          <div className="grid md:grid-cols-3 gap-5">
            {HIGHLIGHT_VIDEOS.map((v, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-border bg-card p-5 flex items-center gap-4 cursor-pointer hover:border-primary/30 hover:shadow-elegant transition-all hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="h-5 w-5 text-white translate-x-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold leading-snug truncate">{v.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                    <Clock className="h-3 w-3" /> {v.duration}
                    <span className="w-1 h-1 rounded-full bg-border" />
                    {v.views} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: HOST AN EVENT CTA ─────────────────────────────────────── */}
      <section
        id="host-event"
        className="py-20"
        style={{ background: "#0F1420" }}
      >
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400 block mb-4">
                Propose an Event
              </span>
              <h2
                className="font-display text-4xl md:text-5xl font-bold text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                Have an idea?{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Host it.
                </span>
              </h2>
              <p className="mt-5 text-white/60 leading-relaxed max-w-md">
                Alumni can propose reunions, workshops, networking nights, panel discussions, or online webinars.
                Submit your idea and the events team will get back to you within 5 working days.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  { icon: Network, text: "Networking nights — connect alumni in your city" },
                  { icon: Mic2, text: "Panel talks — share your career journey with students" },
                  { icon: Briefcase, text: "Industry workshops — hands-on skill sessions" },
                  { icon: Wifi, text: "Virtual webinars — reach alumni across 85 countries" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-sm text-white/70">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form */}
            <div
              className="rounded-2xl p-8 border border-white/10"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
            >
              {hostSubmit === "done" ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5">
                    <Check className="h-7 w-7 text-emerald-400" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">Proposal Received!</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Our events team will review your submission and reach out within 5 working days.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl font-bold text-white mb-6">Submit Your Event Idea</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1.5 block">Your Name</label>
                      <input
                        type="text"
                        value={hostName}
                        onChange={(e) => setHostName(e.target.value)}
                        placeholder="e.g. Ahmad Fauzi"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1.5 block">Email Address</label>
                      <input
                        type="email"
                        value={hostEmail}
                        onChange={(e) => setHostEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1.5 block">Event Idea</label>
                      <textarea
                        value={hostIdea}
                        onChange={(e) => setHostIdea(e.target.value)}
                        rows={4}
                        placeholder="Describe your event — format, expected audience, preferred date, location..."
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>
                    <button
                      onClick={handleHostSubmit}
                      disabled={hostSubmit !== "idle" || !hostName || !hostEmail || !hostIdea}
                      className="w-full rounded-full bg-primary text-white py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {hostSubmit === "loading" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Proposal
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-white/35">
                      Or{" "}
                      <Link to="/contact" className="text-amber-400 hover:underline">
                        contact the events team directly →
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── S4 MODAL (rendered at root level) ───────────────────────── */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}