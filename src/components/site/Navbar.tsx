import { Link } from "@tanstack/react-router";
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/directory", label: "Directory" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

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