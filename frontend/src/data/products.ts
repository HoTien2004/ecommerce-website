export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  variants: {
    colors: { name: string; value: string }[];
    storage?: string[];
  };
  stock: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "iPhone",
    slug: "iphone",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    description: "Khám phá dòng iPhone mới nhất",
  },
  {
    id: "2",
    name: "iPad",
    slug: "ipad",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    description: "iPad cho mọi nhu cầu",
  },
  {
    id: "3",
    name: "Mac",
    slug: "mac",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    description: "Sức mạnh để làm mọi thứ",
  },
  {
    id: "4",
    name: "Apple Watch",
    slug: "apple-watch",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    description: "Đồng hồ thông minh hàng đầu",
  },
  {
    id: "5",
    name: "AirPods",
    slug: "airpods",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
    description: "Âm thanh không dây tuyệt vời",
  },
  {
    id: "6",
    name: "Phụ kiện",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&h=400&fit=crop",
    description: "Phụ kiện chính hãng Apple",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    category: "iphone",
    price: 34990000,
    originalPrice: 36990000,
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop",
    ],
    description: "iPhone 15 Pro Max với chip A17 Pro, camera 48MP và thiết kế titanium cao cấp.",
    specs: {
      "Màn hình": "6.7 inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP + 12MP + 12MP",
      "Pin": "Lên đến 29 giờ video",
    },
    variants: {
      colors: [
        { name: "Titan Tự nhiên", value: "#9A9A9A" },
        { name: "Titan Xanh", value: "#394E5C" },
        { name: "Titan Trắng", value: "#F5F5F0" },
        { name: "Titan Đen", value: "#3C3C3C" },
      ],
      storage: ["256GB", "512GB", "1TB"],
    },
    stock: 50,
    rating: 4.9,
    reviews: 1250,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    category: "iphone",
    price: 28990000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop",
    ],
    description: "iPhone 15 Pro với thiết kế titanium và Action Button mới.",
    specs: {
      "Màn hình": "6.1 inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP + 12MP + 12MP",
      "Pin": "Lên đến 23 giờ video",
    },
    variants: {
      colors: [
        { name: "Titan Tự nhiên", value: "#9A9A9A" },
        { name: "Titan Xanh", value: "#394E5C" },
        { name: "Titan Trắng", value: "#F5F5F0" },
        { name: "Titan Đen", value: "#3C3C3C" },
      ],
      storage: ["128GB", "256GB", "512GB", "1TB"],
    },
    stock: 75,
    rating: 4.8,
    reviews: 980,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "3",
    name: "MacBook Pro 14 inch M3 Pro",
    category: "mac",
    price: 49990000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
    ],
    description: "MacBook Pro 14 inch với chip M3 Pro, hiệu năng đỉnh cao cho chuyên gia.",
    specs: {
      "Màn hình": "14.2 inch Liquid Retina XDR",
      "Chip": "Apple M3 Pro",
      "RAM": "18GB",
      "Pin": "Lên đến 17 giờ",
    },
    variants: {
      colors: [
        { name: "Space Black", value: "#1D1D1F" },
        { name: "Silver", value: "#E3E4E5" },
      ],
      storage: ["512GB", "1TB", "2TB"],
    },
    stock: 30,
    rating: 4.9,
    reviews: 456,
    isFeatured: true,
  },
  {
    id: "4",
    name: "iPad Pro 12.9 inch M2",
    category: "ipad",
    price: 27990000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    ],
    description: "iPad Pro với chip M2, màn hình Liquid Retina XDR tuyệt đẹp.",
    specs: {
      "Màn hình": "12.9 inch Liquid Retina XDR",
      "Chip": "Apple M2",
      "Camera": "12MP + 10MP",
      "Kết nối": "Wi-Fi 6E, 5G (tuỳ chọn)",
    },
    variants: {
      colors: [
        { name: "Space Gray", value: "#1D1D1F" },
        { name: "Silver", value: "#E3E4E5" },
      ],
      storage: ["128GB", "256GB", "512GB", "1TB", "2TB"],
    },
    stock: 40,
    rating: 4.8,
    reviews: 324,
    isFeatured: true,
  },
  {
    id: "5",
    name: "Apple Watch Series 9",
    category: "apple-watch",
    price: 10990000,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop",
    ],
    description: "Apple Watch Series 9 với chip S9 SiP mạnh mẽ và Double Tap mới.",
    specs: {
      "Màn hình": "Always-On Retina LTPO OLED",
      "Chip": "S9 SiP",
      "Chống nước": "50 mét",
      "Pin": "Lên đến 18 giờ",
    },
    variants: {
      colors: [
        { name: "Midnight", value: "#1D1D1F" },
        { name: "Starlight", value: "#F5F5F0" },
        { name: "Silver", value: "#E3E4E5" },
        { name: "Pink", value: "#F9E0E3" },
        { name: "Red", value: "#BA0C2E" },
      ],
    },
    stock: 100,
    rating: 4.7,
    reviews: 567,
    isNew: true,
  },
  {
    id: "6",
    name: "AirPods Pro 2",
    category: "airpods",
    price: 6490000,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&h=600&fit=crop",
    ],
    description: "AirPods Pro với chip H2 và khả năng chống ồn chủ động tốt hơn 2 lần.",
    specs: {
      "Chip": "H2",
      "Chống ồn": "Active Noise Cancellation",
      "Pin": "6 giờ (30 giờ với case)",
      "Chống nước": "IPX4",
    },
    variants: {
      colors: [
        { name: "White", value: "#FFFFFF" },
      ],
    },
    stock: 200,
    rating: 4.8,
    reviews: 1890,
    isFeatured: true,
  },
  {
    id: "7",
    name: "MagSafe Charger",
    category: "accessories",
    price: 990000,
    image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=600&h=600&fit=crop",
    ],
    description: "Sạc không dây MagSafe 15W cho iPhone và AirPods.",
    specs: {
      "Công suất": "15W",
      "Tương thích": "iPhone 12 trở lên, AirPods",
      "Chiều dài cáp": "1 mét",
    },
    variants: {
      colors: [
        { name: "White", value: "#FFFFFF" },
      ],
    },
    stock: 150,
    rating: 4.5,
    reviews: 234,
  },
  {
    id: "8",
    name: "iPhone 15",
    category: "iphone",
    price: 22990000,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop",
    ],
    description: "iPhone 15 với Dynamic Island và camera 48MP.",
    specs: {
      "Màn hình": "6.1 inch Super Retina XDR",
      "Chip": "A16 Bionic",
      "Camera": "48MP + 12MP",
      "Pin": "Lên đến 20 giờ video",
    },
    variants: {
      colors: [
        { name: "Xanh", value: "#B4D4E8" },
        { name: "Hồng", value: "#F9E0E3" },
        { name: "Vàng", value: "#F9EED8" },
        { name: "Xanh lá", value: "#D4E8D1" },
        { name: "Đen", value: "#3C3C3C" },
      ],
      storage: ["128GB", "256GB", "512GB"],
    },
    stock: 80,
    rating: 4.7,
    reviews: 678,
    isNew: true,
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
