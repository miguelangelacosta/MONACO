import { Link, NavLink } from 'react-router-dom';
import { navbarLinks } from '../../constants/links';
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { FaBarsStaggered } from 'react-icons/fa6';
import { Logo } from './Logo';
import { useGlobalStore } from '../../store/global.store';
import { useCartStore } from '../../store/cart.store';
import { useCustomer, useUser, useRoleUser } from '../../hooks';
import { LuLoader } from 'react-icons/lu';

export const Navbar = () => {
  const openSheet = useGlobalStore(state => state.openSheet);
  const totalItemsInCart = useCartStore(state => state.totalItemsInCart);
  const setActiveNavMobile = useGlobalStore(state => state.setActiveNavMobile);

  const { session, isLoading: isLoadingSession } = useUser();
  const userId = session?.user.id || '';

  const { data: customer, isLoading: isLoadingCustomer } = useCustomer(userId);
  const { data: role, isLoading: isLoadingRole } = useRoleUser(userId);

  // Mostrar loader mientras carga sesión, cliente o rol
  if (isLoadingSession || isLoadingCustomer || isLoadingRole) {
    return <LuLoader className="animate-spin mx-auto my-4" size={40} />;
  }

  return (
    <header className="bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12">
      <Logo />

      <nav className="space-x-5 hidden md:flex">
        {navbarLinks.map(link => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) =>
              `${isActive ? 'text-cyan-600 underline' : ''} transition-all duration-300 font-medium hover:text-cyan-600 hover:underline`
            }
          >
            {link.title}
          </NavLink>
        ))}

        {/* Mostrar Dashboard solo si el rol es admin */}
        {role === 'admin' && (
          <NavLink
            to="/dashboard"
            className="text-red-600 font-semibold hover:underline"
          >
            Dashboard
          </NavLink>
        )}
      </nav>

      <div className="flex gap-5 items-center">
        <button onClick={() => openSheet('search')}>
          <HiOutlineSearch size={25} />
        </button>

        {session ? (
          <div className="relative">
            <Link
              to="/account"
              className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold"
            >
              {customer?.full_name?.[0] || 'U'}
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <HiOutlineUser size={25} />
          </Link>
        )}

        <button
          className="relative"
          onClick={() => openSheet('cart')}
        >
          <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">
            {totalItemsInCart}
          </span>
          <HiOutlineShoppingBag size={25} />
        </button>
      </div>

      <button
        className="md:hidden"
        onClick={() => setActiveNavMobile(true)}
      >
        <FaBarsStaggered size={25} />
      </button>
    </header>
  );
};
