import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { Banner } from '../components/home/Banner';
import { NewsletterCopy } from '../components/home/Newslettercopy';
import { Sheet } from '../components/shared/Sheet';
import { useGlobalStore } from '../store/global.store';
import { NavbarMobile } from '../components/shared/NavbarMobile';

export const RootLayout = () => {
  const { pathname } = useLocation();
  const isSheetOpen = useGlobalStore((state) => state.isSheetOpen);
  const activeNavMobile = useGlobalStore((state) => state.activeNavMobile);

  return (
    <div className='min-h-screen flex flex-col font-montserrat'>
      <Navbar />

      {/* Newsletter y Banner solo en página principal */}
      {pathname === '/' && (
        <>
         <Banner />
          <NewsletterCopy />
         
        </>
      )}

      <main className='container flex-1 my-8 px-4 sm:px-6 lg:px-8'>
        <Outlet />
      </main>

      {isSheetOpen && <Sheet />}
      {activeNavMobile && <NavbarMobile />}
      <Footer />
    </div>
  );
};
