import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusBadge } from "@/components/StatusBadge";
import { Activity } from "lucide-react";
import { apiFetch } from "@/lib/api";

const AdminLogs = () => {
    const [systemLogs, setSystemLogs] = useState<any[]>([]);

    useEffect(() => {
        apiFetch('/admin/logs').then(setSystemLogs).catch(console.error);
    }, []);

    return (
  <DashboardLayout role="admin">
    <ScrollReveal>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
        <Activity className="h-6 w-6 text-primary" /> System Audit Logs
      </h2>
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <div className="glass rounded-xl p-6">
        <div className="overflow-x-auto">
          {systemLogs.length === 0 ? <p className="text-muted-foreground text-sm">No system logs available.</p> : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Action Event</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">User Profile</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Timestamp</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">IP Address</th>
              <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
            </tr></thead>
            <tbody>{systemLogs.map((log) => (
              <tr key={log.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-2 text-foreground font-medium">{log.action}</td>
                <td className="py-3 px-2 text-muted-foreground text-xs">{log.user}</td>
                <td className="py-3 px-2 text-muted-foreground tabular-nums text-xs">{new Date(log.timestamp).toLocaleString(undefined, {dateStyle: 'short', timeStyle: 'medium'})}</td>
                <td className="py-3 px-2 text-muted-foreground tabular-nums text-xs">{log.ip}</td>
                <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                        {log.status}
                    </span>
                </td>
              </tr>
            ))}</tbody>
          </table>
          )}
        </div>
      </div>
    </ScrollReveal>
  </DashboardLayout>
);
}

export default AdminLogs;
