import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusBadge } from "@/components/StatusBadge";
import { Calendar, UserPlus, Award, Phone } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const PatientAppointments = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  
  // Form state
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await apiFetch('/patient/appointments');
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const data = await apiFetch('/patient/doctors');
      setDoctors(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctorId || !date || !time) {
        toast({ variant: "destructive", title: "Error", description: "Please select a doctor, date, and time."});
        return;
    }
    
    setBooking(true);
    try {
      await apiFetch('/patient/appointments', {
        method: 'POST',
        body: JSON.stringify({ doctor_id: selectedDoctorId, appointment_date: date, appointment_time: time })
      });
      toast({ title: "Success", description: "Appointment booked successfully!" });
      setDate("");
      setTime("");
      setSelectedDoctorId(""); // Reset selection
      fetchAppointments();
      
      // Scroll to appointments
      document.getElementById('appointments-list')?.scrollIntoView({ behavior: 'smooth' });
    } catch(err: any) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setBooking(false);
    }
  };

  return (
    <DashboardLayout role="patient">
      <ScrollReveal>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">Available Doctors</h2>
        <p className="text-muted-foreground text-sm mb-6">Select a specialist from our network to book your consultation.</p>
      </ScrollReveal>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {doctors.length === 0 ? (
             <p className="text-sm text-muted-foreground">No doctors are currently available in the network.</p>
          ) : doctors.map((d, i) => (
            <ScrollReveal key={d.id} delay={i * 50}>
              <div 
                className={`glass flex flex-col rounded-xl p-5 transition-all cursor-pointer border-2 ${selectedDoctorId === d.id.toString() ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-transparent hover:border-primary/30'}`}
                onClick={() => setSelectedDoctorId(d.id.toString())}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg uppercase">
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground text-lg">{d.name.startsWith('Dr') ? d.name : `Dr. ${d.name}`}</p>
                    <p className="text-sm text-primary font-medium">{d.specialty}</p>
                  </div>
                </div>
                <div className="space-y-1.5 mt-2 flex-grow">
                   <p className="text-xs text-muted-foreground flex items-center gap-2"><Award className="h-3 w-3"/> {d.education} ({d.experience} Years Exp)</p>
                   <p className="text-xs text-muted-foreground flex items-center gap-2"><Phone className="h-3 w-3"/> {d.contact_number}</p>
                </div>
                <button 
                  type="button"
                  className={`mt-4 w-full py-2 rounded-lg text-sm font-medium transition-colors ${selectedDoctorId === d.id.toString() ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground'}`}
                  onClick={(e) => { e.stopPropagation(); setSelectedDoctorId(d.id.toString()); }}
                >
                  {selectedDoctorId === d.id.toString() ? 'Selected for Booking !' : 'Select Doctor'}
                </button>
              </div>
            </ScrollReveal>
          ))}
      </div>

      {selectedDoctorId && (
        <ScrollReveal delay={100}>
          <div className="glass rounded-xl p-6 mb-8 border border-primary/20 animate-in fade-in zoom-in duration-300">
            <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" /> Book Consultation
            </h3>
            
            <form onSubmit={handleBook} className="grid md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Select Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Select Time</label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button
                type="submit"
                disabled={booking}
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 glow-teal-sm"
              >
                {booking ? "Confirming..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </ScrollReveal>
      )}
      
      <ScrollReveal delay={200}>
         <div id="appointments-list">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">Your Past & Upcoming Appointments</h3>
            {appointments.length === 0 ? (
              <p className="text-muted-foreground text-sm glass p-6 rounded-xl">You have no appointments scheduled.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {appointments.map((apt, i) => (
                  <div key={apt.id} className="glass rounded-xl p-5 flex items-center justify-between hover:scale-[1.01] transition-transform">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10"><Calendar className="h-5 w-5 text-primary" /></div>
                      <div>
                        <p className="font-display font-semibold text-foreground text-base">{apt.doctor_name}</p>
                        <p className="text-sm text-primary font-medium mt-0.5">{apt.appointment_date} at {apt.appointment_time}</p>
                      </div>
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>
                ))}
              </div>
            )}
         </div>
      </ScrollReveal>

    </DashboardLayout>
  );
};

export default PatientAppointments;
