import { ProductStatus, Product } from './types';

export const EXTERNAL_LINKS = {
  STORE: '#',
  DISCORD: 'https://discord.gg/viper'
};

export const STATUS_COLORS = {
  [ProductStatus.OPERATIONAL]: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  [ProductStatus.MAINTENANCE]: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  [ProductStatus.UPDATING]: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
  [ProductStatus.DETECTED]: 'text-red-500 bg-red-500/10 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]',
};

// Games list will now be derived dynamically, but keeping this for initial state if needed
export const GAMES = ['Apex Legends', 'Valorant', 'Rust', 'CS2', 'Call of Duty'];

export const PRODUCTS: Product[] = [
  {
    id: 'viper-apex-full',
    name: 'Viper Apex Full',
    game: 'Apex Legends',
    category: 'Apex Legends',
    status: ProductStatus.OPERATIONAL,
    description: 'The ultimate toolkit for Apex Legends. Dominate the arena with precision.',
    features: ['Aimbot', 'ESP', 'Item Glow', 'Recoil Control', 'Stream Proof'],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
    sellhubId: 'demo-apex-full',
    pricing: [
      { duration: 'Day', price: 9.99 },
      { duration: 'Week', price: 29.99 },
      { duration: 'Month', price: 69.99 },
    ]
  },
  {
    id: 'viper-valo-pro',
    name: 'Viper Valo Pro',
    game: 'Valorant',
    category: 'Valorant',
    status: ProductStatus.OPERATIONAL,
    description: 'Kernel-level protection with humanized aim assistance for ranked play.',
    features: ['Triggerbot', 'Sound ESP', 'Radar', 'Skin Changer', 'HWID Spoofer'],
    imageUrl: 'https://images.unsplash.com/photo-1533230689972-234b31cc7143?auto=format&fit=crop&q=80&w=1000',
    sellhubId: 'demo-valo-pro',
    pricing: [
      { duration: 'Day', price: 14.99 },
      { duration: 'Week', price: 44.99 },
      { duration: 'Month', price: 99.99 },
    ]
  },
  {
    id: 'viper-rust-core',
    name: 'Viper Rust Core',
    game: 'Rust',
    category: 'Rust',
    status: ProductStatus.MAINTENANCE,
    description: 'Survive the harsh environment with extended sensory perception.',
    features: ['Player ESP', 'Loot ESP', 'Always Day', 'Debug Camera', 'No Recoil'],
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
    sellhubId: 'demo-rust-core',
    pricing: [
      { duration: 'Day', price: 12.99 },
      { duration: 'Week', price: 39.99 },
      { duration: 'Month', price: 89.99 },
    ]
  },
  {
    id: 'viper-cs2-elite',
    name: 'Viper CS2 Elite',
    game: 'CS2',
    category: 'CS2',
    status: ProductStatus.OPERATIONAL,
    description: 'Top-tier external assistance designed for Premier matchmaking.',
    features: ['Glow ESP', 'RCS', 'Triggerbot', 'Bunnyhop', 'Rank Revealer'],
    imageUrl: 'https://images.unsplash.com/photo-1627447990597-404323c2a688?auto=format&fit=crop&q=80&w=1000',
    sellhubId: 'demo-cs2-elite',
    pricing: [
      { duration: 'Day', price: 6.99 },
      { duration: 'Month', price: 24.99 },
      { duration: 'Lifetime', price: 149.99 },
    ]
  }
];