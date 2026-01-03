import { Product, User, Order, Review } from '../types';

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Smith',
    rating: 5,
    comment: 'Excellent product! Highly recommended.',
    date: '2024-01-15'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Johnson',
    rating: 4,
    comment: 'Good quality, fast shipping.',
    date: '2024-01-10'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 3000.00,
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    image: 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg',
    category: 'Electronics',
    inStock: 25,
    rating: 4.8,
    reviews: mockReviews
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 2500.00,
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life. Water resistant up to 50m.',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    category: 'Electronics',
    inStock: 15,
    rating: 4.6,
    reviews: []
  },
  {
    id: '3',
    name: 'Premium Cotton T-Shirt',
    price: 500.00,
    description: 'Soft, comfortable 100% organic cotton t-shirt. Available in multiple colors and sizes.',
    image: 'https://www.fairindigo.com/cdn/shop/files/BG_OF_04750_Iron_FW25_3950.jpg?v=1755388908',
    category: 'Apparel',
    inStock: 50,
    rating: 4.4,
    reviews: []
  },
  {
    id: '4',
    name: 'Modern Desk Lamp',
    price: 400.00,
    description: 'Adjustable LED desk lamp with touch controls and USB charging port. Perfect for home office.',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
    category: 'Home & Garden',
    inStock: 30,
    rating: 4.7,
    reviews: []
  },
  {
    id: '5',
    name: 'JavaScript: The Complete Guide',
    price: 750.00,
    description: 'Comprehensive guide to modern JavaScript development. From basics to advanced concepts.',
    image: 'https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg',
    category: 'Books',
    inStock: 20,
    rating: 4.9,
    reviews: []
  },
  {
    id: '6',
    name: 'Wireless Smartphone Charger',
    price: 1000.00,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Includes LED indicator.',
    image: 'https://images.pexels.com/photos/4883800/pexels-photo-4883800.jpeg',
    category: 'Electronics',
    inStock: 40,
    rating: 4.3,
    reviews: []
  },
  {
    id: '7',
    name: 'Classic Denim Jacket',
    price: 1500.00,
    description: 'Timeless denim jacket made from premium cotton denim. Perfect for casual and semi-formal occasions.',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    category: 'Apparel',
    inStock: 25,
    rating: 4.5,
    reviews: []
  },
  {
    id: '8',
    name: 'Ceramic Coffee Mug Set',
    price: 350.00,
    description: 'Set of 4 handcrafted ceramic mugs. Microwave and dishwasher safe. Perfect for coffee enthusiasts.',
    image: 'https://images.pexels.com/photos/2318095/pexels-photo-2318095.jpeg',
    category: 'Home & Garden',
    inStock: 35,
    rating: 4.6,
    reviews: []
  }
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  address: {
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '(555) 123-4567'
  }
};

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[2], quantity: 2 }
    ],
    total: 209.97,
    status: 'delivered',
    date: '2024-01-15',
    shippingAddress: mockUser.address!
  },
  {
    id: 'ORD-002',
    userId: '1',
    items: [
      { product: mockProducts[1], quantity: 1 }
    ],
    total: 299.99,
    status: 'shipped',
    date: '2024-01-20',
    shippingAddress: mockUser.address!
  }
];

export const categories = ['All', 'Electronics', 'Apparel', 'Home & Garden', 'Books'];