import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Upload, FileText, CheckCircle, Shield } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const UploadReport = () => {
  const { toast } = useToast();
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [reports, setReports] = useState<any[]>([]);

  const fetchReports = async () => {
    try {
      const data = await apiFetch('/patient/reports');
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('report_name', file.name);

      await apiFetch('/patient/reports/upload', {
        method: 'POST',
        body: formData,
      });

      setUploaded(true);
      toast({ title: "Success", description: "Report uploaded securely." });
      fetchReports();
      setTimeout(() => setUploaded(false), 3000);
    } catch (err: any) {
      toast({ variant: "destructive", title: "Upload Failed", description: err.message });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <DashboardLayout role="patient">
      <div className="max-w-2xl mx-auto space-y-6">
        <ScrollReveal>
          <h2 className="text-2xl font-display font-bold text-foreground">Upload Medical Report</h2>
          <p className="text-muted-foreground text-sm mt-1">Securely upload your real medical documents directly to the backend.</p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div
            className={`glass rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
              dragging ? "border-primary bg-primary/5 scale-[1.01]" : "hover:border-primary/30"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { 
                e.preventDefault(); 
                setDragging(false); 
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
            }}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
            />
            {uploaded ? (
              <div className="animate-scale-in">
                <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                <p className="font-display font-semibold text-foreground text-lg">Upload Successful!</p>
                <p className="text-muted-foreground text-sm mt-2">Your file has been securely uploaded and stored.</p>
              </div>
            ) : (
              <>
                <Upload className="h-16 w-16 text-primary/60 mx-auto mb-4" />
                <p className="font-display font-semibold text-foreground text-lg">Drag & drop your files here</p>
                <p className="text-muted-foreground text-sm mt-2">or click to browse. Supports PDF, JPG, PNG</p>
                <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-accent">
                  <Shield className="h-3.5 w-3.5" /> Direct to Secure Backend
                </div>
              </>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> Past Uploads
            </h3>
            <div className="space-y-3">
              {reports.length === 0 ? <p className="text-sm text-muted-foreground">No uploads found.</p> : reports.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{r.report_name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="text-xs text-accent flex items-center gap-1"><Shield className="h-3 w-3" /> Securely Stored</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </DashboardLayout>
  );
};

export default UploadReport;
