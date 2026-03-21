import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusBadge } from "@/components/StatusBadge";
import { CheckCircle } from "lucide-react";
import { appointments } from "@/data/dummyData";

const DoctorConsultations = () => (
  <DashboardLayout role="doctor">
    <ScrollReveal>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Consultations</h2>
    </ScrollReveal>
    <div className="space-y-4">
      {appointments.map((apt, i) => (
        <ScrollReveal key={apt.id} delay={i * 80}>
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-display font-semibold text-foreground">{apt.patient}</p>
                <p className="text-sm text-muted-foreground">{apt.type} · {apt.date} at {apt.time}</p>
              </div>
              <StatusBadge status={apt.status} />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent/20 text-accent text-sm font-medium hover:bg-accent/30 transition-colors active:scale-[0.97]">
                <CheckCircle className="h-3.5 w-3.5" /> Approve
              </button>
              <button className="px-4 py-2 rounded-lg bg-muted/50 text-muted-foreground text-sm font-medium hover:bg-muted transition-colors active:scale-[0.97]">
                Reschedule
              </button>
              <button className="px-4 py-2 rounded-lg bg-destructive/20 text-destructive text-sm font-medium hover:bg-destructive/30 transition-colors active:scale-[0.97]">
                Decline
              </button>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </DashboardLayout>
);

export default DoctorConsultations;
