
import React, { useState } from 'react';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CreditCard, TrendingUp, AlertCircle, Plus, Edit, Trash } from 'lucide-react';

const ClientPresupuesto = () => {
  const [totalBudget, setTotalBudget] = useState(20000);

  const budgetItems = [
    { id: 1, category: 'Lugar', allocated: 8500, spent: 8500, status: 'Pagado', color: '#8884d8' },
    { id: 2, category: 'Catering', allocated: 4200, spent: 0, status: 'Pendiente', color: '#82ca9d' },
    { id: 3, category: 'Fotografía', allocated: 1800, spent: 900, status: 'Parcial', color: '#ffc658' },
    { id: 4, category: 'Decoración', allocated: 2400, spent: 0, status: 'Pendiente', color: '#ff7300' },
    { id: 5, category: 'Música', allocated: 1200, spent: 0, status: 'Pendiente', color: '#8dd1e1' },
    { id: 6, category: 'Vestido/Traje', allocated: 1500, spent: 1200, status: 'Parcial', color: '#d084d0' },
    { id: 7, category: 'Otros', allocated: 400, spent: 150, status: 'Parcial', color: '#87d068' }
  ];

  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const remaining = totalBudget - totalSpent;
  const percentageUsed = (totalSpent / totalBudget) * 100;

  const pieData = budgetItems.map(item => ({
    name: item.category,
    value: item.allocated,
    color: item.color
  }));

  const monthlySpending = [
    { month: 'Ene', spent: 0 },
    { month: 'Feb', spent: 1200 },
    { month: 'Mar', spent: 8500 },
    { month: 'Abr', spent: 900 },
    { month: 'May', spent: 150 },
    { month: 'Jun', spent: 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pagado': return 'bg-green-100 text-green-800';
      case 'Parcial': return 'bg-yellow-100 text-yellow-800';
      case 'Pendiente': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ClientLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Presupuesto</h1>
          <p className="text-gray-500">
            Controla todos los gastos de tu boda y mantén el presupuesto bajo control.
          </p>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Presupuesto Total</p>
                  <p className="text-2xl font-bold">€{totalBudget.toLocaleString()}</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Gastado</p>
                  <p className="text-2xl font-bold text-red-600">€{totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-red-600">{percentageUsed.toFixed(1)}% del total</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Disponible</p>
                  <p className="text-2xl font-bold text-green-600">€{remaining.toLocaleString()}</p>
                  <p className="text-xs text-green-600">{(100 - percentageUsed).toFixed(1)}% restante</p>
                </div>
                <AlertCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso del presupuesto</span>
                <span>{percentageUsed.toFixed(1)}%</span>
              </div>
              <Progress value={percentageUsed} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>€0</span>
                <span>€{totalBudget.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución del Presupuesto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`€${value}`, 'Asignado']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Spending */}
          <Card>
            <CardHeader>
              <CardTitle>Gastos Mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `€${value}`} />
                    <Tooltip formatter={(value) => [`€${value}`, 'Gastado']} />
                    <Bar dataKey="spent" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Desglose por Categorías</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Añadir categoría
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Categoría</th>
                    <th className="text-left p-3">Asignado</th>
                    <th className="text-left p-3">Gastado</th>
                    <th className="text-left p-3">Restante</th>
                    <th className="text-left p-3">Estado</th>
                    <th className="text-left p-3">Progreso</th>
                    <th className="text-left p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetItems.map((item) => {
                    const remaining = item.allocated - item.spent;
                    const progress = (item.spent / item.allocated) * 100;
                    
                    return (
                      <tr key={item.id} className="border-b">
                        <td className="p-3 font-medium">{item.category}</td>
                        <td className="p-3">€{item.allocated.toLocaleString()}</td>
                        <td className="p-3">€{item.spent.toLocaleString()}</td>
                        <td className="p-3">€{remaining.toLocaleString()}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Progress value={progress} className="h-2 w-20" />
                            <span className="text-xs">{progress.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientPresupuesto;
