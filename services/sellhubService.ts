import { Product, ProductStatus } from '../types';

const API_KEY = 'a2e65c14-d19c-4798-b747-0b8f136a3a72_tiut0qaxbptq66nes0wcaa82p55d79f8x9gjtyy0w4exdsvz0szmv14n9zlvzhax';
const API_URL = 'https://dev.sellhub.io/v1/products';

export const sellhubService = {
  async fetchProducts(): Promise<Product[]> {
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const json = await response.json();
      
      // Map Sellhub API response to our internal Product structure
      if (Array.isArray(json.data)) {
        return json.data.map((item: any) => {
           // Handle category mapping safely
           let category = 'Uncategorized';
           if (item.category) {
             category = typeof item.category === 'string' ? item.category : (item.category.title || item.category.name || 'Uncategorized');
           }

           // Ensure price is a number
           const priceVal = parseFloat(item.min_price || item.price || '0');

           return {
            id: item.id,
            name: item.title,
            game: determineGameFromTitle(item.title),
            category: category,
            status: ProductStatus.OPERATIONAL, // Default status
            description: item.description || 'No description available.',
            features: ['Instant Delivery', 'Secure', 'Undetected'],
            imageUrl: item.image?.url || item.images?.[0]?.url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
            sellhubId: item.id,
            pricing: [
              { duration: 'License', price: priceVal }
            ]
          };
        });
      }
      
      return []; // Return empty array if no data found
    } catch (error) {
      console.warn('Failed to fetch from Sellhub API:', error);
      return []; // Return empty array on error to trigger "Coming Soon" UI
    }
  }
};

function determineGameFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('apex')) return 'Apex Legends';
  if (t.includes('valorant') || t.includes('valo')) return 'Valorant';
  if (t.includes('rust')) return 'Rust';
  if (t.includes('cs2') || t.includes('counter')) return 'CS2';
  if (t.includes('warzone') || t.includes('cod')) return 'Call of Duty';
  return 'Software';
}