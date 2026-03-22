# HealthNet Secure 🏥

HealthNet Secure is a comprehensive, modern, and highly secure web application designed to manage healthcare data and processes efficiently. This system seamlessly integrates end-to-end user roles for **Patients**, **Doctors**, and **Administrators** to streamline their everyday healthcare interactions.

The project features a sleek, intuitive frontend interface intertwined with a dynamic backend and artificial intelligence.

## 🚀 Technologies Used
The project leverages a robust tech stack to guarantee high performance, security, and a beautiful user interface:

### Frontend
- **React.js & Vite**: Delivering blazing-fast rendering and instantaneous hot-reloading for an unparalleled user experience.
- **TypeScript**: Ensuring type safety and fewer runtime errors across the interface.
- **Tailwind CSS**: A utility-first CSS framework providing a sleek, modern, and highly responsive user interface.
- **Vercel**: Configured for highly-available frontend deployment.

### Backend
- **Python**: Powering robust and secure APIs (e.g., patient, doctor, admin routes).
- **SQLite / Supabase**: Utilizing scalable database structures for secure storage of user credentials, medical data, and predictions.
- **AI Processing Engine**: Seamless document uploads and artificial intelligence-powered Q&A/chat functions.
- **Render**: Backend deployment integration.

## ⚙️ How It Works
HealthNet Secure utilizes a strict **Role-Based Access Control (RBAC)** architecture. Upon signup, users are securely authenticated, and their role is verified (Patient, Doctor, or Admin). 
The frontend strictly controls route access depending on this role, fetching only the required and relevant medical data from the Python backend & Supabase to ensure data privacy and maximum security. 

Users can upload documents, which are processed by AI models to offer an interactive Chat functionality, allowing deep-dive Q&A inside medical reports.

## 🗂️ Project Pages & Features Structure

### 1. Authentication & Common Pages
- `Landing.tsx` - The initial landing page showcasing the application's capabilities.
- `Login.tsx` / `Signup.tsx` - Secure gateway for onboarding and user login.
- `ProfilePage.tsx` / `SettingsPage.tsx` - Allow users across all roles to edit their account preferences.
- `ChatPage.tsx` / `UploadReport.tsx` - AI document analysis and specialized user consultation chats.

### 2. Patient Dashboard
- `PatientDashboard.tsx` - A consolidated view for the patient's general health overview.
- `PatientAppointments.tsx` - Manage, schedule, and view upcoming doctor appointments.
- `PatientReports.tsx` - View test results and previous AI-analyzed documents.
- `PatientNotifications.tsx` - Keep track of incoming alerts, updates, and messages.

### 3. Doctor Dashboard
- `DoctorDashboard.tsx` - Overview of a doctor's daily tasks, metrics, and patient roster.
- `DoctorConsultations.tsx` - Interactive medical consultations and ongoing patient discussions.
- `DoctorPatients.tsx` - Secure records and histories of patients assigned to the doctor.
- `DoctorReports.tsx` - Creating, sharing, and securely saving patient diagnosis reports.

### 4. Admin Dashboard
- `AdminDashboard.tsx` - A high-level view of hospital/clinic operations and platform usage.
- `AdminUsers.tsx` - Ability to view, ban, onboard, or modify system user roles.
- `AdminLogs.tsx` / `AdminAlerts.tsx` - Live-feed overviews of backend execution, API logs, and system warnings.
- `AdminSecurity.tsx` - Controls to audit security vulnerabilities and configure system safety protocols.

## 💻 Getting Started locally

To run HealthNet Secure safely on your local machine:

1. **Frontend**:
    ```bash
    npm install
    npm run dev
    ```
2. **Backend**:
    ```bash
    cd backend
    pip install -r requirements.txt
    python app.py
    ```

3. Open your browser to the URL provided by Vite (often `http://localhost:5173`) to view the application in action.
