import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";

// Path va Auth importlari
import { AUTH_PATH, INTRO_PATH } from "./features/auth/path.auth";
import { ProtectedRoute } from "./components/common/protected-route";

// Intro va Auth sahifalari
import { Landing } from "./pages/INTRO/landing";
import { Login } from "./pages/INTRO/auth/login";
import { TeacherLogin } from "./pages/INTRO/auth/teacherLogin";
import { StudentLogin } from "./pages/INTRO/auth/studentLogin";

// Layout va Dashboardlar
import { MainLayuot } from "./layout/main-layuot";

// Super Admin sahifalari
import { Dashboard } from "./pages/super-admin/home/dashboard";
import { Admins } from "./pages/super-admin/admins/admins";
import { Teachers } from "./pages/super-admin/teachers/teachers";
import { Students } from "./pages/super-admin/students/students";
import { Lessons } from "./pages/super-admin/lessons/lessons";
import { Payments } from "./pages/super-admin/payments/payments";
import { Earnings } from "./pages/super-admin/earnings/earnings";
import { Profile } from "./pages/super-admin/profile/profile";

// Admin sahifalari
import { ADashboard } from "./pages/admin/home/dashboard";
import { ATeaches } from "./pages/admin/teachers/teaches";
import { AStudents } from "./pages/admin/students/students";
import { ALessons } from "./pages/admin/lessons/lessons";
import { APayments } from "./pages/admin/payments/payments";
import { AEarnings } from "./pages/admin/earnings/earnings";
import { AProfile } from "./pages/admin/profile/profile";
import { TDashboard } from "./pages/teacher/home/dashboard";
import { TStudents } from "./pages/teacher/students/students";
import { TLessons } from "./pages/teacher/lessons/lessons";
import { AuthCallback } from "./pages/INTRO/auth/authCallback";

function AppRedirect() {
  const role = localStorage.getItem("userRole");

  if (!role) return <Navigate to="/" replace />;

  if (role === "SUPERADMIN")
    return <Navigate to="/app/SUPERADMIN/dashboard" replace />;

  if (role === "ADMIN") return <Navigate to="/app/ADMIN/dashboard" replace />;

  if (role === "TEACHER") {
    return <Navigate to="/app/TEACHER/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
}

function App() {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  if (isLoading) return <div>Yuklanmoqda...</div>;

  return (
    <Routes>
      <Route
        path={INTRO_PATH.LANDING}
        element={
          isAuthenticated ? (
            <Navigate to={`/app/${userRole}/dashboard`} replace />
          ) : (
            <Landing />
          )
        }
      />

      {/* 2. Admin Login sahifasi */}
      <Route
        path={AUTH_PATH.LOGIN}
        element={
          isAuthenticated ? (
            <Navigate to={`/app/${userRole}/dashboard`} replace />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path={INTRO_PATH.TEACHER_LOGIN}
        element={
          isAuthenticated ? (
            <Navigate to={`/app/${userRole}/dashboard`} replace />
          ) : (
            <TeacherLogin />
          )
        }
      />
      <Route
        path={INTRO_PATH.STUDENT_LOGIN}
        element={
          isAuthenticated ? (
            <Navigate to={`/app/${userRole}/dashboard`} replace />
          ) : (
            <StudentLogin />
          )
        }
      />

      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* 4. Himoyalangan Dashboard yo'llari (Admin & SuperAdmin uchun) */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["SUPERADMIN", "ADMIN", "TEACHER"]} />
        }
      >
        <Route path="/app" element={<AppRedirect />} />

        {/* Umumiy Dashboard Layout */}
        <Route path="/app" element={<MainLayuot />}>
          {/* SUPERADMIN Yo'llari */}
          <Route element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}>
            <Route path="SUPERADMIN">
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="admins" element={<Admins />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="students" element={<Students />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="payments" element={<Payments />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* ADMIN Yo'llari */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="ADMIN">
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<ADashboard />} />
              <Route path="teachers" element={<ATeaches />} />
              <Route path="students" element={<AStudents />} />
              <Route path="lessons" element={<ALessons />} />
              <Route path="payments" element={<APayments />} />
              <Route path="earnings" element={<AEarnings />} />
              <Route path="profile" element={<AProfile />} />
            </Route>
          </Route>

          {/* teacher yo'llari */}
          <Route element={<ProtectedRoute allowedRoles={["TEACHER"]} />}>
            <Route path="TEACHER">
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<TDashboard />} />
              <Route path="students" element={<TStudents />} />
              <Route path="lessons" element={<TLessons />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? "/app" : INTRO_PATH.LANDING}
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
