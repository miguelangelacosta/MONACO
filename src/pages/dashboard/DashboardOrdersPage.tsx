import { IoAddCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { TableOrdersAdmin } from '../components/dashboard/orders/TableOrdersAdmin';
import { OrderWithCustomer, OrderResponse } from '../interfaces/order.interface';
import { useEffect, useState } from 'react';

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
