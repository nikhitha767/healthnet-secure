import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusBadge } from "@/components/StatusBadge";
import { Users } from "lucide-react";
import { patients, doctors } from "@/data/dummyData";

const AdminUsers = () => (
  <DashboardLayout role="admin">
    <ScrollReveal>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">User Management</h2>
    </ScrollReveal>

    <div className="space-y-6">
      <ScrollReveal delay={100}>
        <div className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Doctors ({doctors.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Name</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Specialty</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Patients</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
              </tr></thead>
              <tbody>{doctors.map((d) => (
                <tr key={d.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-2 text-foreground font-medium">{d.name}</td>
                  <td className="py-3 px-2 text-muted-foreground">{d.specialty}</td>
                  <td className="py-3 px-2 text-muted-foreground tabular-nums">{d.patients}</td>
                  <td className="py-3 px-2"><StatusBadge status={d.status} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Patients ({patients.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Name</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Condition</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Last Visit</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
              </tr></thead>
              <tbody>{patients.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-2 text-foreground font-medium">{p.name}</td>
                  <td className="py-3 px-2 text-muted-foreground">{p.condition}</td>
                  <td className="py-3 px-2 text-muted-foreground tabular-nums">{p.lastVisit}</td>
                  <td className="py-3 px-2"><StatusBadge status={p.status} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </DashboardLayout>
);

export default AdminUsers;
