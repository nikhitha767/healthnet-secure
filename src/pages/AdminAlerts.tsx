import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusBadge } from "@/components/StatusBadge";
import { AlertTriangle } from "lucide-react";
import { apiFetch } from "@/lib/api";

const AdminAlerts = () => {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const a = await apiFetch('/admin/alerts');
        setAlerts(a);
      } catch (err) {
        console.error("Error fetching alerts", err);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <DashboardLayout role="admin">
      <ScrollReveal>
        <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-warning" /> System Alerts
        </h2>
      </ScrollReveal>
      <div className="space-y-4">
        {alerts.length === 0 ? <p className="text-muted-foreground">No alerts active in the system.</p> : alerts.map((alert, i) => (
          <ScrollReveal key={alert.id} delay={i * 80}>
            <div className="glass rounded-xl p-6 border-l-4 hover:scale-[1.005] transition-transform" style={{
              borderLeftColor: alert.severity === "Critical" ? "hsl(0 84% 60%)" : alert.severity === "High" ? "hsl(0 84% 60%)" : alert.severity === "Medium" ? "hsl(38 92% 50%)" : "hsl(168 84% 49%)"
            }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-display font-semibold text-foreground">{alert.alert_type}</p>
                </div>
                <div className="flex gap-2">
                  <StatusBadge status={alert.severity} />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>Associated User ID: {alert.user_id}</span>
                <span className="tabular-nums">{new Date(alert.created_at).toLocaleString()}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AdminAlerts;
