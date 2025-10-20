// src/data/products.js

export const products = [
  {
    id: 1,
    code: 'LP-NTR5',
    name: 'Laptop Gamer Nitro 5',
    description: 'Potente laptop para gaming con gráficos dedicados.',
    price: 950000,
    stock: 10,
    stockCritico: 3,
    category: 'Laptops',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQECx4qb177VKvfAuf6APCVb09LyeMek_oLdA&s',
    onOffer: false
  },
  {
    id: 2,
    code: 'MON-CRV27',
    name: 'Monitor Curvo 27" 144Hz',
    description: 'Monitor curvo para una experiencia inmersiva.',
    price: 280000,
    stock: 15,
    stockCritico: 5,
    category: 'Monitores',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT851x5CPtgAMEHAC5PY25qIbHkrICPOwY12A&s',
    onOffer: true // <-- EN OFERTA
  },
  {
    id: 3,
    code: 'TEC-MECRGB',
    name: 'Teclado Mecánico RGB',
    description: 'Teclado con switches mecánicos y luces RGB.',
    price: 75000,
    stock: 30,
    stockCritico: 10,
    category: 'Periféricos',
    image: 'https://media.falabella.com/falabellaCL/17143546_1/w=800,h=800,fit=pad',
    onOffer: false
  },
  {
    id: 4,
    code: 'MOU-PRO',
    name: 'Mouse Inalámbrico Pro',
    description: 'Mouse de alta precisión para gaming.',
    price: 55000,
    stock: 25,
    stockCritico: 5,
    category: 'Periféricos',
    image: 'https://prophonechile.cl/wp-content/uploads/2022/11/v3mouse1.png',
    onOffer: true // <-- EN OFERTA
  },
  {
    id: 5,
    code: 'AUD-HX-C2',
    name: 'Audífonos HyperX Cloud II',
    description: 'Audífonos con sonido surround 7.1.',
    price: 89990,
    stock: 18,
    stockCritico: 5,
    category: 'Audio',
    image: 'https://http2.mlstatic.com/D_NQ_NP_930900-MLC88442956131_072025-O.webp',
    onOffer: false
  },
  {
    id: 6,
    code: 'SIL-GMR-ERG',
    name: 'Silla Gamer Ergonómica',
    description: 'Silla ergonómica para largas sesiones de juego.',
    price: 150000,
    stock: 8,
    stockCritico: 2,
    category: 'Mobiliario',
    image: 'https://media.falabella.com/falabellaCL/139237649_01/w=800,h=800,fit=pad',
    onOffer: false
  }
];