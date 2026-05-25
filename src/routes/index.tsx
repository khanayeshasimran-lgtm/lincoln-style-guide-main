import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Users, Globe2, Briefcase, Calendar,
  Sparkles, MapPin, GraduationCap, Heart,
  ChevronRight, Star, Newspaper, Check,
  Mail, User, Phone,
} from "lucide-react";
import heroImg from "@/assets/hero-alumni.jpg";
import { alumni, events, stats } from "@/data/alumni";
import { AlumniCard } from "@/components/site/AlumniCard";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Lincoln Alumni Network — Stay Connected Forever" },
      {
        name: "description",
        content: "Join 25,000+ Lincoln University College alumni across 85 countries. Network, mentor, and grow together.",
      },
    ],
  }),
});

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const newsItems = [
  { tag: "Achievement", tagColor: "bg-amber-500/15 text-amber-600 border-amber-300/40", date: "May 2026", title: "LUC Alumni Ranked in Forbes Asia 30 Under 30", excerpt: "Three Lincoln graduates recognized for breakthrough innovations in biotech, fintech, and sustainable energy.", readTime: "3 min read" },
  { tag: "Campus", tagColor: "bg-red-500/10 text-red-600 border-red-300/40", date: "Apr 2026", title: "New Alumni Scholarship Fund Raises RM 2.4 Million", excerpt: "The annual alumni fundraising gala exceeded its target, enabling 48 new merit scholarships.", readTime: "4 min read" },
  { tag: "Community", tagColor: "bg-blue-500/10 text-blue-600 border-blue-300/40", date: "Mar 2026", title: "Global Mentorship Programme Expands to 12 Countries", excerpt: "Alumni-led mentorship now connects 600+ mentors with students across medicine to digital design.", readTime: "5 min read" },
];

const topAlumni = [
  { name: "Dr. Priya Nair",  role: "Cardiologist",      region: "Singapore", connects: 1240, initials: "PN", color: "from-red-600 to-rose-800",    x: "68%", y: "62%" },
  { name: "Ahmad Fauzi",     role: "CEO, TechVentures", region: "Malaysia",  connects: 987,  initials: "AF", color: "from-amber-600 to-orange-700", x: "65%", y: "58%" },
  { name: "Chen Wei Lin",    role: "Engineer, Google",  region: "USA",       connects: 834,  initials: "CW", color: "from-blue-700 to-indigo-800",  x: "20%", y: "38%" },
];

const notableMentors = [
  { initials: "PN", name: "Dr. Priya Nair",    role: "Senior Cardiologist",   company: "Mount Elizabeth, SG", hex: "#C1121F" },
  { initials: "AF", name: "Ahmad Fauzi",        role: "CEO & Co-Founder",      company: "TechVentures MY",     hex: "#D97706" },
  { initials: "CW", name: "Chen Wei Lin",       role: "Software Engineer",     company: "Google, USA",         hex: "#1a73e8" },
  { initials: "SR", name: "Sunita Rao",         role: "Investment Director",   company: "Goldman Sachs",       hex: "#374151" },
  { initials: "MK", name: "Mohammed Khalid",    role: "Head of Product",       company: "Grab, Singapore",     hex: "#00B14F" },
  { initials: "LP", name: "Dr. Lisa Park",      role: "Research Scientist",    company: "Pfizer, USA",         hex: "#0070C0" },
  { initials: "RJ", name: "Raj Jeevan",         role: "VP Engineering",        company: "Shopee, SEA",         hex: "#EE4D2D" },
  { initials: "NA", name: "Nurul Ain",          role: "Climate Policy Lead",   company: "UN Environment",      hex: "#2e7d32" },
];

const hiringCompanies = ["Google","Goldman Sachs","Grab","Shopee","Pfizer","McKinsey","Deloitte","Shell","Petronas","AirAsia","Maybank","CIMB","Microsoft","Amazon","PwC","KPMG","Ernst & Young","Accenture","IBM","Unilever","Nestlé"];

const advantageRows = [
  { cat: "Community",      lincoln: "25,000+ active, engaged alumni",            others: "Generic social networks"        },
  { cat: "Mentorship",     lincoln: "1,200+ mentors across 40+ industries",       others: "No structured matching"         },
  { cat: "Career Support", lincoln: "Dedicated alumni job board & referrals",     others: "Generic job boards"             },
  { cat: "Events",         lincoln: "120+ events per year, global & hybrid",      others: "Sporadic, ad-hoc meetups"       },
  { cat: "Scholarships",   lincoln: "RM 2.4M fund, 48 scholarships awarded",      others: "Minimal alumni giving culture"  },
  { cat: "Global Reach",   lincoln: "85 countries, 4 active global chapters",     others: "No dedicated chapter network"   },
  { cat: "Exclusivity",    lincoln: "Verified alumni-only platform",              others: "Open to non-alumni"             },
];

const faqData: Record<string, { q: string; a: string }[]> = {
  General: [
    { q: "What is the Lincoln Alumni Network?", a: "The Lincoln Alumni Network connects 25,000+ graduates from Lincoln University College Malaysia across 85 countries. We facilitate mentorship, events, career opportunities, and lifelong community." },
    { q: "Who can join?", a: "Any graduate of Lincoln University College Malaysia is eligible. Students in their final year can also register in advance." },
  ],
  Membership: [
    { q: "How do I register?", a: "Fill in your details in the join form, verify your email, and your profile goes live within 24 hours. It's completely free." },
    { q: "Is membership free?", a: "Yes — core membership is free forever." },
  ],
  Mentorship: [
    { q: "How does the mentorship programme work?", a: "Alumni register as mentors specifying their industry and availability. Students and junior alumni are matched based on field and goals, with 1-on-1 sessions facilitated through the platform." },
    { q: "How many mentors are available?", a: "We have 1,200+ active mentors across 40+ industries, from medicine to fintech to climate policy." },
  ],
  Events: [
    { q: "What events does the network run?", a: "We run 120+ events per year including the Annual Gala, regional networking nights, industry panels, webinars, and campus homecoming days." },
    { q: "Can I attend events from abroad?", a: "Yes — many events are hybrid or fully online. Our global chapters in Singapore, London, Melbourne, and Toronto also run local events." },
  ],
  Opportunities: [
    { q: "Are there job opportunities through the network?", a: "Our alumni job board lists 500+ roles at any time, posted exclusively by alumni and partner companies who prefer Lincoln graduates." },
    { q: "Do alumni offer scholarships?", a: "The Alumni Scholarship Fund has raised RM 2.4 million, enabling 48 merit scholarships in the last cycle alone." },
  ],
};

const testimonials = [
  { name: "Aisha Rahman", role: "Senior Software Engineer, Google", grad: "Computer Science, Class of 2019", image: "https://randomuser.me/api/portraits/women/44.jpg", quote: "The Lincoln Alumni Network connected me with a mentor at Google during my final year. Six months later, I had my dream offer. The community here is genuinely invested in each other's success." },
  { name: "James Okafor", role: "Corporate Lawyer, Baker McKenzie", grad: "Law, Class of 2016", image: "https://randomuser.me/api/portraits/men/75.jpg", quote: "I found my first international internship through an alumni referral. That one connection changed my entire career trajectory. Being part of this network is like having 25,000 people rooting for you." },
  { name: "Fatima Al-Rashidi", role: "Research Fellow, WHO", grad: "Medicine, Class of 2022", image: "https://randomuser.me/api/portraits/women/89.jpg", quote: "The mentorship programme paired me with a Lincoln alumna already working at WHO. Her guidance helped me secure my fellowship. I now mentor two students myself — the cycle of giving back is beautiful." },
  { name: "Raj Patel", role: "CTO & Co-Founder, TechBridge", grad: "Computer Science, Class of 2013", image: "https://randomuser.me/api/portraits/men/91.jpg", quote: "We hired 6 Lincoln alumni in our first year. The quality, the work ethic, the drive — it's consistent. The network didn't just help my career, it helped me build a company." },
  { name: "Kwame Asante", role: "Chief Economist, World Bank", grad: "Economics, Class of 2014", image: "https://randomuser.me/api/portraits/men/41.jpg", quote: "Attending the annual gala introduced me to three people who changed my professional life. Lincoln alumni don't just network — they genuinely open doors for each other." },
];

const successStories = [
  { name: "Dr. Priya Nair", image: "https://randomuser.me/api/portraits/women/68.jpg", achievement: "Published in The Lancet before completing residency — connected to lead researcher via alumni network" },
  { name: "Ahmad Fauzi", image: "https://randomuser.me/api/portraits/men/32.jpg", achievement: "Built a RM 12M tech venture, seed-funded through three Lincoln alumni investors he met at the annual gala" },
];

const orbitAlumni = [
  { image: "https://randomuser.me/api/portraits/women/44.jpg", angle: 330 },
  { image: "https://randomuser.me/api/portraits/men/75.jpg",   angle: 60  },
  { image: "https://randomuser.me/api/portraits/women/89.jpg", angle: 180 },
  { image: "https://randomuser.me/api/portraits/men/41.jpg",   angle: 240 },
];

const joinSteps = [
  { emoji: "📋", title: "Register Your Profile", color: "#C1121F", bg: "#FDF0F0", points: ["Fill in your graduate details", "Verify with your Lincoln email or student ID", "Takes under 2 minutes — completely free"], hasCta: true },
  { emoji: "✅", title: "Get Verified", color: "#B45309", bg: "#FFFBEB", points: ["Our team confirms your alumni status within 24 hours", "Receive your verified alumni badge", "Unlock full directory access"], hasCta: false },
  { emoji: "🤝", title: "Connect & Mentor", color: "#1D6F42", bg: "#F0FDF4", points: ["Browse 25,000+ verified alumni profiles", "Join the structured mentorship programme", "Attend exclusive alumni events worldwide"], hasCta: false },
  { emoji: "🚀", title: "Grow Together", color: "#1a56db", bg: "#EFF6FF", points: ["Access the alumni-only job board & referrals", "Apply for the alumni scholarship fund", "Build your global professional legacy"], hasCta: false },
];

function Home() {
  const featured = alumni.slice(0, 3);
  const upcoming = events.slice(0, 3);

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsInView(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const [activePin, setActivePin]         = useState<number | null>(0);
  const [activeFaqTab, setActiveFaqTab]   = useState("Events");
  const [openFaq, setOpenFaq]             = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const prevTestimonial = () => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const nextTestimonial = () => setTestimonialIdx(i => (i + 1) % testimonials.length);

  const visibleTestimonials = [
    testimonials[testimonialIdx % testimonials.length],
    testimonials[(testimonialIdx + 1) % testimonials.length],
    testimonials[(testimonialIdx + 2) % testimonials.length],
  ];

  const [formData, setFormData]           = useState({ name: "", email: "", phone: "", type: "alumni" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading]     = useState(false);

  const handleSubmit = () => {
    if (!formData.name || !formData.email) return;
    setFormLoading(true);
    setTimeout(() => { setFormLoading(false); setFormSubmitted(true); }, 1500);
  };

  const c1 = useCountUp(25000, 2000, statsInView);
  const c2 = useCountUp(85,    1800, statsInView);
  const c3 = useCountUp(40,    1600, statsInView);
  const c4 = useCountUp(120,   2200, statsInView);

  const heroTitles = ["Medicine & Healthcare", "Technology & AI", "Finance & Banking", "Engineering", "Business & Ventures"];
  const [titleIdx, setTitleIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTitleIdx(i => (i + 1) % heroTitles.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ping2 { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes authFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fu1 { animation: fadeUp 500ms ease-out 80ms  both; }
        .fu2 { animation: fadeUp 500ms ease-out 200ms both; }
        .fu3 { animation: fadeUp 500ms ease-out 320ms both; }
        .fu4 { animation: fadeUp 500ms ease-out 440ms both; }
        .fu5 { animation: fadeUp 500ms ease-out 560ms both; }
        .fi  { animation: authFade 600ms ease-out 180ms both; }
        .ping2 { animation: ping2 1.5s ease-out infinite; }
      `}</style>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-amber-50 border-b border-amber-200 py-2.5 px-6 text-center text-sm flex items-center justify-center gap-4 flex-wrap">
        <span>🎓 Annual Alumni Gala — <strong>14th June 2026, Kuala Lumpur</strong> — Limited seats remaining</span>
        <Link to="/events" className="bg-primary text-white text-xs font-bold rounded-full px-4 py-1.5 hover:bg-primary/90 transition-colors">Register Now</Link>
      </div>

      {/* ── HERO — auth-style full bleed split ── */}
      <section className="relative min-h-[calc(100vh-74px)] overflow-hidden">
        {/* Full-bleed background image (same as auth) */}
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover object-center scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/70 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </div>

        {/* Content layer */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 min-h-[calc(100vh-74px)] flex items-center">
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 lg:gap-20">

            {/* LEFT — brand copy */}
            <div className="lg:max-w-[520px]" style={{ animation: "fadeUp 600ms ease-out both" }}>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] bg-white/10 border border-white/15 text-white/75 px-3.5 py-1.5 rounded-full mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Lincoln University College Malaysia
              </span>

              <h1 className="font-display font-black text-white leading-[0.95] mb-4" style={{ fontSize: "clamp(2.8rem, 5vw, 4.4rem)", letterSpacing: "-0.03em" }}>
                Your Network.<br />
                <span style={{ background: "linear-gradient(90deg,#f59e0b,#ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Your Future.
                </span>
              </h1>

              <p className="font-display font-semibold text-amber-400 mb-5" style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)", minHeight: "1.8rem" }}>
                {heroTitles[titleIdx]}
              </p>

              <p className="text-white/60 text-base leading-relaxed max-w-sm mb-10">
                Join <strong className="text-white/90">25,000+</strong> Lincoln graduates connected across <strong className="text-white/90">85 countries</strong>. Reconnect, mentor, and grow — for life.
              </p>

              <ul className="space-y-4 mb-12">
                {["Access the global alumni directory", "Find mentors in your industry", "Attend exclusive alumni events", "Scholarships & career opportunities"].map((item) => (
                  <li key={item} className="flex items-center gap-3.5 text-sm text-white/75">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/35 flex items-center justify-center shrink-0">
                      <Check className="h-2.5 w-2.5 text-emerald-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-4 max-w-sm mb-10">
                {[{ label: "Next Event", value: "Annual Gala — 14 Jun 2026" }, { label: "Network Size", value: "25,000+ Members Global" }].map((b) => (
                  <div key={b.label} className="rounded-xl border border-white/12 p-5 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">{b.label}</p>
                    <p className="text-xs font-semibold text-white/90 leading-snug">{b.value}</p>
                  </div>
                ))}
              </div>

              {/* Inline mini-stats bar */}
              <div className="grid grid-cols-4 gap-1 bg-white/[0.06] border border-white/10 rounded-2xl p-1 max-w-sm">
                {[{ n: "25K+", l: "Alumni" }, { n: "85", l: "Countries" }, { n: "40+", l: "Industries" }, { n: "1.2K+", l: "Mentors" }].map((s) => (
                  <div key={s.l} className="text-center py-3 px-2">
                    <div className="font-display text-lg font-bold text-white" style={{ letterSpacing: "-0.02em" }}>{s.n}</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/40 font-medium mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — floating white card (auth-style) */}
            <div className="w-full lg:w-[480px] xl:w-[500px] shrink-0 fi">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-1" style={{ background: "linear-gradient(90deg, #C1121F 0%, #f59e0b 100%)" }} />
                <div className="p-8 lg:p-10">
                  <h2 className="font-display text-2xl font-bold mb-1" style={{ letterSpacing: "-0.02em" }}>Get Started Today</h2>
                  <p className="text-muted-foreground text-sm mb-6">Join the network — it takes less than 2 minutes.</p>

                  {formSubmitted ? (
                    <div className="text-center py-10 px-6 rounded-2xl border border-emerald-200 bg-emerald-50">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <Check className="h-7 w-7 text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">You're on the list!</h3>
                      <p className="text-sm text-muted-foreground mb-5">We'll send your access details to <strong>{formData.email}</strong> within 24 hours.</p>
                      <Link to="/directory" className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors">
                        Browse Alumni Directory <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-1.5 bg-muted p-1 rounded-xl">
                        {[{ val: "alumni", label: "Alumni" }, { val: "student", label: "Student" }, { val: "visitor", label: "Visitor" }].map((t) => (
                          <button key={t.val} onClick={() => setFormData(f => ({ ...f, type: t.val }))}
                            className={`py-2 rounded-lg text-xs font-semibold transition-all ${formData.type === t.val ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                            {t.label}
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <input type="text" placeholder="Full name" value={formData.name}
                          onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/8 transition-all" />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <input type="email" placeholder="Email address" value={formData.email}
                          onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/8 transition-all" />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <input type="tel" placeholder="Phone number (optional)" value={formData.phone}
                          onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/8 transition-all" />
                      </div>

                      <button onClick={handleSubmit} disabled={!formData.name || !formData.email || formLoading}
                        className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-4 text-sm font-semibold transition-all hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                        {formLoading ? (<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Joining…</>) : (<>Join the Network <ArrowRight className="h-4 w-4" /></>)}
                      </button>

                      <p className="text-center text-xs text-muted-foreground">
                        Already a member?{" "}
                        <Link to="/auth" className="text-primary font-semibold hover:underline">Sign in →</Link>
                      </p>

                      <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-[11px] text-muted-foreground">or continue with</span>
                        <div className="flex-1 h-px bg-border" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-medium hover:bg-muted transition-colors">
                          <span className="text-base">G</span> Google
                        </button>
                        <button className="flex items-center justify-center gap-2 border border-blue-200 bg-blue-50/50 text-blue-700 rounded-xl py-3 text-sm font-medium hover:bg-blue-100/50 transition-colors">
                          <span className="text-base font-bold">in</span> LinkedIn
                        </button>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          {[{ n: "25K+", l: "Members" }, { n: "4.9★", l: "Rated" }, { n: "Free", l: "Always" }].map((b) => (
                            <div key={b.l} className="rounded-xl bg-muted/60 py-2.5 px-2">
                              <div className="font-bold text-sm text-foreground">{b.n}</div>
                              <div className="text-[10px] text-muted-foreground mt-0.5">{b.l}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── S2: Stats bar ── */}
      <section ref={statsRef} className="relative" style={{ background: "#161B26" }}>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[{ icon: Users, label: "Alumni Worldwide", val: c1, suffix: "+" }, { icon: Globe2, label: "Countries", val: c2, suffix: "" }, { icon: Briefcase, label: "Industries", val: c3, suffix: "+" }, { icon: Calendar, label: "Events / Year", val: c4, suffix: "" }].map(({ icon: Icon, label, val, suffix }, i) => (
            <div key={label} className="group relative flex flex-col items-center justify-center gap-2 py-10 px-6 text-center" style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[.03] transition-colors" />
              <Icon className="h-4 w-4 text-amber-400 opacity-70" />
              <div className="font-display text-4xl md:text-5xl font-bold text-white tabular-nums" style={{ letterSpacing: "-0.03em" }}>
                {statsInView ? val.toLocaleString() : "0"}{suffix}
              </div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-white/40 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── S2b: Experience Beyond Campus ── */}
      <section className="py-24" style={{ background: "#FFFBF0" }}>
        <div className="container-page">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-2/5 flex items-center justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, #FFF3CD 0%, #FDE68A 65%, transparent 100%)" }} />
                <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80" alt="Alumni networking" className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover rounded-full" />
                {[{ label: "1,200+ Mentors", top: "30%", left: "-16%" }, { label: "Global Network", top: "65%", right: "-14%" }].map((tag) => (
                  <div key={tag.label} className="absolute bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm font-bold text-gray-700 shadow-md whitespace-nowrap" style={{ top: tag.top, left: tag.left, right: tag.right }}>{tag.label}</div>
                ))}
              </div>
            </div>
            <div className="lg:w-3/5">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">Life After Lincoln</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-10" style={{ letterSpacing: "-0.02em" }}>Experience Beyond<br /><span className="text-primary">the Campus</span></h2>
              <div className="space-y-7">
                {[{ icon: "🏆", title: "Win Competitions & Hackathons", desc: "Alumni-sponsored competitions that sharpen real-world skills and build your professional portfolio." }, { icon: "🤝", title: "Connect Across 85 Countries", desc: "Our global chapters in Singapore, London, Melbourne, and Toronto run local networking events year-round." }, { icon: "🚀", title: "Launch Early, Grow Fast", desc: "340+ alumni secured jobs through network referrals in the last year alone. Your next opportunity is one connection away." }, { icon: "💡", title: "Mentor or Be Mentored", desc: "Our structured programme connects you with the right person at the right time — give back or get ahead." }].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <span className="text-2xl mt-0.5 shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-display text-lg font-semibold mb-1" style={{ letterSpacing: "-0.01em" }}>{item.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S3: Featured Alumni ── */}
      <section id="featured-alumni" className="container-page py-24">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">Success Stories</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ letterSpacing: "-0.02em" }}>Alumni Making <em className="not-italic text-primary">Waves.</em></h2>
            <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">Meet the graduates reshaping industries and rewriting what's possible.</p>
          </div>
          <Link to="/directory" className="group text-sm font-semibold text-primary inline-flex items-center gap-2 hover:gap-3 transition-all">View all alumni <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((a) => <AlumniCard key={a.id} a={a} />)}
        </div>
      </section>

      {/* ── S3b: Notable Mentors Grid ── */}
      <section className="py-24" style={{ background: "#fafafa" }}>
        <div className="container-page">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">Our Mentors</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ letterSpacing: "-0.02em" }}>Alumni Making <span className="text-primary">Waves Worldwide</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {notableMentors.map((m) => (
              <div key={m.initials} className="bg-card rounded-2xl p-6 text-center border border-border hover:shadow-elegant hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-black" style={{ background: m.hex + "18", border: `2px solid ${m.hex}30`, color: m.hex }}>{m.initials}</div>
                <p className="font-display font-semibold text-sm leading-tight mb-1" style={{ letterSpacing: "-0.01em" }}>{m.name}</p>
                <p className="text-xs text-muted-foreground mb-3">{m.role}</p>
                <span className="inline-block text-xs font-bold rounded-lg px-3 py-1" style={{ background: m.hex + "12", color: m.hex }}>{m.company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: Map Spotlight ── */}
      <section className="py-24 overflow-hidden" style={{ background: "#0F1420" }}>
        <div className="container-page">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-2/5 shrink-0">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400 block mb-3">Global Reach</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>Our Alumni,{" "}<span style={{ background: "linear-gradient(90deg,#f59e0b,#ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Everywhere.</span></h2>
              <p className="mt-4 text-white/55 text-sm leading-relaxed">From Petaling Jaya to Silicon Valley — Lincoln graduates are making an impact on every continent.</p>
              <div className="mt-8 space-y-3">
                {topAlumni.map((a, i) => (
                  <button key={i} onClick={() => setActivePin(i)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${activePin === i ? "border-amber-400/50 bg-white/[.06]" : "border-white/[.07] bg-white/[.02] hover:bg-white/[.04]"}`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{a.initials}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{a.name}</p>
                      <p className="text-white/45 text-xs mt-0.5">{a.role} · {a.region}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-amber-400 font-bold text-sm">{a.connects.toLocaleString()}</p>
                      <p className="text-white/35 text-[10px] uppercase tracking-wider">connects</p>
                    </div>
                  </button>
                ))}
              </div>
              <Link to="/directory" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group">View full directory <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
            </div>
            <div className="lg:w-3/5 relative">
              <div className="relative w-full rounded-3xl overflow-hidden border border-white/[.07]" style={{ background: "linear-gradient(145deg, #0d1528, #111827)", aspectRatio: "16/9" }}>
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
                  {Array.from({ length: 9 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="white" strokeWidth="0.5" />)}
                  {Array.from({ length: 17 }).map((_, i) => <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="450" stroke="white" strokeWidth="0.5" />)}
                </svg>
                {topAlumni.map((a, i) => (
                  <div key={i} className="absolute" style={{ left: a.x, top: a.y, transform: "translate(-50%,-50%)" }}>
                    {activePin === i && <div className="absolute inset-0 rounded-full ping2" style={{ width: 40, height: 40, marginLeft: -8, marginTop: -8, background: "rgba(245,158,11,0.2)" }} />}
                    <button onClick={() => setActivePin(i)}
                      className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-bold text-white transition-all ${activePin === i ? "border-amber-400 scale-150 shadow-lg shadow-amber-400/30" : "border-white/30 scale-100 hover:scale-125"}`}
                      style={{ background: activePin === i ? "linear-gradient(135deg,#f59e0b,#ef4444)" : "rgba(255,255,255,0.12)" }}>
                      {a.initials[0]}
                    </button>
                    {activePin === i && (
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 border border-amber-400/30 rounded-xl px-3 py-2 text-center whitespace-nowrap shadow-xl" style={{ minWidth: 130 }}>
                        <p className="text-white text-xs font-semibold">{a.name}</p>
                        <p className="text-amber-400 text-[10px] mt-0.5">{a.region}</p>
                        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 border-r border-b border-amber-400/30 rotate-45" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S4b: Companies Hiring ── */}
      <section className="container-page py-24 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">Career Network</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-2" style={{ letterSpacing: "-0.02em" }}>500+ Companies</h2>
        <h3 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: "-0.02em" }}>Actively Hiring Lincoln Alumni</h3>
        <p className="text-muted-foreground text-sm mb-12 max-w-md mx-auto">Alumni referrals and exclusive job postings available through the network directory</p>
        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
          {hiringCompanies.map((c) => (<span key={c} className="bg-muted border border-border rounded-lg px-4 py-2 text-sm font-medium text-foreground">{c}</span>))}
        </div>
      </section>

      {/* ── S4c: Lincoln Advantage ── */}
      <section className="py-24" style={{ background: "#fafafa" }}>
        <div className="container-page">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">Why Us</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ letterSpacing: "-0.02em" }}>Why Choose <span className="text-primary">Lincoln Alumni Network?</span></h2>
          </div>
          <div className="flex gap-4 max-w-4xl mx-auto flex-wrap md:flex-nowrap">
            <div className="flex-1 min-w-[140px] rounded-2xl p-6" style={{ background: "linear-gradient(180deg,#f7e0e0,#fce8e8)" }}>
              {advantageRows.map((r) => (<div key={r.cat} className="py-3 border-b border-red-100 text-sm font-medium flex items-center gap-2" style={{ color: "#5a1a1a" }}><MapPin className="h-3 w-3 shrink-0 text-primary/60" />{r.cat}</div>))}
            </div>
            <div className="flex-[1.2] min-w-[180px] rounded-2xl p-6 border-2 border-primary/30" style={{ background: "#FFF8F0" }}>
              <div className="flex items-center gap-2 mb-5 font-display font-bold text-base"><div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center"><span className="text-white text-[10px] font-black">LU</span></div>Lincoln Advantage</div>
              {advantageRows.map((r) => (<div key={r.cat} className="py-3 border-b border-amber-100 text-sm font-semibold flex items-start gap-2" style={{ color: "#7C2020" }}><Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />{r.lincoln}</div>))}
            </div>
            <div className="flex-1 min-w-[140px] bg-card rounded-2xl p-6 border border-border">
              <p className="font-semibold text-muted-foreground text-center mb-5 text-sm">Others</p>
              {advantageRows.map((r) => (<div key={r.cat} className="py-3 border-b border-border text-sm text-muted-foreground">{r.others}</div>))}
            </div>
          </div>
        </div>
      </section>

      {/* ── S4d: Testimonials ── */}
      <section className="py-24" style={{ background: "#FDF6F0" }}>
        <div className="container-page">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">Alumni Voices</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ letterSpacing: "-0.02em" }}>Hear It From <span className="text-primary">Lincoln Alumni</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {visibleTestimonials.map((t, i) => (
              <div key={`${testimonialIdx}-${i}`} className="bg-white rounded-2xl p-7 border border-red-100 shadow-sm flex flex-col gap-5" style={{ animation: "fadeUp 350ms ease-out both" }}>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-red-100" />
                  <div>
                    <p className="font-display font-semibold text-sm leading-tight">{t.name}</p>
                    <p className="text-[11px] text-primary font-medium mt-0.5">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, s) => (<Star key={s} className="h-3 w-3 text-amber-400" fill="currentColor" />))}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={prevTestimonial} className="w-10 h-10 rounded-full border border-border bg-white hover:border-primary hover:text-primary text-muted-foreground flex items-center justify-center transition-all"><ChevronRight className="h-4 w-4 rotate-180" /></button>
            <div className="flex gap-2">{testimonials.map((_, i) => (<button key={i} onClick={() => setTestimonialIdx(i)} className="w-2 h-2 rounded-full transition-all" style={{ background: i === testimonialIdx % testimonials.length ? "#C1121F" : "#e5e7eb" }} />))}</div>
            <button onClick={nextTestimonial} className="w-10 h-10 rounded-full border border-border bg-white hover:border-primary hover:text-primary text-muted-foreground flex items-center justify-center transition-all"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="text-center mt-10">
            <Link to="/directory" className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-8 py-3.5 text-sm font-semibold hover:bg-primary/90 transition-all hover:-translate-y-0.5">Join the Network <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* ── S4f: How to Join ── */}
      <section className="py-24 bg-background">
        <div className="container-page">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">Simple Process</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ letterSpacing: "-0.02em" }}>How to Join the <span className="text-primary">Alumni Network</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {joinSteps.map((step, i) => (
              <div key={step.title} className="rounded-2xl p-6 border border-transparent flex flex-col gap-4 hover:-translate-y-1 hover:shadow-md transition-all" style={{ background: step.bg, borderColor: step.color + "20" }}>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm border-2 border-white" style={{ background: step.color + "15" }}>{step.emoji}</div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: step.color + "15", color: step.color }}>Step {i + 1}</span>
                </div>
                <h3 className="font-display text-lg font-bold leading-snug" style={{ color: step.color, letterSpacing: "-0.01em" }}>{step.title}</h3>
                <ul className="space-y-2 flex-1">{step.points.map((pt) => (<li key={pt} className="flex items-start gap-2 text-sm text-neutral-600"><span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: step.color }} />{pt}</li>))}</ul>
                {step.hasCta && (<Link to="/auth" className="mt-2 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: step.color }}>Register Now <ArrowRight className="h-4 w-4" /></Link>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: Mentorship CTA ── */}
      <section className="container-page py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">Mentorship Programme</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ letterSpacing: "-0.02em" }}>Give back. Move forward.</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">Whether you're looking for a mentor or ready to become one — the Lincoln network is your launchpad.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative rounded-3xl overflow-hidden p-10 flex flex-col justify-between min-h-72" style={{ background: "linear-gradient(140deg, #0f172a 0%, #1e1b4b 100%)" }}>
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(255,255,255,0.08)" }}><GraduationCap className="h-6 w-6 text-blue-400" /></div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">I'm a Student</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">Connect with alumni in your field, get career guidance, and open doors you didn't know existed.</p>
              <ul className="mt-5 space-y-2">{["1-on-1 career mentoring","CV & interview prep","Industry introductions"].map(t => (<li key={t} className="flex items-center gap-2 text-sm text-white/70"><ChevronRight className="h-3.5 w-3.5 text-blue-400 shrink-0" />{t}</li>))}</ul>
            </div>
            <Link to="/directory" className="mt-8 self-start inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all">Find a Mentor <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="relative rounded-3xl overflow-hidden p-10 flex flex-col justify-between min-h-72" style={{ background: "linear-gradient(140deg, hsl(var(--primary)) 0%, hsl(350 70% 30%) 100%)" }}>
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(255,255,255,0.12)" }}><Heart className="h-6 w-6 text-amber-300" /></div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">I'm an Alumni</h3>
              <p className="text-white/75 text-sm leading-relaxed max-w-xs">Share your journey, shape the next generation, and stay connected to the community that made you.</p>
              <ul className="mt-5 space-y-2">{["Mentor 1 student, change 1 life","Join the speaker network","Access alumni-only events"].map(t => (<li key={t} className="flex items-center gap-2 text-sm text-white/80"><ChevronRight className="h-3.5 w-3.5 text-amber-300 shrink-0" />{t}</li>))}</ul>
            </div>
            <Link to="/contact" className="mt-8 self-start inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-amber-400 transition-all shadow-lg">Become a Mentor <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* ── S6: Upcoming Events ── */}
      <section className="py-24" style={{ background: "hsl(var(--muted))" }}>
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">What's On</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ letterSpacing: "-0.02em" }}>Upcoming Events.</h2>
            </div>
            <Link to="/events" className="group text-sm font-semibold text-primary inline-flex items-center gap-2 hover:gap-3 transition-all">All events <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {upcoming.map((e, idx) => (
              <Link key={e.id} to="/events" className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-elegant transition-all hover:-translate-y-1">
                <div className="relative h-44 flex items-end p-5" style={{ background: idx === 0 ? "linear-gradient(135deg, hsl(350 85% 30%) 0%, hsl(220 40% 20%) 100%)" : idx === 1 ? "linear-gradient(135deg, hsl(220 40% 18%) 0%, hsl(350 60% 25%) 100%)" : "linear-gradient(135deg, hsl(28 85% 35%) 0%, hsl(350 85% 28%) 100%)" }}>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white">
                    <div className="font-display text-3xl font-bold leading-none">{new Date(e.date).getDate()}</div>
                    <div className="text-[10px] uppercase tracking-widest font-semibold opacity-80 mt-0.5">{new Date(e.date).toLocaleString("en", { month: "long", year: "numeric" })}</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors" style={{ letterSpacing: "-0.01em" }}>{e.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 font-medium flex items-center gap-1.5"><MapPin className="h-3 w-3" />{e.location}</p>
                  <div className="mt-4 flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">View details <ArrowRight className="h-3 w-3" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: News & FAQ ── */}
      <section className="container-page py-24">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">Latest</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ letterSpacing: "-0.02em" }}>News & Highlights.</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item, i) => (
            <article key={i} className="group card-premium p-7 flex flex-col gap-4 hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="flex items-center justify-between gap-2">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${item.tagColor}`}><Star className="h-2.5 w-2.5" />{item.tag}</span>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.excerpt}</p>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Newspaper className="h-3 w-3" />{item.readTime}</span>
                <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">Read more <ArrowRight className="h-3 w-3" /></span>
              </div>
            </article>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
          </div>
          <div className="flex gap-2.5 justify-center flex-wrap mb-10">
            {Object.keys(faqData).map((tab) => (
              <button key={tab} onClick={() => { setActiveFaqTab(tab); setOpenFaq(null); }}
                className={`rounded-full px-5 py-2 text-sm font-semibold border transition-all ${activeFaqTab === tab ? "bg-amber-400 border-amber-400 text-black" : "bg-background border-border text-muted-foreground hover:text-foreground"}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {(faqData[activeFaqTab] ?? []).map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden bg-card">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold hover:bg-muted/50 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-primary text-xl leading-none shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 relative overflow-hidden rounded-3xl px-10 md:px-20 py-20 text-center text-white" style={{ background: "var(--gradient-hero)" }}>
          <div className="relative z-10">
            <span className="pill bg-white/15 border border-white/20 text-white mb-5 mx-auto">🎓 Join 25,000+ Alumni</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold max-w-2xl mx-auto mt-4 leading-tight" style={{ letterSpacing: "-0.025em" }}>Your story didn't end at graduation.</h2>
            <p className="mt-5 opacity-80 max-w-lg mx-auto leading-relaxed">Join the Lincoln Alumni Network and unlock a lifetime of connections, opportunities, and impact.</p>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-semibold text-gray-900 hover:bg-amber-400 transition-all shadow-xl hover:-translate-y-0.5 group">
              Become a Member <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}