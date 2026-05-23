import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Check, ChevronDown, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Join the Network — Lincoln Alumni" },
      {
        name: "description",
        content:
          "Join the Lincoln University College Alumni Network. Fill the membership form to get started.",
      },
    ],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const faqs = [
    {
      q: "Is membership free?",
      a: "Yes — lifetime alumni membership is complimentary for all Lincoln University College graduates. There are no hidden fees.",
    },
    {
      q: "How long does verification take?",
      a: "Typically 1–2 business days after we cross-check your details with the university registrar.",
    },
    {
      q: "Can I update my profile later?",
      a: "Absolutely. Members can edit their directory profile, update contact details, and manage visibility settings at any time.",
    },
    {
      q: "Do I need to be a recent graduate to join?",
      a: "Not at all. Our network welcomes every graduate — from our 2002 founding cohort to the latest batch.",
    },
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
          className="absolute right-0 bottom-0 w-[400px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at bottom right, rgba(245,158,11,.12) 0%, transparent 60%)",
          }}
        />

        <div className="container-page relative z-10">
          <span className="pill bg-white/10 border border-white/20 text-white mb-5">
            Join Us
          </span>
          <h1
            className="font-display text-6xl md:text-7xl font-bold text-white max-w-3xl leading-[0.95]"
            style={{ letterSpacing: "-0.025em" }}
          >
            Become part of the{" "}
            <em
              className="not-italic"
              style={{
                background: "linear-gradient(90deg, #f59e0b, #fcd34d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Lincoln family.
            </em>
          </h1>
          <p className="mt-5 text-white/70 max-w-lg leading-relaxed">
            Join 25,000+ graduates worldwide. It takes less than two minutes.
          </p>

          {/* Benefits pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {["Free lifetime membership", "Global directory access", "Events & networking", "Career resources"].map((b) => (
              <span
                key={b}
                className="pill bg-white/10 border border-white/15 text-white/80 text-[11px]"
              >
                ✓ {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ────────────────────────────────── */}
      <section className="container-page py-16 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        {/* Form */}
        <div className="bg-card border border-border rounded-2xl shadow-elegant overflow-hidden">
          {/* Form header */}
          <div className="px-8 pt-8 pb-6 border-b border-border">
            <h2
              className="font-display text-2xl font-bold"
              style={{ letterSpacing: "-0.01em" }}
            >
              Membership Application
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              All fields marked <span className="text-primary font-semibold">*</span> are required.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="p-8 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Full Name" required />
              <Field label="Email Address" type="email" required />
              <Field label="Graduation Year" type="number" required placeholder="e.g. 2018" />
              <Field label="Program / Department" required placeholder="e.g. Medicine, Business" />
            </div>
            <Field label="Current Job Title & Company" placeholder="e.g. Software Engineer at Google" />
            <Field label="Current Location" placeholder="City, Country" />

            <div>
              <label className="block text-sm font-semibold mb-2">
                Message{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                rows={4}
                placeholder="Tell us a bit about yourself, or how you'd like to engage with the network…"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/25 transition resize-none placeholder:text-muted-foreground"
              />
            </div>

            {sent ? (
              <div className="flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-5 py-4">
                <div className="w-8 h-8 rounded-full bg-green-500 grid place-items-center shrink-0">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-800 text-sm">
                    Application submitted!
                  </p>
                  <p className="text-green-700 text-xs mt-0.5">
                    We'll verify your details and be in touch within 2 business days.
                  </p>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full rounded-xl bg-primary text-white py-4 font-semibold hover:bg-primary-hover transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                Submit Application
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-5 lg:sticky lg:top-6">
          {/* Contact card */}
          <div
            className="rounded-2xl p-7 text-white"
            style={{ background: "var(--gradient-hero)" }}
          >
            <h3
              className="font-display text-xl font-semibold mb-5"
              style={{ letterSpacing: "-0.01em" }}
            >
              Contact the Alumni Office
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                <span className="text-white/80 leading-snug">
                  Wisma Lincoln, 12-18 Jalan SS 6/12,<br />
                  47301 Petaling Jaya, Selangor, Malaysia
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                <a href="tel:+60378063478" className="text-white/80 hover:text-white transition-colors">
                  +60 3-7806 3478
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                <a
                  href="mailto:alumni@lincoln.edu.my"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  alumni@lincoln.edu.my
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-5 border-t border-white/15 text-xs text-white/50">
              Office hours: Mon–Fri, 9 AM – 5 PM MYT
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-7 py-5 border-b border-border">
              <h3
                className="font-display text-xl font-semibold"
                style={{ letterSpacing: "-0.01em" }}
              >
                Frequently Asked
              </h3>
            </div>
            <div className="divide-y divide-border">
              {faqs.map((f) => (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(open === f.q ? null : f.q)}
                    className="w-full flex items-center justify-between gap-4 px-7 py-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm font-semibold text-foreground">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                        open === f.q ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open === f.q && (
                    <div className="px-7 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/25 transition placeholder:text-muted-foreground"
      />
    </div>
  );
}