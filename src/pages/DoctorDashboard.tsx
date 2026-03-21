import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Users, FileText, MessageSquare, CheckCircle, Clock } from "lucide-react";
import { patients, reports, appointments } from "@/data/dummyData";

const DoctorDashboard = () => (
  <DashboardLayout role="doctor">
    <div className="space-y-6">
      <ScrollReveal>
        <h2 className="text-2xl font-display font-bold text-foreground">Good morning, Dr. Kim</h2>
        <p className="text-muted-foreground text-sm mt-1">You have 4 consultations scheduled today.</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScrollReveal delay={0}><StatCard title="Total Patients" value={42} icon={<Users className="h-5 w-5" />} trend="3 new this week" trendUp /></ScrollReveal>
        <ScrollReveal delay={80}><StatCard title="Pending Reports" value={7} icon={<FileText className="h-5 w-5" />} /></ScrollReveal>
        <ScrollReveal delay={160}><StatCard title="Unread Messages" value={12} icon={<MessageSquare className="h-5 w-5" />} /></ScrollReveal>
        <ScrollReveal delay={240}><StatCard title="Today's Appointments" value={4} icon={<Clock className="h-5 w-5" />} /></ScrollReveal>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ScrollReveal delay={100}>
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" /> Patient List
            </h3>
            <div className="space-y-3">
              {patients.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer active:scale-[0.99]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">{p.avatar}</div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.condition} · Age {p.age}</p>
                    </div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" /> Consultation Requests
            </h3>
            <div className="space-y-3">
              {appointments.map((apt) => (
                <div key={apt.id} className="p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">{apt.patient}</p>
                    <StatusBadge status={apt.status} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{apt.type} · {apt.date} at {apt.time}</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-accent/20 text-accent text-xs font-medium hover:bg-accent/30 transition-colors active:scale-[0.97]">
                      Approve
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-destructive/20 text-destructive text-xs font-medium hover:bg-destructive/30 transition-colors active:scale-[0.97]">
                      Reschedule
                    </button>
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
            <FileText className="h-4 w-4 text-primary" /> Recent Patient Reports
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Report</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Type</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-2 text-foreground font-medium">{r.title}</td>
                    <td className="py-3 px-2 text-muted-foreground">{r.type}</td>
                    <td className="py-3 px-2 text-muted-foreground tabular-nums">{r.date}</td>
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

export default DoctorDashboard;
