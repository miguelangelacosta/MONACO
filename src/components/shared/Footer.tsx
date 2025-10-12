import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { socialLinks } from '../../constants/links';

export const Footer = () => {
	return (
		<footer className='py-16 bg-yellow-100 px-12 flex justify-between gap-10 text-black text-sm flex-wrap mt-10 md:flex-nowrap'>
			<Link
				to='/'
				className={`text-2xl font-bold tracking-tighter transition-all flex-1`}
			>
				MONACO
			</Link>

			<div className='flex flex-col gap-4 flex-1'>
				<p className='font-semibold uppercase tracking-tighter'>
					Suscríbete
				</p>
				<p className='text-xs font-medium'>
					Recibe promociones exclusivas
				</p>

				<div className='border border-gray-800 flex items-center gap-2 px-3 py-2 rounded-full'>
					<input
						type='email'
						placeholder='Correo Electrónico'
						className='pl-2 bg-yellow-50 text-black w-full focus:outline-none'
					/>

					<button className='text-black'>
						<BiChevronRight size={20} />
					</button>
				</div>
			</div>

			<div className='flex flex-col gap-4 flex-1'>
				<p className='font-semibold uppercase tracking-tighter'>
					Políticas
				</p>

				<nav className='flex flex-col gap-2 text-xs font-medium'>
					<Link to='/tienda'>Productos</Link>
					<Link to='#' className='hover:text-gray-700'>
						Políticas de privacidad
					</Link>
					<Link to='#' className='hover:text-gray-700'>
						Términos de uso
					</Link>
				</nav>
			</div>

			<div className='flex flex-col gap-4 flex-1'>
				<p className='font-semibold uppercase tracking-tighter'>
					Síguenos
				</p>

				<p className='text-xs leading-6'>
					No te pierdas las novedades que MONACO tiene para ti.
				</p>

				<div className='flex'>
					{socialLinks.map(link => (
						<a
							key={link.id}
							href={link.href}
							target='_blank'
							rel='noreferrer'
							className='border border-black w-full h-full py-3.5 flex items-center justify-center transition-all hover:bg-white hover:text-gray-950 text-black'
						>
							{link.icon}
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};
