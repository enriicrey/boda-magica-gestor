
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AuthFormProps {
  initialTab?: string;
  initialRole?: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  initialTab = "login",
  initialRole = "client" 
}) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>(initialRole || "client");

  useEffect(() => {
    if (initialRole) {
      setRole(initialRole);
    }
  }, [initialRole]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted for role:", role);
    
    // Simulate successful login
    toast.success(`Inicio de sesión exitoso como ${getRoleText(role)}`);
    
    // Redirect based on role
    setTimeout(() => {
      if (role === "client") {
        navigate("/client-dashboard");
      } else if (role === "provider") {
        navigate("/provider-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      }
    }, 1000);
  };

  const getRoleText = (role: string): string => {
    switch (role) {
      case "client": return "Cliente";
      case "provider": return "Proveedor";
      case "admin": return "Administrador";
      default: return "Usuario";
    }
  };

  const getRoleColor = (role: string): string => {
    switch (role) {
      case "client": return "text-wedding-blush";
      case "provider": return "text-wedding-navy";
      case "admin": return "text-purple-600";
      default: return "text-gray-700";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center font-serif text-2xl">
          Iniciar Sesión
          {role && <span className={`ml-2 ${getRoleColor(role)}`}>({getRoleText(role)})</span>}
        </CardTitle>
        <CardDescription className="text-center">
          Accede a tu cuenta para gestionar tu boda o servicios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password">Contraseña</Label>
              <a
                href="#"
                className="text-sm text-wedding-navy hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-wedding-navy hover:bg-wedding-navy/90">
            Iniciar Sesión
          </Button>
          <p className="text-center text-sm text-gray-500 mt-6">
            Para solicitar acceso, utilice los formularios de contacto en la página principal.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
