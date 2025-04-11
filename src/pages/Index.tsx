
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, BarChart3, Shield, Users, Zap } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-azure-600 to-azure-400">
              RoleCraft Nexus
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              The comprehensive project management solution designed for enterprise role-based team collaboration.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {user ? (
              <Button asChild size="lg">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link to="/login">Get Started</Link>
              </Button>
            )}
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Features Built for Enterprise
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-lg">
                Our platform adapts to various roles with specialized tools and interfaces
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-azure-100 p-3">
                <CheckCircle className="h-6 w-6 text-azure-600" />
              </div>
              <h3 className="text-xl font-bold">Role-Based Access</h3>
              <p className="text-center text-sm text-gray-500">
                Customized interfaces and permissions for PM, PoM, AVP/VP, and MR roles.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-azure-100 p-3">
                <BarChart3 className="h-6 w-6 text-azure-600" />
              </div>
              <h3 className="text-xl font-bold">Advanced Analytics</h3>
              <p className="text-center text-sm text-gray-500">
                Comprehensive dashboards and reporting tools tailored to each role.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-azure-100 p-3">
                <Shield className="h-6 w-6 text-azure-600" />
              </div>
              <h3 className="text-xl font-bold">Enterprise Security</h3>
              <p className="text-center text-sm text-gray-500">
                Azure AD integration for seamless and secure authentication.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-azure-100 p-3">
                <Users className="h-6 w-6 text-azure-600" />
              </div>
              <h3 className="text-xl font-bold">Team Collaboration</h3>
              <p className="text-center text-sm text-gray-500">
                Built-in tools for effective cross-functional team coordination.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-azure-100 p-3">
                <Zap className="h-6 w-6 text-azure-600" />
              </div>
              <h3 className="text-xl font-bold">Workflow Automation</h3>
              <p className="text-center text-sm text-gray-500">
                Streamline repetitive tasks with smart automation features.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-azure-50 border-azure-200">
              <div className="rounded-full bg-azure-200 p-3">
                <svg
                  className="h-6 w-6 text-azure-600"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2H2v10h10V2Z" />
                  <path d="M22 12h-10v10h10V12Z" />
                  <path d="m16 8-4-4" />
                  <path d="m8 16-4 4" />
                  <path d="m16 16 4 4" />
                  <circle cx="6" cy="6" r="1" />
                  <circle cx="18" cy="18" r="1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Seamless Integration</h3>
              <p className="text-center text-sm text-gray-500">
                Connects with your existing Microsoft tools and enterprise systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-azure-600 py-12 md:py-24">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center space-y-4">
            <div className="space-y-2 text-white">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to transform your project management?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-100 md:text-xl">
                Start using RoleCraft Nexus today and experience the difference of role-optimized project management.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to={user ? "/dashboard" : "/login"}>
                  {user ? "Go to Dashboard" : "Get Started"}
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white py-12 md:py-16 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-azure-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">RC</span>
              </div>
              <span className="font-semibold">RoleCraft Nexus</span>
            </div>
            <div className="flex gap-4">
              <Link to="/about" className="text-sm text-gray-500 hover:text-gray-900">About</Link>
              <Link to="/features" className="text-sm text-gray-500 hover:text-gray-900">Features</Link>
              <Link to="/pricing" className="text-sm text-gray-500 hover:text-gray-900">Pricing</Link>
              <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-900">Contact</Link>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 RoleCraft Nexus. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
