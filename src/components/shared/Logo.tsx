import { Link } from 'react-router-dom';

interface Props {
	isDashboard?: boolean;
}

export const Logo = ({ isDashboard }: Props) => {
	const letters = [
		{ char: "M", ornament: "🎄" },
		{ char: "O", ornament: "❄️" },
		{ char: "N", ornament: "✨" },
		{ char: "A", ornament: "🎁" },
		{ char: "C", ornament: "🌟" },
		{ char: "O", ornament: "🧦" },
	];

	return (
		<Link
			to='/'
			className={`text-2xl font-bold tracking-tighter transition-all relative inline-block ${
				isDashboard && 'hover:scale-105'
			}`}
		>
			{/* Árbol girando junto al logo */}
			<div className="absolute -left-7 top-0 w-6 h-6">
				<span className="block w-full h-full animate-rotateLogo">🎄</span>
				<span className="absolute top-0 left-0 w-full h-full animate-blinkLogo">✨</span>
			</div>

			{/* Letras MONACO con adornos */}
			<p className="hidden lg:flex items-center gap-1">
				{letters.map((letter, idx) => (
					<span key={idx} className="relative inline-block">
						{letter.char}
						<span className="absolute -top-3 -right-1 animate-blinkLetter text-sm">
							{letter.ornament}
						</span>
					</span>
				))}
			</p>

			<p className="flex text-4xl lg:hidden items-center gap-1">
				{letters.map((letter, idx) => (
					<span key={idx} className="relative inline-block">
						{letter.char}
						<span className="absolute -top-2 -right-1 animate-blinkLetter text-sm">
							{letter.ornament}
						</span>
					</span>
				))}
			</p>

			{/* Animaciones CSS */}
			<style>
				{`
					/* Árbol girando */
					@keyframes rotateLogo {
						0% { transform: rotateY(0deg); }
						100% { transform: rotateY(360deg); }
					}
					.animate-rotateLogo {
						display: inline-block;
						animation: rotateLogo 4s linear infinite;
						transform-style: preserve-3d;
					}

					/* Árbol y luces parpadeando */
					@keyframes blinkLogo {
						0%, 49%, 100% { opacity: 0; }
						50% { opacity: 1; }
					}
					.animate-blinkLogo {
						animation: blinkLogo 1s infinite;
					}

					/* Ornamentitos parpadeando */
					@keyframes blinkLetter {
						0%, 49%, 100% { opacity: 0.4; transform: translateY(0) rotate(0deg);}
						50% { opacity: 1; transform: translateY(-2px) rotate(10deg);}
					}
					.animate-blinkLetter {
						animation: blinkLetter 1.5s infinite;
						transform-origin: center;
					}
				`}
			</style>
		</Link>
	);
};
