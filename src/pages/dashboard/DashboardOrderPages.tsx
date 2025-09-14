import { TableOrdersAdmin } from '../../components/dashboard/orders/TableOrdersAdmin';
import type { OrderWithCustomer } from '../../interfaces/order.interface';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../../components/shared/Loader';

interface OrderResponse {
  id: number;
  status: string;
  total_amount: number;
  created_at: string;
  customer?: {
    full_name: string;
    email: string;
  };
}

const useOrders = () => {
  return useQuery<OrderResponse[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error('Error al cargar órdenes');
      return res.json();
    },
  });
};

export const DashboardOrdersPage = () => {
  const { data, isLoading } = useOrders();
  if (isLoading || !data) return <Loader />;

  const ordersWithCustomer: OrderWithCustomer[] = data.map(order => ({
    id: order.id,
    status: order.status,
    total_amount: order.total_amount,
    created_at: order.created_at,
    customers: order.customer ?? null,
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Órdenes</h1>
      <TableOrdersAdmin orders={ordersWithCustomer} />
    </div>
  );
};
