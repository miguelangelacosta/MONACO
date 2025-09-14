import { IoAddCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { TableOrdersAdmin } from '../../components/dashboard/orders/TableOrdersAdmin'; 
import type { OrderWithCustomer } from '../../interfaces/order.interface'; // solo lo que necesitamos
import { useEffect, useState } from 'react';

// Definimos localmente OrderResponse para evitar conflictos en Netlify
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

export const DashboardOrdersPage = () => {
  const [data, setData] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response: OrderResponse[] = await fetch('/api/orders').then(res => res.json());
        setData(response);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const ordersWithId: OrderWithCustomer[] = data.map((order) => ({
    id: order.id,
    status: order.status,
    total_amount: order.total_amount,
    created_at: order.created_at,
    customers: order.customer ?? null,
  }));

  if (loading) return <p>Cargando pedidos...</p>;

  return (
    <div className='h-full flex flex-col gap-2'>
      <Link
        to='/dashboard/orders/new'
        className='bg-black text-white flex items-center self-end py-[6px] px-2 rounded-md text-sm gap-1 font-semibold'
      >
        <IoAddCircleOutline className='inline-block' />
        Nuevo Pedido
      </Link>

      <TableOrdersAdmin orders={ordersWithId} />
    </div>
  );
};
