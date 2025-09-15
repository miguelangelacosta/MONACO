import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { ClientLayout } from '../layouts/ClientLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import {
  HomePage,
  CellPhonesPage,
  AboutPage,
  CellPhonePage,
  LoginPage,
  RegisterPage,
  OrdersUserPage,
  CheckoutPage,
  ThankyouPage,
  OrderUserPage,
  DashboardProductsPage,
  DashboardNewProductPage,
  DashboardProductSlugPage,
  DashboardOrdersPage, // ✅ Importar la página de órdenes
} from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'tienda', element: <CellPhonesPage /> },
      { path: 'tienda/:slug', element: <CellPhonePage /> },
      { path: 'nosotros', element: <AboutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'registro', element: <RegisterPage /> },
      {
        path: 'account',
        element: <ClientLayout />,
        children: [
          { index: true, element: <Navigate to='/account/pedidos' /> },
          { path: 'pedidos', element: <OrdersUserPage /> },
          { path: 'pedidos/:id', element: <OrderUserPage /> },
        ],
      },
    ],
  },
  { path: '/checkout', element: <CheckoutPage /> },
  { path: '/checkout/:id/thank-you', element: <ThankyouPage /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to='/dashboard/productos' /> },
      { path: 'productos', element: <DashboardProductsPage /> },
      { path: 'productos/new', element: <DashboardNewProductPage /> },
      { path: 'productos/editar/:slug', element: <DashboardProductSlugPage /> },
      { path: 'ordenes', element: <DashboardOrdersPage /> }, // ✅ Solo una vez
    ],
  },
  // Fallback para cualquier ruta desconocida
  { path: '*', element: <Navigate to='/' replace /> },
]);
