import type { Alumni } from "@/data/alumni";
import { Briefcase, MapPin, GraduationCap, Linkedin } from "lucide-react";

export function AlumniCard({ a }: { a: Alumni }) {
  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-elegant transition-all hover:-translate-y-1">
      <div className="h-20 bg-gradient-to-r from-primary to-primary-hover relative">
        <div className="absolute -bottom-10 left-6">
          <img
            src={a.avatar}
            alt={a.name}
            loading="lazy"
            className="h-20 w-20 rounded-full border-4 border-card object-cover"
          />
        </div>
      </div>
      <div className="pt-12 px-6 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">{a.name}</h3>
            <p className="text-sm text-muted-foreground">{a.role}</p>
          </div>
          {a.linkedin && (
            <a href={a.linkedin} className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>
        <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
          <p className="flex items-center gap-2"><Briefcase className="h-3.5 w-3.5" /> {a.company} · {a.industry}</p>
          <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {a.country}</p>
          <p className="flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5" /> Class of {a.year} · {a.department}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {a.skills.slice(0, 3).map((s) => (
            <span key={s} className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-primary-light text-primary">{s}</span>
          ))}
        </div>
        <button className="mt-5 w-full py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-primary transition-colors">
          Connect
        </button>
      </div>
    </div>
  );
}
