import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { User, Mail, Phone, Shield, Key, Bell } from "lucide-react";

interface ProfilePageProps {
  role: "patient" | "doctor" | "admin";
}

const profileData = {
  patient: { name: "Sarah Mitchell", email: "sarah.mitchell@mail.com", phone: "+1 (555) 234-5678", joined: "January 2025", mfa: true },
  doctor: { name: "Dr. Rachel Kim", email: "dr.kim@hospital.org", phone: "+1 (555) 876-5432", joined: "March 2024", mfa: true },
  admin: { name: "System Admin", email: "admin@securehealth.ai", phone: "+1 (555) 000-0001", joined: "January 2024", mfa: true },
};

const ProfilePage = ({ role }: ProfilePageProps) => {
  const data = profileData[role];
  return (
    <DashboardLayout role={role}>
      <div className="max-w-2xl mx-auto space-y-6">
        <ScrollReveal>
          <div className="glass rounded-xl p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold font-display mx-auto">
              {data.name.split(" ").map(n => n[0]).join("")}
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mt-4">{data.name}</h2>
            <p className="text-sm text-muted-foreground capitalize">{role} · Joined {data.joined}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="font-display font-semibold text-foreground">Personal Information</h3>
            {[
              { icon: Mail, label: "Email", value: data.email },
              { icon: Phone, label: "Phone", value: data.phone },
              { icon: User, label: "Role", value: role.charAt(0).toUpperCase() + role.slice(1) },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
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
