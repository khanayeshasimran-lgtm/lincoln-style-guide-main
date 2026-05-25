import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  Search, Sparkles, X, ChevronDown, Grid3X3, List,
  Bookmark, BookmarkCheck, Users, UserPlus, UserCheck,
  Zap, TrendingUp, Star, Filter, Clock,
} from "lucide-react";

export const Route = createFileRoute("/directory")({
  component: Directory,
  head: () => ({
    meta: [
      { title: "Alumni Directory — Lincoln Alumni Network" },
      { name: "description", content: "Search and connect with 25,000+ Lincoln alumni worldwide." },
    ],
  }),
});

// ─── Data ────────────────────────────────────────────────────────────────────

const ALUMNI_DATA = [
  { id: 1,  name: "Aisha Rahman",      year: 2019, dept: "Computer Science",  role: "Senior Software Engineer", company: "Google",        country: "Malaysia",  flag: "🇲🇾", industry: "Technology",  skills: ["React","Python","ML"],            mutual: 14, available: true,  mentor: true,  image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2,  name: "Marcus Chen",       year: 2017, dept: "Finance",           role: "Investment Analyst",       company: "Goldman Sachs", country: "Singapore", flag: "🇸🇬", industry: "Finance",     skills: ["Financial Modelling","Bloomberg"], mutual: 8,  available: false, mentor: true,  image: "https://randomuser.me/api/portraits/men/32.jpg"   },
  { id: 3,  name: "Priya Nair",        year: 2021, dept: "Business Admin",    role: "Product Manager",          company: "Grab",          country: "India",     flag: "🇮🇳", industry: "Technology",  skills: ["Product Strategy","Agile"],       mutual: 22, available: true,  mentor: false, image: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 4,  name: "James Okafor",      year: 2016, dept: "Law",               role: "Corporate Lawyer",         company: "Baker McKenzie",country: "Nigeria",   flag: "🇳🇬", industry: "Legal",       skills: ["M&A Law","Arbitration"],          mutual: 5,  available: true,  mentor: true,  image: "https://randomuser.me/api/portraits/men/75.jpg"   },
  { id: 5,  name: "Sofia Martinez",    year: 2020, dept: "Data Science",      role: "ML Engineer",              company: "Meta",          country: "Spain",     flag: "🇪🇸", industry: "Technology",  skills: ["PyTorch","NLP"],                  mutual: 11, available: false, mentor: false, image: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 6,  name: "Hiroshi Tanaka",    year: 2018, dept: "Engineering",       role: "Robotics Engineer",        company: "Toyota",        country: "Japan",     flag: "🇯🇵", industry: "Engineering", skills: ["ROS","Computer Vision"],          mutual: 3,  available: true,  mentor: true,  image: "https://randomuser.me/api/portraits/men/22.jpg"   },
  { id: 7,  name: "Fatima Al-Rashidi", year: 2022, dept: "Medicine",          role: "Research Fellow",          company: "WHO",           country: "UAE",       flag: "🇦🇪", industry: "Healthcare",  skills: ["Epidemiology","R"],               mutual: 7,  available: true,  mentor: false, image: "https://randomuser.me/api/portraits/women/89.jpg" },
  { id: 8,  name: "Daniel Osei",       year: 2015, dept: "Architecture",      role: "Principal Architect",      company: "HOK",           country: "Ghana",     flag: "🇬🇭", industry: "Design",      skills: ["BIM","Urban Planning"],           mutual: 9,  available: false, mentor: true,  image: "https://randomuser.me/api/portraits/men/55.jpg"   },
  { id: 9,  name: "Lily Nguyen",       year: 2023, dept: "Marketing",         role: "Growth Marketer",          company: "Shopee",        country: "Vietnam",   flag: "🇻🇳", industry: "E-Commerce",  skills: ["SEO","Analytics"],                mutual: 16, available: true,  mentor: false, image: "https://randomuser.me/api/portraits/women/33.jpg" },
  { id: 10, name: "Kwame Asante",      year: 2014, dept: "Economics",         role: "Chief Economist",          company: "World Bank",    country: "Ghana",     flag: "🇬🇭", industry: "Finance",     skills: ["Macroeconomics","Policy"],        mutual: 4,  available: true,  mentor: true,  image: "https://randomuser.me/api/portraits/men/41.jpg"   },
  { id: 11, name: "Emma Wilson",       year: 2020, dept: "Psychology",        role: "UX Researcher",            company: "Spotify",       country: "UK",        flag: "🇬🇧", industry: "Technology",  skills: ["User Testing","Figma"],           mutual: 19, available: false, mentor: false, image: "https://randomuser.me/api/portraits/women/57.jpg" },
  { id: 12, name: "Raj Patel",         year: 2013, dept: "Computer Science",  role: "CTO & Co-Founder",         company: "TechBridge",    country: "India",     flag: "🇮🇳", industry: "Technology",  skills: ["Architecture","Go"],              mutual: 31, available: true,  mentor: true,  image: "https://randomuser.me/api/portraits/men/91.jpg"   },
];

const SUGGESTIONS = [
  "Software engineer in Malaysia",
  "Finance alumni 2018",
  "Mentor from Computer Science",
  "Alumni working at Google",
  "Healthcare professionals",
];

const INDUSTRIES  = ["Technology","Finance","Healthcare","Engineering","Legal","Design","E-Commerce"];
const YEARS       = Array.from({ length: 11 }, (_, i) => 2013 + i).reverse();
const COUNTRIES   = ["Malaysia","Singapore","India","Nigeria","Spain","Japan","UAE","Ghana","Vietnam","UK"];
const DEPARTMENTS = ["Computer Science","Finance","Business Admin","Law","Data Science","Engineering","Medicine","Architecture","Marketing","Economics","Psychology"];

const trends = [
  { label: "Technology", pct: 42 },
  { label: "Finance",    pct: 28 },
  { label: "Healthcare", pct: 18 },
  { label: "Engineering",pct: 12 },
];

// ─── FilterSection ────────────────────────────────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
      >
        {title}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 pb-3 space-y-0.5">{children}</div>}
    </div>
  );
}

// ─── Alumni Card ──────────────────────────────────────────────────────────────

type AlumniItem = (typeof ALUMNI_DATA)[0];

function AlumniCard({
  a,
  viewMode,
  saved,
  onSave,
  connected,
  onConnect,
  delay,
}: {
  a: AlumniItem;
  viewMode: "grid" | "list";
  saved: boolean;
  onSave: (a: AlumniItem) => void;
  connected: boolean;
  onConnect: (id: number) => void;
  delay: number;
}) {
  if (viewMode === "list") {
    return (
      <div
        className="group flex items-center gap-4 bg-card border border-border rounded-xl px-5 py-4 hover:border-primary/20 hover:shadow-sm transition-all"
        style={{ animation: `cardIn 280ms ease-out ${delay}ms both` }}
      >
        <div className="relative shrink-0">
          <img src={a.image} alt={a.name} className="w-12 h-12 rounded-full object-cover" />
          {a.mentor && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center">
              <Star className="h-2 w-2 text-white" fill="white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{a.name}</span>
            <span className="text-[11px] text-primary font-medium">'{String(a.year).slice(2)}</span>
            {a.available && (
              <span className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Open
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {a.role} · <span className="text-foreground font-medium">{a.company}</span>
          </p>
          <div className="flex gap-1.5 mt-1.5">
            {a.skills.slice(0, 2).map((s) => (
              <span key={s} className="text-[10px] bg-muted/70 text-muted-foreground rounded px-2 py-0.5">{s}</span>
            ))}
          </div>
        </div>

        <span className="hidden md:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
          <span>{a.flag}</span> {a.country}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSave(a)}
            className={`p-2 rounded-lg transition-colors ${saved ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
          >
            {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </button>
          <button
            onClick={() => onConnect(a.id)}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all
              ${connected ? "bg-muted text-muted-foreground" : "bg-primary text-white hover:bg-primary/90"}`}
          >
            {connected ? <UserCheck className="h-3.5 w-3.5" /> : <UserPlus className="h-3.5 w-3.5" />}
            {connected ? "Connected" : "Connect"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
      style={{ animation: `cardIn 280ms ease-out ${delay}ms both` }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="relative">
            <img
              src={a.image}
              alt={a.name}
              className="w-14 h-14 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {a.mentor && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center">
                <Star className="h-2.5 w-2.5 text-white" fill="white" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {a.available && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Open
              </span>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onSave(a); }}
              className={`p-1.5 rounded-lg transition-colors ${saved ? "text-primary" : "text-muted-foreground/50 hover:text-primary"}`}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <p className="font-bold text-sm leading-snug">{a.name}</p>
        <p className="text-[11px] text-primary font-semibold mt-0.5">Class of {a.year} · {a.dept}</p>

        <div className="mt-3 pt-3 border-t border-border/60">
          <p className="text-xs font-semibold text-foreground">{a.role}</p>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
            <span>{a.flag}</span> {a.company}, {a.country}
          </p>
        </div>

        <div className="flex gap-1.5 mt-3">
          {a.skills.slice(0, 2).map((s) => (
            <span key={s} className="text-[10px] bg-muted/60 text-muted-foreground rounded-md px-2 py-1 font-medium">{s}</span>
          ))}
          {a.skills.length > 2 && (
            <span className="text-[10px] text-muted-foreground/60 flex items-center">+{a.skills.length - 2}</span>
          )}
        </div>
      </div>

      <div className="px-6 py-3.5 border-t border-border/60 flex items-center justify-between">
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Users className="h-3 w-3" /> {a.mutual} mutual
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onConnect(a.id); }}
          className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-[11px] font-semibold transition-all
            ${connected
              ? "bg-muted text-muted-foreground"
              : "bg-primary/10 text-primary hover:bg-primary hover:text-white"}`}
        >
          {connected ? <UserCheck className="h-3 w-3" /> : <UserPlus className="h-3 w-3" />}
          {connected ? "Connected" : "Connect"}
        </button>
      </div>
    </div>
  );
}

// ─── Saved Drawer ─────────────────────────────────────────────────────────────

function SavedDrawer({
  items,
  onClose,
  onRemove,
}: {
  items: AlumniItem[];
  onClose: () => void;
  onRemove: (a: AlumniItem) => void;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-72 bg-background border-l border-border z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-sm">Saved ({items.length})</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3 py-12">
              <Bookmark className="h-8 w-8 opacity-20" />
              <p className="text-sm">No saved alumni yet</p>
            </div>
          ) : (
            items.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <img src={a.image} alt={a.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">{a.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{a.company}</p>
                </div>
                <button onClick={() => onRemove(a)} className="p-1 text-muted-foreground hover:text-foreground">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function Directory() {
  const [query, setQuery]                     = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [viewMode, setViewMode]               = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy]                   = useState("recent");
  const [savedAlumni, setSavedAlumni]         = useState<AlumniItem[]>([]);
  const [connectedIds, setConnectedIds]       = useState<number[]>([]);
  const [showDrawer, setShowDrawer]           = useState(false);
  const [visibleCount, setVisibleCount]       = useState(9);
  const [loading, setLoading]                 = useState(false);

  const [selIndustries, setSelIndustries] = useState<string[]>([]);
  const [selYears, setSelYears]           = useState<number[]>([]);
  const [selCountries, setSelCountries]   = useState<string[]>([]);
  const [selDepts, setSelDepts]           = useState<string[]>([]);
  const [mentorOnly, setMentorOnly]       = useState(false);
  const [availOnly, setAvailOnly]         = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = ALUMNI_DATA.filter((a) => {
    const q = query.toLowerCase();
    const matchQ =
      !q ||
      [a.name, a.role, a.company, a.dept, a.country, a.industry, String(a.year), ...a.skills].some((v) =>
        v.toLowerCase().includes(q)
      );
    return (
      matchQ &&
      (!selIndustries.length || selIndustries.includes(a.industry)) &&
      (!selYears.length || selYears.includes(a.year)) &&
      (!selCountries.length || selCountries.includes(a.country)) &&
      (!selDepts.length || selDepts.includes(a.dept)) &&
      (!mentorOnly || a.mentor) &&
      (!availOnly || a.available)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "mutual")   return b.mutual - a.mutual;
    if (sortBy === "year-new") return b.year - a.year;
    if (sortBy === "year-old") return a.year - b.year;
    if (sortBy === "name")     return a.name.localeCompare(b.name);
    return 0;
  });

  const visible = sorted.slice(0, visibleCount);

  const activeFilters = [
    ...selIndustries.map((v) => ({ v, type: "ind" as const })),
    ...selYears.map((v) => ({ v: String(v), type: "yr" as const })),
    ...selCountries.map((v) => ({ v, type: "cnt" as const })),
    ...selDepts.map((v) => ({ v, type: "dept" as const })),
    ...(mentorOnly ? [{ v: "Mentors", type: "mentor" as const }] : []),
    ...(availOnly  ? [{ v: "Available", type: "avail" as const }] : []),
  ];

  const removeFilter = (f: (typeof activeFilters)[0]) => {
    if (f.type === "ind")    setSelIndustries((p) => p.filter((x) => x !== f.v));
    if (f.type === "yr")     setSelYears((p) => p.filter((x) => String(x) !== f.v));
    if (f.type === "cnt")    setSelCountries((p) => p.filter((x) => x !== f.v));
    if (f.type === "dept")   setSelDepts((p) => p.filter((x) => x !== f.v));
    if (f.type === "mentor") setMentorOnly(false);
    if (f.type === "avail")  setAvailOnly(false);
  };

  const clearAll = () => {
    setSelIndustries([]); setSelYears([]); setSelCountries([]);
    setSelDepts([]); setMentorOnly(false); setAvailOnly(false); setQuery("");
  };

  const toggle = <T,>(val: T, list: T[], set: React.Dispatch<React.SetStateAction<T[]>>) =>
    set((p) => (p.includes(val) ? p.filter((x) => x !== val) : [...p, val]));

  const toggleSave    = (a: AlumniItem) => setSavedAlumni((p) => p.find((x) => x.id === a.id) ? p.filter((x) => x.id !== a.id) : [...p, a]);
  const toggleConnect = (id: number)    => setConnectedIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => { setVisibleCount((v) => v + 6); setLoading(false); }, 700);
  };

  const popularMentors = ALUMNI_DATA.filter((a) => a.mentor).slice(0, 4);
  const recentlyActive = ALUMNI_DATA.filter((a) => a.available).slice(0, 3);

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="min-h-screen bg-background">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-40 lg:py-48 bg-red-950">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80"
              alt="Lincoln University College Alumni Network"
              className="w-full h-full object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-red-900/80 to-neutral-900/90 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/40 to-neutral-50" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="flex items-center gap-2 mb-6 text-xs text-white/40">
              <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/70">Directory</span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest bg-red-600/30 border border-red-500/50 text-amber-400 mb-6 uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Live Alumni Network
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black text-white max-w-4xl leading-tight tracking-tight text-balance">
              Connect With <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-md">
                25,000+ Lincoln Graduates
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-100 font-normal leading-relaxed drop-shadow-xs">
              Search and connect with alumni spanning 85 countries, 40+ industries, and over a decade of graduating cohorts.
            </p>

            <div className="flex flex-wrap gap-3 mt-10">
              {[
                { n: "25,000+", l: "Alumni" },
                { n: "85",      l: "Countries" },
                { n: "40+",     l: "Industries" },
                { n: "1,200+",  l: "Mentors" },
              ].map((s) => (
                <div key={s.l} className="bg-white/8 border border-white/15 rounded-xl px-5 py-3 text-center min-w-[100px]">
                  <div className="font-serif text-xl font-black text-amber-400">{s.n}</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/50 font-semibold mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Search ───────────────────────────────────────────────────── */}
        <section className="bg-background border-b border-border sticky top-0 z-20 shadow-sm">
          <div className="px-4 md:px-5 py-4 w-full">
            <div className="relative">
              <div className="flex items-center gap-2.5 bg-white border border-border rounded-xl px-3.5 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/8 transition-all shadow-sm">
                <div className="flex items-center gap-1 bg-primary/8 text-primary rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider shrink-0">
                  <Sparkles className="h-2.5 w-2.5" /> AI
                </div>
                <input
                  ref={searchRef}
                  className="flex-1 border-none outline-none text-sm bg-transparent placeholder:text-muted-foreground/60"
                  placeholder="Search by name, role, company, skill, country…"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <button className="flex items-center gap-1.5 bg-primary text-white rounded-lg px-4 py-2 text-xs font-semibold hover:bg-primary/90 transition-colors shrink-0">
                  <Search className="h-3.5 w-3.5" /> Search
                </button>
              </div>

              {showSuggestions && !query && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-border rounded-xl shadow-lg z-20 overflow-hidden">
                  <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Suggestions</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onMouseDown={() => { setQuery(s); setShowSuggestions(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left hover:bg-muted/40 transition-colors"
                    >
                      <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick chips */}
            <div className="flex gap-2 flex-wrap mt-3">
              {["Technology", "Finance", "Healthcare", "Class of 2019", "Mentors only"].map((chip) => {
                const isActive =
                  selIndustries.includes(chip) ||
                  (chip === "Class of 2019" && selYears.includes(2019)) ||
                  (chip === "Mentors only" && mentorOnly);
                return (
                  <button
                    key={chip}
                    onClick={() => {
                      if (chip === "Class of 2019") toggle(2019, selYears, setSelYears);
                      else if (chip === "Mentors only") setMentorOnly((v) => !v);
                      else toggle(chip, selIndustries, setSelIndustries);
                    }}
                    className={`text-[11px] font-semibold rounded-full px-3.5 py-1.5 border transition-all
                      ${isActive
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-border text-muted-foreground hover:border-primary/40 hover:text-primary"}`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Main 3-col layout ────────────────────────────────────────── */}
        <div className="px-4 md:px-5 py-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_200px] gap-7 items-start">

            {/* ── Left: Filters ── */}
            <aside className="hidden lg:block sticky top-[130px] bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
                <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-foreground">
                  <Filter className="h-3.5 w-3.5 text-primary" /> Filters
                </h3>
                {activeFilters.length > 0 && (
                  <button onClick={clearAll} className="text-[11px] text-primary font-semibold hover:underline">
                    Clear ({activeFilters.length})
                  </button>
                )}
              </div>

              {/* Toggles */}
              <div className="border-b border-border px-4 py-3 space-y-2.5">
                {[
                  { label: "Mentors only",        val: mentorOnly, set: setMentorOnly },
                  { label: "Available to connect", val: availOnly,  set: setAvailOnly },
                ].map(({ label, val, set }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <button
                      onClick={() => set((v) => !v)}
                      className="relative rounded-full transition-colors shrink-0"
                      style={{ width: 36, height: 20, background: val ? "hsl(var(--primary))" : "hsl(var(--muted))" }}
                    >
                      <span
                        className="absolute top-[3px] w-3.5 h-3.5 bg-white rounded-full shadow transition-transform"
                        style={{ left: 3, transform: val ? "translateX(16px)" : "translateX(0)" }}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <FilterSection title="Industry">
                {INDUSTRIES.map((ind) => (
                  <label key={ind} className="flex items-center justify-between py-1.5 cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selIndustries.includes(ind)}
                        onChange={() => toggle(ind, selIndustries, setSelIndustries)}
                        className="accent-primary w-3 h-3 rounded"
                      />
                      <span className="text-xs group-hover:text-primary transition-colors">{ind}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground/70">
                      {ALUMNI_DATA.filter((a) => a.industry === ind).length}
                    </span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Grad Year">
                {YEARS.map((yr) => (
                  <label key={yr} className="flex items-center justify-between py-1.5 cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selYears.includes(yr)}
                        onChange={() => toggle(yr, selYears, setSelYears)}
                        className="accent-primary w-3 h-3 rounded"
                      />
                      <span className="text-xs group-hover:text-primary transition-colors">{yr}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground/70">
                      {ALUMNI_DATA.filter((a) => a.year === yr).length}
                    </span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Country" defaultOpen={false}>
                {COUNTRIES.map((c) => (
                  <label key={c} className="flex items-center gap-2 py-1.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selCountries.includes(c)}
                      onChange={() => toggle(c, selCountries, setSelCountries)}
                      className="accent-primary w-3 h-3 rounded"
                    />
                    <span className="text-xs group-hover:text-primary transition-colors">{c}</span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Department" defaultOpen={false}>
                {DEPARTMENTS.map((d) => (
                  <label key={d} className="flex items-center gap-2 py-1.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selDepts.includes(d)}
                      onChange={() => toggle(d, selDepts, setSelDepts)}
                      className="accent-primary w-3 h-3 rounded"
                    />
                    <span className="text-xs group-hover:text-primary transition-colors">{d}</span>
                  </label>
                ))}
              </FilterSection>
            </aside>

            {/* ── Center: Results ── */}
            <main>
              {/* Active filter pills */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {activeFilters.map((f) => (
                    <span
                      key={`${f.type}-${f.v}`}
                      className="inline-flex items-center gap-1 bg-primary/8 text-primary rounded-full px-3 py-1 text-[11px] font-semibold"
                    >
                      {f.v}
                      <button onClick={() => removeFilter(f)}><X className="h-2.5 w-2.5 ml-0.5" /></button>
                    </span>
                  ))}
                </div>
              )}

              {/* Toolbar */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">{Math.min(visibleCount, sorted.length)}</strong> of{" "}
                  <strong className="text-foreground">{sorted.length}</strong> alumni
                </p>
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs border border-border rounded-lg px-3 py-1.5 bg-white outline-none focus:border-primary"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="mutual">Most Connections</option>
                    <option value="year-new">Newest Grads</option>
                    <option value="year-old">Oldest Grads</option>
                    <option value="name">A–Z</option>
                  </select>
                  <div className="flex bg-muted rounded-lg p-0.5 gap-0.5">
                    {(["grid", "list"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setViewMode(m)}
                        className={`p-1.5 rounded-md transition-all ${viewMode === m ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {m === "grid" ? <Grid3X3 className="h-3.5 w-3.5" /> : <List className="h-3.5 w-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div className={viewMode === "grid" ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-4" : "flex flex-col gap-2.5"}>
                {visible.map((a, i) => (
                  <AlumniCard
                    key={a.id} a={a} viewMode={viewMode}
                    saved={!!savedAlumni.find((s) => s.id === a.id)} onSave={toggleSave}
                    connected={connectedIds.includes(a.id)} onConnect={toggleConnect}
                    delay={i * 35}
                  />
                ))}
                {loading &&
                  Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse">
                      <div className="flex gap-3 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-muted" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3.5 bg-muted rounded w-32" />
                          <div className="h-3 bg-muted rounded w-20" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
              </div>

              {/* Empty state */}
              {sorted.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="font-semibold text-lg mb-2">No alumni found</h3>
                  <p className="text-sm text-muted-foreground mb-5">Try different keywords or adjust your filters</p>
                  <button
                    onClick={clearAll}
                    className="rounded-full bg-primary text-white px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {/* Load more */}
              {visibleCount < sorted.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary rounded-xl px-8 py-3 text-sm font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    <Zap className="h-3.5 w-3.5" />
                    {loading ? "Loading…" : "Load more"}
                  </button>
                  <p className="text-[11px] text-muted-foreground mt-2">{sorted.length - visibleCount} more alumni</p>
                </div>
              )}
            </main>

            {/* ── Right: Networking Intel ── */}
            <aside className="hidden lg:flex flex-col gap-4 sticky top-[130px]">

              {/* Popular Mentors */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-4 py-3.5 border-b border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-amber-500" fill="currentColor" /> Mentors
                  </h4>
                </div>
                <div className="divide-y divide-border/60">
                  {popularMentors.map((a) => (
                    <div key={a.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/30 transition-colors">
                      <img src={a.image} alt={a.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold truncate">
                          {a.name.split(" ")[0]} {a.name.split(" ")[1]?.[0]}.
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">{a.company}</p>
                      </div>
                      <button
                        onClick={() => toggleConnect(a.id)}
                        className={`text-[10px] font-bold border rounded-md px-2 py-1 transition-all shrink-0
                          ${connectedIds.includes(a.id)
                            ? "border-muted text-muted-foreground bg-muted"
                            : "border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary"}`}
                      >
                        {connectedIds.includes(a.id) ? "✓" : "+Add"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Active */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-4 py-3.5 border-b border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Now
                  </h4>
                </div>
                <div className="divide-y divide-border/60">
                  {recentlyActive.map((a) => (
                    <div key={a.id} className="flex items-center gap-3 px-4 py-2.5">
                      <img src={a.image} alt={a.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold truncate">{a.name.split(" ")[0]}</p>
                        <p className="text-[10px] text-muted-foreground">{a.company}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 shrink-0">Active</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Industries */}
              <div className="bg-card border border-border rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" /> Trending
                </h4>
                <div className="space-y-3">
                  {trends.map((t) => (
                    <div key={t.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[11px] font-medium">{t.label}</span>
                        <span className="text-[10px] text-muted-foreground">{t.pct}%</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${t.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>

        {/* ── Saved drawer + FAB ── */}
        {showDrawer && (
          <SavedDrawer items={savedAlumni} onClose={() => setShowDrawer(false)} onRemove={toggleSave} />
        )}

        <button
          onClick={() => setShowDrawer(true)}
          className="fixed bottom-6 right-6 flex items-center gap-2 bg-white border border-border text-foreground rounded-full px-4 py-2.5 text-xs font-semibold shadow-lg hover:border-primary hover:text-primary transition-all z-30"
        >
          <Bookmark className="h-3.5 w-3.5" />
          Saved
          {savedAlumni.length > 0 && (
            <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
              {savedAlumni.length}
            </span>
          )}
        </button>
      </div>
    </>
  );
}