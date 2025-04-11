
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [isAzureLoading, setIsAzureLoading] = useState(false);

  const handleLogin = async () => {
    await login();
  };

  const handleAzureLogin = async () => {
    setIsAzureLoading(true);
    // This would redirect to Azure AD OAuth flow in production
    // For now we'll simulate with a delay and use our mock login
    setTimeout(async () => {
      await login();
      setIsAzureLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <div className="h-12 w-12 bg-azure-500 rounded-md flex items-center justify-center">
              <span className="text-white text-xl font-bold">RC</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Sign in to access RoleCraft Nexus
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error.message || 'An error occurred during sign in'}
              </AlertDescription>
            </Alert>
          )}
          
          <Button
            className="w-full bg-[#0078d4] hover:bg-[#106ebe]"
            onClick={handleAzureLogin}
            disabled={isAzureLoading || isLoading}
          >
            {isAzureLoading || isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.5 18V9h9v9h-9zm0-18h9v7h-9V0zm-9 9h7v9h-7V9zm0-9h7v7h-7V0z" />
                </svg>
                Sign in with Microsoft
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              This is a demo application. Select any role to log in.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogin}
              disabled={isLoading}
            >
              Login as Random User
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
