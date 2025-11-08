export const Newsletter = () => {
	
	return (
		<div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-24 overflow-hidden">
			{/* IMAGEN DE FONDO */}
			<div
				className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
				style={{
					backgroundImage: "url(/image/background-newsletter.webp)",
				}}
			/>

			{/* CONTENIDO PRINCIPAL */}
			<div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center text-center space-y-6">
				<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
					¿Quieres recibir ofertas exclusivas?
				</h2>

				<p className="text-gray-300 text-sm md:text-base max-w-xl">
					Suscríbete a nuestro boletín y sé el primero en enterarte de promociones, lanzamientos y descuentos especiales.
				</p>

				{/* FORMULARIO */}
				<form className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-lg">
					<input
						type="email"
						required
						className="flex-1 px-5 py-3 rounded-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
						placeholder="Introduce tu correo electrónico"
					/>

					<button
						type="submit"
						className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-full px-8 py-3 text-sm transition-all duration-200 shadow-md hover:shadow-lg"
					>
						Suscribirme
					</button>
				</form>

				<p className="text-xs text-gray-400 pt-3">
					Prometemos no enviarte spam. Puedes darte de baja en cualquier momento.
				</p>
			</div>

			{/* SECCIÓN DE PRODUCTOS */}
			<div className="relative z-10 container mx-auto mt-16 px-6 md:px-12 lg:px-20">
				<h3 className="text-2xl font-semibold mb-8 text-center">
					Productos recomendados
				</h3>

				{/* GRID RESPONSIVE MEJORADO */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
					{[
						{
							src: "/image/product1.webp",
							name: "Auriculares Pro",
							price: "$149.99",
						},
						{
							src: "/image/product2.webp",
							name: "Smartwatch Active",
							price: "$199.99",
						},
						{
							src: "/image/product3.webp",
							name: "Cámara HD Compacta",
							price: "$299.99",
						},
						{
							src: "/image/product4.webp",
							name: "Altavoz Bluetooth",
							price: "$89.99",
						},
						{
							src: "/image/product5.webp",
							name: "Teclado Mecánico RGB",
							price: "$129.99",
						},
						{
							src: "/image/product6.webp",
							name: "Monitor UltraWide",
							price: "$499.99",
						},
					].map((product, index) => (
						<div
							key={index}
							className="bg-white text-gray-900 rounded-xl overflow-hidden shadow hover:scale-105 transition-transform duration-200"
						>
							<img
								src={product.src}
								alt={product.name}
								className="w-full h-32 object-cover"
							/>
							<div className="p-4 text-center">
								<h4 className="text-sm font-semibold">{product.name}</h4>
								<p className="text-xs text-gray-500">{product.price}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
