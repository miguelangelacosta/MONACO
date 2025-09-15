import { IoAddCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { TableOrdersAdmin } from '../../components/dashboard/orders/TableOrdersAdmin';
import type { OrderWithCustomer } from '../../interfaces/order.interface';
import { useEffect, useState } from 'react';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const contentType = res.headers.get('content-type');
        const text = await res.text(); // obtenemos el texto crudo

        // Verificamos si la respuesta es JSON
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Respuesta no es JSON:', text);
          throw new Error('La respuesta del servidor no es JSON');
        }

        const json: OrderResponse[] = JSON.parse(text); // parseamos JSON seguro
        setData(json);

      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Error desconocido');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const ordersWithCustomer: OrderWithCustomer[] = data.map(order => ({
    id: order.id,
    status: order.status,
    total_amount: order.total_amount,
    created_at: order.created_at,
    customers: order.customer ?? null,
  }));

  if (loading) return <p className="text-center py-10">Cargando pedidos...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
  if (!data.length) return <p className="text-center py-10">No hay pedidos disponibles.</p>;

  return (
    <div className="h-full flex flex-col gap-4">
      <Link
        to="/dashboard/orders/new"
        className="bg-black text-white flex items-center self-end py-[6px] px-3 rounded-md text-sm gap-1 font-semibold"
      >
        <IoAddCircleOutline className="inline-block" />
        Nuevo Pedido
      </Link>

      <TableOrdersAdmin orders={ordersWithCustomer} />
    </div>
  );
};
