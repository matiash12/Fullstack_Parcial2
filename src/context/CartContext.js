// src/context/CartContext.js (o AppStateContext.js)

import { createContext, useState, useContext, useEffect } from 'react';
import { products as initialProducts } from '../data/products';
import { users } from '../data/users';
import { categories as initialCategories } from '../data/categories';
import { orders as initialOrders } from '../data/orders';

export const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

// --- FUNCIÓN HELPER PARA OBTENER TEMA INICIAL ---
const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    // También podrías verificar las preferencias del sistema operativo si quieres
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return storedTheme || 'light'; // Default a 'light'
};

export const AppStateProvider = ({ children }) => {
  
  // --- ESTADOS ---
  const [products, setProducts] = useState(initialProducts);
  const [userList, setUserList] = useState(users);
  const [categories, setCategories] = useState(initialCategories);
  const [orders, setOrders] = useState(initialOrders);
  
  // --- ESTADOS CON LOCALSTORAGE ---
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error al cargar carrito de localStorage", error);
      return [];
    }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error al cargar usuario de localStorage", error);
      return null;
    }
  });
  
  // --- NUEVO ESTADO PARA EL TEMA ---
  const [theme, setTheme] = useState(getInitialTheme); // 'light' o 'dark'

  // --- EFECTOS (Persistencia) ---
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // --- NUEVO EFECTO PARA GUARDAR Y APLICAR TEMA ---
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Aplicamos el atributo directamente aquí para asegurar que se actualice
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);
  
  // --- NUEVA FUNCIÓN PARA CAMBIAR TEMA ---
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // --- LÓGICA DE USUARIOS (CRUD y Auth) ---
  const login = (email, password) => {
    const user = userList.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
  };
  
  const registerUser = (userData) => {
    const newUser = { ...userData, id: Date.now() };
    setUserList([...userList, newUser]);
    if (!currentUser || currentUser.role !== 'admin') {
      setCurrentUser(newUser);
    }
    console.log("Nuevo usuario registrado:", newUser);
    return newUser;
  };

  const updateUser = (updatedUser) => {
    setUserList(userList.map(u =>
      u.id === updatedUser.id ? updatedUser : u
    ));
    if (currentUser && currentUser.id === updatedUser.id) {
        setCurrentUser(updatedUser);
    }
  };
  
  const deleteUser = (userId) => {
    setUserList(userList.filter(u => u.id !== userId));
  };

  const getUserById = (userId) => {
    return userList.find(u => u.id === Number(userId));
  };

  const updateCurrentUserPassword = (newPassword) => {
    if (!currentUser) return false;
    const updatedUserList = userList.map(u =>
      u.id === currentUser.id ? { ...u, password: newPassword } : u
    );
    setUserList(updatedUserList);
    const updatedCurrentUser = { ...currentUser, password: newPassword };
    setCurrentUser(updatedCurrentUser);
    console.log(`Contraseña actualizada para ${currentUser.email}`);
    return true;
  };

  // --- LÓGICA DE PRODUCTOS (CRUD) ---
  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };
  
  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  
  const deleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };
  
  const getProductById = (productId) => {
    return products.find(p => p.id === Number(productId));
  };

  // --- LÓGICA DEL CARRITO ---
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, quantity) => {
    const newQuantity = Math.max(1, quantity);
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const formatPrice = (price) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  
  const clearCart = () => {
    setCartItems([]);
  };

  // --- LÓGICA DE CATEGORÍAS ---
  const addCategory = (name) => {
    if (name) {
      const newCategory = { id: Date.now(), name: name };
      setCategories([...categories, newCategory]);
    }
  };

  const deleteCategory = (categoryId) => {
    setCategories(categories.filter(c => c.id !== categoryId));
  };

  // --- LÓGICA DE ÓRDENES ---
  const createOrder = () => {
    if (!currentUser || cartItems.length === 0) return null;
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      clientName: `${currentUser.name} ${currentUser.lastName}`,
      email: currentUser.email,
      total: cartTotal,
      status: 'Pendiente',
      items: cartItems
    };
    setOrders([...orders, newOrder]);
    clearCart();
    console.log("Nueva orden creada:", newOrder);
    return newOrder;
  };

  return (
    <AppStateContext.Provider value={{
      // Productos
      products, addProduct, updateProduct, deleteProduct, getProductById,
      
      // Carrito
      cartItems, addToCart, removeFromCart, updateQuantity, cartTotal, formatPrice, clearCart,
      
      // Auth y Usuarios
      currentUser, login, logout, registerUser,
      userList, updateUser, deleteUser, getUserById,
      updateCurrentUserPassword, 
      
      // Categorías
      categories, addCategory, deleteCategory,
      
      // Órdenes
      orders, createOrder,

      // --- TEMA ---
      theme, toggleTheme // <-- Exportados
    }}>
      {children}
    </AppStateContext.Provider>
  );
};