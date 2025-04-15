
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Auth Provider
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

// Super Admin Pages
import SuperAdminDashboard from "./pages/SuperAdmin/Dashboard";
import SuperAdminClinics from "./pages/SuperAdmin/Clinics";
import SuperAdminClinicProfile from "./pages/SuperAdmin/ClinicProfile";
import SuperAdminIntegrations from "./pages/SuperAdmin/Integrations";
import SuperAdminSubscriptions from "./pages/SuperAdmin/Subscriptions";
import SuperAdminReports from "./pages/SuperAdmin/Reports";
import SuperAdminFinancialReport from "./pages/SuperAdmin/Reports/FinancialReport";
import SuperAdminSubscriptionsReport from "./pages/SuperAdmin/Reports/SubscriptionsReport";
import SuperAdminActivityReport from "./pages/SuperAdmin/Reports/ActivityReport";

// Clinic Admin Pages
import ClinicAdminDashboard from "./pages/ClinicAdmin/Dashboard";
import ClinicAdminDoctors from "./pages/ClinicAdmin/Doctors";
import ClinicAdminServices from "./pages/ClinicAdmin/Services";
import DoctorProfile from "./pages/ClinicAdmin/DoctorProfile";

const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Super Admin Routes */}
              <Route 
                path="/super-admin" 
                element={
                  <ProtectedRoute>
                    <SuperAdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/super-admin/clinics" 
                element={
                  <ProtectedRoute>
                    <SuperAdminClinics />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/super-admin/clinic/:id" 
                element={
                  <ProtectedRoute>
                    <SuperAdminClinicProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/super-admin/integrations" 
                element={
                  <ProtectedRoute>
                    <SuperAdminIntegrations />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/super-admin/subscriptions" 
                element={
                  <ProtectedRoute>
                    <SuperAdminSubscriptions />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/super-admin/reports" 
                element={
                  <ProtectedRoute>
                    <SuperAdminReports />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/super-admin/reports-fin" 
                element={
                  <ProtectedRoute>
                    <SuperAdminFinancialReport />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/super-admin/reports-sub" 
                element={
                  <ProtectedRoute>
                    <SuperAdminSubscriptionsReport />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/super-admin/reports-active" 
                element={
                  <ProtectedRoute>
                    <SuperAdminActivityReport />
                  </ProtectedRoute>
                } 
              />
              
              {/* Clinic Admin Routes */}
              <Route 
                path="/clinic-admin" 
                element={
                  <ProtectedRoute>
                    <ClinicAdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/clinic-admin/doctors" 
                element={
                  <ProtectedRoute>
                    <ClinicAdminDoctors />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/clinic-admin/doctor/:id" 
                element={
                  <ProtectedRoute>
                    <DoctorProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/clinic-admin/services" 
                element={
                  <ProtectedRoute>
                    <ClinicAdminServices />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/clinic-admin/schedule" 
                element={
                  <ProtectedRoute>
                    <NotFound />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/clinic-admin/schedule/:id" 
                element={
                  <ProtectedRoute>
                    <NotFound />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/clinic-admin/settings" 
                element={
                  <ProtectedRoute>
                    <NotFound />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/clinic-admin/integrations" 
                element={
                  <ProtectedRoute>
                    <NotFound />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/clinic-admin/subscription" 
                element={
                  <ProtectedRoute>
                    <NotFound />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch All Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
