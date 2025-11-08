import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { socialLinks } from '../../constants/links';

export const Footer = () => {
	return (
		<footer className="py-16 bg-black text-gray-300 px-8 md:px-12 flex justify-between gap-10 text-sm flex-wrap mt-10 md:flex-nowrap border-t border-yellow-500/30">
			{/* Logo */}
			<Link
				to="/"
				className="text-3xl font-bold tracking-tighter text-yellow-400 hover:text-yellow-300 transition-all flex-1"
			>
				MONACO
			</Link>

			{/* Suscripción */}
			<div className="flex flex-col gap-4 flex-1">
				<p className="font-semibold uppercase tracking-tighter text-yellow-400">
					Suscríbete
				</p>
				<p className="text-xs font-medium text-gray-400">
					Recibe promociones exclusivas y novedades.
				</p>

				<div className="border border-yellow-500/40 flex items-center gap-2 px-3 py-2 rounded-full bg-transparent focus-within:ring-2 focus-within:ring-yellow-500/40">
					<input
						type="email"
						placeholder="Correo Electrónico"
						className="pl-2 bg-transparent text-gray-200 placeholder-gray-500 w-full focus:outline-none text-sm"
					/>
					<button className="text-yellow-400 hover:text-yellow-300 transition-colors">
						<BiChevronRight size={22} />
					</button>
				</div>
			</div>

			{/* Políticas */}
			<div className="flex flex-col gap-4 flex-1">
				<p className="font-semibold uppercase tracking-tighter text-yellow-400">
					Políticas
				</p>
				<nav className="flex flex-col gap-2 text-xs font-medium">
					<Link to="/tienda" className="hover:text-yellow-400 transition-colors">
						Productos
					</Link>
					<Link to="#" className="hover:text-yellow-400 transition-colors">
						Políticas de privacidad
					</Link>
					<Link to="#" className="hover:text-yellow-400 transition-colors">
						Términos de uso
					</Link>
				</nav>
			</div>

			{/* Redes Sociales */}
			<div className="flex flex-col gap-4 flex-1">
				<p className="font-semibold uppercase tracking-tighter text-yellow-400">
					Síguenos
				</p>

				<p className="text-xs leading-6 text-gray-400">
					No te pierdas las novedades y lanzamientos de MONACO.
				</p>

				<div className="flex border border-yellow-500/30 rounded-md overflow-hidden">
					{socialLinks.map(link => (
						<a
							key={link.id}
							href={link.href}
							target="_blank"
							rel="noreferrer"
							className="flex-1 py-3.5 flex items-center justify-center text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
						>
							{link.icon}
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};
