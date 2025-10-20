// src/data/users.js

export const users = [
  {
    id: 1,
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'admin',
    name: 'Admin Puerto'
  },
  {
    id: 2,
    email: 'cliente@gmail.com', // Asegúrate de que este también sea un email válido
    password: '1234',
    role: 'client',
    name: 'Juan Cliente'
  },
  // --- AÑADIR ESTE NUEVO USUARIO ---
  {
    id: 3,
    email: 'vendedor@gmail.com',
    password: 'vendedor',
    role: 'vendedor',
    name: 'Vendedor Interno'
  }
];