import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FileText } from "lucide-react";
import { apiFetch } from "@/lib/api";

const PatientReports = () => {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await apiFetch('/patient/reports');
        setReports(data);
      } catch (err) {
        console.error("Error fetching reports", err);
      }
    };
    fetchReports();
  }, []);

  return (
    <DashboardLayout role="patient">
      <ScrollReveal>
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">Your Medical Reports</h2>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <div className="glass rounded-xl p-6">
          <div className="overflow-x-auto">
            {reports.length === 0 ? (
              <p className="text-sm text-muted-foreground">No medical reports found. You can upload one in the Upload Report section.</p>
            ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Report Name</th>
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

export default PatientReports;
