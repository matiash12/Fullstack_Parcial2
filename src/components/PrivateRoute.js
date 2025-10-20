// src/components/PrivateRoute.js

import { Navigate, Outlet } from 'react-router-dom';
import { useAppState } from '../context/CartContext'; // Asegúrate que el path sea correcto

const PrivateRoute = () => {
    const { currentUser } = useAppState();

    // Si el usuario existe (está logueado), permite el acceso.
    // Si no, lo redirige a login.
    return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;