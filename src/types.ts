/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CoffeeItem {
  id: string;
  name: string;
  origin: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: 'all' | 'single' | 'limited';
  altitude: string;
  process: string;
  notes: string[];
  roastLevel: string;
  harvestDate: string;
  trustedNodes: string;
  farmer: string;
  blockchainHash: string;
}

export interface BrewTool {
  id: string;
  name: string;
  price: number;
  description: string;
  iconName: string; // Dynamic rendering from Lucide-react
  image?: string;
  subtitle?: string;
  ratio: number; // e.g. 15 for 1:15 ratio
  recommendedTemp: string;
  steps: {
    title: string;
    duration: number; // in seconds
    instruction: string;
  }[];
}

export interface CartItem {
  product: CoffeeItem;
  quantity: number;
}

export interface SovereignMember {
  name: string;
  state: 'Sucre' | 'Monagas' | 'Caracas' | 'Lechería' | 'Nueva Esparta' | 'Miranda';
  memberId: string;
  mintedAt: string;
  blockNumber: string;
  hash: string;
  tier: 'Sovereign' | 'Ultra-Prime' | 'Legendary';
  signature: string;
}

export interface VerifiableBlock {
  blockNumber: string;
  lotId: string;
  originState: string;
  farmerName: string;
  altitude: string;
  fairTradePremium: string; // e.g. "+35% over Fairtrade minimum"
  roastDate: string;
  moistureLevel: string;
  qualityScore: string;
  hash: string;
}
