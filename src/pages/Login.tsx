
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import PageTransition from "@/components/PageTransition";

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      // Navigation is handled in the auth context
    } catch (error) {
      // Error is handled in the auth context
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      await loginWithGoogle();
      // Navigation is handled in the auth context
    } catch (error) {
      // Error is handled in the auth context
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Sign in to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs defaultValue="credentials" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="credentials">Email</TabsTrigger>
                  <TabsTrigger value="google">Google</TabsTrigger>
                </TabsList>
                <TabsContent value="credentials">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m.scott@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Button variant="link" className="px-0 font-normal h-auto" type="button">
                          Forgot password?
                        </Button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="google">
                  <div className="space-y-4">
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      Sign in using your Google account (all Google logins will be treated as student accounts for demonstration)
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign in with Google"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center text-sm">
                <p className="text-muted-foreground">
                  Demo Accounts:
                </p>
                <div className="flex flex-col space-y-1 mt-2">
                  <div className="text-xs text-muted-foreground">
                    Admin: admin@deeplearninglab.com / admin123
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Student: student@deeplearninglab.com / student123
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
