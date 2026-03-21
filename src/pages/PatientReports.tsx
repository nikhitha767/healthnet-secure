import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatusBadge } from "@/components/StatusBadge";
import { FileText } from "lucide-react";
import { reports } from "@/data/dummyData";

const PatientReports = () => (
  <DashboardLayout role="patient">
    <ScrollReveal>
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Medical Reports</h2>
    </ScrollReveal>
    <ScrollReveal delay={100}>
      <div className="glass rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Report</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Type</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Doctor</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-2 text-foreground font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-primary" />{r.title}</td>
                  <td className="py-3 px-2 text-muted-foreground">{r.type}</td>
                  <td className="py-3 px-2 text-muted-foreground tabular-nums">{r.date}</td>
                  <td className="py-3 px-2 text-muted-foreground">{r.doctor}</td>
                  <td className="py-3 px-2"><StatusBadge status={r.status} /></td>
                  <td className="py-3 px-2">
                    <button className="text-xs text-primary hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ScrollReveal>
  </DashboardLayout>
);

export default PatientReports;
