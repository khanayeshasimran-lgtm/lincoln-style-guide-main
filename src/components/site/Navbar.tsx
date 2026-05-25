import { Link } from "@tanstack/react-router";
import { Menu, X, Search, ChevronDown, Calendar, Users, Wifi, Building2, Network, Briefcase, ImageIcon, Image } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const eventsDropdownSections = [
  {
    icon: Calendar,
    label: "Featured Event",
    sub: "Global Alumni Reunion 2026",
    anchor: "#featured",
  },
  {
    icon: Wifi,
    label: "Online Events",
    sub: "Webinars & virtual sessions",
    anchor: "#events-grid",
  },
  {
    icon: Building2,
    label: "In-Person Events",
    sub: "Reunions, galas & mixers",
    anchor: "#events-grid",
  },
  {
    icon: Network,
    label: "Networking Nights",
    sub: "Connect with alumni in your city",
    anchor: "#events-grid",
  },
  {
    icon: Briefcase,
    label: "Career Events",
    sub: "Panels, hackathons & workshops",
    anchor: "#events-grid",
  },
  {
    icon: Image,
    label: "Past Events Gallery",
    sub: "Photos & video highlights",
    anchor: "#past-gallery",
  },
  {
    icon: Users,
    label: "Host an Event",
    sub: "Submit your event proposal",
    anchor: "#host-event",
  },
];

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/directory", label: "Directory" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

function EventsDropdown({ isMobile = false }: { isMobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (isMobile) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-3 py-3 rounded-md text-sm font-semibold hover:bg-muted"
        >
          Events
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="ml-3 mt-1 mb-2 border-l-2 border-primary/20 pl-3 space-y-1">
            {eventsDropdownSections.map((s) => (
              <Link
                key={s.label}
                to="/events"
                hash={s.anchor.replace("#", "")}
                className="flex items-start gap-2.5 px-2 py-2 rounded-md hover:bg-muted group"
              >
                <s.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-foreground leading-tight">{s.label}</div>
                  <div className="text-[11px] text-muted-foreground leading-snug">{s.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors rounded-md
          ${open ? "text-primary" : "text-foreground hover:text-primary"}`}
      >
        Events
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl border border-border bg-background shadow-xl z-50 overflow-hidden"
          style={{ boxShadow: "0 20px 48px -8px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08)" }}
        >
          {/* Header accent */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(28 80% 50%))" }} />

          <div className="p-2">
            {eventsDropdownSections.map((s, i) => (
              <Link
                key={s.label}
                to="/events"
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 group transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{s.sub}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-border bg-muted/30">
            <Link
              to="/events"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              View all events →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="container-page flex h-9 items-center justify-between">
          <div className="hidden md:flex items-center gap-x-4 divide-x divide-white/30">
            <span className="pr-4">Scholarships</span>
            <Link to="/directory" className="px-4 hover:underline">Find Alumni</Link>
            <Link to="/events" className="px-4 hover:underline">Events</Link>
            <Link to="/contact" className="px-4 hover:underline">Join Network</Link>
            <span className="pl-4 opacity-90">alumni@lincoln.edu.my</span>
          </div>
          <div className="md:hidden">Lincoln Alumni Network</div>
          <button aria-label="Search" className="p-1 hover:bg-white/10 rounded">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-background border-b border-border shadow-sm">
        <div className="container-page flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-primary text-primary-foreground font-display font-bold text-xl shadow-card">
              L
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-foreground text-lg">LINCOLN</div>
              <div className="text-[10px] tracking-widest text-muted-foreground uppercase">Alumni Network</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "text-primary" }}
                className="px-4 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* Events dropdown sits between Directory and Gallery in the visual order */}
            {/* We render it inline here via insertion order — reorder navItems above if needed */}
            <EventsDropdown />

            <Link
              to="/auth"
              className="px-4 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              Sign In
            </Link>

            <Link
              to="/contact"
              className="ml-3 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card hover:bg-primary-hover transition-all"
            >
              Join Network
            </Link>
          </nav>

          <button
            className="lg:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="container-page py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "bg-primary-light text-primary" }}
                  className="px-3 py-3 rounded-md text-sm font-semibold hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}

              <EventsDropdown isMobile />

              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-md text-sm font-semibold hover:bg-muted"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}