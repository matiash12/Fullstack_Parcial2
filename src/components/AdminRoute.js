// src/components/AdminRoute.js

import { Navigate, Outlet } from 'react-router-dom';
import { useAppState } from '../context/CartContext'; // Asegúrate que el path sea correcto

const AdminRoute = () => {
    const { currentUser } = useAppState();

    // --- LÓGICA ACTUALIZADA ---
    // 1. Verifica si el usuario existe
    // 2. Verifica si el rol es 'admin' O 'vendedor'
    const isAuthorized = currentUser && (currentUser.role === 'admin' || currentUser.role === 'vendedor');

    // Si está autorizado, permite el acceso.
    // Si no, lo redirige a la página de login
    return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
