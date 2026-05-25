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
  sizes: string[];
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
    name: "Men's Wear",
    description: 'Sophisticated menswear featuring premium shirts, trousers, blazers, and accessories for the modern gentleman.',
    image: '/images/menswear.jpg',
    products: ['prod-1', 'prod-2', 'prod-3'],
  },
  {
    id: 'collection-2',
    name: "Women's Wear",
    description: 'Elegant womenswear including dresses, co-ord sets, tops, and bottoms designed for the contemporary woman.',
    image: '/images/womenswear.jpg',
    products: ['prod-4', 'prod-5', 'prod-6'],
  },
  {
    id: 'collection-3',
    name: 'Accessories',
    description: 'Premium bags, belts, and fashion accessories to complete your perfect look.',
    image: '/images/accessories.jpg',
    products: ['prod-7', 'prod-8', 'prod-9'],
  },
];

// Products data
export const productsData: Product[] = [
  {
    id: 'prod-1',
    name: 'Classic Oxford Shirt',
    description: 'Premium cotton oxford shirt with a tailored fit, perfect for formal and casual occasions.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600',
    category: 'shirts',
    collection: 'mens',
    stock: 15,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
  },
  {
    id: 'prod-2',
    name: 'Slim Fit Chinos',
    description: 'Modern slim-fit chinos crafted from stretch cotton for all-day comfort and style.',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
    category: 'trousers',
    collection: 'mens',
    stock: 12,
    sizes: ['28', '30', '32', '34', '36', '38', '40', '42'],
  },
  {
    id: 'prod-3',
    name: 'Premium Blazer',
    description: 'Tailored blazer in premium wool blend, ideal for business meetings and special events.',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    category: 'blazers',
    collection: 'mens',
    stock: 8,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
  },
  {
    id: 'prod-4',
    name: 'Elegant Maxi Dress',
    description: 'Flowing maxi dress with intricate detailing, perfect for evening occasions and celebrations.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600',
    category: 'dresses',
    collection: 'womens',
    stock: 10,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
  },
  {
    id: 'prod-5',
    name: 'Co-ord Set',
    description: 'Stylish matching co-ord set featuring a crop top and high-waisted trousers.',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
    category: 'co-ord-sets',
    collection: 'womens',
    stock: 7,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
  },
  {
    id: 'prod-6',
    name: 'Silk Blouse',
    description: 'Luxurious silk blouse with elegant draping, perfect for professional and social settings.',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600',
    category: 'tops',
    collection: 'womens',
    stock: 14,
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
  },
  {
    id: 'prod-7',
    name: 'Leather Handbag',
    description: 'Premium leather handbag with multiple compartments, combining style and functionality.',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600',
    category: 'bags',
    collection: 'accessories',
    stock: 9,
    sizes: ['One Size'],
  },
  {
    id: 'prod-8',
    name: 'Designer Belt',
    description: 'Crafted leather belt with premium buckle, adding sophistication to any outfit.',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600',
    category: 'belts',
    collection: 'accessories',
    stock: 20,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'prod-9',
    name: 'Statement Watch',
    description: 'Elegant timepiece with premium finish, perfect for accessorizing any ensemble.',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    category: 'watches',
    collection: 'accessories',
    stock: 5,
    sizes: ['One Size'],
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
