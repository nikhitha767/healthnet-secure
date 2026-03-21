import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusBadge } from "@/components/StatusBadge";
import { Calendar } from "lucide-react";
import { appointments } from "@/data/dummyData";

const PatientAppointments = () => (
  <DashboardLayout role="patient">
    <ScrollReveal>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Appointments</h2>
    </ScrollReveal>
    <div className="grid gap-4">
      {appointments.map((apt, i) => (
        <ScrollReveal key={apt.id} delay={i * 80}>
          <div className="glass rounded-xl p-6 flex items-center justify-between hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10"><Calendar className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="font-display font-semibold text-foreground">{apt.doctor}</p>
                <p className="text-sm text-muted-foreground">{apt.type} · {apt.date} at {apt.time}</p>
              </div>
            </div>
            <StatusBadge status={apt.status} />
          </div>
        </ScrollReveal>
      ))}
    </div>
  </DashboardLayout>
);

export default PatientAppointments;
