import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusBadge } from "@/components/StatusBadge";
import { AlertTriangle } from "lucide-react";
import { securityAlerts } from "@/data/dummyData";

const AdminAlerts = () => (
  <DashboardLayout role="admin">
    <ScrollReveal>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
        <AlertTriangle className="h-6 w-6 text-warning" /> AI Threat Alerts
      </h2>
    </ScrollReveal>
    <div className="space-y-4">
      {securityAlerts.map((alert, i) => (
        <ScrollReveal key={alert.id} delay={i * 80}>
          <div className="glass rounded-xl p-6 border-l-4 hover:scale-[1.005] transition-transform" style={{
            borderLeftColor: alert.severity === "Critical" ? "hsl(0 84% 60%)" : alert.severity === "High" ? "hsl(0 84% 60%)" : alert.severity === "Medium" ? "hsl(38 92% 50%)" : "hsl(168 84% 49%)"
          }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-display font-semibold text-foreground">{alert.type}</p>
                <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
              </div>
              <div className="flex gap-2">
                <StatusBadge status={alert.severity} />
                <StatusBadge status={alert.status} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span>Source: {alert.source}</span>
              <span className="tabular-nums">{alert.timestamp}</span>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </DashboardLayout>
);

export default AdminAlerts;
