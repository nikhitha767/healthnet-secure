import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Info, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";

const PatientNotifications = () => {
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        apiFetch('/patient/notifications').then(setNotifications).catch(console.error);
    }, []);

    const getIcon = (type: string) => {
        if (type === 'success') return <CheckCircle className="h-5 w-5 text-emerald-500" />;
        if (type === 'error') return <AlertCircle className="h-5 w-5 text-destructive" />;
        if (type === 'warning') return <AlertTriangle className="h-5 w-5 text-amber-500" />;
        return <Info className="h-5 w-5 text-blue-500" />;
    }

    return (
  <DashboardLayout role="patient">
    <ScrollReveal>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Notifications & Actions</h2>
    </ScrollReveal>
    <div className="space-y-4">
      {notifications.length === 0 ? <p className="text-muted-foreground text-sm p-8 glass rounded-xl text-center">You're all caught up! No new notifications.</p> : notifications.map((n, i) => (
        <ScrollReveal key={n.id} delay={i * 80}>
          <div className={`glass rounded-xl p-6 flex items-start gap-5 hover:scale-[1.005] transition-transform`}>
            <div className={`p-3 rounded-xl bg-background shadow-sm border border-border/50`}>
              {getIcon(n.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="font-display font-semibold text-foreground text-base tracking-tight">{n.title}</p>
                <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">{new Date(n.timestamp).toLocaleString(undefined, {dateStyle: 'medium', timeStyle: 'short'})}</span>
              </div>
              <p className="text-[14px] text-muted-foreground leading-relaxed">{n.message}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </DashboardLayout>
);
}

export default PatientNotifications;
