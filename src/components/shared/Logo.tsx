import { Link } from 'react-router-dom';

interface Props {
	isDashboard?: boolean;
}

export const Logo = ({ isDashboard }: Props) => {
	return (
		<Link
			to='/'
			className={`text-2xl font-bold tracking-tighter transition-all ${
				isDashboard && 'hover:scale-105'
			}`}
		>
			<p className='hidden lg:block'>
				MONA
				<span className='text-cyan-600'>CO</span>
			</p>

			<p className='flex text-4xl lg:hidden'>
				<span className='-skew-x-6'>MONA</span>
				<span className='text-cyan-600 skew-x-6'>CO</span>
			</p>
		</Link>
	);
};
