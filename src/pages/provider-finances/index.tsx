import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  DollarSign,
  Plus,
  Search,
  Download,
  ArrowUp,
  ArrowDown,
  Calendar,
  FilePlus,
  FileText,
  ArrowUpRight,
  MoreHorizontal,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Filter,
  Mail
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart, 
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Interfaces
interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending' | 'cancelled';
  category: string;
  description: string;
  client?: {
    id: string;
    name: string;
    avatar?: string;
  };
  service?: string;
  paymentMethod?: string;
  reference?: string;
}

interface Invoice {
  id: string;
  number: string;
  clientName: string;
  clientAvatar?: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  services: string[];
}

interface Filters {
  search: string;
  dateRange: 'all' | 'week' | 'month' | 'quarter' | 'year';
  type?: 'income' | 'expense';
  status?: 'completed' | 'pending' | 'cancelled';
  category?: string;
  fromDate?: string;
  toDate?: string;
}

const ProviderFinances = () => {
  // Estados
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    dateRange: 'month',
    type: undefined,
    status: undefined,
    category: undefined
  });
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    pendingPayments: 0,
    netProfit: 0
  });
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isViewTransactionOpen, setIsViewTransactionOpen] = useState(false);
  const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);
  const [isDeleteTransactionOpen, setIsDeleteTransactionOpen] = useState(false);
  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false);
  const [isViewInvoiceOpen, setIsViewInvoiceOpen] = useState(false);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  // Cargar datos simulados
  useEffect(() => {
    // Datos de transacciones
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        date: '2025-05-15',
        amount: 1500,
        type: 'income',
        status: 'completed',
        category: 'Fotografía',
        description: 'Pago adelantado boda María y Juan',
        client: {
          id: '1',
          name: 'María García',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        service: 'Reportaje de Boda Completo',
        paymentMethod: 'Transferencia bancaria',
        reference: 'TRF-20250515-001'
      },
      {
        id: '2',
        date: '2025-05-10',
        amount: 350,
        type: 'income',
        status: 'completed',
        category: 'Fotografía',
        description: 'Pago sesión pre-boda',
        client: {
          id: '2',
          name: 'Pedro Sánchez',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        service: 'Sesión Pre-Boda',
        paymentMethod: 'Tarjeta de crédito',
        reference: 'CC-20250510-001'
      },
      {
        id: '3',
        date: '2025-05-08',
        amount: -250,
        type: 'expense',
        status: 'completed',
        category: 'Equipo',
        description: 'Compra de memoria flash y baterías',
        paymentMethod: 'Tarjeta de débito',
        reference: 'EXP-20250508-001'
      },
      {
        id: '4',
        date: '2025-05-05',
        amount: -80,
        type: 'expense',
        status: 'completed',
        category: 'Software',
        description: 'Suscripción mensual Adobe Creative Cloud',
        paymentMethod: 'Domiciliación bancaria',
        reference: 'SUB-20250505-001'
      },
      {
        id: '5',
        date: '2025-05-01',
        amount: 500,
        type: 'income',
        status: 'pending',
        category: 'Videografía',
        description: 'Pago parcial video boda',
        client: {
          id: '3',
          name: 'Laura Martínez',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        service: 'Videografía de Boda',
        paymentMethod: 'Pendiente',
        reference: 'PEN-20250501-001'
      },
      {
        id: '6',
        date: '2025-04-28',
        amount: 450,
        type: 'income',
        status: 'completed',
        category: 'Álbum',
        description: 'Pago álbum de boda',
        client: {
          id: '4',
          name: 'Javier López',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        service: 'Álbum de Boda Premium',
        paymentMethod: 'PayPal',
        reference: 'PP-20250428-001'
      },
      {
        id: '7',
        date: '2025-04-20',
        amount: -150,
        type: 'expense',
        status: 'completed',
        category: 'Publicidad',
        description: 'Publicidad en Instagram',
        paymentMethod: 'Tarjeta de crédito',
        reference: 'ADV-20250420-001'
      }
    ];
    
    // Datos de facturas
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        number: 'F-2025-001',
        clientName: 'María García',
        clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2025-05-15',
        dueDate: '2025-06-15',
        amount: 1500,
        status: 'paid',
        services: ['Reportaje de Boda Completo']
      },
      {
        id: '2',
        number: 'F-2025-002',
        clientName: 'Pedro Sánchez',
        clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2025-05-10',
        dueDate: '2025-06-10',
        amount: 350,
        status: 'paid',
        services: ['Sesión Pre-Boda']
      },
      {
        id: '3',
        number: 'F-2025-003',
        clientName: 'Laura Martínez',
        clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2025-05-01',
        dueDate: '2025-05-31',
        amount: 1500,
        status: 'pending',
        services: ['Videografía de Boda']
      },
      {
        id: '4',
        number: 'F-2025-004',
        clientName: 'Javier López',
        clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2025-04-28',
        dueDate: '2025-05-28',
        amount: 450,
        status: 'paid',
        services: ['Álbum de Boda Premium']
      },
      {
        id: '5',
        number: 'F-2025-005',
        clientName: 'Ana Rodríguez',
        clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2025-04-15',
        dueDate: '2025-05-15',
        amount: 1800,
        status: 'overdue',
        services: ['Reportaje de Boda Completo', 'Sesión Post-boda']
      }
    ];
    
    setTransactions(mockTransactions);
    setInvoices(mockInvoices);
    
    // Calcular estadísticas
    const totalIncome = mockTransactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = mockTransactions
      .filter(t => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
    const pendingPayments = mockInvoices
      .filter(i => i.status === 'pending' || i.status === 'overdue')
      .reduce((sum, i) => sum + i.amount, 0);
      
    setStats({
      totalIncome,
      totalExpenses,
      pendingPayments,
      netProfit: totalIncome - totalExpenses
    });
    
    // Datos para gráficos
    const monthlyData = [
      { name: 'Ene', income: 3200, expenses: 1200, profit: 2000 },
      { name: 'Feb', income: 2800, expenses: 900, profit: 1900 },
      { name: 'Mar', income: 3500, expenses: 1300, profit: 2200 },
      { name: 'Abr', income: 2500, expenses: 1100, profit: 1400 },
      { name: 'May', income: 2800, expenses: 1000, profit: 1800 },
      { name: 'Jun', income: 0, expenses: 0, profit: 0 },
    ];
    setMonthlyData(monthlyData);
    
    // Datos de categorías
    const categoryData = [
      { name: 'Fotografía', value: 2500 },
      { name: 'Videografía', value: 1500 },
      { name: 'Álbumes', value: 800 },
      { name: 'Sesiones', value: 700 }
    ];
    setCategoryData(categoryData);
  }, []);
  
  // Filtrar transacciones según los criterios seleccionados
  const filteredTransactions = transactions.filter(transaction => {
    // Filtro de búsqueda
    if (filters.search && !transaction.description.toLowerCase().includes(filters.search.toLowerCase()) && 
        !transaction.client?.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Filtro de tipo
    if (filters.type && transaction.type !== filters.type) {
      return false;
    }
    
    // Filtro de estado
    if (filters.status && transaction.status !== filters.status) {
      return false;
    }
    
    // Filtro de categoría
    if (filters.category && transaction.category !== filters.category) {
      return false;
    }
    
    // Filtro de rango de fecha
    const transactionDate = new Date(transaction.date);
    const currentDate = new Date();
    
    if (filters.dateRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(currentDate.getDate() - 7);
      if (transactionDate < weekAgo) return false;
    } else if (filters.dateRange === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(currentDate.getMonth() - 1);
      if (transactionDate < monthAgo) return false;
    } else if (filters.dateRange === 'quarter') {
      const quarterAgo = new Date();
      quarterAgo.setMonth(currentDate.getMonth() - 3);
      if (transactionDate < quarterAgo) return false;
    } else if (filters.dateRange === 'year') {
      const yearAgo = new Date();
      yearAgo.setFullYear(currentDate.getFullYear() - 1);
      if (transactionDate < yearAgo) return false;
    }
    
    return true;
  });

  // Handlers
  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setIsAddTransactionOpen(true);
  };
  
  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsViewTransactionOpen(true);
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditTransactionOpen(true);
  };
  
  const handleDeleteTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteTransactionOpen(true);
  };
  
  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsViewInvoiceOpen(true);
  };
  
  const confirmDeleteTransaction = () => {
    if (selectedTransaction) {
      const updatedTransactions = transactions.filter(t => t.id !== selectedTransaction.id);
      setTransactions(updatedTransactions);
      
      // Recalcular estadísticas
      const totalIncome = updatedTransactions
        .filter(t => t.type === 'income' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const totalExpenses = updatedTransactions
        .filter(t => t.type === 'expense' && t.status === 'completed')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
      setStats({
        ...stats,
        totalIncome,
        totalExpenses,
        netProfit: totalIncome - totalExpenses
      });
      
      toast.success('Transacción eliminada correctamente');
      setIsDeleteTransactionOpen(false);
    }
  };
  
  const handleSaveTransaction = () => {
    // Implementar lógica para guardar transacción
    setIsAddTransactionOpen(false);
    setIsEditTransactionOpen(false);
    toast.success('Transacción guardada correctamente');
  };
  
  // Función para formatear montos como moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { 
      style: 'currency', 
      currency: 'EUR'
    }).format(amount);
  };
  
  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Colores para gráficos
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Renderizar formulario de transacción
  const renderTransactionForm = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="transaction-type">Tipo de Transacción</Label>
            <Select defaultValue={selectedTransaction?.type || 'income'}>
              <SelectTrigger id="transaction-type">
                <SelectValue placeholder="Selecciona tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Ingreso</SelectItem>
                <SelectItem value="expense">Gasto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-amount">Importe</Label>
            <div className="relative">
              <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              <Input 
                id="transaction-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                defaultValue={selectedTransaction ? Math.abs(selectedTransaction.amount) : ''}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-date">Fecha</Label>
            <Input 
              id="transaction-date"
              type="date"
              defaultValue={selectedTransaction?.date || new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-category">Categoría</Label>
            <Select defaultValue={selectedTransaction?.category || ''}>
              <SelectTrigger id="transaction-category">
                <SelectValue placeholder="Selecciona categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fotografía">Fotografía</SelectItem>
                <SelectItem value="Videografía">Videografía</SelectItem>
                <SelectItem value="Álbum">Álbum</SelectItem>
                <SelectItem value="Equipo">Equipo</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="Publicidad">Publicidad</SelectItem>
                <SelectItem value="Transporte">Transporte</SelectItem>
                <SelectItem value="Oficina">Oficina</SelectItem>
                <SelectItem value="Otros">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 col-span-2">
            <Label htmlFor="transaction-description">Descripción</Label>
            <Textarea 
              id="transaction-description"
              placeholder="Descripción de la transacción"
              defaultValue={selectedTransaction?.description || ''}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-status">Estado</Label>
            <Select defaultValue={selectedTransaction?.status || 'completed'}>
              <SelectTrigger id="transaction-status">
                <SelectValue placeholder="Selecciona estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transaction-payment">Método de Pago</Label>
            <Select defaultValue={selectedTransaction?.paymentMethod || ''}>
              <SelectTrigger id="transaction-payment">
                <SelectValue placeholder="Método de pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Transferencia bancaria">Transferencia bancaria</SelectItem>
                <SelectItem value="Tarjeta de crédito">Tarjeta de crédito</SelectItem>
                <SelectItem value="Tarjeta de débito">Tarjeta de débito</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
                <SelectItem value="Efectivo">Efectivo</SelectItem>
                <SelectItem value="Domiciliación bancaria">Domiciliación bancaria</SelectItem>
                <SelectItem value="Bizum">Bizum</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <Button 
            className="bg-wedding-sage hover:bg-wedding-sage/90 w-full"
            onClick={handleSaveTransaction}
          >
            {selectedTransaction ? 'Guardar cambios' : 'Registrar transacción'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />
      
      <main className="flex-grow py-8">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-serif font-semibold">Gestión Financiera</h1>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Exportar
              </Button>
              <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={handleAddTransaction}>
                <Plus className="mr-2 h-4 w-4" /> Nueva Transacción
              </Button>
            </div>
          </div>
          
          {/* Cards de resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-5">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">Ingresos Totales</p>
                  <div className="flex items-center mt-1">
                    <p className="text-3xl font-bold">{formatCurrency(stats.totalIncome)}</p>
                    <Badge className="ml-2 bg-green-100 text-green-800" variant="outline">
                      <ArrowUp className="mr-1 h-3 w-3" /> 12%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-5">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">Gastos Totales</p>
                  <div className="flex items-center mt-1">
                    <p className="text-3xl font-bold">{formatCurrency(stats.totalExpenses)}</p>
                    <Badge className="ml-2 bg-red-100 text-red-800" variant="outline">
                      <ArrowUp className="mr-1 h-3 w-3" /> 5%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-5">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">Beneficio Neto</p>
                  <div className="flex items-center mt-1">
                    <p className="text-3xl font-bold">{formatCurrency(stats.netProfit)}</p>
                    <Badge className="ml-2 bg-green-100 text-green-800" variant="outline">
                      <ArrowUp className="mr-1 h-3 w-3" /> 8%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-5">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">Pagos Pendientes</p>
                  <div className="flex items-center mt-1">
                    <p className="text-3xl font-bold">{formatCurrency(stats.pendingPayments)}</p>
                    <Badge className="ml-2 bg-yellow-100 text-yellow-800" variant="outline">
                      <ArrowDown className="mr-1 h-3 w-3" /> 3%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="transactions" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md mx-auto">
              <TabsTrigger value="transactions">Transacciones</TabsTrigger>
              <TabsTrigger value="invoices">Facturas</TabsTrigger>
              <TabsTrigger value="analytics">Analítica</TabsTrigger>
            </TabsList>
            
            {/* Pestaña de Transacciones */}
            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Filtrar Transacciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        placeholder="Buscar transacción..."
                        value={filters.search}
                        onChange={(e) => setFilters({...filters, search: e.target.value})}
                        className="pl-9"
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <Select 
                        value={filters.type || ""}
                        onValueChange={(value) => setFilters({...filters, type: value as any || undefined})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Todos los tipos</SelectItem>
                          <SelectItem value="income">Ingresos</SelectItem>
                          <SelectItem value="expense">Gastos</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select 
                        value={filters.status || ""}
                        onValueChange={(value) => setFilters({...filters, status: value as any || undefined})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Todos los estados</SelectItem>
                          <SelectItem value="completed">Completados</SelectItem>
                          <SelectItem value="pending">Pendientes</SelectItem>
                          <SelectItem value="cancelled">Cancelados</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Select 
                      value={filters.dateRange}
                      onValueChange={(value) => setFilters({...filters, dateRange: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rango de fechas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todo el tiempo</SelectItem>
                        <SelectItem value="week">Última semana</SelectItem>
                        <SelectItem value="month">Último mes</SelectItem>
                        <SelectItem value="quarter">Último trimestre</SelectItem>
                        <SelectItem value="year">Último año</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Registro de Transacciones</CardTitle>
                  <CardDescription>
                    Visualiza y gestiona todas tus transacciones financieras
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead className="hidden md:table-cell">Categoría</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Importe</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTransactions.length > 0 ? (
                          filteredTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-medium">
                                {formatDate(transaction.date)}
                              </TableCell>
                              <TableCell>
                                <div>
                                  {transaction.description}
                                  {transaction.client && (
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                      <Avatar className="h-5 w-5 mr-1">
                                        <AvatarImage src={transaction.client.avatar} alt={transaction.client.name} />
                                        <AvatarFallback>{transaction.client.name.substring(0, 2)}</AvatarFallback>
                                      </Avatar>
                                      {transaction.client.name}
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <Badge variant="outline">{transaction.category}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  className={
                                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }
                                >
                                  {transaction.status === 'completed' ? 'Completado' :
                                   transaction.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                                </Badge>
                              </TableCell>
                              <TableCell className={transaction.type === 'income' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                {transaction.type === 'income' ? '+' : '-'} {formatCurrency(Math.abs(transaction.amount))}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-1">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => handleViewTransaction(transaction)}
                                  >
                                    <FileText size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => handleEditTransaction(transaction)}
                                  >
                                    <Edit size={16} />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-red-500"
                                    onClick={() => handleDeleteTransaction(transaction)}
                                  >
                                    <Trash size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                              No se encontraron transacciones con los filtros aplicados
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Pestaña de Facturas */}
            <TabsContent value="invoices" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestión de Facturas</CardTitle>
                      <CardDescription>
                        Administra las facturas emitidas a clientes
                      </CardDescription>
                    </div>
                    <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={() => setIsAddInvoiceOpen(true)}>
                      <FilePlus className="mr-2 h-4 w-4" /> Nueva Factura
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nº Factura</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Vencimiento</TableHead>
                          <TableHead>Importe</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">
                              {invoice.number}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={invoice.clientAvatar} alt={invoice.clientName} />
                                  <AvatarFallback>{invoice.clientName.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                {invoice.clientName}
                              </div>
                            </TableCell>
                            <TableCell>
                              {formatDate(invoice.date)}
                            </TableCell>
                            <TableCell>
                              {formatDate(invoice.dueDate)}
                            </TableCell>
                            <TableCell className="font-medium">
                              {formatCurrency(invoice.amount)}
                            </TableCell>
                            <TableCell>
                              <Badge className={
                                invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                                invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }>
                                {invoice.status === 'paid' ? 'Pagada' :
                                 invoice.status === 'pending' ? 'Pendiente' : 'Vencida'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8"
                                  onClick={() => handleViewInvoice(invoice)}
                                >
                                  <FileText size={14} className="mr-1" /> Ver
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8">
                                      <MoreHorizontal size={14} />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Edit size={14} className="mr-2" /> Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download size={14} className="mr-2" /> Descargar PDF
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Mail size={14} className="mr-2" /> Enviar por email
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <CheckCircle size={14} className="mr-2 text-green-600" /> Marcar como pagada
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash size={14} className="mr-2" /> Eliminar
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Pestaña de Analítica */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de ingresos y gastos */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ingresos y Gastos</CardTitle>
                    <CardDescription>Evolución mensual de ingresos, gastos y beneficios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                          <Bar dataKey="income" name="Ingresos" fill="#4F46E5" />
                          <Bar dataKey="expenses" name="Gastos" fill="#F43F5E" />
                          <Bar dataKey="profit" name="Beneficio" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Gráfico de categorías */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ingresos por Servicio</CardTitle>
                    <CardDescription>Distribución de ingresos por tipo de servicio</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center">
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Estadísticas adicionales */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Métricas Financieras</CardTitle>
                    <CardDescription>Indicadores financieros clave de tu negocio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="text-sm font-medium">Tasa de Conversión de Leads</div>
                        <div className="text-3xl font-bold">38%</div>
                        <p className="text-sm text-gray-500">Porcentaje de consultas que se convierten en ventas</p>
                        <div className="flex items-center">
                          <Badge className="bg-green-100 text-green-800">
                            <ArrowUp className="mr-1 h-3 w-3" /> 5%
                          </Badge>
                          <span className="text-xs text-gray-500 ml-2">vs. mes anterior</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-sm font-medium">Ticket Medio</div>
                        <div className="text-3xl font-bold">1.450 €</div>
                        <p className="text-sm text-gray-500">Valor medio por servicio contratado</p>
                        <div className="flex items-center">
                          <Badge className="bg-green-100 text-green-800">
                            <ArrowUp className="mr-1 h-3 w-3" /> 3%
                          </Badge>
                          <span className="text-xs text-gray-500 ml-2">vs. mes anterior</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-sm font-medium">Margen de Beneficio</div>
                        <div className="text-3xl font-bold">42%</div>
                        <p className="text-sm text-gray-500">Porcentaje de beneficio sobre ingresos totales</p>
                        <div className="flex items-center">
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <ArrowDown className="mr-1 h-3 w-3" /> 2%
                          </Badge>
                          <span className="text-xs text-gray-500 ml-2">vs. mes anterior</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      
      {/* Diálogo para ver transacción */}
      <Dialog open={isViewTransactionOpen} onOpenChange={setIsViewTransactionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Detalles de Transacción
              <Badge 
                className={`ml-2 ${
                  selectedTransaction?.type === 'income' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {selectedTransaction?.type === 'income' ? 'Ingreso' : 'Gasto'}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="py-4">
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <div className="font-medium">Importe</div>
                <div className={`text-xl font-bold ${
                  selectedTransaction.type === 'income' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {selectedTransaction.type === 'income' ? '+' : '-'} {formatCurrency(Math.abs(selectedTransaction.amount))}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-gray-500">Fecha</div>
                    <div>{formatDate(selectedTransaction.date)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Categoría</div>
                    <div>{selectedTransaction.category}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Estado</div>
                    <Badge 
                      className={
                        selectedTransaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        selectedTransaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {selectedTransaction.status === 'completed' ? 'Completado' :
                       selectedTransaction.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Método de Pago</div>
                    <div>{selectedTransaction.paymentMethod || 'No especificado'}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Descripción</div>
                  <div className="bg-gray-50 p-2 rounded mt-1">{selectedTransaction.description}</div>
                </div>
                
                {selectedTransaction.client && (
                  <div>
                    <div className="text-sm text-gray-500">Cliente</div>
                    <div className="flex items-center mt-1">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={selectedTransaction.client.avatar} alt={selectedTransaction.client.name} />
                        <AvatarFallback>{selectedTransaction.client.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{selectedTransaction.client.name}</div>
                        {selectedTransaction.service && (
                          <div className="text-xs text-gray-500">{selectedTransaction.service}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedTransaction.reference && (
                  <div>
                    <div className="text-sm text-gray-500">Referencia</div>
                    <div className="text-xs font-mono bg-gray-50 p-2 rounded mt-1">{selectedTransaction.reference}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => {
                setIsViewTransactionOpen(false);
                if (selectedTransaction) handleEditTransaction(selectedTransaction);
              }}>
                <Edit className="mr-1 h-4 w-4" /> Editar
              </Button>
              
              <Button variant="outline" size="sm" className="text-red-600" onClick={() => {
                setIsViewTransactionOpen(false);
                if (selectedTransaction) handleDeleteTransaction(selectedTransaction);
              }}>
                <Trash className="mr-1 h-4 w-4" /> Eliminar
              </Button>
            </div>
            <Button onClick={() => setIsViewTransactionOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para ver factura */}
      <Dialog open={isViewInvoiceOpen} onOpenChange={setIsViewInvoiceOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Factura #{selectedInvoice?.number}</span>
              <Badge 
                className={
                  selectedInvoice?.status === 'paid' ? 'bg-green-100 text-green-800' :
                  selectedInvoice?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }
              >
                {selectedInvoice?.status === 'paid' ? 'Pagada' :
                 selectedInvoice?.status === 'pending' ? 'Pendiente' : 'Vencida'}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          {selectedInvoice && (
            <div className="py-4 space-y-4">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-gray-500">Cliente</div>
                  <div className="flex items-center mt-1">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={selectedInvoice.clientAvatar} alt={selectedInvoice.clientName} />
                      <AvatarFallback>{selectedInvoice.clientName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>{selectedInvoice.clientName}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Importe</div>
                  <div className="text-xl font-bold">{formatCurrency(selectedInvoice.amount)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Fecha de emisión</div>
                  <div>{formatDate(selectedInvoice.date)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Fecha de vencimiento</div>
                  <div className="flex items-center">
                    {formatDate(selectedInvoice.dueDate)}
                    {selectedInvoice.status === 'overdue' && (
                      <Badge className="ml-2 bg-red-100 text-red-800">
                        <Clock className="mr-1 h-3 w-3" /> Vencida
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-2">Servicios incluidos</div>
                <div className="space-y-2">
                  {selectedInvoice.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>{service}</div>
                      <Badge variant="outline">1 x {formatCurrency(selectedInvoice.amount / selectedInvoice.services.length)}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="mr-1 h-4 w-4" /> Descargar
              </Button>
              
              <Button variant="outline" size="sm">
                <Mail className="mr-1 h-4 w-4" /> Enviar
              </Button>
            </div>
            <Button onClick={() => setIsViewInvoiceOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para añadir transacción */}
      <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nueva Transacción</DialogTitle>
            <DialogDescription>
              Registra un nuevo ingreso o gasto en tu contabilidad
            </DialogDescription>
          </DialogHeader>
          
          {renderTransactionForm()}
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para editar transacción */}
      <Dialog open={isEditTransactionOpen} onOpenChange={setIsEditTransactionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Transacción</DialogTitle>
            <DialogDescription>
              Modifica los detalles de esta transacción
            </DialogDescription>
          </DialogHeader>
          
          {renderTransactionForm()}
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para eliminar transacción */}
      <Dialog open={isDeleteTransactionOpen} onOpenChange={setIsDeleteTransactionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Eliminar Transacción</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar esta transacción? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteTransactionOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeleteTransaction}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProviderFinances;
