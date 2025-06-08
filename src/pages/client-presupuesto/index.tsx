
import React, { useState } from 'react';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Plus, Edit, Trash2, CreditCard, TrendingUp, AlertCircle } from 'lucide-react';
import { useClient } from '@/contexts/ClientContext';

const ClientPresupuesto = () => {
  const { budget, addBudgetItem } = useClient();
  const [newCategory, setNewCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newBudgeted, setNewBudgeted] = useState('');
  const [newProvider, setNewProvider] = useState('');

  const totalBudget = budget.reduce((sum, item) => sum + item.budgeted, 0);
  const totalSpent = budget.reduce((sum, item) => sum + item.spent, 0);
  const remainingBudget = totalBudget - totalSpent;
  const progressPercentage = (totalSpent / totalBudget) * 100;

  const handleAddBudgetItem = () => {
    if (newCategory && newDescription && newBudgeted) {
      addBudgetItem({
        category: newCategory,
        description: newDescription,
        budgeted: parseFloat(newBudgeted),
        spent: 0,
        provider: newProvider || undefined
      });
      setNewCategory('');
      setNewDescription('');
      setNewBudgeted('');
      setNewProvider('');
    }
  };

  const getStatusColor = (budgeted: number, spent: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <ClientLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Presupuesto</h1>
          <p className="text-gray-500">
            Gestiona y controla el presupuesto de tu boda.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
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
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Gastado</p>
                  <p className="text-2xl font-bold text-red-600">€{totalSpent.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Restante</p>
                  <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    €{remainingBudget.toLocaleString()}
                  </p>
                </div>
                <AlertCircle className={`h-8 w-8 ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Progreso</p>
                  <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center">
                  <div className="relative w-10 h-10">
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Progreso del presupuesto</h3>
                <span className="text-sm text-gray-500">
                  €{totalSpent.toLocaleString()} de €{totalBudget.toLocaleString()}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-4" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Category */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Desglose por categorías</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Añadir categoría
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nueva categoría de presupuesto</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vestido">Vestido</SelectItem>
                      <SelectItem value="Anillos">Anillos</SelectItem>
                      <SelectItem value="Transporte">Transporte</SelectItem>
                      <SelectItem value="Música">Música</SelectItem>
                      <SelectItem value="Flores">Flores</SelectItem>
                      <SelectItem value="Invitaciones">Invitaciones</SelectItem>
                      <SelectItem value="Otros">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Input
                    id="description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describe el gasto..."
                  />
                </div>
                <div>
                  <Label htmlFor="budgeted">Presupuesto (€)</Label>
                  <Input
                    id="budgeted"
                    type="number"
                    value={newBudgeted}
                    onChange={(e) => setNewBudgeted(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="provider">Proveedor (opcional)</Label>
                  <Input
                    id="provider"
                    value={newProvider}
                    onChange={(e) => setNewProvider(e.target.value)}
                    placeholder="Nombre del proveedor"
                  />
                </div>
                <Button onClick={handleAddBudgetItem} className="w-full">
                  Añadir categoría
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Budget Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budget.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.category}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{item.description}</p>
                
                {item.provider && (
                  <p className="text-sm text-blue-600">Proveedor: {item.provider}</p>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Gastado</span>
                    <span className={getStatusColor(item.budgeted, item.spent)}>
                      €{item.spent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Presupuestado</span>
                    <span>€{item.budgeted.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(item.spent / item.budgeted) * 100} 
                    className="h-2" 
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{Math.round((item.spent / item.budgeted) * 100)}% usado</span>
                    <span>€{(item.budgeted - item.spent).toLocaleString()} restante</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientPresupuesto;
