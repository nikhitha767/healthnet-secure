import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Send, Lock, Shield } from "lucide-react";
import { chatMessages } from "@/data/dummyData";

interface ChatPageProps {
  role: "patient" | "doctor";
}

const ChatPage = ({ role }: ChatPageProps) => {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, {
      id: `m${messages.length + 1}`,
      sender: role,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInput("");
  };

  return (
    <DashboardLayout role={role}>
      <ScrollReveal>
        <div className="glass rounded-xl flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                {role === "patient" ? "RK" : "SM"}
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-sm">
                  {role === "patient" ? "Dr. Rachel Kim" : "Sarah Mitchell"}
                </p>
                <p className="text-xs text-accent flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-accent" />
              <span>End-to-end encrypted</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-2">
              <Shield className="h-3 w-3 text-primary" />
              <span>Messages are secured with AES-256 encryption</span>
            </div>
            {messages.map((msg) => {
              const isMe = msg.sender === role;
              return (
                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    isMe ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted/50 text-foreground rounded-bl-sm"
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${isMe ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a secure message..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button
                onClick={handleSend}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all active:scale-95"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </DashboardLayout>
  );
};

export default ChatPage;
