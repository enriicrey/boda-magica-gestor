
import React, { useState } from 'react';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash, DollarSign, PieChart, ArrowRight, Check, Download, Filter } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Interfaces para tipos de datos
interface BudgetItem {
  id: number;
  name: string;
  category: string;
  estimatedAmount: number;
  actualAmount?: number;
  vendor?: string;
  isPaid: boolean;
  notes?: string;
  dueDate?: Date;
}

interface BudgetCategory {
  name: string;
  color: string;
  total: number;
  percentage: number;
}

const Budget = () => {
  // Datos simulados del usuario
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Progreso del perfil
  const progress = 38;
  
  // Estado para el presupuesto total
  const [totalBudget, setTotalBudget] = useState<number>(20000);
  
  // Estado para los ítems del presupuesto
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    {
      id: 1,
      name: 'Alquiler del lugar',
      category: 'venue',
      estimatedAmount: 7500,
      actualAmount: 7800,
      vendor: 'Villa Rosa',
      isPaid: true,
      notes: 'Incluye ceremonia y banquete',
      dueDate: new Date(2025, 3, 15)
    },
    {
      id: 2,
      name: 'Catering',
      category: 'food',
      estimatedAmount: 5000,
      actualAmount: 5200,
      vendor: 'Delicious Catering',
      isPaid: true,
      notes: '100 invitados, menú premium',
      dueDate: new Date(2025, 7, 1)
    },
    {
      id: 3,
      name: 'Fotógrafo',
      category: 'photography',
      estimatedAmount: 1800,
      actualAmount: 1800,
      vendor: 'Carlos Jiménez Fotografía',
      isPaid: true,
      dueDate: new Date(2025, 6, 15)
    },
    {
      id: 4,
      name: 'Vestido de novia',
      category: 'attire',
      estimatedAmount: 2000,
      actualAmount: 2350,
      vendor: 'Atelier Novias',
      isPaid: true,
      dueDate: new Date(2025, 4, 10)
    },
    {
      id: 5,
      name: 'Traje del novio',
      category: 'attire',
      estimatedAmount: 800,
      actualAmount: 750,
      vendor: 'Elegance Men',
      isPaid: false,
      dueDate: new Date(2025, 7, 15)
    },
    {
      id: 6,
      name: 'Flores y decoración',
      category: 'decor',
      estimatedAmount: 1200,
      vendor: 'Elegancia Floral',
      isPaid: false,
      notes: 'Incluye ramos, centros de mesa y decoración de ceremonia',
      dueDate: new Date(2025, 8, 1)
    },
    {
      id: 7,
      name: 'DJ y música',
      category: 'entertainment',
      estimatedAmount: 800,
      vendor: 'Melodía Eventos',
      isPaid: false,
      dueDate: new Date(2025, 8, 10)
    },
    {
      id: 8,
      name: 'Invitaciones',
      category: 'stationery',
      estimatedAmount: 400,
      actualAmount: 450,
      vendor: 'Papelería Creativa',
      isPaid: true,
      dueDate: new Date(2025, 5, 5)
    },
    {
      id: 9,
      name: 'Pastel de boda',
      category: 'food',
      estimatedAmount: 500,
      vendor: 'Dulce Tentación',
      isPaid: false,
      notes: 'Tres pisos, sabores variados',
      dueDate: new Date(2025, 9, 1)
    }
  ]);
  
  // Estado para el ítem seleccionado y modal
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BudgetItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<BudgetItem>>({
    name: '',
    category: 'venue',
    estimatedAmount: 0,
    actualAmount: undefined,
    vendor: '',
    isPaid: false,
    notes: '',
    dueDate: undefined
  });
  
  // Estado para el filtro activo
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Calcular estadísticas
  const totalEstimated = budgetItems.reduce((sum, item) => sum + item.estimatedAmount, 0);
  const totalActual = budgetItems.reduce((sum, item) => sum + (item.actualAmount || item.estimatedAmount), 0);
  const totalSpent = budgetItems
    .filter(item => item.isPaid)
    .reduce((sum, item) => sum + (item.actualAmount || item.estimatedAmount), 0);
  const totalRemaining = totalBudget - totalSpent;
  const budgetProgress = (totalSpent / totalBudget) * 100;
  
  // Categorías para el gráfico
  const categories = budgetItems.reduce<Record<string, BudgetCategory>>((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = {
        name: getCategoryName(category),
        color: getCategoryColor(category),
        total: 0,
        percentage: 0
      };
    }
    acc[category].total += (item.actualAmount || item.estimatedAmount);
    return acc;
  }, {});
  
  // Calcular porcentajes para las categorías
  Object.keys(categories).forEach(key => {
    categories[key].percentage = (categories[key].total / totalActual) * 100;
  });
  
  // Filtrar items según categoría activa y búsqueda
  const filteredItems = budgetItems.filter(item => {
    const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
    const matchesStatus = 
      (activeFilter === 'paid' && item.isPaid) || 
      (activeFilter === 'unpaid' && !item.isPaid) ||
      activeFilter === 'all' || 
      Object.keys(categories).includes(activeFilter);
    
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.vendor && item.vendor.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return (matchesCategory || matchesStatus) && matchesSearch;
  });
  
  // Funciones para manejar ítems
  const handleAddItem = () => {
    setSelectedItem(null);
    setNewItem({
      name: '',
      category: 'venue',
      estimatedAmount: 0,
      actualAmount: undefined,
      vendor: '',
      isPaid: false,
      notes: '',
      dueDate: undefined
    });
    setIsItemModalOpen(true);
  };
  
  const handleEditItem = (item: BudgetItem) => {
    setSelectedItem(item);
    setNewItem({ ...item });
    setIsItemModalOpen(true);
  };
  
  const handleDeleteItem = (itemId: number) => {
    setBudgetItems(budgetItems.filter(item => item.id !== itemId));
    toast.success("Ítem eliminado del presupuesto");
  };
  
  const handleSaveItem = () => {
    if (!newItem.name || !newItem.estimatedAmount) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    
    if (selectedItem) {
      // Editar ítem existente
      setBudgetItems(budgetItems.map(item => 
        item.id === selectedItem.id ? { ...item, ...newItem } as BudgetItem : item
      ));
      toast.success("Ítem actualizado correctamente");
    } else {
      // Crear nuevo ítem
      const newItemWithId = {
        ...newItem,
        id: budgetItems.length > 0 ? Math.max(...budgetItems.map(i => i.id)) + 1 : 1
      } as BudgetItem;
      setBudgetItems([...budgetItems, newItemWithId]);
      toast.success("Ítem añadido al presupuesto");
    }
    
    setIsItemModalOpen(false);
  };
  
  const handleToggleItemPaid = (itemId: number) => {
    setBudgetItems(budgetItems.map(item => 
      item.id === itemId ? 
      { ...item, isPaid: !item.isPaid } : 
      item
    ));
    
    const isPaid = budgetItems.find(i => i.id === itemId)?.isPaid;
    toast.success(`Ítem marcado como ${isPaid ? 'no pagado' : 'pagado'}`);
  };
  
  const handleUpdateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Presupuesto total actualizado");
  };
  
  // Obtener el color de la categoría
  function getCategoryColor(category: string): string {
    switch (category) {
      case 'venue': return '#4285F4';
      case 'food': return '#EA4335';
      case 'photography': return '#FBBC05';
      case 'attire': return '#34A853';
      case 'decor': return '#FF6D01';
      case 'entertainment': return '#46BDC6';
      case 'stationery': return '#7B1FA2';
      case 'transportation': return '#C2185B';
      default: return '#9E9E9E';
    }
  }
  
  // Obtener el nombre de la categoría
  function getCategoryName(category: string): string {
    switch (category) {
      case 'venue': return 'Lugar';
      case 'food': return 'Catering y comida';
      case 'photography': return 'Fotografía y vídeo';
      case 'attire': return 'Vestuario';
      case 'decor': return 'Decoración';
      case 'entertainment': return 'Entretenimiento';
      case 'stationery': return 'Papelería';
      case 'transportation': return 'Transporte';
      default: return 'Otros';
    }
  }
  
  // Formatear moneda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <ClientSidebar 
              userName={userData.name}
              userAvatar={userData.avatar}
              weddingDate={userData.weddingDate}
              progress={progress}
              avatarFallback={userData.avatarFallback}
            />
            
            {/* Main Content */}
            <div className="lg:w-3/4 space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-semibold flex items-center">
                  <DollarSign className="mr-2 text-wedding-sage" /> 
                  Presupuesto
                </h1>
                <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={handleAddItem}>
                  <Plus className="mr-1 h-4 w-4" /> Añadir Gasto
                </Button>
              </div>
              
              {/* Tarjetas de resumen */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Presupuesto Total</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalBudget)}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <form onSubmit={handleUpdateBudget} className="flex items-center gap-2 mt-3">
                      <Input
                        type="number"
                        className="h-8"
                        value={totalBudget}
                        onChange={(e) => setTotalBudget(Number(e.target.value))}
                      />
                      <Button size="sm" className="h-8 bg-blue-600">
                        <Check className="h-3 w-3" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Gastado</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalSpent)}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Progreso</span>
                        <span>{Math.round(budgetProgress)}%</span>
                      </div>
                      <Progress value={budgetProgress} className="h-1" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Restante</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalRemaining)}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                      {totalRemaining > 0 ? (
                        <span>Tienes {formatCurrency(totalRemaining)} disponibles</span>
                      ) : (
                        <span className="text-red-600">¡Has excedido el presupuesto!</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Estimado vs. Real</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalActual - totalEstimated)}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 text-sm">
                      <span className="text-gray-500">Estimado: {formatCurrency(totalEstimated)}</span>
                      <span className="text-gray-500">Real: {formatCurrency(totalActual)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="table" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="table">Tabla</TabsTrigger>
                  <TabsTrigger value="distribution">Distribución</TabsTrigger>
                </TabsList>
                
                <TabsContent value="table" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Desglose del Presupuesto</CardTitle>
                      <CardDescription>
                        Gestiona todos los gastos relacionados con tu boda
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between mb-6">
                        <div className="relative max-w-sm">
                          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <Input
                            className="pl-10"
                            placeholder="Buscar ítem o proveedor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="flex gap-2">
                                <Filter className="h-4 w-4" />
                                {activeFilter === 'all' ? 'Todos' : (
                                  activeFilter === 'paid' ? 'Pagados' : 
                                  activeFilter === 'unpaid' ? 'Por pagar' :
                                  getCategoryName(activeFilter)
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setActiveFilter('all')}>
                                Todos
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setActiveFilter('paid')}>
                                Pagados
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setActiveFilter('unpaid')}>
                                Por pagar
                              </DropdownMenuItem>
                              {Object.keys(categories).map(category => (
                                <DropdownMenuItem 
                                  key={category}
                                  onClick={() => setActiveFilter(category)}
                                >
                                  {getCategoryName(category)}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-1" /> Exportar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Concepto</TableHead>
                              <TableHead>Categoría</TableHead>
                              <TableHead className="text-right">Estimado</TableHead>
                              <TableHead className="text-right">Actual</TableHead>
                              <TableHead>Estado</TableHead>
                              <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredItems
                              .sort((a, b) => (a.category > b.category) ? 1 : -1)
                              .map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">{item.name}</p>
                                      {item.vendor && (
                                        <p className="text-sm text-gray-500">{item.vendor}</p>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge 
                                      className="bg-opacity-20 text-opacity-100"
                                      style={{
                                        backgroundColor: `${getCategoryColor(item.category)}20`,
                                        color: getCategoryColor(item.category)
                                      }}
                                    >
                                      {getCategoryName(item.category)}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    {formatCurrency(item.estimatedAmount)}
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    {item.actualAmount ? (
                                      <div className={`${item.actualAmount > item.estimatedAmount ? 'text-red-600' : 'text-green-600'}`}>
                                        {formatCurrency(item.actualAmount)}
                                      </div>
                                    ) : (
                                      <span className="text-gray-500">-</span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center">
                                      <Badge className={item.isPaid ? 'bg-green-100 text-green-800 border-0' : 'bg-yellow-100 text-yellow-800 border-0'}>
                                        {item.isPaid ? 'Pagado' : 'Pendiente'}
                                      </Badge>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end space-x-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => handleToggleItemPaid(item.id)}
                                      >
                                        {item.isPaid ? (
                                          <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                          </svg>
                                        ) : (
                                          <DollarSign className="h-4 w-4 text-yellow-600" />
                                        )}
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => handleEditItem(item)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-red-600"
                                        onClick={() => handleDeleteItem(item.id)}
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            {filteredItems.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                                  No se encontraron ítems con los criterios seleccionados
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="distribution" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <PieChart className="mr-2 h-5 w-5 text-wedding-sage" /> Distribución del Presupuesto
                      </CardTitle>
                      <CardDescription>
                        Ver cómo se distribuye tu presupuesto por categorías
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-center">
                          <div className="relative w-52 h-52">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              {/* Mock pie chart using SVG - in a real app, use recharts or another charting library */}
                              {(() => {
                                let startAngle = 0;
                                return Object.keys(categories).map((category, index) => {
                                  const percentage = categories[category].percentage;
                                  const angle = (percentage / 100) * 360;
                                  const largeArcFlag = angle > 180 ? 1 : 0;
                                  
                                  // Convert polar coordinates to Cartesian
                                  const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                                  const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                                  
                                  const endAngle = startAngle + angle;
                                  const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                                  const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                                  
                                  // Create the arc path
                                  const path = `
                                    M 50 50
                                    L ${startX} ${startY}
                                    A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}
                                    Z
                                  `;
                                  
                                  const result = (
                                    <path
                                      key={category}
                                      d={path}
                                      fill={getCategoryColor(category)}
                                    />
                                  );
                                  
                                  startAngle = endAngle;
                                  return result;
                                });
                              })()}
                              {/* Central circle for donut chart */}
                              <circle cx="50" cy="50" r="25" fill="white" />
                              <text x="50" y="45" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#333" fontWeight="bold">
                                Total
                              </text>
                              <text x="50" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#666">
                                {formatCurrency(totalActual)}
                              </text>
                            </svg>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {Object.keys(categories).map((category) => (
                            <div key={category} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: getCategoryColor(category) }}
                                ></div>
                                <span>{getCategoryName(category)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{formatCurrency(categories[category].total)}</span>
                                <Badge variant="outline">{Math.round(categories[category].percentage)}%</Badge>
                              </div>
                            </div>
                          ))}
                          
                          <div className="pt-4 mt-4 border-t border-gray-200 flex justify-between font-medium">
                            <span>Total:</span>
                            <span>{formatCurrency(totalActual)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Recomendaciones</CardTitle>
                      <CardDescription>
                        Consejos para ajustar tu presupuesto
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {totalRemaining < 0 ? (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-800 font-medium">Has excedido tu presupuesto</p>
                            <p className="text-sm text-red-700 mt-1">
                              Has superado tu presupuesto total por {formatCurrency(Math.abs(totalRemaining))}. 
                              Considera reducir gastos en algunas categorías o aumentar tu presupuesto total.
                            </p>
                          </div>
                        ) : totalRemaining < totalBudget * 0.1 ? (
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-yellow-800 font-medium">Estás cerca del límite de tu presupuesto</p>
                            <p className="text-sm text-yellow-700 mt-1">
                              Te quedan {formatCurrency(totalRemaining)}, menos del 10% de tu presupuesto total.
                              Es recomendable reservar un margen para gastos imprevistos.
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-green-800 font-medium">Tu presupuesto está bien administrado</p>
                            <p className="text-sm text-green-700 mt-1">
                              Tienes {formatCurrency(totalRemaining)} disponibles, un {Math.round((totalRemaining / totalBudget) * 100)}% de tu presupuesto total.
                              Esto te permite cierta flexibilidad para imprevistos.
                            </p>
                          </div>
                        )}
                        
                        {/* Categoría con mayor gasto */}
                        {Object.keys(categories).length > 0 && (
                          <div className="p-4 border rounded-md">
                            <p className="font-medium">Distribución por categorías</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Tu mayor gasto está en la categoría "{getCategoryName(
                                Object.keys(categories).reduce((a, b) => 
                                  categories[a].total > categories[b].total ? a : b
                                )
                              )}", que representa un {Math.round(Math.max(
                                ...Object.keys(categories).map(key => categories[key].percentage)
                              ))}% de tu presupuesto.
                            </p>
                          </div>
                        )}
                        
                        {/* Próximos pagos */}
                        {budgetItems.filter(item => !item.isPaid).length > 0 && (
                          <div className="p-4 border rounded-md">
                            <p className="font-medium">Próximos pagos</p>
                            <p className="text-sm text-gray-600 mt-1 mb-3">
                              Tienes {budgetItems.filter(item => !item.isPaid).length} pagos pendientes por un total de {formatCurrency(
                                budgetItems
                                  .filter(item => !item.isPaid)
                                  .reduce((sum, item) => sum + (item.actualAmount || item.estimatedAmount), 0)
                              )}.
                            </p>
                            <Button variant="outline" className="w-full">
                              Ver calendario de pagos <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Modal para añadir/editar ítem */}
      <Dialog open={isItemModalOpen} onOpenChange={setIsItemModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedItem ? 'Editar ítem' : 'Añadir ítem'}</DialogTitle>
            <DialogDescription>
              {selectedItem 
                ? 'Modifica los detalles del gasto' 
                : 'Introduce los detalles del nuevo gasto'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="item-name">Nombre</Label>
              <Input
                id="item-name"
                placeholder="Nombre del gasto"
                value={newItem.name || ''}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-category">Categoría</Label>
                <Select
                  value={newItem.category}
                  onValueChange={(value) => setNewItem({...newItem, category: value})}
                >
                  <SelectTrigger id="item-category">
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venue">Lugar</SelectItem>
                    <SelectItem value="food">Catering y comida</SelectItem>
                    <SelectItem value="photography">Fotografía y vídeo</SelectItem>
                    <SelectItem value="attire">Vestuario</SelectItem>
                    <SelectItem value="decor">Decoración</SelectItem>
                    <SelectItem value="entertainment">Entretenimiento</SelectItem>
                    <SelectItem value="stationery">Papelería</SelectItem>
                    <SelectItem value="transportation">Transporte</SelectItem>
                    <SelectItem value="other">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="item-estimated">Importe Estimado</Label>
                <Input
                  id="item-estimated"
                  type="number"
                  placeholder="0"
                  value={newItem.estimatedAmount || ''}
                  onChange={(e) => setNewItem({...newItem, estimatedAmount: Number(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-actual">Importe Actual (opcional)</Label>
                <Input
                  id="item-actual"
                  type="number"
                  placeholder="0"
                  value={newItem.actualAmount !== undefined ? newItem.actualAmount : ''}
                  onChange={(e) => setNewItem({...newItem, actualAmount: e.target.value ? Number(e.target.value) : undefined})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="item-due-date">Fecha de Pago</Label>
                <Input
                  id="item-due-date"
                  type="date"
                  value={newItem.dueDate ? newItem.dueDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setNewItem({
                    ...newItem, 
                    dueDate: e.target.value ? new Date(e.target.value) : undefined
                  })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="item-vendor">Proveedor</Label>
              <Input
                id="item-vendor"
                placeholder="Nombre del proveedor (opcional)"
                value={newItem.vendor || ''}
                onChange={(e) => setNewItem({...newItem, vendor: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="item-notes">Notas</Label>
              <Input
                id="item-notes"
                placeholder="Notas adicionales (opcional)"
                value={newItem.notes || ''}
                onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="item-paid"
                className="rounded border-gray-300 text-wedding-sage focus:ring-wedding-sage h-4 w-4"
                checked={newItem.isPaid}
                onChange={(e) => setNewItem({...newItem, isPaid: e.target.checked})}
              />
              <Label htmlFor="item-paid" className="text-sm font-normal">Marcar como pagado</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsItemModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={handleSaveItem}>
              {selectedItem ? 'Guardar cambios' : 'Añadir ítem'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Budget;
