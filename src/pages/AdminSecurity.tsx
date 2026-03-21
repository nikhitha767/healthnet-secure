import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusBadge } from "@/components/StatusBadge";
import { Shield } from "lucide-react";
import { securityAlerts } from "@/data/dummyData";

const AdminSecurity = () => (
  <DashboardLayout role="admin">
    <ScrollReveal>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" /> Security Alerts
      </h2>
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <div className="glass rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Alert</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Severity</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Source</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Time</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
            </tr></thead>
            <tbody>{securityAlerts.map((a) => (
              <tr key={a.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-2"><div><p className="text-foreground font-medium">{a.type}</p><p className="text-xs text-muted-foreground">{a.description}</p></div></td>
                <td className="py-3 px-2"><StatusBadge status={a.severity} /></td>
                <td className="py-3 px-2 text-muted-foreground text-xs">{a.source}</td>
                <td className="py-3 px-2 text-muted-foreground text-xs tabular-nums">{a.timestamp}</td>
                <td className="py-3 px-2"><StatusBadge status={a.status} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </ScrollReveal>
  </DashboardLayout>
);

export default AdminSecurity;
