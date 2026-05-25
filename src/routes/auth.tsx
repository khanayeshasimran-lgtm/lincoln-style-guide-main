import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  GraduationCap,
  Users,
  User,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Lock,
  Mail,
  Clock,
  AlertCircle,
  Sparkles,
} from "lucide-react";

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

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Tab = "login" | "signup";
type AccountType = "alumni" | "student" | "visitor" | null;
type SignupStep = 1 | 2 | 3;
type SubmitState = "idle" | "loading" | "done" | "pending";

// ─── FLOATING LABEL INPUT ─────────────────────────────────────────────────────

function FloatField({
  label,
  type = "text",
  value,
  onChange,
  icon: Icon,
  required,
  hint,
  validate,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ComponentType<{ className?: string }>;
  required?: boolean;
  hint?: string;
  validate?: (v: string) => string | null;
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
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon className={`h-4 w-4 transition-colors ${focused ? "text-primary" : "text-muted-foreground"}`} />
          </div>
        )}
        <input
          type={inputType}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); setTouched(true); }}
          className={`w-full rounded-xl border bg-background/70 text-sm text-foreground outline-none transition-all
            ${Icon ? "pl-10" : "pl-4"}
            ${isPassword ? "pr-10" : valid ? "pr-9" : "pr-4"}
            pt-5 pb-2
            ${error
              ? "border-red-400 ring-2 ring-red-100"
              : focused
              ? "border-primary ring-2 ring-primary/10"
              : "border-border hover:border-primary/30"
            }`}
        />
        <label
          className={`pointer-events-none absolute transition-all text-sm
            ${Icon ? "left-10" : "left-4"}
            ${lifted
              ? `top-1.5 text-[10px] font-bold uppercase tracking-wide ${error ? "text-red-500" : focused ? "text-primary" : "text-muted-foreground"}`
              : "top-1/2 -translate-y-1/2 text-muted-foreground"
            }`}
        >
          {label}
          {required && <span className="text-primary ml-0.5">*</span>}
        </label>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
        {valid && !isPassword && (
          <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
        )}
      </div>
      {error && <p className="mt-1 ml-1 text-[11px] text-red-500">{error}</p>}
      {hint && !error && <p className="mt-1 ml-1 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

// ─── STEP INDICATOR ──────────────────────────────────────────────────────────

function StepIndicator({ step, total }: { step: SignupStep; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
              ${s < step ? "bg-emerald-500 text-white" : s === step ? "bg-primary text-white ring-4 ring-primary/20" : "bg-muted text-muted-foreground"}`}
          >
            {s < step ? <Check className="h-3.5 w-3.5" /> : s}
          </div>
          {s < total && (
            <div className={`h-0.5 w-8 rounded-full transition-all ${s < step ? "bg-emerald-500" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── ACCOUNT TYPE CARD ───────────────────────────────────────────────────────

function AccountTypeCard({
  type, icon: Icon, label, sub, color, selected, onClick,
}: {
  type: AccountType; icon: React.ComponentType<{ className?: string }>; label: string; sub: string; color: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl border-2 p-5 transition-all hover:-translate-y-0.5
        ${selected ? `${color} shadow-md` : "border-border bg-card hover:border-primary/30 hover:shadow-elegant"}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selected ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{label}</span>
            {selected && <Check className="h-4 w-4 text-primary shrink-0" />}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{sub}</p>
        </div>
      </div>
    </button>
  );
}

// ─── OAUTH BUTTON ────────────────────────────────────────────────────────────

function OAuthButton({ provider, icon, color }: { provider: string; icon: string; color: string }) {
  return (
    <button
      className={`flex items-center justify-center gap-2.5 w-full rounded-xl border py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md ${color}`}
    >
      <span className="text-lg leading-none">{icon}</span>
      Continue with {provider}
    </button>
  );
}

// ─── AUTH PAGE ───────────────────────────────────────────────────────────────

function Auth() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("login");
  const [step, setStep] = useState<SignupStep>(1);
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  // Signup fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    gradYear: "",
    program: "",
    studentId: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Validation helpers
  const emailValid = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Enter a valid email address";
  const passwordValid = (v: string) =>
    v.length >= 8 ? null : "Password must be at least 8 characters";

  const step1Valid = accountType !== null;
  const step2Valid =
    form.name.trim().length > 1 &&
    !emailValid(form.email) &&
    form.country.trim().length > 0;
  const step3Valid =
    accountType !== "alumni" ||
    (form.gradYear.length === 4 && form.program.trim().length > 1);
  const loginValid = !emailValid(loginEmail) && loginPassword.length >= 8;

  const handleLoginSubmit = () => {
    if (!loginValid || submitState !== "idle") return;
    setSubmitState("loading");
    setTimeout(() => {
      setSubmitState("done");
      setTimeout(() => navigate({ to: "/" }), 1200);
    }, 1500);
  };

  const handleSignupSubmit = () => {
    if (!agreedToTerms || submitState !== "idle") return;
    setSubmitState("loading");
    setTimeout(() => {
      setSubmitState(accountType === "alumni" ? "pending" : "done");
    }, 1800);
  };

  const accountOptions = [
    {
      type: "alumni" as AccountType,
      icon: GraduationCap,
      label: "Graduate Alumni",
      sub: "I have a degree from Lincoln University College",
      color: "border-primary bg-primary/[.04]",
    },
    {
      type: "student" as AccountType,
      icon: Users,
      label: "Current Student",
      sub: "I'm currently enrolled at Lincoln University College",
      color: "border-blue-500 bg-blue-50/50",
    },
    {
      type: "visitor" as AccountType,
      icon: User,
      label: "General Visitor",
      sub: "I'm interested in the alumni community or Lincoln University",
      color: "border-muted-foreground/20 bg-muted/50",
    },
  ];

  const COUNTRIES = [
    "Malaysia", "Singapore", "India", "Indonesia", "Philippines",
    "Vietnam", "Thailand", "Nigeria", "Ghana", "UK", "UAE", "USA", "Australia", "Other",
  ];
  const PROGRAMS = [
    "Medicine", "Nursing", "Pharmacy", "Computer Science", "Information Technology",
    "Business Administration", "Finance", "Law", "Engineering", "Architecture",
    "Psychology", "Data Science", "Marketing", "Biotechnology", "Other",
  ];

  return (
    <div className="flex flex-1 bg-background">

      {/* ── LEFT PANEL — Brand ──────────────────────────────────────── */}
      <aside
        className="hidden lg:flex w-[420px] shrink-0 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #7f0d18 0%, #1a0306 65%, #0d0d14 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white">Lincoln Alumni</span>
          </Link>
        </div>

        {/* Hero text */}
        <div className="relative z-10">
          <h2
            className="font-display text-4xl font-bold text-white leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Stay Connected<br />
            <span
              style={{
                background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Forever.
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">
            Join 25,000+ Lincoln University College graduates across 85 countries. Network, mentor, and grow together.
          </p>

          {/* Social proof */}
          <div className="mt-8 space-y-4">
            {[
              { value: "25,000+", label: "Alumni Worldwide" },
              { value: "85",      label: "Countries" },
              { value: "600+",    label: "Active Mentors" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="font-display text-xl font-bold text-white">{s.value}</span>
                <span className="text-white/50 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div
          className="relative z-10 rounded-2xl p-5 border border-white/10"
          style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
        >
          <p className="text-white/75 text-sm italic leading-relaxed">
            "The Lincoln Alumni Network is the single most valuable thing I've kept from my time at university. One connection here changed my career."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-xs font-bold text-amber-300">
              AF
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Ahmad Fauzi</p>
              <p className="text-[10px] text-white/45">CEO, TechVentures · Class of 2017</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── RIGHT PANEL — Auth form ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-base font-bold">Lincoln Alumni</span>
          </Link>

          {/* ── S1 & S2: Login / Sign Up Tabs ─────────────────────────── */}
          {(submitState === "idle" || submitState === "loading") && !(tab === "signup" && step > 1) && (
            <div className="flex rounded-2xl bg-muted p-1 mb-8">
              {(["login", "signup"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setStep(1); setSubmitState("idle"); }}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all
                    ${tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {t === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>
          )}

          {/* ── LOGIN FORM (S1) ────────────────────────────────────────── */}
          {tab === "login" && submitState !== "done" && (
            <div style={{ animation: "authFade 300ms ease-out both" }}>
              <h1 className="font-display text-2xl font-bold mb-2" style={{ letterSpacing: "-0.02em" }}>
                Welcome back.
              </h1>
              <p className="text-muted-foreground text-sm mb-8">Sign in to access your alumni account.</p>

              {/* ── S5: OAuth Options ─── */}
              <div className="space-y-3 mb-6">
                <OAuthButton provider="Google"   icon="🇬" color="border-border hover:border-gray-400 bg-card text-foreground" />
                <OAuthButton provider="LinkedIn" icon="🔗" color="border-blue-200 hover:border-blue-400 bg-blue-50/50 text-blue-700" />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-medium px-2">or continue with email</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="space-y-4">
                <FloatField
                  label="Email Address"
                  type="email"
                  value={loginEmail}
                  onChange={setLoginEmail}
                  icon={Mail}
                  required
                  validate={emailValid}
                />
                <FloatField
                  label="Password"
                  type="password"
                  value={loginPassword}
                  onChange={setLoginPassword}
                  icon={Lock}
                  required
                  validate={passwordValid}
                />

                {/* Remember me + Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`w-4.5 h-4.5 w-5 h-5 rounded border transition-all flex items-center justify-center cursor-pointer
                        ${rememberMe ? "bg-primary border-primary" : "border-border group-hover:border-primary/50"}`}
                    >
                      {rememberMe && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <button
                    onClick={() => setForgotSent(true)}
                    className="text-xs font-semibold text-primary hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {forgotSent && (
                  <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    <Check className="h-3.5 w-3.5 shrink-0" />
                    Reset link sent — check your email.
                  </div>
                )}

                <button
                  onClick={handleLoginSubmit}
                  disabled={!loginValid || submitState !== "idle"}
                  className="w-full rounded-full bg-primary text-white py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitState === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign In <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => setTab("signup")}
                  className="font-semibold text-primary hover:underline"
                >
                  Create one free
                </button>
              </p>
            </div>
          )}

          {/* ── LOGIN SUCCESS (S7: Post-Login Redirect) ─────────────────── */}
          {tab === "login" && submitState === "done" && (
            <div className="text-center py-8" style={{ animation: "authFade 300ms ease-out both" }}>
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5">
                <Check className="h-7 w-7 text-emerald-500" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">Welcome back!</h2>
              <p className="text-muted-foreground text-sm">Redirecting you to your dashboard…</p>
            </div>
          )}

          {/* ── SIGN UP: STEP 1 (S3: Account Type Selector) ─────────────── */}
          {tab === "signup" && step === 1 && submitState !== "done" && submitState !== "pending" && (
            <div style={{ animation: "authFade 300ms ease-out both" }}>
              <h1 className="font-display text-2xl font-bold mb-1" style={{ letterSpacing: "-0.02em" }}>
                Create your account.
              </h1>
              <p className="text-muted-foreground text-sm mb-8">Choose your account type to get started.</p>

              {/* ── S5: OAuth Options ─── */}
              <div className="space-y-3 mb-6">
                <OAuthButton provider="Google"   icon="🇬" color="border-border hover:border-gray-400 bg-card text-foreground" />
                <OAuthButton provider="LinkedIn" icon="🔗" color="border-blue-200 hover:border-blue-400 bg-blue-50/50 text-blue-700" />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-medium px-2">or sign up with email</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="space-y-3 mb-8">
                {accountOptions.map((opt) => (
                  <AccountTypeCard
                    key={opt.type}
                    {...opt}
                    selected={accountType === opt.type}
                    onClick={() => setAccountType(opt.type)}
                  />
                ))}
              </div>

              <button
                onClick={() => step1Valid && setStep(2)}
                disabled={!step1Valid}
                className="w-full rounded-full bg-primary text-white py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => setTab("login")} className="font-semibold text-primary hover:underline">
                  Sign in
                </button>
              </p>
            </div>
          )}

          {/* ── SIGN UP: STEP 2 (S2: Personal Info) ─────────────────────── */}
          {tab === "signup" && step === 2 && submitState !== "done" && submitState !== "pending" && (
            <div style={{ animation: "authFade 300ms ease-out both" }}>
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Back
              </button>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="font-display text-2xl font-bold" style={{ letterSpacing: "-0.02em" }}>
                    Personal info.
                  </h1>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {accountType === "alumni" ? "Step 2 of 3" : "Step 2 of 2"} — Your details
                  </p>
                </div>
                <StepIndicator step={2} total={accountType === "alumni" ? 3 : 2} />
              </div>

              <div className="space-y-4 mb-6">
                <FloatField
                  label="Full Name"
                  value={form.name}
                  onChange={set("name")}
                  icon={User}
                  required
                  validate={(v) => v.trim().length > 1 ? null : "Enter your full name"}
                />
                <FloatField
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  icon={Mail}
                  required
                  validate={emailValid}
                />
                <FloatField
                  label="Phone Number (optional)"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                />
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                    Country <span className="text-primary">*</span>
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => set("country")(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  >
                    <option value="">Select your country</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!step2Valid) return;
                  if (accountType === "alumni") {
                    setStep(3);
                  } else {
                    handleSignupSubmit();
                  }
                }}
                disabled={!step2Valid || submitState === "loading"}
                className="w-full rounded-full bg-primary text-white py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitState === "loading" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Creating account…
                  </>
                ) : accountType === "alumni" ? (
                  <> Continue <ArrowRight className="h-4 w-4" /> </>
                ) : (
                  <> Create Account <ArrowRight className="h-4 w-4" /> </>
                )}
              </button>

              {/* ── S6: Terms & Privacy ─── */}
              {accountType !== "alumni" && (
                <div className="mt-5">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <div
                      onClick={() => setAgreedToTerms(!agreedToTerms)}
                      className={`mt-0.5 w-4 h-4 rounded border transition-all flex items-center justify-center shrink-0 cursor-pointer
                        ${agreedToTerms ? "bg-primary border-primary" : "border-border hover:border-primary/50"}`}
                    >
                      {agreedToTerms && <Check className="h-2.5 w-2.5 text-white" />}
                    </div>
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      I agree to the{" "}
                      <Link to="/" className="text-primary hover:underline font-semibold">Terms of Service</Link>
                      {" "}and{" "}
                      <Link to="/" className="text-primary hover:underline font-semibold">Privacy Policy</Link>.
                      {" "}Alumni accounts are subject to verification.
                    </span>
                  </label>
                </div>
              )}
            </div>
          )}

          {/* ── SIGN UP: STEP 3 — Alumni Details (S4: Verification Step) ── */}
          {tab === "signup" && step === 3 && submitState !== "done" && submitState !== "pending" && (
            <div style={{ animation: "authFade 300ms ease-out both" }}>
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Back
              </button>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="font-display text-2xl font-bold" style={{ letterSpacing: "-0.02em" }}>
                    Alumni details.
                  </h1>
                  <p className="text-muted-foreground text-sm mt-0.5">Step 3 of 3 — Verification</p>
                </div>
                <StepIndicator step={3} total={3} />
              </div>

              {/* Verification notice */}
              <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4 mb-6">
                <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 leading-relaxed">
                  Alumni accounts require verification. We cross-check your graduation year and Student ID with the Lincoln University College registrar — typically 1–2 business days.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                    Graduation Year <span className="text-primary">*</span>
                  </label>
                  <select
                    value={form.gradYear}
                    onChange={(e) => set("gradYear")(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  >
                    <option value="">Select graduation year</option>
                    {Array.from({ length: 24 }, (_, i) => 2024 - i).map((y) => (
                      <option key={y} value={String(y)}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">
                    Programme / Faculty <span className="text-primary">*</span>
                  </label>
                  <select
                    value={form.program}
                    onChange={(e) => set("program")(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  >
                    <option value="">Select your programme</option>
                    {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <FloatField
                  label="Student ID (optional but speeds verification)"
                  value={form.studentId}
                  onChange={set("studentId")}
                  icon={ShieldCheck}
                  hint="Your ID from your transcript or student card"
                />
              </div>

              {/* ── S6: Terms & Privacy ─── */}
              <div className="mb-6">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <div
                    onClick={() => setAgreedToTerms(!agreedToTerms)}
                    className={`mt-0.5 w-4 h-4 rounded border transition-all flex items-center justify-center shrink-0 cursor-pointer
                      ${agreedToTerms ? "bg-primary border-primary" : "border-border hover:border-primary/50"}`}
                  >
                    {agreedToTerms && <Check className="h-2.5 w-2.5 text-white" />}
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <Link to="/" className="text-primary hover:underline font-semibold">Terms of Service</Link>
                    {" "}and{" "}
                    <Link to="/" className="text-primary hover:underline font-semibold">Privacy Policy</Link>.
                    I confirm the details above are accurate.
                  </span>
                </label>
              </div>

              <button
                onClick={handleSignupSubmit}
                disabled={!step3Valid || !agreedToTerms || submitState === "loading"}
                className="w-full rounded-full bg-primary text-white py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitState === "loading" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Submit for Verification
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── S7: POST-SIGNUP — Alumni Pending Verification ─────────── */}
          {submitState === "pending" && (
            <div className="text-center py-6" style={{ animation: "authFade 300ms ease-out both" }}>
              <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center mx-auto mb-5">
                <Clock className="h-7 w-7 text-amber-500" />
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 mb-4">
                Pending Verification
              </span>
              <h2 className="font-display text-2xl font-bold mb-3" style={{ letterSpacing: "-0.01em" }}>
                Application received!
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto mb-8">
                Your alumni account is being verified against the Lincoln University College registry. You'll receive a confirmation email within <strong>1–2 business days</strong>.
              </p>
              <div className="rounded-2xl border border-border bg-muted/30 p-5 text-left mb-6 space-y-3">
                <h3 className="font-semibold text-sm">What happens next?</h3>
                {[
                  { step: "1", text: "Admin reviews your graduation year and Student ID" },
                  { step: "2", text: "Cross-checked with university registrar" },
                  { step: "3", text: "Approved → your alumni directory card goes live" },
                  { step: "4", text: "You'll receive an email with login access" },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {s.step}
                    </div>
                    <span className="text-sm text-muted-foreground">{s.text}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-all hover:-translate-y-0.5"
              >
                Browse the Network <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* ── S7: POST-SIGNUP — Student/Visitor Active ──────────────── */}
          {submitState === "done" && tab === "signup" && (
            <div className="text-center py-6" style={{ animation: "authFade 300ms ease-out both" }}>
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5">
                <Sparkles className="h-7 w-7 text-emerald-500" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-3" style={{ letterSpacing: "-0.01em" }}>
                You're in!
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                Your account is active. Start exploring the network — connect with alumni, browse events, and discover mentors.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/directory"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-all hover:-translate-y-0.5"
                >
                  Browse Directory <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition-all"
                >
                  Go Home
                </Link>
              </div>
            </div>
          )}

          {/* ── S7 ADMIN note ─────────────────────────────────────────── */}
          {(submitState === "idle" || submitState === "loading") && (
            <p className="mt-8 text-center text-xs text-muted-foreground">
              Admin?{" "}
              <button className="font-semibold text-primary hover:underline inline-flex items-center gap-0.5">
                Access Dashboard <ChevronRight className="h-3 w-3" />
              </button>
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes authFade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}