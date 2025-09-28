// src/pages/dashboard/DashboardOrdersPage.tsx
import { IoAddCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { TableOrdersAdmin } from '../../components/dashboard/orders/TableOrdersAdmin';
import type { OrderWithCustomer } from '../../interfaces/order.interface';
import { useAllOrders } from '../../hooks';

export const DashboardOrdersPage = () => {
  // Hook que trae todas las órdenes desde Supabase
  const { data, isLoading } = useAllOrders();

  // Mostrar loader mientras cargan los datos
  if (isLoading) return <p>Cargando pedidos...</p>;

  // Mapear los datos de Supabase al formato que necesita TableOrdersAdmin
  const ordersWithId: OrderWithCustomer[] = (data || []).map((order: any) => ({
    id: order.id,
    status: order.status,
    total_amount: order.total_amount,
    created_at: order.created_at,
    customers: order.customers ?? null,
  }));

  return (
    <div className='h-full flex flex-col gap-4 p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Órdenes</h1>
        <Link
          to='/dashboard/orders/new'
          className='bg-black text-white flex items-center py-1 px-3 rounded-md text-sm gap-1 font-semibold'
        >
          <IoAddCircleOutline />
          Nuevo Pedido
        </Link>
      </div>

      {ordersWithId.length === 0 ? (
        <p>No hay pedidos registrados aún.</p>
      ) : (
        <TableOrdersAdmin orders={ordersWithId} />
      )}
    </div>
  );
};
