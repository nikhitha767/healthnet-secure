import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Users, FileText, MessageSquare, CheckCircle, Clock } from "lucide-react";
import { apiFetch, getUser } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const DoctorDashboard = () => {
  const { toast } = useToast();
  const [patients, setPatients] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(undefined);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();
  
  // Profile Form state
  const [specialty, setSpecialty] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsData, profileData, aptData] = await Promise.all([
          apiFetch('/doctor/patients'),
          apiFetch('/doctor/profile'),
          apiFetch('/doctor/appointments')
        ]);
        setPatients(patientsData);
        setProfile(profileData);
        setAppointments(aptData);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiFetch('/doctor/profile', {
        method: 'POST',
        body: JSON.stringify({ specialty, education, experience: Number(experience), contact_number: contactNumber })
      });
      toast({ title: "Profile Saved", description: "Your doctor profile is now active!" });
      // Reload profile
      const newProfile = await apiFetch('/doctor/profile');
      setProfile(newProfile);
    } catch(err: any) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  if (!profile) {
    return (
      <DashboardLayout role="doctor">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-display font-bold text-foreground">Complete Your Profile</h2>
            <p className="text-muted-foreground text-sm">Please provide your medical details before accessing the dashboard. This allows patients to reliably see your expertise.</p>
            
            <div className="glass rounded-xl p-6">
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Specialty</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cardiology, Pediatrics"
                    value={specialty}
                    onChange={e => setSpecialty(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Education (Degrees)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MBBS, MD - General Medicine"
                    value={education}
                    onChange={e => setEducation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Years of Experience</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 5"
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Contact Number (For Clinic)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 9876543210"
                    value={contactNumber}
                    onChange={e => setContactNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 glow-teal-sm"
                >
                  {submitting ? "Saving..." : "Save Profile & Continue"}
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        <ScrollReveal>
          <h2 className="text-2xl font-display font-bold text-foreground">Good morning, Dr. {user?.name || 'Doctor'}</h2>
          <p className="text-muted-foreground text-sm mt-1">{profile.specialty} Specialization · {profile.experience} Years Experience</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ScrollReveal delay={0}><StatCard title="Total Assigned Patients" value={patients.length} icon={<Users className="h-5 w-5" />} /></ScrollReveal>
          <ScrollReveal delay={80}><StatCard title="Total Appointments" value={appointments.length} icon={<Clock className="h-5 w-5" />} /></ScrollReveal>
          <ScrollReveal delay={160}><StatCard title="Unread Messages" value={0} icon={<MessageSquare className="h-5 w-5" />} /></ScrollReveal>
          <ScrollReveal delay={240}><StatCard title="Pending Reports" value={0} icon={<FileText className="h-5 w-5" />} /></ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <ScrollReveal delay={100}>
            <div className="glass rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> Assigned Patients
              </h3>
              <div className="space-y-3">
                {patients.length === 0 ? <p className="text-sm text-muted-foreground">No patients assigned yet.</p> : patients.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer active:scale-[0.99]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">{p.name.charAt(0).toUpperCase()}</div>
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
                <CheckCircle className="h-4 w-4 text-primary" /> Upcoming Appointments
              </h3>
              <div className="space-y-3 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground">
                {appointments.length === 0 ? "You do not have any patient appointments." : (
                  appointments.slice(0, 5).map(apt => (
                    <div key={apt.id} className="border-b border-border/50 pb-2 mb-2 last:border-0 last:pb-0 last:mb-0">
                      <div className="flex justify-between font-medium text-foreground">
                        <span>{apt.patient_name}</span>
                        <StatusBadge status={apt.status} />
                      </div>
                      <p className="text-xs mt-1">Date: {apt.appointment_date} @ {apt.appointment_time}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
