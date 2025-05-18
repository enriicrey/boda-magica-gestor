
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "El nombre de la empresa debe tener al menos 2 caracteres",
  }),
  serviceType: z.string({
    required_error: "Por favor selecciona un tipo de servicio",
  }),
  email: z.string().email({
    message: "Introduce un email válido",
  }),
  phone: z.string().min(9, {
    message: "Introduce un número de teléfono válido",
  }),
  city: z.string().min(2, {
    message: "Introduce una ciudad válida",
  }),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProviderForm() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      serviceType: "",
      email: "",
      phone: "",
      city: "",
      comments: "",
    },
  });

  function onSubmit(data: FormValues) {
    toast({
      title: "Formulario enviado",
      description: "Nos pondremos en contacto contigo lo antes posible.",
    });
    
    console.log(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nombre de la empresa</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Tu empresa S.L." 
                  id="provider-company-name" 
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-white/90" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Tipo de servicio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger 
                    id="provider-service-type"
                    className="bg-white/20 border-white/30 text-white"
                  >
                    <SelectValue placeholder="Selecciona un tipo de servicio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="lugar">Lugar para celebración</SelectItem>
                  <SelectItem value="fotografia">Fotografía</SelectItem>
                  <SelectItem value="catering">Catering</SelectItem>
                  <SelectItem value="musica">Música</SelectItem>
                  <SelectItem value="decoracion">Decoración</SelectItem>
                  <SelectItem value="planificacion_completa">Planificación completa</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-white/90" />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="info@tuempresa.com" 
                    id="provider-email" 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-white/90" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Teléfono</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="912 345 678" 
                    id="provider-phone" 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-white/90" />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Ciudad</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Madrid" 
                  id="provider-city" 
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-white/90" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Comentarios o servicios ofrecidos</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe los servicios que ofreces..." 
                  className="min-h-[120px] resize-none bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  id="provider-comments"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-white/90" />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-white hover:bg-white/90 text-wedding-sage rounded-md"
        >
          Enviar información
        </Button>
      </form>
    </Form>
  );
}
