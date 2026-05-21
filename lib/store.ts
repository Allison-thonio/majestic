// In-memory data store for the app (replace with database in production)

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  collection: string;
  stock: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  products: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'shipped' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

// Collections data
export const collectionsData: Collection[] = [
  {
    id: 'collection-1',
    name: 'Celestial Gems',
    description: 'Inspired by the cosmos, these pieces capture the mystery and beauty of the stars.',
    image: '/images/celestial.jpg',
    products: ['prod-1', 'prod-2', 'prod-3'],
  },
  {
    id: 'collection-2',
    name: 'Earth Elements',
    description: 'Grounded in natural beauty, featuring raw and polished gemstones from around the world.',
    image: '/images/earth.jpg',
    products: ['prod-4', 'prod-5', 'prod-6'],
  },
  {
    id: 'collection-3',
    name: 'Urban Luxury',
    description: 'Contemporary designs that blend sophistication with modern aesthetics.',
    image: '/images/urban.jpg',
    products: ['prod-7', 'prod-8', 'prod-9'],
  },
];

// Products data
export const productsData: Product[] = [
  {
    id: 'prod-1',
    name: 'Sapphire Dream',
    description: 'A stunning blue sapphire set in 18K white gold',
    price: 2500,
    image: '/images/sapphire.jpg',
    category: 'rings',
    collection: 'celestial',
    stock: 5,
  },
  {
    id: 'prod-2',
    name: 'Emerald Essence',
    description: 'Rich emerald green gemstone, vintage inspired',
    price: 3200,
    image: '/images/emerald.jpg',
    category: 'pendants',
    collection: 'celestial',
    stock: 3,
  },
  {
    id: 'prod-3',
    name: 'Ruby Radiance',
    description: 'Deep crimson ruby with brilliant clarity',
    price: 4500,
    image: '/images/ruby.jpg',
    category: 'rings',
    collection: 'celestial',
    stock: 2,
  },
  {
    id: 'prod-4',
    name: 'Amethyst Aura',
    description: 'Purple amethyst cluster in its natural form',
    price: 850,
    image: '/images/amethyst.jpg',
    category: 'specimens',
    collection: 'earth',
    stock: 8,
  },
  {
    id: 'prod-5',
    name: 'Quartz Crystal',
    description: 'Clear quartz point with healing properties',
    price: 450,
    image: '/images/quartz.jpg',
    category: 'specimens',
    collection: 'earth',
    stock: 12,
  },
  {
    id: 'prod-6',
    name: 'Tiger\'s Eye Stone',
    description: 'Golden striped natural gemstone',
    price: 650,
    image: '/images/tigers-eye.jpg',
    category: 'specimens',
    collection: 'earth',
    stock: 7,
  },
  {
    id: 'prod-7',
    name: 'Diamond Edge',
    description: 'Contemporary diamond bracelet, minimalist design',
    price: 5800,
    image: '/images/diamond.jpg',
    category: 'bracelets',
    collection: 'urban',
    stock: 4,
  },
  {
    id: 'prod-8',
    name: 'Pearl Elegance',
    description: 'South sea pearl earrings, sophisticated and timeless',
    price: 3400,
    image: '/images/pearl.jpg',
    category: 'earrings',
    collection: 'urban',
    stock: 6,
  },
  {
    id: 'prod-9',
    name: 'Opal Ocean',
    description: 'Mesmerizing opal pendant with modern setting',
    price: 2900,
    image: '/images/opal.jpg',
    category: 'pendants',
    collection: 'urban',
    stock: 3,
  },
];

// Users store (in production, use a database)
const usersStore: User[] = [
  {
    id: 'user-admin',
    email: 'majestic@gmail.com',
    password: '43f5d64fb5bf56f468e0881203d101ee12f2301efafe1336d0abd217f621a963', // hashed 'majestic@2026'
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

// Orders store
const ordersStore: Order[] = [];

// Session store
const sessionsStore = new Map<string, { userId: string; expiresAt: number }>();

// Get all collections
export function getCollections(): Collection[] {
  return collectionsData;
}

// Get collection by ID
export function getCollectionById(id: string): Collection | undefined {
  return collectionsData.find((c) => c.id === id);
}

// Get all products
export function getProducts(): Product[] {
  return productsData;
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return productsData.find((p) => p.id === id);
}

// Get products by collection
export function getProductsByCollection(collection: string): Product[] {
  return productsData.filter((p) => p.collection === collection);
}

// Get user by email
export function getUserByEmail(email: string): User | undefined {
  return usersStore.find((u) => u.email === email);
}

// Get user by ID
export function getUserById(id: string): User | undefined {
  return usersStore.find((u) => u.id === id);
}

// Create user
export function createUser(email: string, password: string, role: 'customer' | 'admin' = 'customer'): User {
  const user: User = {
    id: 'user-' + Date.now(),
    email,
    password,
    role,
    createdAt: new Date().toISOString(),
  };
  usersStore.push(user);
  return user;
}

// Create order
export function createOrder(userId: string, items: CartItem[], total: number): Order {
  const order: Order = {
    id: 'order-' + Date.now(),
    userId,
    items,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  ordersStore.push(order);
  return order;
}

// Get orders by user
export function getOrdersByUser(userId: string): Order[] {
  return ordersStore.filter((o) => o.userId === userId);
}

// Get all orders
export function getAllOrders(): Order[] {
  return ordersStore;
}

// Update product
export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  const product = productsData.find((p) => p.id === id);
  if (product) {
    Object.assign(product, updates);
  }
  return product;
}

// Create session
export function createSession(userId: string, expiresInHours: number = 24): string {
  const sessionId = 'sess-' + crypto.getRandomValues(new Uint8Array(16)).toString();
  const expiresAt = Date.now() + expiresInHours * 60 * 60 * 1000;
  sessionsStore.set(sessionId, { userId, expiresAt });
  return sessionId;
}

// Validate session
export function validateSession(sessionId: string): string | null {
  const session = sessionsStore.get(sessionId);
  if (!session || session.expiresAt < Date.now()) {
    sessionsStore.delete(sessionId);
    return null;
  }
  return session.userId;
}

// Delete session
export function deleteSession(sessionId: string): void {
  sessionsStore.delete(sessionId);
}
