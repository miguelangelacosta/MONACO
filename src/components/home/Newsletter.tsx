export const Newsletter = () => {
	return (
		<div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-24 overflow-hidden">

			{/* Fondo difuminado */}
			<div
				className="absolute inset-0 bg-cover bg-center opacity-25 blur-sm"
				style={{ backgroundImage: "url(/image/background-newsletter.webp)" }}
			/>

			{/* Contenido */}
			<div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 text-center">
				<h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
					¿Quieres recibir ofertas exclusivas?
				</h2>

				<p className="text-blue-100 max-w-xl mx-auto">
					Suscríbete y recibe descuentos, lanzamientos y promociones antes que todos.
				</p>

				{/* FORMULARIO */}
				<form className="mt-6 flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
					<input
						type="email"
						required
						className="flex-1 px-5 py-3 rounded-full text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
						placeholder="Introduce tu correo electrónico"
					/>
					<button
						type="submit"
						className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-full px-8 py-3 transition-all duration-200 shadow-lg hover:shadow-xl"
					>
						Suscribirme
					</button>
				</form>

				{/* CTA ADICIONAL */}
				<p className="mt-4 text-sm text-blue-200 animate-pulse">
					✨ *Recibirás un cupón del 10% al suscribirte*
				</p>
			</div>

			{/* PRODUCTOS RECOMENDADOS */}
			<div className="relative z-10 w-full mx-auto mt-20 px-6 md:px-12 lg:px-20">
				<h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
					Productos recomendados para ti
				</h3>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

					{[
						{ src: "/image/product1.webp", name: "Auriculares Pro", price: "$149.99" },
						{ src: "/image/product2.webp", name: "Smartwatch Active", price: "$199.99" },
						{ src: "/image/product3.webp", name: "Cámara HD Compacta", price: "$299.99" },
						{ src: "/image/product4.webp", name: "Altavoz Bluetooth", price: "$89.99" },
						{ src: "/image/product5.webp", name: "Teclado Mecánico RGB", price: "$129.99" },
						{ src: "/image/product6.webp", name: "Monitor UltraWide", price: "$499.99" },
					].map((product, i) => (
						<div
							key={i}
							className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
						>
							<img
								src={product.src}
								alt={product.name}
								className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
							/>
							<div className="p-4 text-center">
								<h4 className="text-sm font-semibold">{product.name}</h4>
								<p className="text-xs text-gray-600">{product.price}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* SECCIÓN DE BENEFICIOS */}
			<div className="relative z-10 mt-20 px-6 md:px-12 lg:px-20">
				<h3 className="text-xl md:text-2xl text-center font-bold mb-8">
					Por qué comprar en Monaco Store
				</h3>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
					<div className="p-4 bg-blue-800/40 rounded-xl backdrop-blur-md hover:bg-blue-700/40 transition-all">
						<p className="text-3xl mb-2">🚚</p>
						<h4 className="font-semibold">Envíos seguros</h4>
						<p className="text-blue-200 text-sm">Rápido y confiable</p>
					</div>

					<div className="p-4 bg-blue-800/40 rounded-xl backdrop-blur-md hover:bg-blue-700/40 transition-all">
						<p className="text-3xl mb-2">🔄</p>
						<h4 className="font-semibold">Devoluciones</h4>
						<p className="text-blue-200 text-sm">Si llega defectuoso</p>
					</div>

					<div className="p-4 bg-blue-800/40 rounded-xl backdrop-blur-md hover:bg-blue-700/40 transition-all">
						<p className="text-3xl mb-2">🛠</p>
						<h4 className="font-semibold">Soporte técnico</h4>
						<p className="text-blue-200 text-sm">Siempre para ayudarte</p>
					</div>

					<div className="p-4 bg-blue-800/40 rounded-xl backdrop-blur-md hover:bg-blue-700/40 transition-all">
						<p className="text-3xl mb-2">🛡</p>
						<h4 className="font-semibold">Garantía</h4>
						<p className="text-blue-200 text-sm">1 mes por defectos</p>
					</div>
				</div>
			</div>
		</div>
	);
};
