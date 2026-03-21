import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusBadge } from "@/components/StatusBadge";
import { Activity } from "lucide-react";
import { systemLogs } from "@/data/dummyData";

const AdminLogs = () => (
  <DashboardLayout role="admin">
    <ScrollReveal>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
        <Activity className="h-6 w-6 text-primary" /> System Logs
      </h2>
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <div className="glass rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Action</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">User</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Timestamp</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">IP Address</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
            </tr></thead>
            <tbody>{systemLogs.map((log) => (
              <tr key={log.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-2 text-foreground font-medium">{log.action}</td>
                <td className="py-3 px-2 text-muted-foreground text-xs">{log.user}</td>
                <td className="py-3 px-2 text-muted-foreground tabular-nums text-xs">{log.timestamp}</td>
                <td className="py-3 px-2 text-muted-foreground tabular-nums text-xs">{log.ip}</td>
                <td className="py-3 px-2"><StatusBadge status={log.status} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </ScrollReveal>
  </DashboardLayout>
);

export default AdminLogs;
