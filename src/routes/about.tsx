import { createFileRoute } from "@tanstack/react-router";
import { 
  Award, 
  Target, 
  BookOpen, 
  ShieldCheck, 
  Briefcase, 
  Globe, 
  CheckCircle2,
  Building2,
  Compass,
  FileText,
  UserCheck
} from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Lincoln University College Alumni Network" },
      {
        name: "description",
        content:
          "Official mission, alternating historical milestones, faculty leadership dossiers, curriculum architecture, and corporate internship systems of Lincoln University College.",
      },
    ],
  }),
});

interface TimelineBox {
  year: string;
  title: string;
  subtitle: string;
  desc: string;
}

interface FacultyProfile {
  name: string;
  role: string;
  bio: string;
  meta: string;
  icon: React.ComponentType<{ className?: string }>;
  isHighlighted?: boolean;
}

function About() {
  const timelineMilestones: TimelineBox[] = [
    {
      year: "2002",
      title: "The Foundation Framework",
      subtitle: "Establishment of Lincoln College",
      desc: "Founded in Petaling Jaya, Malaysia, as Lincoln College. The core mandate from inception was to establish student-centered higher learning modules that provide accessible, world-class professional medical, science, and technical tracks within South-East Asian corridors.",
    },
    {
      year: "2011",
      title: "University College Upgrade",
      subtitle: "Official Ministry Elevation",
      desc: "Following rigorous analytical infrastructure audits, the institution was officially upgraded to Lincoln University College (LUC) by the Ministry of Higher Education (MoHE) Malaysia, expanding global validation frameworks and multi-tier degree models.",
    },
    {
      year: "2017 - 2019",
      title: "Crowned Tier Excellence",
      subtitle: "Consecutive 5-Star Setara Status",
      desc: "Achieved the prestigious 5-Star Rating (Setara) by the Ministry of Education, Government of Malaysia. This benchmark solidified LUC's standardized pedagogical loops, research output, and internationalized delivery infrastructures across all campuses.",
    },
    {
      year: "2021",
      title: "Global Impact Standard",
      subtitle: "THE Rankings Recognition",
      desc: "Ranked 35th globally in Quality Education parameters within the Times Higher Education (THE) Impact Rankings framework. Formally established institutional memberships in the Association of Commonwealth Universities (ACU) and the International Association of Universities (IAU) in Paris.",
    },
    {
      year: "2026",
      title: "The Modern Ecosystem",
      subtitle: "#196 QS Regional Tier Ranking",
      desc: "Secures a comfortable position within the Top 200 institutions across Asia (#196) and #47 inside South-East Asia metrics. Today, the network actively commands an operational pipeline directing over 25,000+ validated alumni leaders spanning 85 sovereign countries.",
    },
  ];

  const facultyLeaders: FacultyProfile[] = [
    {
      name: "Prof. Dr. Amiya Bhaumik",
      role: "Founder-President & CEO",
      meta: "Former Research Fellow at UNESCO, Paris",
      bio: "A pure academician and practical skilled entrepreneur with higher education operations spanning over 108 countries. He shapes LUC under Abraham Lincoln’s core philosophy: enabling access to transformative higher training to manifest individual hidden divinity and power under the mandate of 'Work is Worship'.",
      icon: UserCheck,
      isHighlighted: false,
    },
    {
      name: "Prof. Datuk Dr. Hajjah Bibi Florina Abdullah",
      role: "Pro-Chancellor",
      meta: "First Director of Nursing, Ministry of Health Malaysia",
      bio: "The structural pioneer instrumental in professionalizing the entire healthcare and clinical nursing discipline across Malaysia from diploma variants up to elite degree levels. She directly orchestrates LUC's high-impact clinical placement streams and international hospital network pipelines.",
      icon: Award,
      isHighlighted: true,
    },
    {
      name: "Prof. Datuk Dr. Abdul Gani Bin Mohammed Din",
      role: "Deputy Vice Chancellor (Academic)",
      meta: "Former Deputy Director-General of Health, Malaysia",
      bio: "Directly oversees academic quality frameworks to ensure that all syllabi remain strictly practical, risk-managed, and industry-driven. He integrates digital systems alongside active laboratory parameters to optimize graduate performance inside competitive corporate and clinical sectors.",
      icon: ShieldCheck,
      isHighlighted: false,
    },
  ];

  return (
    <div className="w-full bg-neutral-50 min-h-screen font-sans text-neutral-800 antialiased">
      
      {/* ── HERO BANNER WITH VIBRANT RED-THEMED HIGH-CONTRAST OVERLAY ── */}
      <section className="relative overflow-hidden py-40 lg:py-48 bg-red-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80" 
            alt="Lincoln University College Campus Architecture" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-red-900/80 to-neutral-900/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/40 to-neutral-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest bg-red-600/30 border border-red-500/50 text-amber-400 mb-6 uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Institutional Legacy Portfolio
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black text-white max-w-5xl leading-tight tracking-tight text-balance">
            Lincoln University College <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-md">
              24 Years of Educational Sovereignty
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-base sm:text-lg lg:text-xl text-neutral-100 font-normal leading-relaxed drop-shadow-xs">
            Established as a baseline private institution in 2002, LUC has engineered standard-setting blueprints 
            approved by the Ministry of Higher Education Malaysia and fully certified by the Malaysian Qualifications Agency (MQA).
          </p>
        </div>
      </section>

      {/* ── SEPARATE HIGH-PROMINENCE VISION & MISSION SECTION ────────── */}
      <section className="relative z-30 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200/80 overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          
          {/* Vision Box */}
          <div className="p-8 lg:p-12 space-y-4 hover:bg-neutral-50/50 transition-colors duration-300">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-900">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-neutral-950 tracking-tight">Official Vision Mandate</h3>
            <p className="text-sm uppercase tracking-widest font-semibold text-red-900">Global Academic Portal</p>
            <blockquote className="text-neutral-600 text-sm sm:text-base leading-relaxed italic border-l-2 border-red-900 pl-4 bg-neutral-50 py-3 pr-3 rounded-r-lg">
              "To be an acclaimed school within the corporate division of Lincoln University College, delivering world-class education that excels in teaching and learning, promotes global competence, and develops highly skilled professionals to serve the global society."
            </blockquote>
          </div>

          {/* Mission Box */}
          <div className="p-8 lg:p-12 space-y-4 hover:bg-neutral-50/50 transition-colors duration-300">
            <div className="w-12 h-12 rounded-xl bg-red-900 text-white flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-neutral-950 tracking-tight">Official Mission Objective</h3>
            <p className="text-sm uppercase tracking-widest font-semibold text-red-900">Holistic Capabilities Integration</p>
            <blockquote className="text-neutral-600 text-sm sm:text-base leading-relaxed italic border-l-2 border-red-900 pl-4 bg-neutral-50 py-3 pr-3 rounded-r-lg">
              "To become a truly global university with risk-based approach that enhances lifelong learning opportunities, practical and scientific skills, social values, leadership and entrepreneurship by harnessing information technology along with artificial intelligence to create a noble human society."
            </blockquote>
          </div>

        </div>
      </section>

      {/* ── THE ALTERNATING CHESSBOARD LEGACY JOURNEY MATRIX ─────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-900 block">The Chronicle Matrix</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 mt-2 tracking-tight">
              Chronological Chessboard Timeline
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-3">
              Explore the hyper-detailed micro-steps of our trajectory alternating cleanly across corporate grids.
            </p>
          </div>

          {/* Alternating Matrix Block Container */}
          <div className="border border-neutral-300 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1">
            {timelineMilestones.map((item, idx) => {
              const isDarkCell = idx % 2 === 0;
              return (
                <div 
                  key={idx}
                  className={`grid lg:grid-cols-12 items-center p-8 lg:p-16 border-b last:border-b-0 border-neutral-300 transition-colors duration-300 ${
                    isDarkCell 
                      ? "bg-gradient-to-br from-red-950 to-neutral-950 text-white" 
                      : "bg-white text-neutral-900"
                  }`}
                >
                  {/* Left Column: Metric Tagging */}
                  <div className="lg:col-span-3 mb-4 lg:mb-0 space-y-1.5">
                    <span className={`inline-block text-xs font-black tracking-widest px-3 py-1 rounded-md uppercase ${
                      isDarkCell ? "bg-red-900 text-white border border-red-800" : "bg-red-50 text-red-900 border border-red-200"
                    }`}>
                      Year Block {item.year}
                    </span>
                    <div className={`text-4xl lg:text-5xl font-serif font-black ${isDarkCell ? "text-amber-400" : "text-red-950"}`}>
                      {item.year}
                    </div>
                  </div>

                  {/* Right Column: Deep Details */}
                  <div className="lg:col-span-9 space-y-3 lg:pl-8 border-l-0 lg:border-l border-neutral-300/40">
                    <div>
                      <h3 className={`text-xl lg:text-2xl font-serif font-bold tracking-tight ${isDarkCell ? "text-white" : "text-neutral-950"}`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs uppercase font-medium tracking-wider mt-0.5 ${isDarkCell ? "text-neutral-400" : "text-red-900"}`}>
                        {item.subtitle}
                      </p>
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed font-light ${isDarkCell ? "text-neutral-300" : "text-neutral-600"}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EDUCATIONAL SYSTEM, CURRICULUM & INTERNSHIP PILLARS ──────── */}
      <section className="py-24 bg-neutral-100 border-y border-neutral-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-900 block">Pedagogical Framework</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-neutral-950 mt-2 tracking-tight">
              The Academic Delivery Architecture
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Box 1: Educational System */}
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-video bg-neutral-900">
                  <img 
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" 
                    alt="LUC Lecture Theaters and Technology Systems" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 left-4 bg-red-900 text-white p-2 rounded-lg"><BookOpen className="h-4 w-4" /></div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-neutral-950">Risk-Based Lifelong Education</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                    LUC enforces an advanced face-to-face and technology-driven education model integrating Artificial Intelligence (AI) workflows. Operating as an ISO 9001:2015 certified academic entity, the institution features continuous formative and summative metrics across all doctoral, masters, and undergraduate programs.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-neutral-100 bg-neutral-50/50 text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                MQA Structured Modules
              </div>
            </div>

            {/* Box 2: Curriculum Structure */}
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-video bg-neutral-900">
                  <img 
                    src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80" 
                    alt="Curriculum Development Research Papers" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 left-4 bg-red-900 text-white p-2 rounded-lg"><FileText className="h-4 w-4" /></div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-neutral-950">Industry-Driven Syllabi</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                    Syllabi are rigorously constructed to demand exact credit-hour parameters (e.g., 140 credit hours for core Bachelor Honours tracks). Modules cleanly combine crucial analytical medical/technical sciences with Malaysian national parameters like MPU Philosophy, Ethics, and Leadership Skills.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-neutral-100 bg-neutral-50/50 text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                Accredited Course Mappings
              </div>
            </div>

            {/* Box 3: Internship Operations */}
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-video bg-neutral-900">
                  <img 
                    src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=600&q=80" 
                    alt="Clinical Practical Training and Industry Internships" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 left-4 bg-red-900 text-white p-2 rounded-lg"><Briefcase className="h-4 w-4" /></div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-neutral-950">Clinical & Industry Placements</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                    Practical immersion is verified via credit-bearing Biomedical Practicums and dedicated Industrial Training phases. Medical cohorts secure comprehensive clinical-year hands-on instruction within premier sovereign complexes, including Hospital Raja Perempuan Zainab II.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-neutral-100 bg-neutral-50/50 text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                6-Credit Experiential Blocks
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRENT HEAD FACULTY DOSSIERS ────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-900 block">Executive Council</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-neutral-950 mt-2 tracking-tight">
              Active Leadership & Senate Members
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-3">
              The practical academicians and operational entrepreneurs managing the institutional quality systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {facultyLeaders.map((member, idx) => {
              const LeaderIcon = member.icon;
              return (
                <div 
                  key={idx} 
                  className={`rounded-2xl border p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 group ${
                    member.isHighlighted 
                      ? "bg-gradient-to-br from-red-900 to-red-950 border-red-950 text-white shadow-xl scale-102 z-10" 
                      : "bg-neutral-50 border-neutral-200 text-neutral-800 hover:border-red-900/40 hover:shadow-lg"
                  }`}
                >
                  <div className="space-y-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 ${
                      member.isHighlighted ? "bg-white/15 text-amber-400" : "bg-red-900 text-amber-400"
                    }`}>
                      <LeaderIcon className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className={`font-serif text-lg font-bold transition-colors ${
                        member.isHighlighted ? "text-white" : "text-neutral-950 group-hover:text-red-950"
                      }`}>
                        {member.name}
                      </h3>
                      <p className={`text-xs font-black uppercase tracking-wider ${
                        member.isHighlighted ? "text-amber-400" : "text-red-900"
                      }`}>
                        {member.role}
                      </p>
                      <p className={`text-[11px] italic ${member.isHighlighted ? "text-neutral-300" : "text-neutral-400"}`}>
                        {member.meta}
                      </p>
                    </div>
                    <p className={`text-xs leading-relaxed font-light pt-2 border-t ${
                      member.isHighlighted ? "text-neutral-200 border-white/10" : "text-neutral-600 border-neutral-200"
                    }`}>
                      {member.bio}
                    </p>
                  </div>
                  <div className={`mt-6 pt-3 border-t flex items-center justify-between text-[11px] ${
                    member.isHighlighted ? "border-white/10 text-neutral-400" : "border-neutral-100 text-neutral-400"
                  }`}>
                    <span>Verified Tenure</span>
                    <span className={`font-mono ${member.isHighlighted ? "text-amber-400" : "text-red-900"}`}>LUC Board Matrix</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HIGH-LEVEL ACCREDITATIONS & STRUCTURAL APPROVALS ────────── */}
      <section className="bg-neutral-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-amber-400 font-bold uppercase tracking-[0.15em] text-xs block">Accredited Frameworks</span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">Globally Aligned, Locally Validated.</h3>
            <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              Lincoln University College ensures valid credentials through direct performance alignment adhering strictly to official sovereign education parameters.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-neutral-300"><Building2 className="h-3.5 w-3.5 text-amber-400" /> MoHE 5-Star Status</div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-neutral-300"><CheckCircle2 className="h-3.5 w-3.5 text-amber-400" /> MQA Approved</div>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 w-full">
            {[
              { title: "Association of Commonwealth Universities (ACU)", desc: "Enables structural research cooperation alignments across high-impact Commonwealth teaching networks." },
              { title: "International Association of Universities (IAU)", desc: "UNESCO-based Paris framework offering synchronized educational verification checks globally." },
              { title: "Association of Indian Universities (AIU)", desc: "Full equity certification mappings across major historical regional education sub-continents." },
              { title: "Malaysian Qualifications Agency (MQA)", desc: "Comprehensive syllabus compliance monitoring adhering strictly to statutory quality assurance acts." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] transition-colors duration-300">
                <h4 className="text-neutral-200 text-xs sm:text-sm font-bold tracking-tight mb-1.5 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  {item.title}
                </h4>
                <p className="text-neutral-400 text-[11px] sm:text-xs font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}