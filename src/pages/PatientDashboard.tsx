import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Calendar, FileText, Bell, Shield, MessageSquare, Activity } from "lucide-react";
import { appointments, reports, notifications } from "@/data/dummyData";

const PatientDashboard = () => (
  <DashboardLayout role="patient">
    <div className="space-y-6">
      <ScrollReveal>
        <h2 className="text-2xl font-display font-bold text-foreground">Welcome back, Sarah</h2>
        <p className="text-muted-foreground text-sm mt-1">Here's your health overview for today.</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScrollReveal delay={0}><StatCard title="Upcoming Appointments" value={3} icon={<Calendar className="h-5 w-5" />} /></ScrollReveal>
        <ScrollReveal delay={80}><StatCard title="Medical Reports" value={12} icon={<FileText className="h-5 w-5" />} trend="2 new this week" trendUp /></ScrollReveal>
        <ScrollReveal delay={160}><StatCard title="Unread Messages" value={4} icon={<MessageSquare className="h-5 w-5" />} /></ScrollReveal>
        <ScrollReveal delay={240}><StatCard title="Security Score" value="A+" icon={<Shield className="h-5 w-5" />} glowing /></ScrollReveal>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ScrollReveal delay={100}>
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" /> Upcoming Appointments
            </h3>
            <div className="space-y-3">
              {appointments.slice(0, 3).map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{apt.doctor}</p>
                    <p className="text-xs text-muted-foreground">{apt.date} · {apt.time}</p>
                  </div>
                  <StatusBadge status={apt.status} />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" /> Recent Notifications
            </h3>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${n.read ? "bg-muted/20" : "bg-primary/5 border border-primary/10"}`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? "bg-muted-foreground" : "bg-primary"}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={100}>
        <div className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" /> Recent Reports
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Report</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Type</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Doctor</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-2 text-foreground font-medium">{r.title}</td>
                    <td className="py-3 px-2 text-muted-foreground">{r.type}</td>
                    <td className="py-3 px-2 text-muted-foreground tabular-nums">{r.date}</td>
                    <td className="py-3 px-2 text-muted-foreground">{r.doctor}</td>
                    <td className="py-3 px-2"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </DashboardLayout>
);

export default PatientDashboard;
