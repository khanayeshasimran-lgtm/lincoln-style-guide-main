import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  X,
  ZoomIn,
  Play,
  Clock,
  Calendar,
  Newspaper,
  Star,
  Send,
  Instagram,
  Linkedin,
  Heart,
  MessageCircle,
  Share2,
  ChevronRight,
  Bookmark,
  Eye,
  Mic2,
  ExternalLink,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Gallery & News — Lincoln Alumni Network" },
      {
        name: "description",
        content:
          "Photos, videos, alumni spotlights, and latest news from the Lincoln University College Alumni Network.",
      },
    ],
  }),
});

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Category = "All" | "Events" | "Achievements" | "Campus" | "Abroad" | "Sports";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PHOTOS = [
  {
    id: 1,
    category: "Events",
    year: "2025",
    title: "Global Alumni Reunion — KL",
    span: "row-span-2",
    gradient: "from-red-900 to-rose-950",
    badge: "1,200+ attended",
    // Conference / large gathering
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: 2,
    category: "Achievements",
    year: "2025",
    title: "Forbes Asia 30 Under 30 — Ahmad Fauzi",
    span: "",
    gradient: "from-amber-900 to-orange-950",
    badge: "Class of 2017",
    // Professional portrait / award
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: 3,
    category: "Campus",
    year: "2025",
    title: "New Innovation Hub Opening",
    span: "",
    gradient: "from-blue-900 to-indigo-950",
    badge: "Petaling Jaya",
    // Modern university building
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: 4,
    category: "Abroad",
    year: "2024",
    title: "Alumni Chapter — London Meetup",
    span: "col-span-2",
    gradient: "from-slate-800 to-slate-950",
    badge: "42 alumni",
    // Group photo / city
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=75",
  },
  {
    id: 5,
    category: "Events",
    year: "2024",
    title: "Mentorship Summit 2024",
    span: "",
    gradient: "from-purple-900 to-violet-950",
    badge: "3,100+ online",
    // Panel / webinar setup
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: 6,
    category: "Sports",
    year: "2024",
    title: "Alumni Cricket Tournament",
    span: "",
    gradient: "from-emerald-900 to-teal-950",
    badge: "6 teams",
    // Cricket / outdoor sports
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: 7,
    category: "Achievements",
    year: "2024",
    title: "Dr. Priya Nair — WHO Fellowship",
    span: "row-span-2",
    gradient: "from-pink-900 to-rose-950",
    badge: "Class of 2021",
    // Medical professional / lab
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: 8,
    category: "Campus",
    year: "2023",
    title: "Graduation Ceremony — Batch 2023",
    span: "",
    gradient: "from-sky-900 to-blue-950",
    badge: "840 graduates",
    // Graduation ceremony
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: 9,
    category: "Events",
    year: "2023",
    title: "Scholarship Fundraising Gala",
    span: "",
    gradient: "from-yellow-900 to-amber-950",
    badge: "RM 2.4M raised",
    // Gala / formal dinner
    image: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: 10,
    category: "Abroad",
    year: "2023",
    title: "Singapore Chapter — Founders Night",
    span: "",
    gradient: "from-cyan-900 to-teal-950",
    badge: "Singapore",
    // Singapore skyline / networking
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=75",
  },
  {
    id: 11,
    category: "Sports",
    year: "2023",
    title: "Badminton Inter-Alumni Cup",
    span: "",
    gradient: "from-lime-900 to-green-950",
    badge: "12 teams",
    // Badminton / indoor sports
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=75",
  },
];

const NEWS_ARTICLES = [
  {
    tag: "Achievement",
    tagColor: "bg-amber-500/15 text-amber-400 border-amber-400/20",
    date: "May 2026",
    readTime: "3 min",
    title: "LUC Alumni Ranked in Forbes Asia 30 Under 30",
    excerpt:
      "Three Lincoln graduates recognized for breakthrough innovations in biotech, fintech, and sustainable energy across the Asia-Pacific region.",
    views: "12.4K",
  },
  {
    tag: "Community",
    tagColor: "bg-blue-500/15 text-blue-400 border-blue-400/20",
    date: "Apr 2026",
    readTime: "4 min",
    title: "New Alumni Scholarship Fund Raises RM 2.4 Million",
    excerpt:
      "The annual alumni fundraising gala exceeded its target, enabling 48 new merit scholarships for incoming students across medical and engineering faculties.",
    views: "9.8K",
  },
  {
    tag: "Mentorship",
    tagColor: "bg-red-500/15 text-red-400 border-red-400/20",
    date: "Mar 2026",
    readTime: "5 min",
    title: "Global Mentorship Programme Expands to 12 Countries",
    excerpt:
      "The alumni-led initiative now connects over 600 active mentors with current students, spanning fields from medicine to digital design.",
    views: "7.2K",
  },
  {
    tag: "Campus",
    tagColor: "bg-emerald-500/15 text-emerald-400 border-emerald-400/20",
    date: "Feb 2026",
    readTime: "6 min",
    title: "Lincoln Secures Top 200 Asia Ranking — #196",
    excerpt:
      "Times Higher Education Asia Rankings place Lincoln at #196 globally and #47 in South-East Asia — a milestone celebrated by the worldwide alumni network.",
    views: "22.1K",
  },
  {
    tag: "Industry",
    tagColor: "bg-purple-500/15 text-purple-400 border-purple-400/20",
    date: "Jan 2026",
    readTime: "7 min",
    title: "Alumni-Led Startups Raise $45M in Combined Funding",
    excerpt:
      "From fintech to agritech, seven Lincoln-founded startups closed funding rounds in Q1 2026, collectively employing over 500 people.",
    views: "18.6K",
  },
  {
    tag: "Achievement",
    tagColor: "bg-amber-500/15 text-amber-400 border-amber-400/20",
    date: "Dec 2025",
    readTime: "4 min",
    title: "Dr. Fatima Al-Rashidi Appointed to WHO Advisory Board",
    excerpt:
      "Class of 2022 alumna and WHO Research Fellow joins the global health advisory board focused on maternal health policy in South-East Asia.",
    views: "14.3K",
  },
];

const VIDEOS = [
  { title: "Global Reunion 2025 — Official Highlight Reel",       duration: "4:32",    views: "12.4K", desc: "Best moments from the biggest alumni gathering in Lincoln history."         },
  { title: "Alumni Founders Night — Panel Recap",                  duration: "18:07",   views: "5.8K",  desc: "Six alumni founders discuss scaling startups in South-East Asia."          },
  { title: "LUC Class of 2024 Graduation Ceremony",                duration: "1:24:55", views: "34.1K", desc: "Full ceremony — 840 graduates cross the stage in Petaling Jaya."           },
  { title: "Campus Tour — Innovation Hub & Medical Labs",           duration: "8:15",    views: "9.3K",  desc: "Walk through Lincoln's newest facilities, opened October 2025."            },
];

const SOCIAL_POSTS = [
  { platform: "instagram", handle: "@aisha.luc",     time: "2h",  text: "3 years post-graduation and every piece of advice from my lecturers still holds up. Thank you LUC! 🎓", likes: 284, comments: 31, hashtags: "#LincolnAlumni #ClassOf2019" },
  { platform: "linkedin",  handle: "Marcus Chen",    time: "5h",  text: "Excited to share that I've joined Goldman Sachs Singapore as Investment Analyst. Grateful for the Lincoln network that made this happen.", likes: 612, comments: 88, hashtags: "#LincolnAlumniNetwork" },
  { platform: "instagram", handle: "@priya.builds",  time: "1d",  text: "Our alumni chapter Singapore meetup was incredible — 40+ grads in one room, catching up and building futures together 🌏", likes: 197, comments: 24, hashtags: "#LUCAlumni #SingaporeChapter" },
  { platform: "linkedin",  handle: "Dr. Fatima A.",  time: "1d",  text: "Honoured to join the WHO Advisory Board. My journey started at Lincoln. If you're a current LUC student in medicine — your potential is limitless.", likes: 1204, comments: 147, hashtags: "#LincolnAlumni #GlobalHealth" },
  { platform: "instagram", handle: "@lucreunion",    time: "2d",  text: "The numbers don't lie: 1,200 alumni, 40 countries, one unforgettable evening. See you at Reunion 2026! 🏆", likes: 3412, comments: 260, hashtags: "#LUCReunion2025 #LincolnAlumniNetwork" },
  { platform: "linkedin",  handle: "Raj Patel",      time: "3d",  text: "TechBridge just crossed 500 employees. I built this company on the values and connections I made at Lincoln. Hiring 3 LUC grads this quarter.", likes: 892, comments: 104, hashtags: "#LincolnAlumni #StartupLife" },
];

const CATEGORIES: Category[] = ["All", "Events", "Achievements", "Campus", "Abroad", "Sports"];

const SPOTLIGHT = {
  name: "Dr. Priya Nair",
  grad: "Class of 2021 · Medicine",
  country: "🇸🇬 Singapore",
  role: "WHO Research Fellow & Cardiologist",
  connections: "1,240+",
  quote: "Lincoln didn't just give me a degree — it gave me the conviction that where you come from is never a ceiling.",
  story: [
    { heading: "From Petaling Jaya to Geneva", body: "Priya grew up in Kerala, India, and chose Lincoln on a scholarship after scoring in the top 0.1% of her university entrance exams. She graduated in 2021 with a first-class degree in Medicine and a university gold medal for research." },
    { heading: "The Research That Changed Things", body: "Her final-year dissertation on cardiac biomarkers in diabetic patients was published in The Lancet Regional Health — Southeast Asia at age 23, making her one of the youngest published authors in the journal's history." },
    { heading: "WHO Fellowship & What's Next", body: "In 2024, Priya was appointed as a Research Fellow at the World Health Organization's Geneva headquarters. She now advises on cardiovascular disease policy across 12 South-East Asian countries and mentors 14 current Lincoln medical students." },
  ],
};

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────

function Lightbox({ photo, onClose }: { photo: typeof PHOTOS[0]; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{ animation: "lightboxIn 300ms cubic-bezier(.22,.68,0,1.2) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-80 relative overflow-hidden">
          <img
            src={photo.image}
            alt={photo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-end p-8">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-white mb-3">
                {photo.category} · {photo.year}
              </span>
              <h2 className="font-display text-2xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                {photo.title}
              </h2>
              <p className="text-white/60 text-sm mt-1">{photo.badge}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="bg-card p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Heart className="h-4 w-4" /> Like
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Bookmark className="h-4 w-4" /> Save
            </button>
          </div>
          <Link to="/contact" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            Submit your story <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────

function Gallery() {
  const [category, setCategory] = useState<Category>("All");
  const [lightboxPhoto, setLightboxPhoto] = useState<typeof PHOTOS[0] | null>(null);
  const [storyExpanded, setStoryExpanded] = useState<number | null>(0);
  const [submitName, setSubmitName] = useState("");
  const [submitEmail, setSubmitEmail] = useState("");
  const [submitStory, setSubmitStory] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "done">("idle");

  const filtered = category === "All" ? PHOTOS : PHOTOS.filter((p) => p.category === category);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (submitState !== "idle") return;
    setSubmitState("loading");
    setTimeout(() => setSubmitState("done"), 1800);
  };

  return (
    <>
      <style>{`
        @keyframes fadeUpG {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lightboxIn {
          from { opacity: 0; transform: scale(0.94) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes gridFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-g1 { animation: fadeUpG 380ms ease-out 80ms  both; }
        .hero-g2 { animation: fadeUpG 380ms ease-out 200ms both; }
        .hero-g3 { animation: fadeUpG 380ms ease-out 320ms both; }
        .photo-tile {
          transition: transform 260ms ease-out, box-shadow 260ms ease-out;
          cursor: pointer;
        }
        .photo-tile:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 48px rgba(0,0,0,0.35);
          z-index: 2;
        }
        .photo-tile:hover .tile-overlay {
          opacity: 1;
        }
        .tile-overlay {
          opacity: 0;
          transition: opacity 260ms ease-out;
        }
        .news-card {
          transition: transform 260ms ease-out, box-shadow 260ms ease-out;
          cursor: pointer;
        }
        .news-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(190,24,55,0.08), 0 4px 12px rgba(0,0,0,0.06);
        }
        .social-post {
          transition: transform 260ms ease-out, box-shadow 260ms ease-out;
        }
        .social-post:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }
        .video-row {
          transition: transform 260ms ease-out, border-color 260ms ease-out;
        }
        .video-row:hover {
          transform: translateX(4px);
          border-color: hsl(var(--primary)/0.4);
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        id="gallery-hero"
        className="relative overflow-hidden py-36 lg:py-48"
      >
        {/* Background image — same pattern as About page */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80"
            alt="Alumni gathering"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-red-900/80 to-neutral-900/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/40 to-background" />
        </div>

        <div
          className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none z-10"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none z-10"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
        />

        <div className="container-page relative z-20">
          <div className="max-w-3xl">
            <span className="hero-g1 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Gallery & News
            </span>
            <h1
              className="hero-g2 font-display text-5xl md:text-7xl font-bold text-white leading-[0.95]"
              style={{ letterSpacing: "-0.025em" }}
            >
              Every{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                milestone
              </span>
              {" "}documented.
            </h1>
            <p className="hero-g3 mt-6 text-white/65 text-lg leading-relaxed max-w-xl">
              Photos, videos, alumni spotlights, and the latest news from a community of 25,000+ graduates across 85 countries.
            </p>
            <div className="hero-g3 mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => { const el = document.getElementById("photo-grid"); el?.scrollIntoView({ behavior: "smooth" }); }}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-amber-400 transition-all shadow-xl hover:-translate-y-0.5"
              >
                Browse Photos <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => { const el = document.getElementById("news-feed"); el?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                Read News
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── S1: CATEGORY FILTER ──────────────────────────────────────── */}
      <section
        id="category-filter"
        className="sticky top-0 z-30 border-b border-border"
        style={{ background: "hsl(var(--background)/0.95)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      >
        <div className="container-page">
          <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all shrink-0
                  ${category === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto shrink-0 text-xs text-muted-foreground pr-2">
              {filtered.length} photos
            </span>
          </div>
        </div>
      </section>

      {/* ── S2: PHOTO MASONRY GRID ───────────────────────────────────── */}
      <section id="photo-grid" className="container-page py-16">
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "200px" }}
        >
          {filtered.map((photo, i) => (
            <div
              key={photo.id}
              className={`photo-tile relative rounded-2xl overflow-hidden ${photo.span}`}
              style={{ animation: `gridFade 300ms ease-out ${i * 50}ms both` }}
              onClick={() => setLightboxPhoto(photo)}
            >
              {/* Real photo */}
              <img
                src={photo.image}
                alt={photo.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Dark scrim for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />

              {/* Hover overlay */}
              <div className="tile-overlay absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <ZoomIn className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Year badge */}
              <div className="absolute top-3 left-3">
                <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-black/40 text-white/80 border border-white/10 backdrop-blur-sm">
                  {photo.year}
                </span>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">{photo.category}</span>
                <h3 className="font-display text-sm font-bold text-white leading-snug mt-0.5">{photo.title}</h3>
                <p className="text-[10px] text-white/55 mt-0.5">{photo.badge}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── S3: VIDEO HIGHLIGHTS ─────────────────────────────────────── */}
      <section
        id="video-highlights"
        className="py-20"
        style={{ background: "hsl(var(--muted))" }}
      >
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
                Video Highlights
              </span>
              <h2
                className="font-display text-4xl md:text-5xl font-bold"
                style={{ letterSpacing: "-0.02em" }}
              >
                Watch the journey.
              </h2>
            </div>
          </div>

          {/* Featured video */}
          <div
            className="relative rounded-2xl overflow-hidden h-72 mb-6 cursor-pointer group"
          >
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
              alt="Global Reunion 2025 highlight reel"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            <div
              className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                <Play className="h-7 w-7 text-white translate-x-0.5" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 mb-3">
                Featured
              </span>
              <h3 className="font-display text-2xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                {VIDEOS[0].title}
              </h3>
              <p className="text-white/60 text-sm mt-1.5 flex items-center gap-3">
                <Clock className="h-3.5 w-3.5" /> {VIDEOS[0].duration}
                <Eye className="h-3.5 w-3.5 ml-1" /> {VIDEOS[0].views} views
              </p>
            </div>
          </div>

          {/* Video list */}
          <div className="space-y-3">
            {VIDEOS.slice(1).map((v, i) => (
              <div
                key={i}
                className="video-row flex items-center gap-5 bg-card rounded-2xl border border-border p-4 cursor-pointer"
              >
                <div className="w-14 h-14 shrink-0 rounded-xl bg-primary flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 text-white translate-x-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold leading-snug">{v.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{v.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-3">
                    <Clock className="h-3 w-3" /> {v.duration}
                    <Eye className="h-3 w-3 ml-1" /> {v.views} views
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: NEWS FEED ────────────────────────────────────────────── */}
      <section id="news-feed" className="container-page py-20">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
              Latest News
            </span>
            <h2
              className="font-display text-4xl md:text-5xl font-bold"
              style={{ letterSpacing: "-0.02em" }}
            >
              Achievements &amp; updates.
            </h2>
          </div>
          <Link
            to="/"
            className="group text-sm font-semibold text-primary inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            All news <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured article */}
        <div
          className="rounded-2xl border border-border bg-card overflow-hidden mb-6 grid md:grid-cols-[1fr_2fr] cursor-pointer hover:border-primary/30 hover:shadow-elegant transition-all group"
        >
          <div className="h-48 md:h-auto relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80"
              alt="Forbes Asia 30 Under 30"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300">
                <Star className="h-2.5 w-2.5" /> Top Story
              </span>
            </div>
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${NEWS_ARTICLES[0].tagColor}`}>
                  {NEWS_ARTICLES[0].tag}
                </span>
                <span className="text-xs text-muted-foreground">{NEWS_ARTICLES[0].date}</span>
              </div>
              <h3
                className="font-display text-2xl font-bold leading-snug group-hover:text-primary transition-colors"
                style={{ letterSpacing: "-0.01em" }}
              >
                {NEWS_ARTICLES[0].title}
              </h3>
              <p className="text-muted-foreground mt-3 leading-relaxed text-sm">{NEWS_ARTICLES[0].excerpt}</p>
            </div>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> {NEWS_ARTICLES[0].readTime} read
                <span className="w-1 h-1 rounded-full bg-border mx-1" />
                <Eye className="h-3 w-3" /> {NEWS_ARTICLES[0].views} views
              </span>
              <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                Read more <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {NEWS_ARTICLES.slice(1).map((article, i) => (
            <article
              key={i}
              className="news-card card-premium p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${article.tagColor}`}>
                  {article.tag}
                </span>
                <span className="text-xs text-muted-foreground">{article.date}</span>
              </div>
              <h3
                className="font-display text-lg font-semibold leading-snug hover:text-primary transition-colors"
                style={{ letterSpacing: "-0.01em" }}
              >
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{article.excerpt}</p>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {article.readTime} read
                </span>
                <span className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                  Read more <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── S5: ALUMNI SPOTLIGHT STORY ───────────────────────────────── */}
      <section
        id="alumni-spotlight"
        className="py-20"
        style={{ background: "hsl(var(--muted))" }}
      >
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
                Alumni of the Month
              </span>
              <h2
                className="font-display text-4xl md:text-5xl font-bold"
                style={{ letterSpacing: "-0.02em" }}
              >
                One story. Fully told.
              </h2>
            </div>
            <span className="pill bg-amber-400/15 text-amber-600 border border-amber-400/25 text-xs font-bold">
              May 2026
            </span>
          </div>

          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            {/* Profile card */}
            <div
              className="rounded-2xl overflow-hidden border border-border"
              style={{ background: "linear-gradient(160deg, hsl(350 85% 18%) 0%, hsl(220 40% 12%) 100%)" }}
            >
              <div className="h-40 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
                  alt="Dr. Priya Nair"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <div
                  className="absolute -bottom-8 left-8 w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center text-2xl font-bold text-white shadow-xl overflow-hidden"
                  style={{ background: "linear-gradient(135deg, hsl(350 85% 35%), hsl(220 40% 22%))" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=80&h=80&q=80"
                    alt="Dr. Priya Nair avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="pt-12 px-8 pb-8">
                <h3 className="font-display text-xl font-bold text-white">{SPOTLIGHT.name}</h3>
                <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mt-0.5">{SPOTLIGHT.role}</p>
                <p className="text-white/50 text-xs mt-0.5">{SPOTLIGHT.grad}</p>
                <p className="text-white/50 text-xs mt-0.5">{SPOTLIGHT.country}</p>

                <blockquote className="mt-6 border-l-2 border-amber-400/50 pl-4 text-white/75 text-sm italic leading-relaxed">
                  "{SPOTLIGHT.quote}"
                </blockquote>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                  <div className="text-center">
                    <div className="font-display text-2xl font-bold text-white">{SPOTLIGHT.connections}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">Connected</div>
                  </div>
                  <div className="flex-1" />
                  <Link
                    to="/directory"
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                  >
                    View Profile <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Story chapters */}
            <div className="space-y-4">
              {SPOTLIGHT.story.map((chapter, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all cursor-pointer
                    ${storyExpanded === i
                      ? "border-primary/30 bg-primary/[.03] shadow-elegant"
                      : "border-border bg-card hover:border-primary/20"
                    }`}
                  onClick={() => setStoryExpanded(storyExpanded === i ? null : i)}
                >
                  <div className="flex items-center justify-between gap-4 p-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-display font-bold text-sm transition-colors
                          ${storyExpanded === i ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
                      >
                        {i + 1}
                      </div>
                      <h4 className="font-display font-semibold text-lg" style={{ letterSpacing: "-0.01em" }}>
                        {chapter.heading}
                      </h4>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${storyExpanded === i ? "rotate-90 text-primary" : ""}`}
                    />
                  </div>
                  {storyExpanded === i && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed text-sm pl-13" style={{ paddingLeft: "3.25rem" }}>
                        {chapter.body}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/directory"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-lg"
                >
                  Connect with Priya <ArrowRight className="h-4 w-4" />
                </Link>
                <button className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition-all">
                  <Share2 className="h-4 w-4" /> Share Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S6: SUBMIT A STORY CTA ───────────────────────────────────── */}
      <section
        id="submit-story"
        className="py-20"
        style={{ background: "#0F1420" }}
      >
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400 block mb-4">
                Be Featured
              </span>
              <h2
                className="font-display text-4xl md:text-5xl font-bold text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                Your story{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  belongs here.
                </span>
              </h2>
              <p className="mt-5 text-white/60 leading-relaxed max-w-md text-sm">
                Every month we feature one alumnus in a long-form spotlight. Share your career journey, lessons learned, and how Lincoln shaped your path.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { icon: Newspaper, text: "Professional editorial write-up by our content team" },
                  { icon: Mic2, text: "Shared across all alumni channels — 25K+ reach" },
                  { icon: Calendar, text: "Published in our monthly alumni newsletter" },
                  { icon: Star, text: "Permanent feature in the Alumni Spotlight archive" },
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
              {submitState === "done" ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5">
                    <Check className="h-7 w-7 text-emerald-400" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">Story Received!</h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    Our editorial team will review your submission and be in touch within 5 working days.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl font-bold text-white mb-6">Submit Your Story</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1.5 block">Full Name</label>
                      <input
                        type="text"
                        value={submitName}
                        onChange={(e) => setSubmitName(e.target.value)}
                        placeholder="e.g. Dr. Priya Nair"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1.5 block">Email Address</label>
                      <input
                        type="email"
                        value={submitEmail}
                        onChange={(e) => setSubmitEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1.5 block">Your Story</label>
                      <textarea
                        value={submitStory}
                        onChange={(e) => setSubmitStory(e.target.value)}
                        rows={5}
                        placeholder="Tell us about your journey — where you've been, what you've built, and what Lincoln meant to you..."
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={submitState !== "idle" || !submitName || !submitEmail || !submitStory}
                      className="w-full rounded-full bg-primary text-white py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitState === "loading" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit for Feature
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-white/35">
                      Or{" "}
                      <Link to="/contact" className="text-amber-400 hover:underline">
                        contact the editorial team →
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── S7: SOCIAL FEED WALL ─────────────────────────────────────── */}
      <section id="social-feed" className="container-page py-20">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
              Social Feed
            </span>
            <h2
              className="font-display text-4xl md:text-5xl font-bold"
              style={{ letterSpacing: "-0.02em" }}
            >
              #LincolnAlumniNetwork
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Posts from alumni tagged with our community hashtags.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-500">
              <Instagram className="h-3.5 w-3.5" /> Instagram
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-500">
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOCIAL_POSTS.map((post, i) => (
            <div
              key={i}
              className="social-post rounded-2xl border border-border bg-card p-5 flex flex-col gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: post.platform === "instagram" ? "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" : "linear-gradient(135deg, #0077b5, #00a0dc)" }}
                >
                  {post.handle.replace("@", "").slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{post.handle}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    {post.platform === "instagram"
                      ? <Instagram className="h-3 w-3" />
                      : <Linkedin className="h-3 w-3" />
                    }
                    {post.time} ago
                  </p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed flex-1">{post.text}</p>
              <p className="text-xs font-semibold text-primary">{post.hashtags}</p>

              <div className="flex items-center gap-4 pt-3 border-t border-border">
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-rose-500 transition-colors">
                  <Heart className="h-3.5 w-3.5" /> {post.likes.toLocaleString()}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="h-3.5 w-3.5" /> {post.comments}
                </button>
                <button className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Hashtag CTA */}
        <div
          className="mt-16 relative overflow-hidden rounded-3xl px-10 md:px-20 py-16 text-center text-white"
          style={{ background: "var(--gradient-hero, linear-gradient(160deg, #7f0d18 0%, #1a0306 100%))" }}
        >
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-10 pointer-events-none" style={{ background: "hsl(var(--accent, 38 92% 50%))" }} />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: "white" }} />
          <div className="relative z-10">
            <span className="pill bg-white/15 border border-white/20 text-white mb-4 mx-auto text-xs font-bold">
              📲 Join the Conversation
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4" style={{ letterSpacing: "-0.02em" }}>
              Tag us in your alumni moments.
            </h2>
            <p className="mt-3 text-white/65 text-sm max-w-md mx-auto leading-relaxed">
              Use <strong className="text-amber-400">#LincolnAlumniNetwork</strong> on Instagram or LinkedIn and your post may be featured here.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxPhoto && (
        <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
      )}
    </>
  );
}