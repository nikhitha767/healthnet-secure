import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Upload, FileText, CheckCircle, Shield } from "lucide-react";

const UploadReport = () => {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
    setTimeout(() => setUploaded(false), 3000);
  };

  return (
    <DashboardLayout role="patient">
      <div className="max-w-2xl mx-auto space-y-6">
        <ScrollReveal>
          <h2 className="text-2xl font-display font-bold text-foreground">Upload Medical Report</h2>
          <p className="text-muted-foreground text-sm mt-1">Securely upload your medical documents. All files are encrypted.</p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div
            className={`glass rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
              dragging ? "border-primary bg-primary/5 scale-[1.01]" : "hover:border-primary/30"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleUpload(); }}
            onClick={handleUpload}
          >
            {uploaded ? (
              <div className="animate-scale-in">
                <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                <p className="font-display font-semibold text-foreground text-lg">Upload Successful!</p>
                <p className="text-muted-foreground text-sm mt-2">Your file has been securely encrypted and stored.</p>
              </div>
            ) : (
              <>
                <Upload className="h-16 w-16 text-primary/60 mx-auto mb-4" />
                <p className="font-display font-semibold text-foreground text-lg">Drag & drop your files here</p>
                <p className="text-muted-foreground text-sm mt-2">or click to browse. Supports PDF, DICOM, JPG, PNG</p>
                <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-accent">
                  <Shield className="h-3.5 w-3.5" /> AES-256 encrypted upload
                </div>
              </>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> Recently Uploaded
            </h3>
            <div className="space-y-3">
              {[
                { name: "blood_panel_march.pdf", size: "2.4 MB", date: "Mar 18, 2026" },
                { name: "chest_xray_scan.dcm", size: "15.1 MB", date: "Mar 15, 2026" },
                { name: "prescription_update.pdf", size: "0.8 MB", date: "Mar 10, 2026" },
              ].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size} · {file.date}</p>
                    </div>
                  </div>
                  <span className="text-xs text-accent flex items-center gap-1"><Shield className="h-3 w-3" /> Encrypted</span>
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
