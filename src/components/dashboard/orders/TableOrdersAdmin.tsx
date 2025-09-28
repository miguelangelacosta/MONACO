import { useNavigate } from 'react-router-dom';
import { formatDateLong, formatPrice } from '../../../helpers';
import { OrderWithCustomer } from '../../../interfaces';
import { useChangeStatusOrder } from '../../../hooks';

const tableHeaders = ['Cliente', 'Fecha', 'Estado', 'Total'];

const statusOptions = [
	{ value: 'Pending', label: 'Pendiente' },
	{ value: 'Paid', label: 'Pagado' },
	{ value: 'Shipped', label: 'Enviado' },
	{ value: 'Delivered', label: 'Entregado' },
];

interface Props {
	orders: OrderWithCustomer[];
}

export const TableOrdersAdmin = ({ orders }: Props) => {
	const navigate = useNavigate();
	const { mutate } = useChangeStatusOrder();

	const handleStatusChange = (id: number, status: string) => {
		console.log('🔄 Cambiando estado de orden:', { id, status });
		mutate({ id, status });
	};

	// 👀 Log al recibir las órdenes
	if (!orders) {
		console.error('❌ Error: orders no está definido');
	}
	if (Array.isArray(orders) && orders.length === 0) {
		console.warn('⚠️ Advertencia: orders está vacío');
	}
	console.log('📦 Orders recibidas en TableOrdersAdmin:', orders);

	return (
		<div className="relative w-full h-full">
			<table className="text-sm w-full caption-bottom overflow-auto">
				<thead className="border-b border-gray-200 pb-3">
					<tr className="text-sm font-bold">
						{tableHeaders.map((header, index) => (
							<th key={index} className="h-12 px-4 text-left">
								{header}
							</th>
						))}
					</tr>
				</thead>

				<tbody className="[&_tr:last-child]:border-0">
					{orders?.map(order => {
						// 👀 Log de cada orden individual
						if (!order.id) {
							console.error('❌ Orden sin ID detectada:', order);
						}
						if (!order.customers) {
							console.warn('⚠️ Orden sin cliente asociado:', order);
						}
						console.log('📝 Renderizando orden:', order);

						return (
							<tr
								key={order.id}
								className="cursor-pointer hover:bg-gray-200 transition-colors duration-200"
								onClick={() => {
									console.log('➡️ Navegando a orden:', order.id);
									navigate(`/dashboard/ordenes/${order.id}`);
								}}
							>
								<td className="p-4 font-medium tracking-tighter flex flex-col gap-1">
									<span className="font-semibold">
										{order.customers?.full_name ?? '❌ Sin nombre'}
									</span>
									<span>{order.customers?.email ?? '❌ Sin email'}</span>
								</td>
								<td className="p-4 font-medium tracking-tighter">
									{order.created_at
										? formatDateLong(order.created_at)
										: '❌ Fecha inválida'}
								</td>
								<td className="p-4 font-medium tracking-tighter">
									<select
										value={order.status}
										onClick={e => e.stopPropagation()}
										className="border border-gray-300 p-2 rounded"
										onChange={e =>
											handleStatusChange(order.id, e.target.value)
										}
									>
										{statusOptions.map(option => (
											<option value={option.value} key={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</td>
								<td className="p-4 font-medium tracking-tighter">
									{typeof order.total_amount === 'number'
										? formatPrice(order.total_amount)
										: '❌ Total inválido'}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
