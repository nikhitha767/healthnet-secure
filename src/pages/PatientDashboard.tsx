import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Calendar, FileText, Bell, Shield, MessageSquare, Activity, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { apiFetch, getUser } from "@/lib/api";

const PatientDashboard = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const user = getUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportsData, notifsData] = await Promise.all([
          apiFetch('/patient/reports'),
          apiFetch('/patient/notifications')
        ]);
        setReports(reportsData);
        setNotifications(notifsData);
      } catch (err) {
        console.error("Error fetching patient dashboard data", err);
      }
    };
    fetchData();
  }, []);

  const getIcon = (type: string) => {
      if (type === 'success') return <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />;
      if (type === 'error') return <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />;
      if (type === 'warning') return <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />;
      return <Info className="h-4 w-4 text-blue-500 mt-0.5" />;
  }

  return (
    <DashboardLayout role="patient">
      <div className="space-y-6">
        <ScrollReveal>
          <h2 className="text-2xl font-display font-bold text-foreground">Welcome back, {user?.name || 'Patient'}</h2>
          <p className="text-muted-foreground text-sm mt-1">Here's your health summary data directly from the system.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ScrollReveal delay={0}><StatCard title="Medical Reports" value={reports.length} icon={<FileText className="h-5 w-5" />} /></ScrollReveal>
          <ScrollReveal delay={80}><StatCard title="Notifications" value={notifications.length} icon={<Bell className="h-5 w-5" />} /></ScrollReveal>
          <ScrollReveal delay={160}><StatCard title="Messages" value={"Encrypted"} icon={<MessageSquare className="h-5 w-5" />} /></ScrollReveal>
          <ScrollReveal delay={240}><StatCard title="Security Status" value="Secured" icon={<Shield className="h-5 w-5" />} glowing /></ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <ScrollReveal delay={100}>
            <div className="glass rounded-xl p-6 h-full border border-border/50 bg-gradient-to-br from-background to-muted/20">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" /> Active Notifications
              </h3>
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-4 text-center">No notifications at the moment.</p>
                ) : notifications.slice(0, 4).map((n) => (
                  <div key={n.id} className="flex items-start gap-3 p-4 rounded-xl transition-all border border-border/50 bg-surface/50 hover:bg-muted/50 cursor-default shadow-sm hover:shadow-md">
                    {getIcon(n.type)}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                         <p className="text-sm font-semibold text-foreground leading-tight">{n.title}</p>
                         <p className="text-[10px] text-muted-foreground tabular-nums whitespace-nowrap ml-2">{new Date(n.timestamp).toLocaleDateString()}</p>
                      </div>
                      <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass rounded-xl p-6 h-full border border-border/50 bg-gradient-to-br from-background to-muted/20">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" /> Recent Reports
              </h3>
              <div className="overflow-x-auto">
                {reports.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-4 text-center">No reports available. Please upload a report.</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 text-muted-foreground font-medium">Report</th>
                        <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((r) => (
                        <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                          <td className="py-3 px-2 text-foreground font-medium">{r.report_name}</td>
                          <td className="py-3 px-2 text-muted-foreground tabular-nums">{new Date(r.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
