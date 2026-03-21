import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusBadge } from "@/components/StatusBadge";
import { Users } from "lucide-react";
import { patients } from "@/data/dummyData";

const DoctorPatients = () => (
  <DashboardLayout role="doctor">
    <ScrollReveal>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">My Patients</h2>
    </ScrollReveal>
    <div className="grid md:grid-cols-2 gap-4">
      {patients.map((p, i) => (
        <ScrollReveal key={p.id} delay={i * 80}>
          <div className="glass rounded-xl p-5 hover:scale-[1.01] transition-transform cursor-pointer active:scale-[0.99]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">{p.avatar}</div>
              <div>
                <p className="font-display font-semibold text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">Age {p.age}</p>
              </div>
              <StatusBadge status={p.status} className="ml-auto" />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{p.condition}</span>
              <span>Last visit: {p.lastVisit}</span>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </DashboardLayout>
);

export default DoctorPatients;
