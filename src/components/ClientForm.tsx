
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  lastName: z.string().min(2, {
    message: "Los apellidos deben tener al menos 2 caracteres",
  }),
  email: z.string().email({
    message: "Introduce un email válido",
  }),
  phone: z.string().min(9, {
    message: "Introduce un número de teléfono válido",
  }),
  serviceType: z.string({
    required_error: "Por favor selecciona un tipo de servicio",
  }),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ClientForm() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      serviceType: "",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre" id="client-first-name" className="bg-white/20 border-white/30 text-white placeholder:text-white/70" {...field} />
                </FormControl>
                <FormMessage className="text-white/90" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Apellidos</FormLabel>
                <FormControl>
                  <Input placeholder="Tus apellidos" id="client-last-name" className="bg-white/20 border-white/30 text-white placeholder:text-white/70" {...field} />
                </FormControl>
                <FormMessage className="text-white/90" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="tu@email.com" id="client-email" className="bg-white/20 border-white/30 text-white placeholder:text-white/70" {...field} />
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
                  <Input type="tel" placeholder="912 345 678" id="client-phone" className="bg-white/20 border-white/30 text-white placeholder:text-white/70" {...field} />
                </FormControl>
                <FormMessage className="text-white/90" />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Servicios de interés</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger id="client-service-type" className="bg-white/20 border-white/30 text-white">
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
        
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Mensaje o comentario</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Cuéntanos más sobre lo que buscas para tu boda..." 
                  className="min-h-[120px] resize-none bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  id="client-comments"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-white/90" />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-white hover:bg-white/90 text-wedding-navy rounded-md"
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
}
