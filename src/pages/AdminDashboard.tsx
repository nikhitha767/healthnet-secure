import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Users, Shield, Activity, Database, AlertTriangle, Lock } from "lucide-react";
import { apiFetch } from "@/lib/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [u, a, r] = await Promise.all([
          apiFetch('/admin/users'),
          apiFetch('/admin/alerts'),
          apiFetch('/admin/reports')
        ]);
        setUsers(u);
        setAlerts(a);
        setReports(r);
      } catch (err) {
        console.error("Error fetching admin data", err);
      }
    };
    fetchData();
  }, []);

  const doctors = users.filter((u) => u.role === 'doctor');
  const patients = users.filter((u) => u.role === 'patient');

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <ScrollReveal>
          <h2 className="text-2xl font-display font-bold text-foreground">System Overview</h2>
          <p className="text-muted-foreground text-sm mt-1">Real-time monitoring and security analytics.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ScrollReveal delay={0}><StatCard title="Total Users" value={users.length} icon={<Users className="h-5 w-5" />} trend="Active Now" trendUp /></ScrollReveal>
          <ScrollReveal delay={80}><StatCard title="Total Alerts" value={alerts.length} icon={<Shield className="h-5 w-5" />} /></ScrollReveal>
          <ScrollReveal delay={160}><StatCard title="Platform Uptime" value="100%" icon={<Activity className="h-5 w-5" />} glowing /></ScrollReveal>
          <ScrollReveal delay={240}><StatCard title="Reports Stored" value={reports.length} icon={<Database className="h-5 w-5" />} /></ScrollReveal>
        </div>

        {/* Charts area */}
        <div className="grid lg:grid-cols-3 gap-6">
          <ScrollReveal delay={100} className="lg:col-span-2">
            <div className="glass rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" /> Network Activity (7 Days)
              </h3>
              <div className="h-48 flex items-end justify-between gap-2 px-4">
                {[65, 42, 78, 55, 89, 72, 94].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full rounded-t-md bg-primary/80 transition-all duration-500 hover:bg-primary" style={{ height: `${val * 1.8}px` }} />
                    <span className="text-xs text-muted-foreground">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" /> Security Score
              </h3>
              <div className="flex items-center justify-center py-4">
                <div className="relative w-36 h-36">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(215 25% 27%)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(168 84% 49%)" strokeWidth="8" strokeDasharray={`${96 * 2.64} ${264}`} strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-display font-bold text-foreground tabular-nums">96</span>
                    <span className="text-xs text-muted-foreground">out of 100</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 mt-2">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Encryption</span><span className="text-accent">Excellent</span></div>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Access Control</span><span className="text-accent">Strong</span></div>
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Compliance</span><span className="text-primary">Active</span></div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Users & Security */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ScrollReveal delay={100}>
            <div className="glass rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> System Users
              </h3>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Doctors : {doctors.length}</p>
                {doctors.slice(0, 3).map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">{d.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground mt-4 mb-3 font-medium uppercase tracking-wider">Patients : {patients.length}</p>
                {patients.slice(0, 3).map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">{p.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" /> Security Alerts
              </h3>
              <div className="space-y-3">
                {alerts.length === 0 ? <p className="text-sm text-muted-foreground">No alerts active currently.</p> : alerts.slice(0, 4).map((alert) => (
                  <div key={alert.id} className="p-3 rounded-lg bg-muted/30 border-l-2 border-transparent hover:bg-muted/50 transition-colors" style={{
                    borderLeftColor: alert.severity === "Critical" ? "hsl(0 84% 60%)" : alert.severity === "High" ? "hsl(0 84% 60%)" : alert.severity === "Medium" ? "hsl(38 92% 50%)" : "hsl(168 84% 49%)"
                  }}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground">{alert.alert_type}</p>
                      <StatusBadge status={alert.severity} />
                    </div>
                    <p className="text-xs text-muted-foreground">User ID: {alert.user_id}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground tabular-nums">{new Date(alert.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
