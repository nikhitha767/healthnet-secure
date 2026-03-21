import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PatientDashboard from "./pages/PatientDashboard";
import PatientReports from "./pages/PatientReports";
import UploadReport from "./pages/UploadReport";
import ChatPage from "./pages/ChatPage";
import PatientAppointments from "./pages/PatientAppointments";
import PatientNotifications from "./pages/PatientNotifications";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorPatients from "./pages/DoctorPatients";
import DoctorReports from "./pages/DoctorReports";
import DoctorConsultations from "./pages/DoctorConsultations";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminSecurity from "./pages/AdminSecurity";
import AdminLogs from "./pages/AdminLogs";
import AdminAlerts from "./pages/AdminAlerts";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Patient Routes */}
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/reports" element={<PatientReports />} />
          <Route path="/patient/upload" element={<UploadReport />} />
          <Route path="/patient/chat" element={<ChatPage role="patient" />} />
          <Route path="/patient/appointments" element={<PatientAppointments />} />
          <Route path="/patient/notifications" element={<PatientNotifications />} />
          <Route path="/patient/profile" element={<ProfilePage role="patient" />} />
          <Route path="/patient/settings" element={<SettingsPage role="patient" />} />

          {/* Doctor Routes */}
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/patients" element={<DoctorPatients />} />
          <Route path="/doctor/reports" element={<DoctorReports />} />
          <Route path="/doctor/chat" element={<ChatPage role="doctor" />} />
          <Route path="/doctor/consultations" element={<DoctorConsultations />} />
          <Route path="/doctor/profile" element={<ProfilePage role="doctor" />} />
          <Route path="/doctor/settings" element={<SettingsPage role="doctor" />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/security" element={<AdminSecurity />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
          <Route path="/admin/alerts" element={<AdminAlerts />} />
          <Route path="/admin/profile" element={<ProfilePage role="admin" />} />
          <Route path="/admin/settings" element={<SettingsPage role="admin" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
