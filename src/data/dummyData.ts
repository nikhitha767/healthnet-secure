export const patients = [
  { id: "p1", name: "Sarah Mitchell", age: 34, condition: "Diabetes Type 2", lastVisit: "2026-03-18", status: "Active", avatar: "SM" },
  { id: "p2", name: "James Rodriguez", age: 45, condition: "Hypertension", lastVisit: "2026-03-15", status: "Active", avatar: "JR" },
  { id: "p3", name: "Emily Chen", age: 28, condition: "Asthma", lastVisit: "2026-03-12", status: "Follow-up", avatar: "EC" },
  { id: "p4", name: "Michael Brooks", age: 52, condition: "Cardiac Arrhythmia", lastVisit: "2026-03-10", status: "Critical", avatar: "MB" },
  { id: "p5", name: "Aisha Patel", age: 39, condition: "Thyroid Disorder", lastVisit: "2026-03-08", status: "Active", avatar: "AP" },
  { id: "p6", name: "David Okafor", age: 61, condition: "COPD", lastVisit: "2026-03-05", status: "Monitoring", avatar: "DO" },
];

export const doctors = [
  { id: "d1", name: "Dr. Rachel Kim", specialty: "Endocrinology", patients: 42, status: "Online", avatar: "RK" },
  { id: "d2", name: "Dr. Alan Torres", specialty: "Cardiology", patients: 38, status: "Online", avatar: "AT" },
  { id: "d3", name: "Dr. Priya Sharma", specialty: "Pulmonology", patients: 29, status: "Away", avatar: "PS" },
  { id: "d4", name: "Dr. Marcus Webb", specialty: "General Practice", patients: 55, status: "Online", avatar: "MW" },
];

export const reports = [
  { id: "r1", title: "Blood Panel Analysis", date: "2026-03-18", type: "Lab Report", status: "Completed", doctor: "Dr. Rachel Kim" },
  { id: "r2", title: "Chest X-Ray Results", date: "2026-03-15", type: "Imaging", status: "Pending Review", doctor: "Dr. Priya Sharma" },
  { id: "r3", title: "ECG Monitoring Report", date: "2026-03-12", type: "Cardiology", status: "Completed", doctor: "Dr. Alan Torres" },
  { id: "r4", title: "HbA1c Quarterly Report", date: "2026-03-10", type: "Lab Report", status: "Completed", doctor: "Dr. Rachel Kim" },
  { id: "r5", title: "Pulmonary Function Test", date: "2026-03-08", type: "Pulmonology", status: "In Progress", doctor: "Dr. Priya Sharma" },
];

export const appointments = [
  { id: "a1", patient: "Sarah Mitchell", doctor: "Dr. Rachel Kim", date: "2026-03-22", time: "09:00 AM", type: "Follow-up", status: "Confirmed" },
  { id: "a2", patient: "James Rodriguez", doctor: "Dr. Alan Torres", date: "2026-03-22", time: "10:30 AM", type: "Consultation", status: "Pending" },
  { id: "a3", patient: "Emily Chen", doctor: "Dr. Priya Sharma", date: "2026-03-23", time: "02:00 PM", type: "Check-up", status: "Confirmed" },
  { id: "a4", patient: "Michael Brooks", doctor: "Dr. Alan Torres", date: "2026-03-24", time: "11:00 AM", type: "Emergency", status: "Urgent" },
];

export const securityAlerts = [
  { id: "s1", type: "Unauthorized Access Attempt", severity: "High", source: "IP 192.168.1.45", timestamp: "2026-03-21 08:23:41", status: "Blocked", description: "Multiple failed login attempts detected from unknown IP" },
  { id: "s2", type: "Data Encryption Anomaly", severity: "Medium", source: "Server Node 3", timestamp: "2026-03-21 07:15:22", status: "Investigating", description: "Unusual encryption pattern detected in data transfer" },
  { id: "s3", type: "Suspicious File Upload", severity: "High", source: "User #4521", timestamp: "2026-03-20 22:45:10", status: "Quarantined", description: "Potentially malicious file detected and quarantined" },
  { id: "s4", type: "API Rate Limit Exceeded", severity: "Low", source: "External API", timestamp: "2026-03-20 18:30:55", status: "Resolved", description: "Third-party API rate limit reached temporarily" },
  { id: "s5", type: "PHI Access Outside Hours", severity: "Critical", source: "Dr. Account #112", timestamp: "2026-03-20 03:12:08", status: "Under Review", description: "Protected health info accessed at unusual hours" },
  { id: "s6", type: "SSL Certificate Expiry", severity: "Medium", source: "Portal Subdomain", timestamp: "2026-03-19 14:00:00", status: "Scheduled", description: "Certificate renewal needed within 7 days" },
];

export const systemLogs = [
  { id: "l1", action: "User Login", user: "sarah.mitchell@mail.com", timestamp: "2026-03-21 09:00:12", ip: "10.0.2.15", status: "Success" },
  { id: "l2", action: "Report Downloaded", user: "dr.kim@hospital.org", timestamp: "2026-03-21 08:45:33", ip: "10.0.1.8", status: "Success" },
  { id: "l3", action: "Password Reset", user: "james.r@mail.com", timestamp: "2026-03-21 08:30:01", ip: "10.0.3.22", status: "Success" },
  { id: "l4", action: "Failed Login", user: "unknown@suspicious.com", timestamp: "2026-03-21 08:23:41", ip: "192.168.1.45", status: "Failed" },
  { id: "l5", action: "File Upload", user: "emily.chen@mail.com", timestamp: "2026-03-21 07:55:18", ip: "10.0.2.30", status: "Success" },
  { id: "l6", action: "Settings Changed", user: "admin@system.org", timestamp: "2026-03-21 07:20:44", ip: "10.0.0.1", status: "Success" },
  { id: "l7", action: "MFA Enabled", user: "dr.torres@hospital.org", timestamp: "2026-03-20 16:10:05", ip: "10.0.1.12", status: "Success" },
  { id: "l8", action: "Bulk Export", user: "admin@system.org", timestamp: "2026-03-20 14:30:22", ip: "10.0.0.1", status: "Success" },
];

export const chatMessages = [
  { id: "m1", sender: "patient", text: "Good morning Dr. Kim, I wanted to discuss my latest blood panel results.", time: "09:12 AM" },
  { id: "m2", sender: "doctor", text: "Good morning Sarah! I've reviewed your results. Your HbA1c levels have improved significantly — down to 6.2% from 7.1%.", time: "09:15 AM" },
  { id: "m3", sender: "patient", text: "That's great news! Should I continue with the current medication dosage?", time: "09:17 AM" },
  { id: "m4", sender: "doctor", text: "Yes, let's maintain the current regimen. I'd also recommend scheduling a follow-up in 3 months. Keep up the excellent work with your diet changes.", time: "09:20 AM" },
  { id: "m5", sender: "patient", text: "Thank you! I'll book the appointment. Should I continue the daily glucose monitoring?", time: "09:22 AM" },
  { id: "m6", sender: "doctor", text: "Yes, please continue monitoring. Also, all communications here are end-to-end encrypted for your privacy. 🔒", time: "09:25 AM" },
];

export const notifications = [
  { id: "n1", title: "Appointment Reminder", message: "Your appointment with Dr. Kim is tomorrow at 9:00 AM", time: "1 hour ago", read: false, type: "info" },
  { id: "n2", title: "Report Ready", message: "Your blood panel analysis report is now available", time: "3 hours ago", read: false, type: "success" },
  { id: "n3", title: "Security Alert", message: "New device login detected. If this wasn't you, please contact support.", time: "5 hours ago", read: true, type: "warning" },
  { id: "n4", title: "Prescription Update", message: "Dr. Torres has updated your medication prescription", time: "1 day ago", read: true, type: "info" },
];

export const systemStats = {
  totalUsers: 1247,
  activePatients: 892,
  activeDoctors: 156,
  totalReports: 4521,
  encryptedMessages: 28934,
  threatBlocked: 342,
  uptime: 99.97,
  dataProcessed: "2.4 TB",
};
