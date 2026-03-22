import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { User as UserIcon, Mail, Phone, Shield, Key, Bell, ShieldCheck } from "lucide-react";
import { getUser } from "@/lib/api";

interface ProfilePageProps {
  role: "patient" | "doctor" | "admin";
}

const ProfilePage = ({ role }: ProfilePageProps) => {
  const user = getUser();
  
  if (!user) {
      return (
        <DashboardLayout role={role}>
           <p>Loading profile...</p>
        </DashboardLayout>
      )
  }

  return (
    <DashboardLayout role={role}>
      <div className="max-w-2xl mx-auto space-y-6">
        <ScrollReveal>
          <div className="glass rounded-xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-accent/20 z-0"></div>
            <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center text-primary text-3xl font-bold font-display mx-auto relative z-10 border-4 border-background shadow-md">
              {user.name.split(" ").map((n: string) => n[0]).join("")}
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mt-4 relative z-10">{role === 'doctor' && !user.name.startsWith('Dr') ? `Dr. ${user.name}` : user.name}</h2>
            <div className="text-sm text-muted-foreground capitalize mt-1 relative z-10 flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Secure {role} Account
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="font-display font-semibold text-foreground">Account Information</h3>
            {[
              { icon: Mail, label: "Registered Email", value: user.email },
              { icon: UserIcon, label: "Account Role", value: role.charAt(0).toUpperCase() + role.slice(1) },
              { icon: Phone, label: "Status", value: "Active User" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
                <span className="text-sm text-foreground font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Security
            </h3>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Key className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Two-Factor Authentication</span>
              </div>
              <span className="text-xs text-accent font-medium">Enabled</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Login Notifications</span>
              </div>
              <span className="text-xs text-accent font-medium">Active</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
