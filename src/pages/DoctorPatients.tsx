import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { apiFetch } from "@/lib/api";

const DoctorPatients = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await apiFetch('/doctor/patients');
        setPatients(data);
      } catch (err) {
        console.error("Error fetching patients", err);
      }
    };
    fetchPatients();
  }, []);

  return (
    <DashboardLayout role="doctor">
      <ScrollReveal>
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">My Assigned Patients</h2>
      </ScrollReveal>
      {patients.length === 0 ? (
        <p className="text-muted-foreground">You currently have no patients assigned. An admin can assign them to you.</p>
      ) : (
      <div className="grid md:grid-cols-2 gap-4">
        {patients.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 80}>
            <div className="glass rounded-xl p-5 hover:scale-[1.01] transition-transform cursor-pointer active:scale-[0.99]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">{p.name.charAt(0).toUpperCase()}</div>
                <div>
                  <p className="font-display font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Role: {p.role}</span>
                <span className="text-primary hover:underline" onClick={() => alert("Go to patient reports via the Reports page")}>View Details</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      )}
    </DashboardLayout>
  );
};

export default DoctorPatients;
