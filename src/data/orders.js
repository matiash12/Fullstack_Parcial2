// src/data/orders.js

export const orders = [
  {
    id: 1001,
    date: '2025-10-18',
    clientName: 'Juan Cliente',
    email: 'cliente@gmail.com',
    total: 164990,
    status: 'Completado',
    items: [
      { id: 3, name: 'Teclado Mecánico RGB', quantity: 1, price: 75000 },
      { id: 5, name: 'Audífonos HyperX Cloud II', quantity: 1, price: 89990 }
    ]
  },
  {
    id: 1002,
    date: '2025-10-17',
    clientName: 'Maria González',
    email: 'maria@gmail.com',
    total: 280000,
    status: 'Pendiente',
    items: [
      { id: 2, name: 'Monitor Curvo 27" 144Hz', quantity: 1, price: 280000 }
    ]
  },
  {
    id: 1003,
    date: '2025-10-16',
    clientName: 'Admin Puerto',
    email: 'admin@gmail.com',
    total: 75000,
    status: 'Enviado',
    items: [
      { id: 3, name: 'Teclado Mecánico RGB', quantity: 1, price: 75000 }
    ]
  }
];