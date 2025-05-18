
import React from 'react';
import { toast } from "sonner";
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { FileText, Plus, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Budget = () => {
  // Mock user data
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Calculate progress
  const progress = 38;
  
  // Mock budget data
  const budget = {
    total: 25000,
    spent: 14300,
    remaining: 10700,
    percentageSpent: 57
  };
  
  const budgetCategories = [
    { name: "Venue", allocated: 10000, spent: 8000, remaining: 2000 },
    { name: "Catering", allocated: 6000, spent: 3000, remaining: 3000 },
    { name: "Fotografía", allocated: 3000, spent: 1800, remaining: 1200 },
    { name: "Decoración", allocated: 2000, spent: 500, remaining: 1500 },
    { name: "Música", allocated: 1500, spent: 0, remaining: 1500 },
    { name: "Vestimenta", allocated: 2000, spent: 1000, remaining: 1000 },
    { name: "Otros", allocated: 500, spent: 0, remaining: 500 }
  ];
  
  // Mock expenses
  const recentExpenses = [
    { id: "1", item: "Depósito Villa Rosa", category: "Venue", amount: 2000, date: "10/04/2025" },
    { id: "2", item: "Adelanto Catering El Jardín", category: "Catering", amount: 1000, date: "15/04/2025" },
    { id: "3", item: "Depósito Carlos Jiménez Fotografía", category: "Fotografía", amount: 500, date: "18/04/2025" }
  ];

  const handleAddExpense = () => {
    toast.success("Añadir nuevo gasto");
  };

  const handleEditExpense = (id: string) => {
    toast.success("Editar gasto");
  };

  const handleDeleteExpense = (id: string) => {
    toast.success("Eliminar gasto");
  };

  const handleAdjustBudget = () => {
    toast.success("Ajustar presupuesto");
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Presupuesto Total</p>
                      <p className="text-3xl font-semibold text-wedding-sage">{budget.total.toLocaleString()}€</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Gastado</p>
                      <p className="text-3xl font-semibold text-wedding-navy">{budget.spent.toLocaleString()}€</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Restante</p>
                      <p className="text-3xl font-semibold text-green-600">{budget.remaining.toLocaleString()}€</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="font-serif text-2xl font-semibold flex items-center">
                    <FileText className="text-wedding-sage mr-2 h-5 w-5" />
                    Presupuesto por Categoría
                  </CardTitle>
                  <Button onClick={handleAdjustBudget} variant="outline">Ajustar Presupuesto</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total:</span>
                      <div className="w-full max-w-md mx-4">
                        <Progress value={budget.percentageSpent} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">{budget.percentageSpent}%</span>
                    </div>
                    
                    {budgetCategories.map((category, index) => {
                      const percentSpent = Math.round((category.spent / category.allocated) * 100);
                      
                      return (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{category.name}</span>
                            <span>{category.spent.toLocaleString()}€ / {category.allocated.toLocaleString()}€</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-full">
                              <Progress value={percentSpent} className="h-2" />
                            </div>
                            <span className="text-xs ml-2 min-w-12 text-right">{percentSpent}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="font-serif text-xl font-semibold">Gastos Recientes</CardTitle>
                  <Button onClick={handleAddExpense} className="bg-wedding-sage hover:bg-wedding-sage/90 text-white">
                    <Plus className="mr-1 h-4 w-4" /> Añadir Gasto
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepto</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Importe</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentExpenses.map((expense) => (
                          <tr key={expense.id}>
                            <td className="px-4 py-3 text-sm text-gray-900">{expense.item}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{expense.category}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{expense.amount.toLocaleString()}€</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{expense.date}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditExpense(expense.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-600 hover:text-red-800" 
                                  onClick={() => handleDeleteExpense(expense.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Budget;
