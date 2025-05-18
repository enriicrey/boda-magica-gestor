
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Camera } from 'lucide-react';

interface Payment {
  id: string;
  title: string;
  dueDate: string;
  amount: string;
  icon: 'home' | 'camera' | string;
}

interface UpcomingPaymentsProps {
  payments: Payment[];
}

const UpcomingPayments = ({ payments }: UpcomingPaymentsProps) => {
  // Function to render the appropriate icon
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return <Home className="h-5 w-5 text-wedding-sage" />;
      case 'camera':
        return <Camera className="h-5 w-5 text-wedding-sage" />;
      default:
        return <Home className="h-5 w-5 text-wedding-sage" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-xl">Próximos Pagos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="flex justify-between items-center p-3 border rounded-md">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-wedding-sage/10 rounded-md flex items-center justify-center mr-4">
                  {renderIcon(payment.icon)}
                </div>
                <div>
                  <p className="font-medium">{payment.title}</p>
                  <p className="text-sm text-gray-500">Vencimiento: {payment.dueDate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{payment.amount}</p>
                <Button size="sm" className="bg-wedding-sage hover:bg-wedding-sage/90 text-white mt-1">Pagar</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingPayments;
