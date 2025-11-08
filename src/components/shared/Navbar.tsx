import { Link, NavLink } from 'react-router-dom';
import { navbarLinks } from '../../constants/links';
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { FaBarsStaggered } from 'react-icons/fa6';
import { Logo } from './Logo';
import { useGlobalStore } from '../../store/global.store';
import { useCartStore } from '../../store/cart.store';
import { useCustomer, useUser, useRoleUser } from '../../hooks';
import { LuLoader } from 'react-icons/lu';
import { useEffect } from 'react';

export const Navbar = () => {
  const openSheet = useGlobalStore(state => state.openSheet);
  const totalItemsInCart = useCartStore(state => state.totalItemsInCart);
  const setActiveNavMobile = useGlobalStore(state => state.setActiveNavMobile);

  const { session, isLoading: isLoadingSession } = useUser();
  const userId = session?.user.id || '';

  const { data: customer, isLoading: isLoadingCustomer } = useCustomer(userId);
  const { data: role, isLoading: isLoadingRole } = useRoleUser(userId);

  // Restaurar scroll al desmontar Navbar o al cerrar sesión
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (isLoadingSession || isLoadingCustomer || isLoadingRole) {
    return <LuLoader className="animate-spin mx-auto my-4" size={40} />;
  }

  return (
    <>
      {/* Header */}
      <header
        className="
          fixed top-0 left-0 w-full z-50
          bg-black bg-opacity-50 backdrop-blur-sm
          text-white transition-all duration-500
          px-5 py-4 flex items-center justify-between
          lg:px-12
        "
      >
        <Logo />

        {/* Navegación Desktop */}
        <nav className="space-x-5 hidden md:flex items-center">
          {navbarLinks.map(link => (
            <NavLink
              key={link.id}
              to={link.href}
              className={({ isActive }) =>
                `${isActive ? 'text-yellow-400 underline' : ''} transition-all duration-300 font-medium hover:text-yellow-400 hover:underline`
              }
            >
              {link.title}
            </NavLink>
          ))}

          {role === 'admin' && (
            <NavLink
              to="/dashboard"
              className="text-red-400 font-semibold hover:underline"
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* Botones derecha */}
        <div className="flex gap-4 items-center">
          <button onClick={() => openSheet('search')}>
            <HiOutlineSearch size={25} />
          </button>

          {session ? (
            <Link
              to="/account"
              className="border-2 border-white w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold"
            >
              {customer?.full_name?.[0] || 'U'}
            </Link>
          ) : (
            <Link to="/login">
              <HiOutlineUser size={25} />
            </Link>
          )}

          <button
            className="relative flex items-center"
            onClick={() => openSheet('cart')}
          >
            <HiOutlineShoppingBag size={25} />
            <span className="ml-1 w-5 h-5 flex items-center justify-center bg-yellow-400 text-black text-xs rounded-full">
              {totalItemsInCart}
            </span>
          </button>
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden"
          onClick={() => setActiveNavMobile(true)}
        >
          <FaBarsStaggered size={25} />
        </button>
      </header>

      {/* Padding para que el contenido no quede detrás del header */}
      <div className="h-20 md:h-24" />
    </>
  );
};
