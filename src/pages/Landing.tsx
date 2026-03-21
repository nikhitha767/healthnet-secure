import { Link } from "react-router-dom";
import { Shield, Heart, Lock, Zap, ArrowRight, Activity, Users, FileText } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-foreground">SecureHealth AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Platform</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link to="/signup" className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:opacity-90 transition-all active:scale-[0.97] glow-teal-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center mesh-gradient pt-16">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-[10%] w-32 h-32 rounded-2xl glass animate-float opacity-40 rotate-12" />
          <div className="absolute top-1/3 right-[15%] w-24 h-24 rounded-full glass animate-float-slow opacity-30" />
          <div className="absolute bottom-1/4 left-[20%] w-20 h-20 rounded-xl glass animate-float opacity-25 -rotate-12" />
          <div className="absolute top-[60%] right-[10%] w-28 h-28 rounded-2xl glass animate-float-slow opacity-35 rotate-6" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(hsl(168 84% 49%) 1px, transparent 1px), linear-gradient(90deg, hsl(168 84% 49%) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
          {/* Rotating ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10 animate-rotate-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-accent/5 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-8">
              <Shield className="h-3.5 w-3.5" /> HIPAA Compliant · End-to-End Encrypted · AI-Powered
            </div>
          </div>
          <h1 className="animate-fade-up font-display text-5xl md:text-7xl font-extrabold text-foreground leading-[0.95] tracking-tight text-balance" style={{ animationDelay: '100ms' }}>
            AI-Driven Secure Digital Health Network
          </h1>
          <p className="animate-fade-up text-lg md:text-xl text-muted-foreground mt-8 max-w-2xl mx-auto text-pretty leading-relaxed" style={{ animationDelay: '200ms' }}>
            A next-generation communication platform where healthcare meets advanced cybersecurity. 
            Protect patient data while enabling seamless doctor-patient collaboration.
          </p>
          <div className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4 mt-10" style={{ animationDelay: '300ms' }}>
            <Link to="/signup" className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-display font-semibold text-base hover:opacity-90 transition-all active:scale-[0.97] glow-teal">
              Create Account <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="flex items-center gap-2 glass px-8 py-3.5 rounded-xl font-display font-semibold text-base text-foreground hover:bg-secondary transition-all active:scale-[0.97]">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Built for Modern Healthcare
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Every feature designed with security-first architecture and clinical workflow in mind.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: "Zero-Trust Encryption", desc: "Military-grade AES-256 encryption for all data at rest and in transit. Every packet verified." },
              { icon: Activity, title: "AI Threat Detection", desc: "Real-time anomaly detection powered by machine learning, monitoring 24/7 for unusual access patterns." },
              { icon: Users, title: "Role-Based Access", desc: "Granular permission controls for patients, doctors, and administrators with audit trails." },
              { icon: FileText, title: "Secure Document Sharing", desc: "Share medical reports and imaging through encrypted channels with tamper-proof verification." },
              { icon: Zap, title: "Real-Time Communication", desc: "Encrypted messaging and consultation channels between patients and healthcare providers." },
              { icon: Shield, title: "Compliance Dashboard", desc: "Automated HIPAA compliance monitoring with detailed security analytics and reporting." },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="glass rounded-xl p-8 h-full group hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-32 px-6 mesh-gradient">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Trusted by Healthcare Providers
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "1,247", label: "Active Users" },
              { value: "99.97%", label: "Platform Uptime" },
              { value: "28,934", label: "Encrypted Messages" },
              { value: "342", label: "Threats Blocked" },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="glass rounded-xl p-8 text-center hover:scale-[1.03] transition-transform">
                  <p className="text-4xl md:text-5xl font-display font-extrabold text-primary tabular-nums">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1]">
                Security That Never Sleeps
              </h2>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                Our AI-driven security engine continuously monitors every interaction, 
                detecting threats before they materialize. From unauthorized access attempts 
                to data exfiltration, we protect what matters most — patient privacy.
              </p>
              <div className="mt-8 space-y-4">
                {["End-to-end encrypted communications", "AI-powered anomaly detection", "Automated compliance reporting", "Real-time threat response"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="glass rounded-2xl p-8 space-y-4">
                {[
                  { label: "Encryption", value: 98, color: "bg-primary" },
                  { label: "Threat Detection", value: 94, color: "bg-accent" },
                  { label: "Compliance Score", value: 99, color: "bg-primary" },
                  { label: "Access Control", value: 96, color: "bg-accent" },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-foreground font-medium">{bar.label}</span>
                      <span className="text-muted-foreground tabular-nums">{bar.value}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${bar.color} transition-all duration-1000`}
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 mesh-gradient">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Ready to Secure Your Practice?
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Join healthcare providers who trust SecureHealth AI for their digital communication needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link to="/signup" className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-display font-semibold hover:opacity-90 transition-all active:scale-[0.97] glow-teal">
              Start Free Trial <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="glass px-8 py-3.5 rounded-xl font-display font-semibold text-foreground hover:bg-secondary transition-all active:scale-[0.97]">
              Sign In
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-display font-bold text-foreground text-sm">SecureHealth AI</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 SecureHealth AI. All rights reserved. HIPAA Compliant.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
