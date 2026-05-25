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
  Mic2,
  Wifi,
  Building2,
  Briefcase,
  Network,
  Send,
  Globe,
  TrendingUp,
} from "lucide-react";

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

type RSVPState = "idle" | "loading" | "done";
type FilterTab = "All" | "Upcoming" | "Past" | "Online" | "In-Person" | "Networking" | "Career";

interface CalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  mode: "Online" | "In-Person";
  category: "Networking" | "Career" | "Reunion" | "Mentorship" | "Sports" | "Medical";
  description: string;
  speakers: string[];
  image: string;
  attendees: number;
  featured?: boolean;
}

const ALL_EVENTS: CalEvent[] = [
  {
    id: "e1",
    title: "Global Alumni Reunion 2026",
    date: "2026-06-13",
    time: "6:00 PM – 11:00 PM",
    location: "Mandarin Oriental, Kuala Lumpur",
    mode: "In-Person",
    category: "Reunion",
    description: "The flagship annual gathering of Lincoln alumni from across 85 countries. An evening of connection, celebration, and inspiration.",
    speakers: ["Prof. Dr. Amiya Bhaumik", "Datuk Dr. Bibi Florina"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
    attendees: 1200,
    featured: true,
  },
  {
    id: "e2",
    title: "Fintech Founders Panel",
    date: "2026-06-20",
    time: "7:00 PM – 9:30 PM",
    location: "MaGIC, Cyberjaya",
    mode: "In-Person",
    category: "Career",
    description: "Six Lincoln alumni founders share how they scaled fintech startups across ASEAN. Q&A and networking dinner included.",
    speakers: ["Ahmad Fauzi", "Mei Lin Chen", "Rajan Pillai"],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=900&q=80",
    attendees: 340,
  },
  {
    id: "e3",
    title: "Virtual Mentorship Summit",
    date: "2026-07-05",
    time: "10:00 AM – 4:00 PM",
    location: "Zoom — Link sent on registration",
    mode: "Online",
    category: "Mentorship",
    description: "Match with senior alumni mentors in your industry. Structured 1:1 sessions plus group workshops on career acceleration.",
    speakers: ["Dr. Priya Nair", "Marcus Chen", "Fatima Al-Rashidi"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80",
    attendees: 3100,
  },
  {
    id: "e4",
    title: "Medical Alumni Gala",
    date: "2026-07-18",
    time: "7:30 PM – 11:00 PM",
    location: "Shangri-La Hotel, Penang",
    mode: "In-Person",
    category: "Medical",
    description: "An elegant black-tie celebration for alumni from Lincoln's medical and health sciences faculties. Research awards ceremony included.",
    speakers: ["Prof. Dr. Abdul Gani", "Dr. Priya Nair"],
    image: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=900&q=80",
    attendees: 580,
  },
  {
    id: "e5",
    title: "Engineering & Tech Hackathon",
    date: "2026-08-01",
    time: "9:00 AM – 6:00 PM",
    location: "Lincoln Campus, Petaling Jaya",
    mode: "In-Person",
    category: "Career",
    description: "24-hour alumni hackathon tackling real-world sustainability problems. Top teams pitch to a VC panel. Prizes worth RM 50,000.",
    speakers: ["Raj Patel", "Nurul Izzah Tan"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    attendees: 260,
  },
  {
    id: "e6",
    title: "London Chapter Networking Night",
    date: "2026-08-14",
    time: "6:30 PM – 9:30 PM",
    location: "The Ned, London, UK",
    mode: "In-Person",
    category: "Networking",
    description: "Alumni based in the UK and Europe gather for an evening of canapes, cocktails, and conversation in central London.",
    speakers: ["Aisha Rahman", "David Lim"],
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    attendees: 95,
  },
  {
    id: "e7",
    title: "Scholarship Fundraising Gala",
    date: "2026-09-05",
    time: "7:00 PM – 10:30 PM",
    location: "Hilton Kuala Lumpur",
    mode: "In-Person",
    category: "Reunion",
    description: "Annual black-tie fundraiser that has raised over RM 8M for student scholarships across 6 editions. Target: RM 3M this year.",
    speakers: ["Prof. Dr. Amiya Bhaumik", "Datuk Dr. Bibi Florina"],
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80",
    attendees: 820,
    featured: true,
  },
  {
    id: "e8",
    title: "AI & Healthcare Webinar",
    date: "2026-09-19",
    time: "3:00 PM – 5:00 PM",
    location: "Online — Google Meet",
    mode: "Online",
    category: "Medical",
    description: "How AI is reshaping diagnostics, drug discovery, and patient care. Join four Lincoln alumni working at the cutting edge.",
    speakers: ["Dr. Fatima Al-Rashidi", "Dr. Kevin Ng"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
    attendees: 1500,
  },
  {
    id: "e9",
    title: "Singapore Alumni Founders Night",
    date: "2026-10-03",
    time: "6:30 PM – 9:30 PM",
    location: "WeWork, Raffles Place, Singapore",
    mode: "In-Person",
    category: "Career",
    description: "Startup founders and operators share their journey building companies in Singapore's vibrant tech ecosystem.",
    speakers: ["Raj Patel", "Sarah Yeo", "Amir Hassan"],
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80",
    attendees: 180,
  },
  {
    id: "e10",
    title: "Badminton Inter-Alumni Cup",
    date: "2026-10-17",
    time: "8:00 AM – 6:00 PM",
    location: "Axiata Arena, KL",
    mode: "In-Person",
    category: "Sports",
    description: "The annual inter-alumni sports tournament. Open to all Lincoln graduates. Register your team of 4 before slots fill up.",
    speakers: [],
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80",
    attendees: 320,
  },
  {
    id: "e11",
    title: "Women in Leadership Forum",
    date: "2026-11-07",
    time: "9:00 AM – 5:00 PM",
    location: "Pullman KLCC, Kuala Lumpur",
    mode: "In-Person",
    category: "Networking",
    description: "A full-day forum celebrating and empowering women alumni across all industries. Keynotes, panels, and workshops.",
    speakers: ["Datuk Dr. Bibi Florina", "Nurul Izzah Tan", "Dr. Priya Nair"],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=900&q=80",
    attendees: 450,
    featured: true,
  },
  {
    id: "e12",
    title: "Year-End Alumni Mixer",
    date: "2026-11-28",
    time: "7:00 PM – 10:00 PM",
    location: "Rooftop, The Aloft, KL Sentral",
    mode: "In-Person",
    category: "Networking",
    description: "Wind down 2026 with the alumni community. Rooftop views, live jazz, and great conversations. All welcome.",
    speakers: [],
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
    attendees: 200,
  },
  {
    id: "e13",
    title: "Dubai Alumni Business Brunch",
    date: "2026-06-27",
    time: "10:00 AM – 1:00 PM",
    location: "Four Seasons DIFC, Dubai, UAE",
    mode: "In-Person",
    category: "Networking",
    description: "A curated brunch for Lincoln alumni in the Gulf region. Meet peers across finance, real estate, and tech over a relaxed morning.",
    speakers: ["Khalid Al-Mansoori", "Priya Sethi"],
    image: "https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?auto=format&fit=crop&w=900&q=80",
    attendees: 75,
  },
  {
    id: "e14",
    title: "Graduate School Info Night",
    date: "2026-07-23",
    time: "7:00 PM – 9:00 PM",
    location: "Online — Zoom Webinar",
    mode: "Online",
    category: "Career",
    description: "Considering a postgrad? Senior alumni from Oxford, NUS, and Harvard share how they chose programs, secured funding, and made the jump.",
    speakers: ["Dr. Mei Ling Tan", "James Okonkwo"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    attendees: 920,
  },
  {
    id: "e15",
    title: "Lincoln Sports Day 2026",
    date: "2026-08-22",
    time: "7:30 AM – 5:00 PM",
    location: "National Sports Complex, Bukit Jalil",
    mode: "In-Person",
    category: "Sports",
    description: "Football, futsal, netball, and swimming across 8 disciplines. Bring your family — kids' activities and food stalls all day long.",
    speakers: [],
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
    attendees: 650,
  },
  {
    id: "e16",
    title: "Mental Health & Wellness Talk",
    date: "2026-10-10",
    time: "2:00 PM – 4:30 PM",
    location: "Online — Google Meet",
    mode: "Online",
    category: "Medical",
    description: "World Mental Health Day special. Three clinical psychologists from the Lincoln alumni community discuss burnout, resilience, and seeking help.",
    speakers: ["Dr. Aiman Yusof", "Dr. Lena Chong", "Dr. Rahul Mehta"],
    image: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&w=900&q=80",
    attendees: 2200,
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Reunion:    { bg: "bg-red-500/15",     text: "text-red-600",    dot: "#dc2626" },
  Career:     { bg: "bg-amber-500/15",   text: "text-amber-600",  dot: "#d97706" },
  Mentorship: { bg: "bg-blue-500/15",    text: "text-blue-600",   dot: "#2563eb" },
  Medical:    { bg: "bg-emerald-500/15", text: "text-emerald-600",dot: "#059669" },
  Networking: { bg: "bg-violet-500/15",  text: "text-violet-600", dot: "#7c3aed" },
  Sports:     { bg: "bg-orange-500/15",  text: "text-orange-600", dot: "#ea580c" },
};

const FILTER_TABS: FilterTab[] = ["All", "Upcoming", "Past", "Online", "In-Person", "Networking", "Career"];

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

function EventModal({ event, onClose }: { event: CalEvent; onClose: () => void }) {
  const [rsvpState, setRsvpState] = useState<RSVPState>("idle");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
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
      style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl relative bg-white"
        style={{
          boxShadow: "0 48px 96px -16px rgba(0,0,0,0.35)",
          animation: "modalIn 320ms cubic-bezier(.22,.68,0,1.2) both",
        }}
      >
        <div className="relative h-52 overflow-hidden rounded-t-2xl">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-0 left-0 p-6">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md mb-2 bg-white/20 border border-white/25 text-white backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              {event.category} · {event.mode}
            </span>
            <h2 className="font-display text-2xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
              {event.title}
            </h2>
          </div>
        </div>

        <div className="p-7 grid md:grid-cols-[1fr_auto] gap-8">
          <div>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">{event.description}</p>
            <ul className="space-y-3 mb-8">
              {[
                { icon: Calendar, text: new Date(event.date).toDateString() },
                { icon: Clock,    text: event.time },
                { icon: MapPin,   text: event.location },
                ...(event.speakers.length ? [{ icon: Mic2, text: event.speakers.join(" · ") }] : []),
                { icon: Users, text: `${event.attendees.toLocaleString()} expected attendees` },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-3.5 w-3.5 text-red-700" />
                  </div>
                  <span className="text-neutral-700">{text}</span>
                </li>
              ))}
            </ul>
            <div>
              <h3 className="font-semibold text-xs uppercase tracking-widest mb-4 text-neutral-400">Sample Agenda</h3>
              <div className="space-y-2">
                {agenda.map((a) => (
                  <div key={a.time} className="flex items-center gap-3 text-sm">
                    <span className="tabular-nums text-xs font-bold text-red-700 w-12 shrink-0">{a.time}</span>
                    <span className="text-neutral-500">{a.item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-52 flex flex-col gap-3">
            <div className="rounded-xl border-2 border-red-100 bg-red-50 p-5 text-center">
              <div className="font-display text-5xl font-black text-red-700 leading-none">
                {new Date(event.date).getDate()}
              </div>
              <div className="text-xs uppercase tracking-widest font-bold mt-1 text-red-400">
                {new Date(event.date).toLocaleString("en", { month: "long", year: "numeric" })}
              </div>
            </div>
            <button
              onClick={() => { if (rsvpState !== "idle") return; setRsvpState("loading"); setTimeout(() => setRsvpState("done"), 1500); }}
              disabled={rsvpState !== "idle"}
              className="w-full rounded-lg font-bold py-3.5 text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-75 bg-red-700 text-white"
            >
              {rsvpState === "idle" && "Register Now"}
              {rsvpState === "loading" && <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Reserving…</span>}
              {rsvpState === "done" && <span className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Registered!</span>}
            </button>
            <button className="w-full rounded-lg border-2 border-neutral-200 py-3 text-xs font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">
              Share Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BoldCalendar({ events: evts, onSelectEvent }: { events: CalEvent[]; onSelectEvent: (e: CalEvent) => void }) {
  const today = new Date();
  const [current, setCurrent] = useState({ year: 2026, month: 5 });
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
  const monthName = new Date(current.year, current.month).toLocaleString("en", { month: "long" });
  const yearStr = new Date(current.year, current.month).getFullYear();

  const eventMap: Record<number, CalEvent[]> = {};
  evts.forEach((e) => {
    const d = new Date(e.date);
    if (d.getFullYear() === current.year && d.getMonth() === current.month) {
      const day = d.getDate();
      if (!eventMap[day]) eventMap[day] = [];
      eventMap[day].push(e);
    }
  });

  const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const renderCells = () => {
    const cells: React.ReactNode[] = [];
    let cellIndex = 0;

    for (let i = 0; i < firstDay; i++) {
      const isRed = cellIndex % 2 === 1;
      cells.push(
        <div key={`empty-${i}`} className="min-h-[90px] p-2.5"
          style={{ background: isRed ? "#b91c1c" : "#ffffff" }} />
      );
      cellIndex++;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isRed = cellIndex % 2 === 1;
      const isToday = day === today.getDate() && current.month === today.getMonth() && current.year === today.getFullYear();
      const eventsOnDay = eventMap[day] ?? [];
      const hasEvent = eventsOnDay.length > 0;
      const isHovered = hoveredDay === day;

      cells.push(
        <div
          key={day}
          onMouseEnter={() => setHoveredDay(day)}
          onMouseLeave={() => setHoveredDay(null)}
          onClick={() => { if (hasEvent) onSelectEvent(eventsOnDay[0]); }}
          className="relative min-h-[90px] p-2.5 flex flex-col transition-all duration-150"
          style={{
            background: isHovered && hasEvent ? (isRed ? "#991b1b" : "#fef2f2") : isRed ? "#b91c1c" : "#ffffff",
            cursor: hasEvent ? "pointer" : "default",
          }}
        >
          <span
            className="self-start w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold transition-all"
            style={{
              background: isToday ? (isRed ? "#ffffff" : "#7f0d18") : "transparent",
              color: isToday ? (isRed ? "#7f0d18" : "#ffffff") : isRed ? "#ffffff" : "#1f1f1f",
            }}
          >
            {day}
          </span>
          <div className="mt-1 flex flex-col gap-0.5 flex-1">
            {eventsOnDay.slice(0, 2).map((ev) => {
              const col = CATEGORY_COLORS[ev.category];
              return (
                <div
                  key={ev.id}
                  className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-bold truncate leading-tight"
                  style={{
                    background: isRed ? "rgba(255,255,255,0.22)" : "rgba(127,13,24,0.12)",
                    color: isRed ? "#ffffff" : "#7f0d18",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: col.dot }} />
                  <span className="hidden md:inline truncate">{ev.title}</span>
                  <span className="md:hidden truncate">{ev.category}</span>
                </div>
              );
            })}
            {eventsOnDay.length > 2 && (
              <span className="text-[9px] font-bold px-1.5" style={{ color: isRed ? "#fecaca" : "#7f0d18" }}>
                +{eventsOnDay.length - 2} more
              </span>
            )}
          </div>
        </div>
      );
      cellIndex++;
    }
    return cells;
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.10)" }}>
      <div className="bg-red-700 px-8 py-6 flex items-center justify-between">
        <div>
          <div className="text-red-300 text-xs font-bold uppercase tracking-[0.2em] mb-0.5">{yearStr}</div>
          <h3 className="font-display text-4xl font-black text-white tracking-tight">{monthName}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrent((c) => { const d = new Date(c.year, c.month - 1); return { year: d.getFullYear(), month: d.getMonth() }; })}
            className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrent({ year: 2026, month: today.getMonth() })}
            className="px-4 h-10 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => setCurrent((c) => { const d = new Date(c.year, c.month + 1); return { year: d.getFullYear(), month: d.getMonth() }; })}
            className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 bg-red-800">
        {DAYS.map((d) => (
          <div key={d} className="py-3 text-center text-[10px] font-black uppercase tracking-[0.15em] text-red-200">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">{renderCells()}</div>
      <div className="bg-white border-t border-neutral-100 px-8 py-4 flex flex-wrap gap-4">
        {Object.entries(CATEGORY_COLORS).map(([cat, col]) => (
          <span key={cat} className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.dot }} />
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}

function EventCard({
  event, index, onSelect, rsvpState, onRSVP,
}: {
  event: CalEvent; index: number; onSelect: (e: CalEvent) => void; rsvpState: RSVPState; onRSVP: (ev: React.MouseEvent, id: string) => void;
}) {
  const col = CATEGORY_COLORS[event.category] ?? CATEGORY_COLORS.Networking;
  const d = new Date(event.date);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        animation: `cardIn 340ms ease-out ${index * 55}ms both`,
        border: "1.5px solid #f0f0f0",
        transition: "transform 260ms ease-out, box-shadow 260ms ease-out, border-color 260ms ease-out",
      }}
      onClick={() => onSelect(event)}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 56px rgba(185,28,28,0.13)"; (e.currentTarget as HTMLElement).style.borderColor = "#fca5a5"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "#f0f0f0"; }}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span
            className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border backdrop-blur-sm"
            style={{ backgroundColor: col.dot + "25", color: col.dot, borderColor: col.dot + "40" }}
          >
            {event.category}
          </span>
          {event.featured && (
            <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-amber-400/25 border border-amber-400/40 text-amber-600 backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/20 border border-white/30 text-white backdrop-blur-sm">
          {event.mode === "Online" ? <Wifi className="h-2.5 w-2.5" /> : <Building2 className="h-2.5 w-2.5" />}
          {event.mode}
        </span>
        <div className="absolute bottom-3 left-3 bg-white rounded-lg px-3 py-1.5">
          <div className="font-display text-xl font-black text-red-700 leading-none">{d.getDate()}</div>
          <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
            {d.toLocaleString("en", { month: "short" })} {d.getFullYear()}
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg font-bold text-neutral-900 leading-snug group-hover:text-red-700 transition-colors" style={{ letterSpacing: "-0.01em" }}>
          {event.title}
        </h3>
        <p className="text-xs text-neutral-400 mt-1.5 flex items-center gap-1 font-medium">
          <MapPin className="h-3 w-3" /> {event.location}
        </p>
        <p className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1">
          <Clock className="h-3 w-3" /> {event.time}
        </p>
        <p className="text-sm text-neutral-500 mt-3 leading-relaxed line-clamp-2 flex-1">{event.description}</p>
        {event.speakers.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {event.speakers.slice(0, 2).map((s) => (
              <span key={s} className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600">
                <Mic2 className="h-2.5 w-2.5" /> {s}
              </span>
            ))}
            {event.speakers.length > 2 && <span className="text-[10px] text-neutral-400 self-center">+{event.speakers.length - 2}</span>}
          </div>
        )}
        <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
          <button
            className={`rounded-lg px-5 py-2.5 text-xs font-bold transition-all ${rsvpState === "done" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-700 text-white hover:bg-red-800 hover:shadow-md"}`}
            onClick={(ev) => onRSVP(ev, event.id)}
            disabled={rsvpState !== "idle"}
          >
            {rsvpState === "idle" && "RSVP"}
            {rsvpState === "loading" && <span className="flex items-center gap-1.5"><span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />Saving…</span>}
            {rsvpState === "done" && <span className="flex items-center gap-1.5"><Check className="h-3 w-3" /> Done</span>}
          </button>
          <span className="text-xs text-neutral-400 flex items-center gap-1">
            <Users className="h-3 w-3" /> {event.attendees.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function Events() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [filterKey, setFilterKey] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [rsvpStates, setRsvpStates] = useState<Record<string, RSVPState>>({});
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [hostIdea, setHostIdea] = useState("");
  const [hostSubmit, setHostSubmit] = useState<"idle" | "loading" | "done">("idle");

  const featuredEvent = ALL_EVENTS.find((e) => e.featured) ?? ALL_EVENTS[0];
  const countdown = useCountdown(featuredEvent.date);
  const now = new Date();

  const getFiltered = (): CalEvent[] => {
    if (activeTab === "All") return ALL_EVENTS;
    if (activeTab === "Upcoming") return ALL_EVENTS.filter((e) => new Date(e.date) >= now);
    if (activeTab === "Past") return ALL_EVENTS.filter((e) => new Date(e.date) < now);
    if (activeTab === "Online") return ALL_EVENTS.filter((e) => e.mode === "Online");
    if (activeTab === "In-Person") return ALL_EVENTS.filter((e) => e.mode === "In-Person");
    if (activeTab === "Networking") return ALL_EVENTS.filter((e) => e.category === "Networking");
    if (activeTab === "Career") return ALL_EVENTS.filter((e) => e.category === "Career");
    return ALL_EVENTS;
  };
  const filtered = getFiltered();

  const handleFilterChange = (tab: FilterTab) => { setActiveTab(tab); setFilterKey((k) => k + 1); };
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

  const tabIcons: Partial<Record<FilterTab, React.ReactNode>> = {
    Online: <Wifi className="h-3.5 w-3.5" />,
    "In-Person": <Building2 className="h-3.5 w-3.5" />,
    Networking: <Network className="h-3.5 w-3.5" />,
    Career: <Briefcase className="h-3.5 w-3.5" />,
  };

  const stats = [
    { val: "16",      label: "Events This Year",    icon: Calendar },
    { val: "85",      label: "Countries Reached",   icon: Globe },
    { val: "25K+",    label: "Alumni Joined",        icon: Users },
    { val: "RM 2.4M", label: "Scholarships Raised", icon: TrendingUp },
  ];

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .h1 { animation: fadeUp 380ms ease-out 60ms  both; }
        .h2 { animation: fadeUp 380ms ease-out 140ms both; }
        .h3 { animation: fadeUp 380ms ease-out 220ms both; }
        .h4 { animation: fadeUp 380ms ease-out 300ms both; }
        .h5 { animation: fadeUp 380ms ease-out 380ms both; }
      `}</style>

      {/* ── HERO — taller ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80"
            alt="Alumni event"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(127,13,24,0.96) 0%, rgba(26,3,6,0.90) 50%, rgba(13,13,20,0.85) 100%)" }}
          />
        </div>

        {/* ↓ pt-28 pb-28 on mobile, pt-36 pb-32 on desktop — ~30px taller than before */}
        <div className="relative z-10 container-page pt-28 pb-28 lg:pt-36 lg:pb-32">
          <div className="max-w-3xl">
            <span className="h1 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-amber-400 mb-4">
              <span className="w-2 h-2 bg-amber-400 animate-pulse rounded-full" />
              Featured Event
            </span>

            <h1
              className="h2 font-display text-4xl md:text-6xl font-black text-white leading-[0.95]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {featuredEvent.title}
            </h1>

            <p className="h3 mt-3 text-white/55 text-sm leading-relaxed max-w-xl">
              {featuredEvent.description}
            </p>

            <div className="h3 mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-white/50 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                {new Date(featuredEvent.date).toDateString()}
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                {featuredEvent.time}
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                {featuredEvent.location}
              </span>
            </div>

            {/* Countdown — slightly rounded */}
            <div className="h4 mt-8 flex gap-2">
              {[
                { val: countdown.days,    label: "Days" },
                { val: countdown.hours,   label: "Hrs" },
                { val: countdown.minutes, label: "Min" },
                { val: countdown.seconds, label: "Sec" },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="w-[74px] h-[74px] rounded-xl bg-white/10 border border-white/15 flex flex-col items-center justify-center"
                >
                  <span className="font-display text-2xl font-black text-white tabular-nums leading-none">
                    {String(val).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 mt-1 font-bold">{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="h5 mt-8 flex gap-3">
              <button
                onClick={() => setSelectedEvent(featuredEvent)}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-black text-red-800 hover:bg-amber-400 transition-all shadow-xl hover:-translate-y-0.5"
              >
                Register Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById("events-grid")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all"
              >
                Browse All
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="container-page py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ val, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-700/40 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-red-300" />
                </div>
                <div>
                  <div className="font-display text-lg font-black text-white leading-none">{val}</div>
                  <div className="text-[10px] text-white/40 font-semibold mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <div className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
        <div className="container-page">
          <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleFilterChange(tab)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                  activeTab === tab
                    ? "bg-red-700 text-white"
                    : "bg-neutral-100 text-neutral-500 hover:bg-red-50 hover:text-red-700"
                }`}
              >
                {tabIcons[tab]}
                {tab}
              </button>
            ))}
            <span className="ml-auto shrink-0 text-xs font-bold text-neutral-400 pr-1">
              {filtered.length} events
            </span>
          </div>
        </div>
      </div>

      {/* ── EVENTS GRID ── */}
      <section id="events-grid" className="bg-neutral-50 py-16">
        <div className="container-page">
          <div className="mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-red-700 block mb-2">
              {activeTab === "All" ? "All Events" : activeTab}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-neutral-900" style={{ letterSpacing: "-0.025em" }}>
              {activeTab === "Past" ? "Past Events." : "Upcoming Events."}
            </h2>
            <p className="text-neutral-400 mt-1.5 text-sm font-medium">
              {filtered.length} event{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div key={filterKey} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((e, i) => (
              <EventCard
                key={e.id}
                event={e}
                index={i}
                onSelect={setSelectedEvent}
                rsvpState={rsvpStates[e.id] ?? "idle"}
                onRSVP={handleRSVP}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-neutral-400">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="font-bold text-lg">No events found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CALENDAR ── */}
      <section id="calendar" className="py-20 bg-white">
        <div className="container-page">
          <div className="mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-red-700 block mb-2">Calendar View</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-neutral-900" style={{ letterSpacing: "-0.025em" }}>
              Events at a glance.
            </h2>
            <p className="text-neutral-400 mt-1.5 max-w-md text-sm">Click any highlighted date to see event details.</p>
          </div>
          <BoldCalendar events={ALL_EVENTS} onSelectEvent={setSelectedEvent} />
        </div>
      </section>

      {/* ── HOST AN EVENT ── */}
      <section className="py-20 bg-neutral-950">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-400 block mb-4">Propose an Event</span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white" style={{ letterSpacing: "-0.025em" }}>
                Have an idea?{" "}
                <span style={{ background: "linear-gradient(90deg, #f59e0b, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Host it.
                </span>
              </h2>
              <p className="mt-4 text-white/50 leading-relaxed max-w-md text-sm">
                Alumni can propose reunions, workshops, networking nights, or online webinars. Submit your idea and the events team will respond within 5 working days.
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  { icon: Network,   text: "Networking nights — connect alumni in your city" },
                  { icon: Mic2,      text: "Panel talks — share your career journey" },
                  { icon: Briefcase, text: "Industry workshops — hands-on skill sessions" },
                  { icon: Wifi,      text: "Virtual webinars — reach 85+ countries" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-sm text-white/55">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
              {hostSubmit === "done" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5">
                    <Check className="h-7 w-7 text-emerald-400" />
                  </div>
                  <h3 className="font-display text-xl font-black text-white mb-2">Proposal Received!</h3>
                  <p className="text-white/50 text-sm">Our events team will be in touch within 5 working days.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl font-black text-white mb-6">Submit Your Event Idea</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Your Name",     val: hostName,  set: setHostName,  ph: "e.g. Ahmad Fauzi", type: "text" },
                      { label: "Email Address", val: hostEmail, set: setHostEmail, ph: "you@example.com",   type: "email" },
                    ].map(({ label, val, set, ph, type }) => (
                      <div key={label}>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5 block">{label}</label>
                        <input
                          type={type}
                          value={val}
                          onChange={(e) => set(e.target.value)}
                          placeholder={ph}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5 block">Event Idea</label>
                      <textarea
                        value={hostIdea}
                        onChange={(e) => setHostIdea(e.target.value)}
                        rows={4}
                        placeholder="Describe your event — format, audience, preferred date, location..."
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                      />
                    </div>
                    <button
                      onClick={handleHostSubmit}
                      disabled={hostSubmit !== "idle" || !hostName || !hostEmail || !hostIdea}
                      className="w-full rounded-lg bg-red-700 text-white py-4 text-sm font-black flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {hostSubmit === "loading" ? (
                        <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Submitting…</>
                      ) : (
                        <><Send className="h-4 w-4" />Submit Proposal</>
                      )}
                    </button>
                    <p className="text-center text-xs text-white/30">
                      Or <Link to="/contact" className="text-amber-400 hover:underline">contact the events team →</Link>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </>
  );
}