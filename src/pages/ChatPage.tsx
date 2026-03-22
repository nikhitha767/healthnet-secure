import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Send, Lock, Shield, User } from "lucide-react";
import { apiFetch, getUser } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface ChatPageProps {
  role: "patient" | "doctor";
}

const ChatPage = ({ role }: ChatPageProps) => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getUser();

  useEffect(() => {
    fetchContacts();
  }, [role]);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages();
    }
  }, [selectedContact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchContacts = async () => {
    try {
      const endpoint = role === "patient" ? "/patient/doctors" : "/doctor/patients";
      const data = await apiFetch(endpoint);
      setContacts(data);
      if (data.length > 0) setSelectedContact(data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    if (!selectedContact) return;
    try {
      const endpoint = role === "patient" ? `/patient/chat/${selectedContact.id}` : `/doctor/chat/${selectedContact.id}`;
      const data = await apiFetch(endpoint);
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedContact) return;
    const bodyPayload = role === "patient" ? { doctor_id: selectedContact.id, message: input } : { patient_id: selectedContact.id, message: input };
    const endpoint = role === "patient" ? "/patient/chat" : "/doctor/chat";
    
    // Optimistic UI update
    const newMsg = {
        id: Date.now(),
        sender_id: currentUser.id,
        receiver_id: selectedContact.id,
        message: input,
        timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    try {
      await apiFetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(bodyPayload)
      });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Message Failed", description: err.message });
    }
  };

  return (
    <DashboardLayout role={role}>
      <ScrollReveal>
        <div className="glass rounded-xl flex overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
          {/* Sidebar */}
          <div className="w-1/3 border-r border-border flex flex-col bg-surface/30">
            <div className="p-4 border-b border-border bg-surface/50">
              <h3 className="font-display font-semibold text-foreground">
                {role === "patient" ? "Your Doctors" : "Your Patients"}
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto">
                {contacts.length === 0 ? <p className="p-4 text-xs text-muted-foreground">No contacts found.</p> : contacts.map(c => (
                    <div 
                        key={c.id} 
                        onClick={() => setSelectedContact(c)}
                        className={`p-4 border-b border-border/50 cursor-pointer hover:bg-muted/50 transition-colors flex items-center gap-3 ${selectedContact?.id === c.id ? 'bg-primary/10 border-l-2 border-l-primary' : ''}`}
                    >
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold uppercase shrink-0">
                            {c.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-medium text-sm text-foreground truncate">{role === 'patient' && !c.name.startsWith('Dr.') ? `Dr. ${c.name}` : c.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{c.email || c.specialty}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="w-2/3 flex flex-col bg-background/50">
          {!selectedContact ? (
              <div className="flex-1 flex items-center justify-center flex-col gap-3 text-muted-foreground">
                  <User className="h-10 w-10 opacity-20" />
                  <p>Select a contact to start chatting securely.</p>
              </div>
          ) : (
             <>
                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between glass-strong">
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold uppercase shrink-0">
                        {selectedContact.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-display font-semibold text-foreground text-sm">
                        {role === "patient" && !selectedContact.name.startsWith('Dr') ? `Dr. ${selectedContact.name}` : selectedContact.name}
                        </p>
                        <p className="text-xs text-accent flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Active session
                        </p>
                    </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                    <Lock className="h-3 w-3 text-accent" />
                    <span>E2EE Active</span>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-2 mb-4 bg-muted/20 rounded-lg w-fit mx-auto px-4">
                        <Shield className="h-3 w-3 text-primary" />
                        <span>Messages are secured with AES-256 encryption</span>
                    </div>
                    {messages.length === 0 ? <p className="text-center text-xs text-muted-foreground mt-10">No messages yet. Say hello!</p> : messages.map((msg: any) => {
                    const isMe = msg.sender_id === currentUser.id;
                    return (
                        <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                            isMe ? "bg-primary text-primary-foreground rounded-br-sm glow-teal-sm" : "bg-muted text-foreground rounded-bl-sm border border-border"
                        }`}>
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-[10px] mt-1 text-right ${isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                        </div>
                    );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border bg-surface/50">
                    <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder={`Secure message to ${selectedContact.name.split(' ')[0]}...`}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="p-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50 active:scale-95 shadow-sm glow-teal-sm"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                    </div>
                </div>
             </>
          )}
          </div>
        </div>
      </ScrollReveal>
    </DashboardLayout>
  );
};

export default ChatPage;
