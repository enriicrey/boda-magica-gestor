
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  const [activeTab, setActiveTab] = useState<string>(initialTab);

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

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register submitted with role:", role);
    
    // Simulate successful registration
    toast.success(`Cuenta de ${getRoleText(role)} creada exitosamente`);
    
    // Redirect to login
    setTimeout(() => {
      setActiveTab("login");
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
          {activeTab === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          {role && <span className={`ml-2 ${getRoleColor(role)}`}>({getRoleText(role)})</span>}
        </CardTitle>
        <CardDescription className="text-center">
          {activeTab === "login"
            ? "Accede a tu cuenta para gestionar tu boda o servicios"
            : "Únete a la plataforma de bodas líder"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
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
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <RadioGroup
                defaultValue={role}
                value={role}
                onValueChange={setRole}
                className="grid grid-cols-3 gap-4 mb-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="client" id="client" />
                  <Label htmlFor="client" className="cursor-pointer">Cliente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="provider" id="provider" />
                  <Label htmlFor="provider" className="cursor-pointer">Proveedor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="cursor-pointer">Admin</Label>
                </div>
              </RadioGroup>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Nombre</Label>
                  <Input id="first-name" placeholder="Tu nombre" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Apellidos</Label>
                  <Input id="last-name" placeholder="Tus apellidos" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Contraseña</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-gray-300 text-wedding-navy focus:ring-wedding-navy"
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  Acepto los{" "}
                  <a href="#" className="text-wedding-navy hover:underline">
                    términos y condiciones
                  </a>
                </Label>
              </div>
              
              <Button type="submit" className="w-full bg-wedding-navy hover:bg-wedding-navy/90">
                Crear Cuenta
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
