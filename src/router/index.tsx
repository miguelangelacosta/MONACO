import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
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
  DashboardOrdersPage,
  DashboardOrderPage,
} from '../pages';
import { ClientLayout } from '../layouts/ClientLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Maneja errores en el dashboard
const DashboardError = () => (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-2xl font-bold">Oops! Algo salió mal en el dashboard 😅</h1>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'tienda', element: <CellPhonesPage /> },
      { path: 'celulares/:slug', element: <CellPhonePage /> },
      { path: 'nosotros', element: <AboutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'registro', element: <RegisterPage /> },
      {
        path: 'account',
        element: <ClientLayout />,
        children: [
          { path: '', element: <Navigate to="/account/pedidos" /> },
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
    errorElement: <DashboardError />, // captura errores del dashboard
    children: [
      { index: true, element: <Navigate to="/dashboard/productos" /> },
      { path: 'productos', element: <DashboardProductsPage /> },
      { path: 'productos/new', element: <DashboardNewProductPage /> },
      { path: 'productos/editar/:slug', element: <DashboardProductSlugPage /> },
      { path: 'ordenes', element: <DashboardOrdersPage /> },
      { path: 'ordenes/:id', element: <DashboardOrderPage /> },
    ],
  },
]);
