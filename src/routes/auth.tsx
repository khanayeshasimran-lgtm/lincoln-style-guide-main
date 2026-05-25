import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  GraduationCap,
  Users,
  User,
  ShieldCheck,
  ChevronLeft,
  Lock,
  Mail,
  Clock,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-alumni.jpg";

export const Route = createFileRoute("/auth")({
  component: Auth,
  head: () => ({
    meta: [
      { title: "Sign In — Lincoln Alumni Network" },
      {
        name: "description",
        content:
          "Log in or create your Lincoln Alumni Network account. Alumni, students, and visitors welcome.",
      },
    ],
  }),
});

type Tab = "login" | "signup";
type AccountType = "alumni" | "student" | "visitor" | null;
type SignupStep = 1 | 2 | 3;
type SubmitState = "idle" | "loading" | "done" | "pending";

function FloatField({
  label, type = "text", value, onChange, icon: Icon, required, hint, validate,
}: {
  label: string; type?: string; value: string; onChange: (v: string) => void;
  icon?: React.ComponentType<{ className?: string }>; required?: boolean;
  hint?: string; validate?: (v: string) => string | null;
}) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPw ? "text" : "password") : type;
  const lifted = focused || value.length > 0;
  const error = touched && validate ? validate(value) : null;
  const valid = touched && !error && value.length > 0;

  return (
    <div>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className={`h-4 w-4 transition-colors ${focused ? "text-primary" : "text-gray-400"}`} />
          </div>
        )}
        <input
          type={inputType} value={value} required={required}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); setTouched(true); }}
          className={`w-full rounded-xl border bg-white text-sm text-gray-900 outline-none transition-all
            ${Icon ? "pl-11" : "pl-4"} ${isPassword ? "pr-11" : valid ? "pr-10" : "pr-4"} pt-6 pb-2.5
            ${error ? "border-red-400 ring-2 ring-red-100" : focused ? "border-primary ring-2 ring-primary/15" : "border-gray-200 hover:border-gray-300"}`}
        />
        <label className={`pointer-events-none absolute transition-all text-sm ${Icon ? "left-11" : "left-4"}
          ${lifted ? `top-2 text-[10px] font-bold uppercase tracking-wide ${error ? "text-red-500" : focused ? "text-primary" : "text-gray-400"}` : "top-1/2 -translate-y-1/2 text-gray-400"}`}>
          {label}{required && <span className="text-primary ml-0.5">*</span>}
        </label>
        {isPassword && (
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
        {valid && !isPassword && <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />}
      </div>
      {error && <p className="mt-1.5 ml-1 text-[11px] text-red-500">{error}</p>}
      {hint && !error && <p className="mt-1.5 ml-1 text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}

function StepIndicator({ step, total }: { step: SignupStep; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
            ${s < step ? "bg-emerald-500 text-white" : s === step ? "bg-primary text-white ring-4 ring-primary/20" : "bg-gray-100 text-gray-400"}`}>
            {s < step ? <Check className="h-3.5 w-3.5" /> : s}
          </div>
          {s < total && <div className={`h-0.5 w-8 rounded-full transition-all ${s < step ? "bg-emerald-500" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  );
}

function Auth() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("login");
  const [step, setStep] = useState<SignupStep>(1);
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", gradYear: "", program: "", studentId: "" });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const emailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Enter a valid email address";
  const passwordValid = (v: string) => v.length >= 8 ? null : "Password must be at least 8 characters";

  const step1Valid = accountType !== null;
  const step2Valid = form.name.trim().length > 1 && !emailValid(form.email) && form.country.trim().length > 0;
  const step3Valid = accountType !== "alumni" || (form.gradYear.length === 4 && form.program.trim().length > 1);
  const loginValid = !emailValid(loginEmail) && loginPassword.length >= 8;

  const handleLoginSubmit = () => {
    if (!loginValid || submitState !== "idle") return;
    setSubmitState("loading");
    setTimeout(() => { setSubmitState("done"); setTimeout(() => navigate({ to: "/" }), 1200); }, 1500);
  };

  const handleSignupSubmit = () => {
    if (!agreedToTerms || submitState !== "idle") return;
    setSubmitState("loading");
    setTimeout(() => { setSubmitState(accountType === "alumni" ? "pending" : "done"); }, 1800);
  };

  const accountOptions = [
    { type: "alumni" as AccountType, icon: GraduationCap, label: "Graduate Alumni", sub: "I have a degree from Lincoln University College" },
    { type: "student" as AccountType, icon: Users, label: "Current Student", sub: "I'm currently enrolled at Lincoln University College" },
    { type: "visitor" as AccountType, icon: User, label: "General Visitor", sub: "I'm interested in the alumni community" },
  ];

  const COUNTRIES = ["Malaysia","Singapore","India","Indonesia","Philippines","Vietnam","Thailand","Nigeria","Ghana","UK","UAE","USA","Australia","Other"];
  const PROGRAMS = ["Medicine","Nursing","Pharmacy","Computer Science","Information Technology","Business Administration","Finance","Law","Engineering","Architecture","Psychology","Data Science","Marketing","Biotechnology","Other"];

  const OAuthButtons = () => (
    <div className="grid grid-cols-2 gap-3">
      {[
        { p: "Google", i: "G", cls: "border-gray-200 hover:border-gray-300 text-gray-700 bg-white" },
        { p: "LinkedIn", i: "in", cls: "border-blue-200 hover:border-blue-300 text-blue-700 bg-blue-50/60" },
      ].map(({ p, i, cls }) => (
        <button key={p} className={`flex items-center justify-center gap-2 w-full rounded-xl border py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-sm ${cls}`}>
          <span className="w-5 h-5 rounded text-[11px] font-black bg-current/10 flex items-center justify-center leading-none">{i}</span>
          {p}
        </button>
      ))}
    </div>
  );

  const Divider = () => (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-gray-100" />
      <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">or continue with email</span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover object-center scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Body — matches about page max-w-7xl + px-4 sm:px-6 lg:px-8 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 min-h-[calc(100vh-74px)] flex items-center">
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 lg:gap-20">

          {/* LEFT — Content */}
          <div className="lg:max-w-[520px]" style={{ animation: "fadeUp 600ms ease-out both" }}>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] bg-white/10 border border-white/15 text-white/75 px-3.5 py-1.5 rounded-full mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Lincoln University College Malaysia
            </span>

            <h1 className="font-display font-black text-white leading-[0.95] mb-6"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.4rem)", letterSpacing: "-0.03em" }}>
              Stay Connected.<br />
              <span style={{ background: "linear-gradient(90deg,#f59e0b,#ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Stay Alumni.
              </span>
            </h1>

            <p className="text-white/55 text-base leading-relaxed max-w-sm mb-10">
              Join <strong className="text-white/90">25,000+</strong> Lincoln graduates connected across <strong className="text-white/90">85 countries</strong>. Reconnect, mentor, and grow — for life.
            </p>

            <ul className="space-y-4 mb-12">
              {[
                "Connect with 25,000+ verified alumni worldwide",
                "Access 1,200+ mentors across 40+ industries",
                "Exclusive events, webinars & networking nights",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3.5 text-sm text-white/75">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/35 flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 text-emerald-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-4 max-w-sm">
              {[
                { label: "Alumni Network", value: "25,000+ · 85 Countries" },
                { label: "Next Event", value: "Annual Gala · 14 Jun 2026" },
              ].map((box) => (
                <div key={box.label} className="rounded-xl border border-white/12 p-5 backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.07)" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1.5">{box.label}</p>
                  <p className="text-xs font-semibold text-white/90 leading-snug">{box.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Wider floating card */}
          <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0" style={{ animation: "fadeUp 600ms ease-out 180ms both" }}>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Gradient top stripe */}
              <div className="h-1" style={{ background: "linear-gradient(90deg, #C1121F 0%, #f59e0b 100%)" }} />

              <div className="p-8 lg:p-10 max-h-[calc(100vh-120px)] overflow-y-auto">

                {/* Tab switcher */}
                {(submitState === "idle" || submitState === "loading") && !(tab === "signup" && step > 1) && (
                  <div className="flex rounded-xl bg-gray-100 p-1 mb-8">
                    {(["login", "signup"] as Tab[]).map((t) => (
                      <button key={t}
                        onClick={() => { setTab(t); setStep(1); setSubmitState("idle"); }}
                        className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all
                          ${tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                        {t === "login" ? "Sign In" : "Create Account"}
                      </button>
                    ))}
                  </div>
                )}

                {/* ── LOGIN ── */}
                {tab === "login" && submitState !== "done" && (
                  <div style={{ animation: "authFade 300ms ease-out both" }}>
                    <h2 className="font-display text-2xl font-bold text-gray-900 mb-1" style={{ letterSpacing: "-0.02em" }}>Welcome back.</h2>
                    <p className="text-gray-400 text-sm mb-6">Sign in to your alumni account.</p>

                    <OAuthButtons />
                    <Divider />

                    <div className="space-y-4">
                      <FloatField label="Email Address" type="email" value={loginEmail} onChange={setLoginEmail} icon={Mail} required validate={emailValid} />
                      <FloatField label="Password" type="password" value={loginPassword} onChange={setLoginPassword} icon={Lock} required validate={passwordValid} />

                      <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div onClick={() => setRememberMe(!rememberMe)}
                            className={`w-4 h-4 rounded border transition-all flex items-center justify-center cursor-pointer ${rememberMe ? "bg-primary border-primary" : "border-gray-300 group-hover:border-primary/50"}`}>
                            {rememberMe && <Check className="h-2.5 w-2.5 text-white" />}
                          </div>
                          <span className="text-xs text-gray-500">Remember me</span>
                        </label>
                        <button onClick={() => setForgotSent(true)} className="text-xs font-semibold text-primary hover:underline">
                          Forgot password?
                        </button>
                      </div>

                      {forgotSent && (
                        <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                          <Check className="h-3.5 w-3.5 shrink-0" />Reset link sent — check your email.
                        </div>
                      )}

                      <button onClick={handleLoginSubmit} disabled={!loginValid || submitState !== "idle"}
                        className="w-full rounded-xl bg-primary text-white py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                        {submitState === "loading" ? (
                          <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Signing in…</>
                        ) : (<>Sign In <ArrowRight className="h-4 w-4" /></>)}
                      </button>
                    </div>

                    <p className="mt-6 text-center text-xs text-gray-400">
                      No account?{" "}
                      <button onClick={() => setTab("signup")} className="font-semibold text-primary hover:underline">Create one free</button>
                    </p>
                  </div>
                )}

                {/* ── LOGIN SUCCESS ── */}
                {tab === "login" && submitState === "done" && (
                  <div className="text-center py-10" style={{ animation: "authFade 300ms ease-out both" }}>
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                      <Check className="h-7 w-7 text-emerald-500" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
                    <p className="text-gray-500 text-sm">Redirecting you to the network…</p>
                  </div>
                )}

                {/* ── SIGNUP STEP 1 ── */}
                {tab === "signup" && step === 1 && submitState !== "done" && submitState !== "pending" && (
                  <div style={{ animation: "authFade 300ms ease-out both" }}>
                    <h2 className="font-display text-2xl font-bold text-gray-900 mb-1" style={{ letterSpacing: "-0.02em" }}>Join the network.</h2>
                    <p className="text-gray-400 text-sm mb-6">Choose your account type to get started.</p>

                    <OAuthButtons />
                    <Divider />

                    <div className="space-y-3 mb-6">
                      {accountOptions.map((opt) => (
                        <button key={opt.type} onClick={() => setAccountType(opt.type)}
                          className={`w-full text-left rounded-xl border-2 p-4 transition-all hover:-translate-y-0.5 ${accountType === opt.type ? "border-primary bg-primary/5 shadow-sm" : "border-gray-200 bg-white hover:border-primary/30"}`}>
                          <div className="flex items-start gap-3.5">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${accountType === opt.type ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}>
                              <opt.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-gray-900">{opt.label}</span>
                                {accountType === opt.type && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{opt.sub}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <button onClick={() => step1Valid && setStep(2)} disabled={!step1Valid}
                      className="w-full rounded-xl bg-primary text-white py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                      Continue <ArrowRight className="h-4 w-4" />
                    </button>

                    <p className="mt-5 text-center text-xs text-gray-400">
                      Already have an account?{" "}
                      <button onClick={() => setTab("login")} className="font-semibold text-primary hover:underline">Sign in</button>
                    </p>
                  </div>
                )}

                {/* ── SIGNUP STEP 2 ── */}
                {tab === "signup" && step === 2 && submitState !== "done" && submitState !== "pending" && (
                  <div style={{ animation: "authFade 300ms ease-out both" }}>
                    <button onClick={() => setStep(1)} className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors mb-5">
                      <ChevronLeft className="h-3.5 w-3.5" /> Back
                    </button>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="font-display text-2xl font-bold text-gray-900" style={{ letterSpacing: "-0.02em" }}>Personal info.</h2>
                        <p className="text-gray-400 text-xs mt-1">{accountType === "alumni" ? "Step 2 of 3" : "Step 2 of 2"} — Your details</p>
                      </div>
                      <StepIndicator step={2} total={accountType === "alumni" ? 3 : 2} />
                    </div>
                    <div className="space-y-4 mb-6">
                      <FloatField label="Full Name" value={form.name} onChange={set("name")} icon={User} required validate={(v) => v.trim().length > 1 ? null : "Enter your full name"} />
                      <FloatField label="Email Address" type="email" value={form.email} onChange={set("email")} icon={Mail} required validate={emailValid} />
                      <FloatField label="Phone Number (optional)" type="tel" value={form.phone} onChange={set("phone")} />
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Country <span className="text-primary">*</span></label>
                        <select value={form.country} onChange={(e) => set("country")(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all">
                          <option value="">Select your country</option>
                          {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() => { if (!step2Valid) return; if (accountType === "alumni") { setStep(3); } else { handleSignupSubmit(); } }}
                      disabled={!step2Valid || submitState === "loading"}
                      className="w-full rounded-xl bg-primary text-white py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                      {submitState === "loading" ? (
                        <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Creating account…</>
                      ) : accountType === "alumni" ? (<>Continue <ArrowRight className="h-4 w-4" /></>) : (<>Create Account <ArrowRight className="h-4 w-4" /></>)}
                    </button>
                    {accountType !== "alumni" && (
                      <div className="mt-5">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <div onClick={() => setAgreedToTerms(!agreedToTerms)}
                            className={`mt-0.5 w-4 h-4 rounded border transition-all flex items-center justify-center shrink-0 cursor-pointer ${agreedToTerms ? "bg-primary border-primary" : "border-gray-300 hover:border-primary/50"}`}>
                            {agreedToTerms && <Check className="h-2.5 w-2.5 text-white" />}
                          </div>
                          <span className="text-xs text-gray-500 leading-relaxed">
                            I agree to the <Link to="/" className="text-primary hover:underline font-semibold">Terms</Link> and <Link to="/" className="text-primary hover:underline font-semibold">Privacy Policy</Link>.
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                )}

                {/* ── SIGNUP STEP 3 ── */}
                {tab === "signup" && step === 3 && submitState !== "done" && submitState !== "pending" && (
                  <div style={{ animation: "authFade 300ms ease-out both" }}>
                    <button onClick={() => setStep(2)} className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors mb-5">
                      <ChevronLeft className="h-3.5 w-3.5" /> Back
                    </button>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="font-display text-2xl font-bold text-gray-900" style={{ letterSpacing: "-0.02em" }}>Alumni details.</h2>
                        <p className="text-gray-400 text-xs mt-1">Step 3 of 3 — Verification</p>
                      </div>
                      <StepIndicator step={3} total={3} />
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4 mb-6">
                      <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700 leading-relaxed">Alumni accounts are verified against the Lincoln University College registrar — typically 1–2 business days.</p>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Graduation Year <span className="text-primary">*</span></label>
                        <select value={form.gradYear} onChange={(e) => set("gradYear")(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all">
                          <option value="">Select graduation year</option>
                          {Array.from({ length: 24 }, (_, i) => 2024 - i).map((y) => <option key={y} value={String(y)}>{y}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Programme / Faculty <span className="text-primary">*</span></label>
                        <select value={form.program} onChange={(e) => set("program")(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all">
                          <option value="">Select your programme</option>
                          {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <FloatField label="Student ID (optional — speeds verification)" value={form.studentId} onChange={set("studentId")} icon={ShieldCheck} hint="From your transcript or student card" />
                    </div>
                    <div className="mb-6">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <div onClick={() => setAgreedToTerms(!agreedToTerms)}
                          className={`mt-0.5 w-4 h-4 rounded border transition-all flex items-center justify-center shrink-0 cursor-pointer ${agreedToTerms ? "bg-primary border-primary" : "border-gray-300 hover:border-primary/50"}`}>
                          {agreedToTerms && <Check className="h-2.5 w-2.5 text-white" />}
                        </div>
                        <span className="text-xs text-gray-500 leading-relaxed">
                          I agree to the <Link to="/" className="text-primary hover:underline font-semibold">Terms</Link> and <Link to="/" className="text-primary hover:underline font-semibold">Privacy Policy</Link>. I confirm these details are accurate.
                        </span>
                      </label>
                    </div>
                    <button onClick={handleSignupSubmit} disabled={!step3Valid || !agreedToTerms || submitState === "loading"}
                      className="w-full rounded-xl bg-primary text-white py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                      {submitState === "loading" ? (
                        <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Submitting…</>
                      ) : (<><ShieldCheck className="h-4 w-4" />Submit for Verification</>)}
                    </button>
                  </div>
                )}

                {/* ── PENDING ── */}
                {submitState === "pending" && (
                  <div className="text-center py-6" style={{ animation: "authFade 300ms ease-out both" }}>
                    <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5">
                      <Clock className="h-7 w-7 text-amber-500" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 mb-4">
                      Pending Verification
                    </span>
                    <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Application received!</h2>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto mb-7">
                      Your details are being cross-checked with the Lincoln registrar. Expect a confirmation email within <strong>1–2 business days</strong>.
                    </p>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-left mb-6 space-y-3">
                      {[
                        { n: "1", t: "Admin reviews your graduation year & Student ID" },
                        { n: "2", t: "Cross-checked with university registrar" },
                        { n: "3", t: "Approved → your alumni directory card goes live" },
                        { n: "4", t: "You'll receive an email with login access" },
                      ].map((s) => (
                        <div key={s.n} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{s.n}</div>
                          <span className="text-xs text-gray-600">{s.t}</span>
                        </div>
                      ))}
                    </div>
                    <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-all">
                      Browse the Network <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}

                {/* ── DONE ── */}
                {submitState === "done" && tab === "signup" && (
                  <div className="text-center py-6" style={{ animation: "authFade 300ms ease-out both" }}>
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                      <Sparkles className="h-7 w-7 text-emerald-500" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">You're in!</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-7 max-w-xs mx-auto">
                      Your account is active. Start exploring the network, browse events, and discover mentors.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Link to="/directory" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-all">
                        Browse Directory <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                        Go Home
                      </Link>
                    </div>
                  </div>
                )}

                {/* Security note */}
                {(submitState === "idle" || submitState === "loading") && (
                  <p className="mt-6 text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="h-3 w-3" />
                    Your information is 100% secure with us.
                  </p>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes authFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}