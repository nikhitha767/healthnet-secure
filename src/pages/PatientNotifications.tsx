import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Bell } from "lucide-react";
import { notifications } from "@/data/dummyData";

const PatientNotifications = () => (
  <DashboardLayout role="patient">
    <ScrollReveal>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Notifications</h2>
    </ScrollReveal>
    <div className="space-y-3">
      {notifications.map((n, i) => (
        <ScrollReveal key={n.id} delay={i * 80}>
          <div className={`glass rounded-xl p-5 flex items-start gap-4 hover:scale-[1.005] transition-transform ${!n.read ? "border border-primary/20" : ""}`}>
            <div className={`p-2.5 rounded-lg ${!n.read ? "bg-primary/10" : "bg-muted/50"}`}>
              <Bell className={`h-4 w-4 ${!n.read ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-display font-semibold text-foreground text-sm">{n.title}</p>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </DashboardLayout>
);

export default PatientNotifications;
