export type Alumni = {
  id: string;
  name: string;
  year: number;
  role: string;
  company: string;
  industry: string;
  country: string;
  department: string;
  bio: string;
  skills: string[];
  avatar: string;
  linkedin?: string;
};

const avatars = (seed: string) => `https://i.pravatar.cc/300?u=${seed}`;

export const alumni: Alumni[] = [
  { id: "1", name: "Aisha Rahman", year: 2018, role: "Senior Software Engineer", company: "Grab", industry: "Tech", country: "Malaysia", department: "Computer Science", bio: "Building scalable systems for Southeast Asia's super app.", skills: ["React", "Node.js", "AWS"], avatar: avatars("aisha"), linkedin: "#" },
  { id: "2", name: "Daniel Tan", year: 2016, role: "Investment Analyst", company: "Maybank", industry: "Finance", country: "Malaysia", department: "Finance", bio: "Equity research across emerging markets.", skills: ["Valuation", "Excel", "Bloomberg"], avatar: avatars("daniel") },
  { id: "3", name: "Priya Naidu", year: 2020, role: "Resident Doctor", company: "KPJ Healthcare", industry: "Healthcare", country: "Malaysia", department: "Medicine", bio: "Internal medicine resident passionate about patient care.", skills: ["Clinical", "Research"], avatar: avatars("priya") },
  { id: "4", name: "Omar Khan", year: 2015, role: "Founder & CEO", company: "EduSpark", industry: "Education", country: "UAE", department: "Business", bio: "EdTech founder serving 200k+ students in MENA.", skills: ["Leadership", "Strategy", "Fundraising"], avatar: avatars("omar") },
  { id: "5", name: "Mei Lin Chong", year: 2019, role: "Product Designer", company: "Shopee", industry: "Tech", country: "Singapore", department: "Multimedia", bio: "Designing delightful commerce experiences.", skills: ["Figma", "UX Research"], avatar: avatars("mei") },
  { id: "6", name: "Rahul Sharma", year: 2017, role: "Pharmacist", company: "Apollo Pharmacy", industry: "Healthcare", country: "India", department: "Pharmacy", bio: "Community pharmacy lead and immunization advocate.", skills: ["Clinical Pharmacy"], avatar: avatars("rahul") },
  { id: "7", name: "Sara Ibrahim", year: 2021, role: "Marketing Manager", company: "Nestlé", industry: "FMCG", country: "Egypt", department: "Business", bio: "Brand strategy for consumer health products.", skills: ["Branding", "Analytics"], avatar: avatars("sara") },
  { id: "8", name: "Kenji Watanabe", year: 2014, role: "Data Scientist", company: "Sony AI", industry: "Tech", country: "Japan", department: "Computer Science", bio: "Computer vision and reinforcement learning.", skills: ["Python", "PyTorch"], avatar: avatars("kenji") },
  { id: "9", name: "Fatima Noor", year: 2022, role: "Civil Engineer", company: "Gamuda", industry: "Engineering", country: "Malaysia", department: "Engineering", bio: "Working on MRT3 infrastructure projects.", skills: ["AutoCAD", "PM"], avatar: avatars("fatima") },
  { id: "10", name: "James O'Connor", year: 2013, role: "Hotel General Manager", company: "Hilton", industry: "Hospitality", country: "Australia", department: "Hospitality", bio: "Operations leader in luxury hospitality.", skills: ["Operations"], avatar: avatars("james") },
  { id: "11", name: "Linh Nguyen", year: 2019, role: "UX Researcher", company: "Google", industry: "Tech", country: "Vietnam", department: "Multimedia", bio: "User research for Search & Assistant.", skills: ["Research", "Strategy"], avatar: avatars("linh") },
  { id: "12", name: "Ahmed Al-Farsi", year: 2016, role: "Finance Director", company: "Aramco", industry: "Energy", country: "Saudi Arabia", department: "Finance", bio: "Corporate finance and treasury.", skills: ["FP&A"], avatar: avatars("ahmed") },
];

export const events = [
  { id: "e1", title: "Global Alumni Reunion 2026", date: "2026-08-15", location: "Kuala Lumpur, Malaysia", mode: "Offline", description: "Join 1000+ alumni for a weekend of reconnection, panels, and gala dinner.", speakers: ["Dr. Bhojraj Patil", "Omar Khan"] },
  { id: "e2", title: "AI in Healthcare — Webinar", date: "2026-06-10", location: "Online", mode: "Online", description: "Alumni from medicine and tech discuss applied AI in clinical settings.", speakers: ["Dr. Priya Naidu"] },
  { id: "e3", title: "Career Mentorship Mixer", date: "2026-07-02", location: "Singapore", mode: "Offline", description: "Speed mentoring with senior alumni across industries.", speakers: ["Daniel Tan", "Mei Lin Chong"] },
  { id: "e4", title: "Founders Night", date: "2026-09-21", location: "Online", mode: "Online", description: "Alumni founders share their startup journeys.", speakers: ["Omar Khan"] },
];

export const stats = {
  total: "25,000+",
  countries: "85",
  industries: "40+",
  events: "120/yr",
};
