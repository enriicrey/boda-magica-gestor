
import { useState, useEffect } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowUpRight, CheckCircle, XCircle, CreditCard, Mail, Search, Download, Plus, MoreHorizontal, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockTransactions = [
  { 
    id: "T1", 
    date: "2024-05-15", 
    client: "Carlos Mendoza", 
    description: "Pago inicial boda", 
    amount: 1200, 
    status: "completado" 
  },
  { 
    id: "T2", 
    date: "2024-05-10", 
    client: "Ana García", 
    description: "Reserva cumpleaños", 
    amount: 300, 
    status: "completado" 
  },
  { 
    id: "T3", 
    date: "2024-05-20", 
    client: "Miguel Fernández", 
    description: "Pago parcial evento corporativo", 
    amount: 3500, 
    status: "pendiente" 
  },
  { 
    id: "T4", 
    date: "2024-05-05", 
    client: "Lucía Martínez", 
    description: "Reserva boda", 
    amount: 500, 
    status: "completado" 
  },
  { 
    id: "T5", 
    date: "2024-05-22", 
    client: "David Sánchez", 
    description: "Pago aniversario", 
    amount: 950, 
    status: "rechazado" 
  }
];

const mockInvoices = [
  {
    id: "INV-001",
    date: "2024-05-15",
    dueDate: "2024-06-15",
    client: "Carlos Mendoza",
    amount: 3500,
    status: "pendiente"
  },
  {
    id: "INV-002",
    date: "2024-05-10",
    dueDate: "2024-05-25",
    client: "Ana García",
    amount: 850,
    status: "pagado"
  },
  {
    id: "INV-003",
    date: "2024-04-20",
    dueDate: "2024-05-20",
    client: "Miguel Fernández",
    amount: 12000,
    status: "pagado"
  },
  {
    id: "INV-004",
    date: "2024-05-05",
    dueDate: "2024-06-05",
    client: "Lucía Martínez",
    amount: 6500,
    status: "pendiente"
  },
  {
    id: "INV-005",
    date: "2024-04-22",
    dueDate: "2024-05-22",
    client: "David Sánchez",
    amount: 950,
    status: "vencido"
  }
];

// Data for KPIs
const financialSummary = {
  totalRevenue: 23800,
  pendingPayments: 10000,
  avgTransactionValue: 1450,
  monthlyGrowth: 12.5
};

const ProviderFinances = () => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = mockTransactions.filter(
    transaction => 
      transaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInvoices = mockInvoices.filter(
    invoice => 
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completado':
      case 'pagado':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case 'pendiente':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
      case 'rechazado':
      case 'vencido':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleDownloadReport = () => {
    toast({
      title: "Descargando informe",
      description: "Tu informe financiero se está generando",
    });
  };

  const handleAddTransaction = () => {
    toast({
      title: "Nueva transacción",
      description: "Funcionalidad para añadir transacción en desarrollo",
    });
  };

  const handleAddInvoice = () => {
    toast({
      title: "Nueva factura",
      description: "Funcionalidad para crear factura en desarrollo",
    });
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Finanzas</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Administra tus transacciones, facturas y reportes financieros.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ingresos Totales
              </CardTitle>
              <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {financialSummary.totalRevenue.toLocaleString('es-ES', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5% este mes
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pagos Pendientes
              </CardTitle>
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {financialSummary.pendingPayments.toLocaleString('es-ES', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                5 facturas pendientes
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valor Medio Transacción
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {financialSummary.avgTransactionValue.toLocaleString('es-ES', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +5.2% este mes
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Crecimiento Mensual
              </CardTitle>
              <MoreHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {financialSummary.monthlyGrowth}%
              </div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +2.1% vs. mes anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="transactions">Transacciones</TabsTrigger>
              <TabsTrigger value="invoices">Facturas</TabsTrigger>
              <TabsTrigger value="reports">Informes</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar..."
                  className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" onClick={handleDownloadReport}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="transactions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Transacciones Recientes</h2>
              <Button onClick={handleAddTransaction}>
                <Plus className="h-4 w-4 mr-2" /> Nueva Transacción
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Importe</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell>{transaction.client}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          {transaction.amount.toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'EUR'
                          })}
                        </TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <span className="sr-only">Editar</span>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <span className="sr-only">Eliminar</span>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Facturas</h2>
              <Button onClick={handleAddInvoice}>
                <Plus className="h-4 w-4 mr-2" /> Nueva Factura
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nº Factura</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Vencimiento</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Importe</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>{invoice.client}</TableCell>
                        <TableCell>
                          {invoice.amount.toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'EUR'
                          })}
                        </TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <span className="sr-only">Ver</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <span className="sr-only">Enviar</span>
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <span className="sr-only">Descargar</span>
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ingresos por mes</CardTitle>
                  <CardDescription>Resumen financiero del último año</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-500 mb-2">Gráfico de ingresos mensuales</p>
                      <p className="text-xs text-gray-400">(Visualización de gráficos en desarrollo)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por servicios</CardTitle>
                  <CardDescription>Desglose de ingresos por tipo de servicio</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-500 mb-2">Gráfico circular de servicios</p>
                      <p className="text-xs text-gray-400">(Visualización de gráficos en desarrollo)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-2" /> Descargar Informe Completo
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProviderLayout>
  );
};

export default ProviderFinances;
