import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FileText, MessageSquare, Bell, Settings, User, LogOut, Shield,
  Users, Activity, Calendar, Upload, AlertTriangle, ClipboardList, Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "patient" | "doctor" | "admin";
}

const navItems = {
  patient: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/patient" },
    { label: "Reports", icon: FileText, path: "/patient/reports" },
    { label: "Upload Report", icon: Upload, path: "/patient/upload" },
    { label: "Chat", icon: MessageSquare, path: "/patient/chat" },
    { label: "Appointments", icon: Calendar, path: "/patient/appointments" },
    { label: "Notifications", icon: Bell, path: "/patient/notifications" },
  ],
  doctor: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/doctor" },
    { label: "Patients", icon: Users, path: "/doctor/patients" },
    { label: "Reports", icon: FileText, path: "/doctor/reports" },
    { label: "Chat", icon: MessageSquare, path: "/doctor/chat" },
    { label: "Consultations", icon: ClipboardList, path: "/doctor/consultations" },
  ],
  admin: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Users", icon: Users, path: "/admin/users" },
    { label: "Security", icon: Shield, path: "/admin/security" },
    { label: "Logs", icon: Activity, path: "/admin/logs" },
    { label: "Alerts", icon: AlertTriangle, path: "/admin/alerts" },
  ],
};

const roleLabels = { patient: "Patient Portal", doctor: "Doctor Portal", admin: "Admin Console" };
const roleColors = { patient: "text-primary", doctor: "text-accent", admin: "text-warning" };

export const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const items = navItems[role];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col fixed h-full z-30">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-foreground text-sm">SecureHealth</span>
          </Link>
          <p className={cn("text-xs mt-1 font-medium", roleColors[role])}>{roleLabels[role]}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-primary/10 text-primary glow-teal-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <Link to={`/${role}/profile`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <User className="h-4 w-4" /> Profile
          </Link>
          <Link to={`/${role}/settings`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Settings className="h-4 w-4" /> Settings
          </Link>
          <button onClick={() => navigate("/")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors w-full active:scale-[0.98]">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Navbar */}
        <header className="h-16 border-b border-border glass-strong sticky top-0 z-20 flex items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-display font-semibold text-foreground">
              {items.find(i => i.path === location.pathname)?.label || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors active:scale-95">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                {role === "patient" ? "SM" : role === "doctor" ? "RK" : "AD"}
              </div>
              <span className="text-sm font-medium text-foreground hidden md:inline">
                {role === "patient" ? "Sarah Mitchell" : role === "doctor" ? "Dr. Rachel Kim" : "System Admin"}
              </span>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
