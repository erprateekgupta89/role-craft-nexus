
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import PacSubmissionPage from "./pages/PacSubmissionPage";
import PacReviewPage from "./pages/PacReviewPage";

const queryClient = new QueryClient();

// Protected route component with role-based access control
const ProtectedRoute = ({ 
  element, 
  allowedRoles 
}: { 
  element: JSX.Element;
  allowedRoles?: string[]; 
}) => {
  const { user, isLoading } = useAuth();
  
  // If auth is still loading, show a loading indicator
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If roles are specified and user doesn't have permission, redirect to dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // If user is logged in and has permission, render the protected component
  return element;
};

// AppRoutes component to access auth context
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Dashboard - accessible by all authenticated users */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Layout><DashboardPage /></Layout>} />}
      />
      
      {/* PAC Submission - accessible by PMs */}
      <Route
        path="/pac/new"
        element={<ProtectedRoute 
          element={<Layout><PacSubmissionPage /></Layout>} 
          allowedRoles={['PM']}
        />}
      />
      
      {/* PAC Review - accessible by all roles */}
      <Route
        path="/pac/:pacId"
        element={<ProtectedRoute 
          element={<Layout><PacReviewPage /></Layout>}
        />}
      />
      
      {/* Add more protected routes with the same pattern */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
