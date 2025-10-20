// src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppStateProvider, useAppState } from './context/CartContext'; 
import { useEffect } from 'react';

// Vistas de la tienda
import Navigation from './components/Navbar';
import Home from './views/Home';
import Products from './views/Products';
import Categories from './views/Categories';
import Offers from './views/Offers';
import CartView from './views/CartView';
import Checkout from './views/Checkout';
import PaymentSuccess from './views/PaymentSuccess';
import PaymentError from './views/PaymentError';
import Login from './views/Login';
import Register from './views/Register';
import About from './views/About';
import Blog from './views/Blog';
import BlogDetail from './views/BlogDetail';
import Contact from './views/Contact';
import SearchView from './views/SearchView';
// Vistas de Admin
import AdminLayout from './admin/components/AdminLayout';
import Dashboard from './admin/views/Dashboard';
import AdminProducts from './admin/views/AdminProducts';
import ProductForm from './admin/views/ProductForm';
import AdminUsers from './admin/views/AdminUsers';
import AdminCategories from './admin/views/AdminCategories';
import AdminOrders from './admin/views/AdminOrders';
import AdminOrderDetail from './admin/views/AdminOrderDetail'; 

// --- ¡ESTAS SON LAS IMPORTACIONES QUE PROBABLEMENTE FALTABAN! ---
import UserPurchaseHistory from './admin/views/UserPurchaseHistory';
import AdminCriticalStock from './admin/views/AdminCriticalStock';
import AdminProfile from './admin/views/AdminProfile';
import AdminReports from './admin/views/AdminReports';
import ReportProducts from './admin/views/ReportProducts';

// Rutas protegidas
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';

function App() {
  // --- APLICAR TEMA AL CARGAR ---
  // Obtenemos el tema directamente aquí para aplicarlo al <html>
  // Esto asegura que se aplique incluso antes de que los componentes hijos se rendericen
  const GetThemeWrapper = () => {
    const { theme } = useAppState();
    useEffect(() => {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);
    return null; // Este componente no renderiza nada visible
  }

  return (
    <AppStateProvider>
      <GetThemeWrapper /> {/* Componente para aplicar el tema */}
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<StoreRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  );
}

// Rutas de la tienda (Públicas y Privadas)
const StoreRoutes = () => (
  <>
    <Navigation />
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/categorias" element={<Categories />} />
      <Route path="/ofertas" element={<Offers />} /> 
      <Route path="/carrito" element={<CartView />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/search" element={<SearchView />} />

      {/* Rutas protegidas por PrivateRoute */}
      <Route element={<PrivateRoute />}>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pago-exitoso" element={<PaymentSuccess />} />
        <Route path="/pago-fallido" element={<PaymentError />} />
      </Route>
    </Routes>
  </>
);

// Rutas del admin (Protegidas)
const AdminRoutes = () => (
  <Routes>
    <Route element={<AdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} /> 
        
        {/* Productos */}
        <Route path="productos" element={<AdminProducts />} />
        <Route path="productos/nuevo" element={<ProductForm />} />
        <Route path="productos/editar/:id" element={<ProductForm />} />
        <Route path="productos/criticos" element={<AdminCriticalStock />} />
        
        {/* Usuarios */}
        <Route path="usuarios" element={<AdminUsers />} />
        <Route path="usuarios/nuevo" element={<Register />} /> 
        <Route path="usuarios/editar/:id" element={<Register />} /> 
        <Route path="usuarios/historial/:id" element={<UserPurchaseHistory />} />

        {/* Categorías y Órdenes */}
        <Route path="categorias" element={<AdminCategories />} />
        <Route path="ordenes" element={<AdminOrders />} />
        <Route path="ordenes/:id" element={<AdminOrderDetail />} /> 
        
        {/* Reportes y Perfil */}
        <Route path="reportes" element={<AdminReports />} />
        <Route path="reportes/productos" element={<ReportProducts />} />
        <Route path="perfil" element={<AdminProfile />} />

      </Route>
    </Route>
  </Routes>
);

export default App;