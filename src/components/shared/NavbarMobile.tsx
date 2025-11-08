import { IoMdClose } from 'react-icons/io';
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineSearch } from 'react-icons/hi';
import { useGlobalStore } from '../../store/global.store';
import { Link, NavLink } from 'react-router-dom';
import { navbarLinks } from '../../constants/links';
import { useCartStore } from '../../store/cart.store';

export const NavbarMobile = () => {
  const setActiveNavMobile = useGlobalStore(state => state.setActiveNavMobile);
  const openSheet = useGlobalStore(state => state.openSheet);
  const totalItemsInCart = useCartStore(state => state.totalItemsInCart);

  return (
    <div className='fixed inset-0 z-50 bg-white text-black shadow-xl animate-slide-in-left flex flex-col py-24 px-8'>
      {/* Botón de cerrar */}
      <button
        className='absolute top-5 right-5 p-2 rounded-full hover:bg-gray-200 transition'
        onClick={() => setActiveNavMobile(false)}
      >
        <IoMdClose size={30} />
      </button>

      {/* Logo */}
      <Link
        to='/'
        className='text-4xl font-bold tracking-tighter mb-16 flex justify-center'
        onClick={() => setActiveNavMobile(false)}
      >
        <p>
          MONA<span className='text-cyan-600'>CO</span>
        </p>
      </Link>

      {/* Navegación principal */}
      <nav className='flex flex-col items-center gap-6 mb-12'>
        {navbarLinks.map(item => (
          <NavLink
            to={item.href}
            key={item.id}
            className={({ isActive }) =>
              `${
                isActive ? 'text-cyan-600 underline' : ''
              } transition-all duration-300 font-semibold text-2xl hover:text-cyan-600 hover:underline`
            }
            onClick={() => setActiveNavMobile(false)}
          >
            {item.title}
          </NavLink>
        ))}
      </nav>

      {/* Botones de acciones */}
      <div className='flex flex-col gap-4 items-center mt-auto mb-12'>
        <button
          onClick={() => openSheet('search')}
          className='flex items-center gap-2 px-6 py-3 w-full justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition font-semibold'
        >
          <HiOutlineSearch size={20} />
          Buscar
        </button>

        <Link
          to='/account'
          className='flex items-center gap-2 px-6 py-3 w-full justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition font-semibold'
          onClick={() => setActiveNavMobile(false)}
        >
          <HiOutlineUser size={20} />
          Mi cuenta
        </Link>

        <button
          onClick={() => openSheet('cart')}
          className='relative flex items-center gap-2 px-6 py-3 w-full justify-center bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition font-semibold'
        >
          <HiOutlineShoppingBag size={20} />
          Carrito
          <span className='absolute -top-2 -right-4 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full'>
            {totalItemsInCart}
          </span>
        </button>
      </div>
    </div>
  );
};
