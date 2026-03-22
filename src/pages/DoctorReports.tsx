import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FileText } from "lucide-react";
import { apiFetch } from "@/lib/api";

const DoctorReports = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await apiFetch('/doctor/patients');
        setPatients(data);
        if (data.length > 0) {
          setSelectedPatientId(data[0].id.toString());
        }
      } catch (err) {
        console.error("Error fetching patients", err);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      if (!selectedPatientId) return;
      try {
        const data = await apiFetch(`/doctor/patients/${selectedPatientId}/reports`);
        setReports(data);
      } catch (err) {
        console.error("Error fetching reports", err);
      }
    };
    fetchReports();
  }, [selectedPatientId]);

  return (
    <DashboardLayout role="doctor">
      <ScrollReveal>
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">Patient Reports</h2>
      </ScrollReveal>
      
      {patients.length > 0 && (
        <div className="mb-6 flex items-center gap-4">
          <label className="text-sm font-medium">Select Patient:</label>
          <select 
            className="rounded-lg bg-muted/50 border border-border text-sm p-2"
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.email})</option>
            ))}
          </select>
        </div>
      )}

      <ScrollReveal delay={100}>
        <div className="glass rounded-xl p-6">
          <div className="overflow-x-auto">
            {reports.length === 0 ? (
              <p className="text-sm text-muted-foreground">{patients.length === 0 ? "No patients assigned to you." : "No reports found for this patient."}</p>
            ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Report File Name</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Report File Name</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date Uploaded</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Attachment</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => {
                  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(r.file_path);
                  const fileUrl = `http://127.0.0.1:5000/uploads/${r.file_path}`;
                  return (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-2 text-foreground font-medium"><div className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary" />{r.report_name}</div></td>
                    <td className="py-3 px-2 text-muted-foreground tabular-nums">{new Date(r.created_at).toLocaleString()}</td>
                    <td className="py-3 px-2 text-muted-foreground">
                      {isImage ? (
                        <a href={fileUrl} target="_blank" rel="noreferrer" className="block w-fit">
                            <img src={fileUrl} alt={r.report_name} className="h-16 w-16 object-cover rounded border border-border border-2 hover:scale-110 shadow-sm transition-transform cursor-pointer" />
                        </a>
                      ) : (
                        <a href={fileUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs bg-primary/10 px-3 py-1.5 rounded-md font-medium block w-fit">
                            View Document
                        </a>
                      )}
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
            )}
          </div>
        </div>
      </ScrollReveal>
    </DashboardLayout>
  );
};

export default DoctorReports;
