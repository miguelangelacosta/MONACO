import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from '../actions';
import { useUser, useRoleUser } from '../hooks';
import { supabase } from '../supabase/client';
import { Loader } from '../components/shared/Loader';
import { HiOutlineExternalLink } from 'react-icons/hi';

export const ClientLayout = () => {
  const { session, isLoading: isLoadingSession } = useUser();
  const userId = session?.user.id || '';
  const { data: role, isLoading: isLoadingRole } = useRoleUser(userId);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Listener de cambios de sesión
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_OUT' || !session) {
        navigate('/login', { replace: true });
      }
    });

    // Cleanup seguro
    const subscription = authListener?.subscription;
    return () => {
      subscription?.unsubscribe?.();
    };
  }, [navigate]);

  // Redirigir clientes que intentan acceder al dashboard
  useEffect(() => {
    if (!isLoadingRole && role !== 'admin' && pathname.startsWith('/dashboard')) {
      navigate('/', { replace: true });
    }
  }, [role, isLoadingRole, pathname, navigate]);

  // Mostrar loader mientras carga sesión o rol
  if (isLoadingSession || isLoadingRole) return <Loader />;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Menú de navegación */}
      <nav className="flex justify-center gap-10 text-sm font-medium">
        <NavLink
          to="/account/pedidos"
          className={({ isActive }) => `${isActive ? 'underline' : 'hover:underline'}`}
        >
          Pedidos
        </NavLink>

        {/* Dashboard solo para admin */}
        {role === 'admin' && (
          <NavLink
            to="/dashboard/productos"
            className="flex items-center gap-1 hover:underline"
          >
            Dashboard
            <HiOutlineExternalLink size={16} className="inline-block" />
          </NavLink>
        )}

        <button className="hover:underline" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </nav>

      <main className="container mt-12 flex-1">
        <Outlet />
      </main>
    </div>
  );
};
