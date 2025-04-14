
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Super Admin Pages
import SuperAdminDashboard from "./pages/SuperAdmin/Dashboard";
import SuperAdminClinics from "./pages/SuperAdmin/Clinics";
import SuperAdminClinicProfile from "./pages/SuperAdmin/ClinicProfile";
import SuperAdminIntegrations from "./pages/SuperAdmin/Integrations";
import SuperAdminSubscriptions from "./pages/SuperAdmin/Subscriptions";
import SuperAdminReports from "./pages/SuperAdmin/Reports";

// Clinic Admin Pages
import ClinicAdminDashboard from "./pages/ClinicAdmin/Dashboard";
import ClinicAdminDoctors from "./pages/ClinicAdmin/Doctors";
import ClinicAdminServices from "./pages/ClinicAdmin/Services";

const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Super Admin Routes */}
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
            <Route path="/super-admin/clinics" element={<SuperAdminClinics />} />
            <Route path="/super-admin/clinic/:id" element={<SuperAdminClinicProfile />} />
            <Route path="/super-admin/integrations" element={<SuperAdminIntegrations />} />
            <Route path="/super-admin/subscriptions" element={<SuperAdminSubscriptions />} />
            <Route path="/super-admin/reports" element={<SuperAdminReports />} />
            <Route path="/super-admin/settings" element={<NotFound />} />
            <Route path="/super-admin/logs" element={<NotFound />} />
            
            {/* Clinic Admin Routes */}
            <Route path="/clinic-admin" element={<ClinicAdminDashboard />} />
            <Route path="/clinic-admin/doctors" element={<ClinicAdminDoctors />} />
            <Route path="/clinic-admin/services" element={<ClinicAdminServices />} />
            <Route path="/clinic-admin/schedule" element={<NotFound />} />
            <Route path="/clinic-admin/settings" element={<NotFound />} />
            <Route path="/clinic-admin/integrations" element={<NotFound />} />
            <Route path="/clinic-admin/subscription" element={<NotFound />} />
            
            {/* Catch All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
