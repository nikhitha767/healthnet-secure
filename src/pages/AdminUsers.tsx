import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { apiFetch } from "@/lib/api";

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const u = await apiFetch('/admin/users');
        setUsers(u);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  const doctors = users.filter((u) => u.role === 'doctor');
  const patients = users.filter((u) => u.role === 'patient');

  return (
    <DashboardLayout role="admin">
      <ScrollReveal>
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">User Management</h2>
      </ScrollReveal>

      <div className="space-y-6">
        <ScrollReveal delay={100}>
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Doctors ({doctors.length})</h3>
            <div className="overflow-x-auto">
              {doctors.length === 0 ? <p className="text-sm text-muted-foreground">No doctors registered yet.</p> : (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Name</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Email</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                </tr></thead>
                <tbody>{doctors.map((d) => (
                  <tr key={d.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-2 text-foreground font-medium">{d.name}</td>
                    <td className="py-3 px-2 text-muted-foreground">{d.email}</td>
                    <td className="py-3 px-2 text-muted-foreground">{d.is_blocked ? "Blocked" : "Active"}</td>
                  </tr>
                ))}</tbody>
              </table>
              )}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Patients ({patients.length})</h3>
            <div className="overflow-x-auto">
              {patients.length === 0 ? <p className="text-sm text-muted-foreground">No patients registered yet.</p> : (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Name</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Email</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                </tr></thead>
                <tbody>{patients.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-2 text-foreground font-medium">{p.name}</td>
                    <td className="py-3 px-2 text-muted-foreground">{p.email}</td>
                    <td className="py-3 px-2 text-muted-foreground">{p.is_blocked ? "Blocked" : "Active"}</td>
                  </tr>
                ))}</tbody>
              </table>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
