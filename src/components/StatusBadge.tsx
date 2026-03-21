import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusColors: Record<string, string> = {
  Active: "bg-accent/20 text-accent",
  Online: "bg-accent/20 text-accent",
  Completed: "bg-accent/20 text-accent",
  Success: "bg-accent/20 text-accent",
  Confirmed: "bg-accent/20 text-accent",
  Resolved: "bg-accent/20 text-accent",
  "Follow-up": "bg-primary/20 text-primary",
  Pending: "bg-warning/20 text-warning",
  "Pending Review": "bg-warning/20 text-warning",
  "In Progress": "bg-primary/20 text-primary",
  Investigating: "bg-warning/20 text-warning",
  "Under Review": "bg-warning/20 text-warning",
  Scheduled: "bg-primary/20 text-primary",
  Monitoring: "bg-primary/20 text-primary",
  Away: "bg-muted text-muted-foreground",
  Critical: "bg-destructive/20 text-destructive",
  High: "bg-destructive/20 text-destructive",
  Medium: "bg-warning/20 text-warning",
  Low: "bg-accent/20 text-accent",
  Urgent: "bg-destructive/20 text-destructive",
  Blocked: "bg-destructive/20 text-destructive",
  Quarantined: "bg-warning/20 text-warning",
  Failed: "bg-destructive/20 text-destructive",
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => (
  <span className={cn(
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    statusColors[status] || "bg-muted text-muted-foreground",
    className
  )}>
    {status}
  </span>
);
