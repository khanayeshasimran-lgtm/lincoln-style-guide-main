import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Check,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  Users,
  User,
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  ChevronRight,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Join the Network — Lincoln Alumni" },
      {
        name: "description",
        content:
          "Join the Lincoln University College Alumni Network. Alumni get a directory profile. Students and visitors get full access to connect.",
      },
    ],
  }),
});

// ─── Types ───────────────────────────────────────────────────────────────────

type AccountType = "alumni" | "student" | "visitor" | null;
type SubmitState = "idle" | "loading" | "done";

// ─── Floating label input ─────────────────────────────────────────────────────

function Field({
  label,
  type = "text",
  required,
  value,
  onChange,
  validate,
  hint,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  validate?: (v: string) => string | null;
  hint?: string;
}) {
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const error = touched && validate ? validate(value) : null;
  const valid = touched && !error && value.length > 0;
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <div className="relative">
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); setTouched(true); }}
          className={`w-full rounded-xl border bg-white/70 backdrop-blur-sm px-4 pt-5 pb-2 text-sm text-gray-900 outline-none transition-all ${
            error
              ? "border-red-400 ring-2 ring-red-100"
              : focused
              ? "border-primary ring-2 ring-primary/15 bg-white/90"
              : "border-gray-200 hover:border-red-300"
          }`}
          style={{ paddingRight: valid ? "2.5rem" : "1rem" }}
        />
        <label
          className={`pointer-events-none absolute left-4 transition-all text-sm ${
            lifted
              ? "top-1.5 text-[10px] font-bold uppercase tracking-wide " + (error ? "text-red-500" : "text-primary")
              : "top-1/2 -translate-y-1/2 text-gray-400"
          }`}
        >
          {label}
          {required && <span className="text-primary ml-0.5">*</span>}
        </label>
        {valid && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <Check className="h-4 w-4 text-emerald-500" />
          </span>
        )}
      </div>
      {error && <p className="mt-1 ml-1 text-[11px] text-red-500">{error}</p>}
      {hint && !error && <p className="mt-1 ml-1 text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Is membership free?",
    a: "Yes — lifetime alumni membership is complimentary for all Lincoln graduates. Students and visitors can also create a free account to browse and connect.",
  },
  {
    q: "How long does verification take?",
    a: "Alumni verification typically takes 1–2 business days. We cross-check your graduation year and student ID with the university registrar.",
  },
  {
    q: "What's the difference between an alumni and a visitor account?",
    a: "Alumni accounts get a public directory profile card that other members can discover and connect with. Visitor accounts can browse the full site and send connection requests but do not appear in the directory.",
  },
  {
    q: "Can I update my profile later?",
    a: "Absolutely. Alumni members can edit their profile — photo, bio, skills, career updates — at any time from their account dashboard.",
  },
  {
    q: "Is my personal information visible to everyone?",
    a: "Only the information you choose to make public appears on your directory card. Your email and phone are kept private unless you explicitly share them.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-all ${open ? "border-primary/30 bg-primary/[.03]" : "border-border bg-card"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-semibold text-sm">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function Contact() {
  // Step state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  // Form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    gradYear: "",
    program: "",
    studentId: "",
    profession: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Step 1 validation
  const step1Valid = accountType !== null;

  // Step 2 validation (basic)
  const step2Valid =
    form.name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.country.trim().length > 0;

  // Step 3 validation (alumni only)
  const step3Valid =
    accountType !== "alumni" ||
    (form.gradYear.length === 4 && form.program.trim().length > 1);

  const handleSubmit = () => {
    if (submitState !== "idle") return;
    setSubmitState("loading");
    setTimeout(() => setSubmitState("done"), 1800);
  };

  const accountOptions: { type: AccountType; icon: typeof GraduationCap; label: string; sub: string; color: string }[] = [
    {
      type: "alumni",
      icon: GraduationCap,
      label: "Graduate Alumni",
      sub: "I have a degree from Lincoln University College",
      color: "border-primary bg-primary/[.04]",
    },
    {
      type: "student",
      icon: Users,
      label: "Current Student",
      sub: "I'm currently enrolled at Lincoln University College",
      color: "border-blue-400 bg-blue-50",
    },
    {
      type: "visitor",
      icon: User,
      label: "General Visitor",
      sub: "I'm interested in the alumni community or Lincoln University",
      color: "border-gray-300 bg-gray-50",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">

      {/* ── S1: Hero ───────────────────────────────────────── */}
      <section
        id="join-hero"
        className="relative overflow-hidden py-24 md:py-32"
        style={{ background: "linear-gradient(160deg, #7f0d18 0%, #1a0306 60%, #0d0d14 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
        />
        <div className="container-page relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Free Lifetime Membership
          </span>
          <h1
            className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.95]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Become part of the{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Lincoln family.
            </span>
          </h1>
          <p className="mt-6 text-white/65 text-lg leading-relaxed max-w-xl">
            Join the network in minutes. Alumni get a verified directory profile —
            students and visitors get full access to connect.
          </p>

          {/* Progress indicators */}
          <div className="mt-10 flex items-center gap-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    s < step
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : s === step
                      ? "bg-white border-white text-gray-900"
                      : "border-white/25 text-white/40"
                  }`}
                >
                  {s < step ? <Check className="h-3.5 w-3.5" /> : s}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${s === step ? "text-white" : "text-white/40"}`}>
                  {s === 1 ? "Account Type" : s === 2 ? "Your Details" : "Verify & Submit"}
                </span>
                {s < 3 && <div className="w-8 h-px bg-white/20" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S2: Multi-Step Form ────────────────────────────── */}
      <section id="membership-form" className="container-page py-20">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">

          {/* Form */}
          <div
            className="rounded-3xl border border-border bg-white/80 backdrop-blur-sm shadow-elegant overflow-hidden"
            style={{ boxShadow: "0 20px 60px rgba(180,10,30,0.08), 0 8px 24px rgba(0,0,0,0.06)" }}
          >
            {/* Step header */}
            <div className="px-8 pt-8 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                  {step}
                </div>
                <div>
                  <p className="font-display font-bold text-lg">
                    {step === 1 ? "Who are you joining as?" : step === 2 ? "Tell us about yourself" : "Finalise your application"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Step {step} of 3
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-5">
              {/* ── STEP 1: Account type ── */}
              {step === 1 && (
                <div className="space-y-3">
                  {accountOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.type}
                        onClick={() => setAccountType(opt.type)}
                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all hover:-translate-y-0.5 ${
                          accountType === opt.type ? opt.color + " shadow-sm" : "border-border bg-card hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            accountType === opt.type ? "bg-primary" : "bg-muted"
                          }`}
                        >
                          <Icon className={`h-6 w-6 ${accountType === opt.type ? "text-white" : "text-muted-foreground"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{opt.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            accountType === opt.type ? "border-primary bg-primary" : "border-gray-300"
                          }`}
                        >
                          {accountType === opt.type && <Check className="h-3 w-3 text-white" />}
                        </div>
                      </button>
                    );
                  })}

                  {accountType === "alumni" && (
                    <div className="mt-2 rounded-xl bg-amber-50 border border-amber-200 p-4 flex gap-3">
                      <GraduationCap className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 leading-relaxed">
                        <strong>Alumni accounts</strong> are verified against the university registrar (1–2 days).
                        Once approved, your profile card is auto-added to the public Alumni Directory.
                      </p>
                    </div>
                  )}

                  <button
                    disabled={!step1Valid}
                    onClick={() => setStep(2)}
                    className="w-full mt-2 rounded-full bg-primary text-white py-3.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* ── STEP 2: Personal info ── */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Full Name"
                      required
                      value={form.name}
                      onChange={set("name")}
                      validate={(v) => v.trim().length < 2 ? "Enter your full name" : null}
                    />
                    <Field
                      label="Email Address"
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      validate={(v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email" : null}
                    />
                    <Field
                      label="Phone Number"
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                    />
                    <Field
                      label="Country"
                      required
                      value={form.country}
                      onChange={set("country")}
                      validate={(v) => v.trim().length < 2 ? "Required" : null}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 rounded-full border border-border py-3.5 text-sm font-semibold hover:bg-muted transition-colors"
                    >
                      Back
                    </button>
                    <button
                      disabled={!step2Valid}
                      onClick={() => setStep(3)}
                      className="flex-[2] rounded-full bg-primary text-white py-3.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 group"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Finalise ── */}
              {step === 3 && submitState !== "done" && (
                <div className="space-y-4">
                  {/* Alumni-only fields */}
                  {accountType === "alumni" && (
                    <div className="space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Alumni Verification</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field
                          label="Graduation Year"
                          type="number"
                          required
                          value={form.gradYear}
                          onChange={set("gradYear")}
                          validate={(v) => {
                            const n = parseInt(v);
                            return isNaN(n) || n < 1970 || n > 2026 ? "Enter a valid year (1970–2026)" : null;
                          }}
                          hint="Used to verify your alumni status"
                        />
                        <Field
                          label="Program / Faculty"
                          required
                          value={form.program}
                          onChange={set("program")}
                          validate={(v) => v.trim().length < 2 ? "Required" : null}
                        />
                      </div>
                      <Field
                        label="Student ID (for verification)"
                        value={form.studentId}
                        onChange={set("studentId")}
                        hint="Optional but speeds up verification"
                      />
                      <div className="h-px bg-border" />
                    </div>
                  )}

                  <Field
                    label="Current Profession / Role"
                    value={form.profession}
                    onChange={set("profession")}
                  />

                  {/* Textarea */}
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Message (optional) — why you're joining, questions, etc."
                      className="w-full rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm px-4 py-3 text-sm text-gray-900 outline-none resize-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-gray-400"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 rounded-full border border-border py-3.5 text-sm font-semibold hover:bg-muted transition-colors"
                    >
                      Back
                    </button>
                    <button
                      disabled={!step3Valid}
                      onClick={handleSubmit}
                      className="flex-[2] rounded-full bg-primary text-white py-3.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2"
                    >
                      {submitState === "loading" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Success */}
              {submitState === "done" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                    <Check className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">Application Submitted!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                    {accountType === "alumni"
                      ? "We'll verify your alumni status and welcome you within 1–2 business days."
                      : "Your account is ready. Welcome to the Lincoln Alumni Network!"}
                  </p>
                  {accountType !== "alumni" && (
                    <Link
                      to="/directory"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Explore the Directory <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* ── S3: Contact Details ── */}
            <div id="contact-details" className="rounded-2xl bg-primary text-white p-7">
              <h3 className="font-display font-bold text-lg mb-5">Contact the Alumni Office</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start text-sm">
                  <MapPin className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />
                  <span className="text-white/80">
                    Wisma Lincoln, 12-18 Jalan SS 6/12,<br />
                    47301 Petaling Jaya, Selangor, Malaysia
                  </span>
                </li>
                <li className="flex gap-3 items-center text-sm">
                  <Phone className="h-5 w-5 text-amber-300 shrink-0" />
                  <span className="text-white/80">+60 3-7806 3478</span>
                </li>
                <li className="flex gap-3 items-center text-sm">
                  <Mail className="h-5 w-5 text-amber-300 shrink-0" />
                  <span className="text-white/80">alumni@lincoln.edu.my</span>
                </li>
                <li className="flex gap-3 items-center text-sm">
                  <Clock className="h-5 w-5 text-amber-300 shrink-0" />
                  <span className="text-white/80">Mon–Fri, 9:00 AM – 5:30 PM MYT</span>
                </li>
              </ul>
            </div>

            {/* ── S4: Social Links ── */}
            <div id="social-links" className="rounded-2xl border border-border bg-card p-7">
              <h3 className="font-display font-bold text-lg mb-4">Follow the Community</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Linkedin, label: "LinkedIn", sub: "Alumni Group", color: "hover:bg-blue-50 hover:border-blue-300" },
                  { icon: Facebook, label: "Facebook", sub: "Community Page", color: "hover:bg-indigo-50 hover:border-indigo-300" },
                  { icon: Instagram, label: "Instagram", sub: "@lincolnalumni", color: "hover:bg-pink-50 hover:border-pink-300" },
                  { icon: Youtube, label: "YouTube", sub: "Event Recordings", color: "hover:bg-red-50 hover:border-red-300" },
                ].map(({ icon: Icon, label, sub, color }) => (
                  <a
                    key={label}
                    href="#"
                    className={`flex items-center gap-3 p-3 rounded-xl border border-border transition-all group ${color}`}
                  >
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                    <div>
                      <p className="text-xs font-semibold">{label}</p>
                      <p className="text-[10px] text-muted-foreground">{sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="rounded-2xl border border-border bg-card p-7">
              <h3 className="font-display font-bold text-base mb-4">Explore more</h3>
              <div className="space-y-2">
                {[
                  { label: "Browse Alumni Directory", to: "/directory" },
                  { label: "Upcoming Events", to: "/events" },
                  { label: "About the Network", to: "/about" },
                ].map(({ label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group"
                  >
                    <span className="text-sm font-medium">{label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S5: FAQ ────────────────────────────────────────── */}
      <section
        id="faq"
        className="py-24"
        style={{ background: "hsl(var(--muted))" }}
      >
        <div className="container-page max-w-3xl">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
              Common questions
            </span>
            <h2
              className="font-display text-4xl font-bold"
              style={{ letterSpacing: "-0.02em" }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── S6: Map Integration ────────────────────────────── */}
      <section id="find-us" className="container-page py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary block mb-3">
              Find Us
            </span>
            <h2
              className="font-display text-3xl md:text-4xl font-bold mb-5"
              style={{ letterSpacing: "-0.02em" }}
            >
              Visit the alumni office.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our alumni office is located at Wisma Lincoln in Petaling Jaya, Selangor.
              Drop in during office hours or reach us online — we're always happy to help.
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { icon: MapPin, text: "Wisma Lincoln, 12-18 Jalan SS 6/12, 47301 Petaling Jaya, Selangor" },
                { icon: Phone, text: "+60 3-7806 3478" },
                { icon: Clock, text: "Monday – Friday, 9:00 AM – 5:30 PM MYT" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground pt-1">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map placeholder */}
          <div
            className="rounded-3xl overflow-hidden border border-border h-72 lg:h-96 relative flex items-center justify-center"
            style={{ background: "linear-gradient(145deg, #e5e7eb, #f3f4f6)" }}
          >
            <iframe
              title="Lincoln University College Location"
              src="https://maps.google.com/maps?q=Lincoln+University+College+Petaling+Jaya&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ── S7: Final CTA ─────────────────────────────────── */}
      <section
        id="join-cta"
        className="py-24"
        style={{ background: "#0F1420" }}
      >
        <div className="container-page text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400 block mb-4">
            Still thinking?
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-bold text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            Your network is waiting.
          </h2>
          <p className="mt-5 text-white/55 leading-relaxed">
            25,000+ graduates. 85 countries. Zero cost. Join the Lincoln Alumni Network
            and stay connected — forever.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-semibold text-gray-900 hover:bg-amber-400 transition-all shadow-xl hover:-translate-y-0.5"
            >
              Create Your Account
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/directory"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all"
            >
              Browse Directory First
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}