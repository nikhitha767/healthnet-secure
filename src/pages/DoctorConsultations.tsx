import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusBadge } from "@/components/StatusBadge";
import { CheckCircle, XCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const DoctorConsultations = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await apiFetch('/doctor/appointments');
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
        await apiFetch(`/doctor/appointments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
        toast({ title: "Status Updated", description: `Appointment marked as ${status}.` });
        fetchAppointments();
    } catch (err: any) {
        toast({ variant: "destructive", title: "Error", description: err.message });
    }
  }

  return (
    <DashboardLayout role="doctor">
      <ScrollReveal>
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">Patient Consultations</h2>
      </ScrollReveal>
      <div className="space-y-4">
        {appointments.length === 0 ? <p className="text-muted-foreground glass p-6 rounded-xl">You have no upcoming patient consultations.</p> : appointments.map((apt, i) => (
          <ScrollReveal key={apt.id} delay={i * 80}>
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-display font-semibold text-foreground text-lg">{apt.patient_name}</p>
                  <p className="text-sm text-accent mt-0.5">Consultation · {apt.appointment_date} at {apt.appointment_time}</p>
                </div>
                <StatusBadge status={apt.status} />
              </div>
              <div className="flex gap-2">
                {apt.status === 'Pending' && (
                    <>
                      <button onClick={() => handleUpdateStatus(apt.id, 'Confirmed')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent/20 text-accent text-sm font-medium hover:bg-accent/30 transition-colors active:scale-[0.97]">
                        <CheckCircle className="h-4 w-4" /> Approve
                      </button>
                      <button onClick={() => handleUpdateStatus(apt.id, 'Cancelled')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-destructive/20 text-destructive text-sm font-medium hover:bg-destructive/30 transition-colors active:scale-[0.97]">
                        <XCircle className="h-4 w-4" /> Decline
                      </button>
                    </>
                )}
                {apt.status === 'Confirmed' && (
                      <button onClick={() => handleUpdateStatus(apt.id, 'Completed')} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-colors active:scale-[0.97]">
                        <CheckCircle className="h-4 w-4" /> Mark as Completed
                      </button>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DoctorConsultations;
