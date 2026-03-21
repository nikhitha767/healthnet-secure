import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Settings, Bell, Shield, Globe, Moon, Eye } from "lucide-react";

interface SettingsPageProps {
  role: "patient" | "doctor" | "admin";
}

const ToggleItem = ({ icon: Icon, label, description, defaultOn = false }: { icon: any; label: string; description: string; defaultOn?: boolean }) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
    <button className={`w-10 h-6 rounded-full transition-colors relative active:scale-95 ${defaultOn ? "bg-primary" : "bg-muted"}`}>
      <div className={`w-4 h-4 rounded-full bg-foreground absolute top-1 transition-transform ${defaultOn ? "translate-x-5" : "translate-x-1"}`} />
    </button>
  </div>
);

const SettingsPage = ({ role }: SettingsPageProps) => (
  <DashboardLayout role={role}>
    <div className="max-w-2xl mx-auto space-y-6">
      <ScrollReveal>
        <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" /> Settings
        </h2>
        <p className="text-muted-foreground text-sm mt-1">Manage your preferences and security settings.</p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="glass rounded-xl p-6 space-y-3">
          <h3 className="font-display font-semibold text-foreground mb-2">Notifications</h3>
          <ToggleItem icon={Bell} label="Email Notifications" description="Receive updates via email" defaultOn />
          <ToggleItem icon={Bell} label="Push Notifications" description="In-app push notifications" defaultOn />
          <ToggleItem icon={Bell} label="SMS Alerts" description="Critical alerts via text message" />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="glass rounded-xl p-6 space-y-3">
          <h3 className="font-display font-semibold text-foreground mb-2">Security</h3>
          <ToggleItem icon={Shield} label="Two-Factor Authentication" description="Extra layer of account security" defaultOn />
          <ToggleItem icon={Eye} label="Activity Logging" description="Track all account activity" defaultOn />
          <ToggleItem icon={Shield} label="Biometric Login" description="Use fingerprint or face recognition" />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <div className="glass rounded-xl p-6 space-y-3">
          <h3 className="font-display font-semibold text-foreground mb-2">Preferences</h3>
          <ToggleItem icon={Moon} label="Dark Mode" description="Use dark theme (currently active)" defaultOn />
          <ToggleItem icon={Globe} label="Language" description="English (US)" defaultOn />
        </div>
      </ScrollReveal>
    </div>
  </DashboardLayout>
);

export default SettingsPage;
