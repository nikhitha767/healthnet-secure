import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  className?: string;
  glowing?: boolean;
}

export const StatCard = ({ title, value, icon, trend, trendUp, className, glowing }: StatCardProps) => (
  <div className={cn(
    "glass rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group cursor-default",
    glowing && "animate-pulse-glow",
    className
  )}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground font-body">{title}</p>
        <p className="text-3xl font-bold font-display mt-2 text-foreground tabular-nums">{value}</p>
        {trend && (
          <p className={cn("text-xs mt-2 font-medium", trendUp ? "text-accent" : "text-destructive")}>
            {trendUp ? "↑" : "↓"} {trend}
          </p>
        )}
      </div>
      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
    </div>
  </div>
);
