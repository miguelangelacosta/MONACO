import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/dashboard';
import { useUser } from '../hooks';
import { useEffect, useState } from 'react';
import { getSession, getUserRole } from '../actions';
import { Loader } from '../components/shared/Loader';
import { supabase } from '../supabase/client';

export const DashboardLayout = () => {
	const navigate = useNavigate();
	const { isLoading, session } = useUser();
	const [roleLoading, setRoleLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		let authSubscription: { unsubscribe: () => void } | null = null;

		const checkRole = async () => {
			setRoleLoading(true);
			const sessionData = await getSession();

			if (!sessionData?.session) {
				if (isMounted) navigate('/login', { replace: true });
				return;
			}

			const role = await getUserRole(sessionData.session.user.id);
			if (role !== 'admin' && isMounted) {
				navigate('/', { replace: true });
				return;
			}

			if (isMounted) setRoleLoading(false);
		};

		checkRole();

		// Manejo seguro del listener de Supabase v2
		const listener = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_OUT' || !session) {
				navigate('/login', { replace: true });
			}
		});

		// Supabase v2: la suscripción real está en listener.data.subscription
		authSubscription = listener?.data?.subscription ?? null;

		return () => {
			isMounted = false;
			if (authSubscription) authSubscription.unsubscribe();
		};
	}, [navigate]);

	if (isLoading || !session || roleLoading) return <Loader />;

	return (
		<div className="flex bg-gray-100 min-h-screen font-montserrat">
			<Sidebar />
			<main className="container m-5 mt-7 flex-1 text-slate-800 ml-[140px] lg:ml-[270px]">
				<Outlet />
			</main>
		</div>
	);
};


