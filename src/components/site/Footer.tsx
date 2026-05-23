import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="container-page py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-primary font-display font-bold text-xl">L</div>
            <div>
              <div className="font-display font-bold text-lg">LINCOLN</div>
              <div className="text-[10px] tracking-widest uppercase opacity-70">Alumni Network</div>
            </div>
          </div>
          <p className="text-sm opacity-75 leading-relaxed">
            Connecting Lincoln University College graduates across the world — for life, learning, and impact.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Linkedin, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-primary transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/about" className="hover:text-primary">About Alumni</Link></li>
            <li><Link to="/directory" className="hover:text-primary">Directory</Link></li>
            <li><Link to="/events" className="hover:text-primary">Events</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Join Network</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#" className="hover:text-primary">Mentorship Program</a></li>
            <li><a href="#" className="hover:text-primary">Career Services</a></li>
            <li><a href="#" className="hover:text-primary">Give Back</a></li>
            <li><a href="#" className="hover:text-primary">FAQs</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Wisma Lincoln, 12-18 Jalan SS 6/12, Petaling Jaya, Malaysia</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5" /> +60 3-7806 3478</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5" /> alumni@lincoln.edu.my</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-5 text-xs opacity-70 flex flex-col md:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Lincoln University College — Alumni Network. All rights reserved.</p>
          <p>Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
}
