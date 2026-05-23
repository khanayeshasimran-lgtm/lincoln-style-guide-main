import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const faqs: { q: RegExp; a: string }[] = [
  { q: /join|sign ?up|register/i, a: "To join, head over to our Contact / Join page and fill the short form. Our team verifies alumni within 2 business days." },
  { q: /event/i, a: "Upcoming events are listed on the Events page — including the Global Alumni Reunion 2026 in Kuala Lumpur." },
  { q: /connect|network|mentor/i, a: "Visit the Directory, open any profile, and tap Connect. For mentorship, filter by 'Mentor available' tag." },
  { q: /benefit|why/i, a: "Members get lifetime networking, mentorship, exclusive events, career support, and continued learning resources." },
  { q: /contact|email/i, a: "Reach us at alumni@lincoln.edu.my or +60 3-7806 3478." },
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Hi! I'm the Lincoln Alumni assistant. Ask me about joining, events, or connecting with alumni." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const reply = faqs.find((f) => f.q.test(text))?.a ?? "Great question! Try asking about joining, events, mentorship, or contact details — or visit the Contact page.";
    setMessages((m) => [...m, { from: "user", text }, { from: "bot", text: reply }]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-elegant grid place-items-center hover:bg-primary-hover transition-all hover:scale-105"
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[92vw] max-w-sm bg-card rounded-2xl shadow-elegant border border-border overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-primary text-primary-foreground px-5 py-4">
            <div className="font-display font-bold">Alumni Assistant</div>
            <div className="text-xs opacity-90">Usually replies instantly</div>
          </div>
          <div className="flex-1 max-h-80 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.from === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border rounded-bl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 p-3 border-t border-border bg-card"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-3 py-2 rounded-full bg-muted text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button type="submit" className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center hover:bg-primary-hover">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
