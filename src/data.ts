/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CoffeeItem, BrewTool, VerifiableBlock } from './types';

export const COFFEE_PRODUCTS: CoffeeItem[] = [
  {
    id: 'cumanacoa-washed',
    name: 'Cumanacoa Washed',
    origin: 'Sucre State, Venezuela',
    description: 'An exceptional washed lot showcasing the bright acidity and floral top-notes traditional to the Sucre mountains. Grown under native tree canopy, hand-picked at peak ripeness, and double-washed using pristine mountain spring water.',
    price: 32.00,
    rating: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdUkYAJFb-vfBY0ECYQz1mAd8B9RWGNZFhxFYutT0VkfBM7JVR2UgcfYWhPMlGed423uZbDuutnhDFhqdsj2FKMkNxCBLTTTqoaMIEr-w_z1aAJqBWX1ShiUCmVeVmOHgZp9FoCGwDPiIDY0HDzt1I-VyGIrOYZLfQgiApsD35E2ieuSeHONgROS0sTHaFtEtV0se3EvcPgRy-Jlpi7e4XJ-QjofhPrRhb9vu31pBo87e3V0fOVevAWdt_EpnHhF6BF_4VTBAPLWAX',
    category: 'single',
    altitude: '1,450m',
    process: 'Double Washed',
    notes: ['Mandarina', 'Jazmín', 'Cacao Criollo', 'Caña de Azúcar'],
    roastLevel: 'Ligera - Media',
    harvestDate: 'Marzo 2026',
    trustedNodes: '9/9 Active',
    farmer: 'Don Lorenzo Marcano, Cooperativa El Turimiquire',
    blockchainHash: '0x8f3c...b041'
  },
  {
    id: 'caripe-natural',
    name: 'Caripe Natural',
    origin: 'Monagas State, Venezuela',
    description: 'Hailing from the lime-rich soils of Caripe del Guácharo, this natural-process lot is slow-dried on raised African beds for 24 days. Ripe honeyed fruits, massive body, and deep dark chocolate notes with lingering molasses.',
    price: 38.00,
    rating: 4.5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1-VK-sQvt6nnWw9uvyXlzYH6R3qJfarklEvxCk_f9o49qokPCb4EHJPOvlf40rnPStmS5TfHCCmsxbFEk8gPe6n9B9KGELZGS6SY2KRwehuYoONlXuHwe6U9chhslzIoV8OB07sApyraNHQe50owAmfKvsC003NjyIUzAExUWqS9PlKi_78jultomAOPhbltBFfVYjKKLrLshSlJ_KCG1OO0xYZRVwDY-L5hQwwOCnp9tMSXkcZAtFs6ZxG5OU59zl_33dEceW7eV',
    category: 'single',
    altitude: '1,320m',
    process: 'Natural (Slow-Dried)',
    notes: ['Frutas Rojas', 'Melaza', 'Chocolate Negro', 'Cardamomo'],
    roastLevel: 'Media',
    harvestDate: 'Febrero 2026',
    trustedNodes: '9/9 Active',
    farmer: 'Familia Salazar, Finca El Guácharo',
    blockchainHash: '0x7e2d...fa88'
  },
  {
    id: 'sovereign-roast',
    name: 'Sovereign Roast',
    origin: 'Signature House Blend',
    description: 'Our flagship studio blend, carefully combining the structured acidity of Cumanacoa washed with the velvety weight of Caripe natural. Designed to offer a balanced on-chain expression representing the strength of Eastern Venezuela.',
    price: 28.00,
    rating: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg7LkR6I6iF5Kc7lpPwl-7xW-KpvmFFNcjWIn3B2HKEtITN3emzV8StA3O_IB7vltkAN-IyBRj-tUql1SYMwDgr0q9z__c1KL2iynghvmm-kt78F_Raapyh8tQayYu_qVa7Y9QBDrYaTgeYiUPHVnjFq2i54h6ARIRiXaG7oJ3owuWVvXWo28RDmeNFuP5G4GycTwWZwPmRfmZJ4uOfleJaVZ_qcJqcS_nJKMy7HAnD5kLKFfFK_N-zfqX3MB9AC8on67BxUddHAgi',
    category: 'all',
    altitude: '1,320m - 1,480m',
    process: 'Mixed Artisan Lot',
    notes: ['Caramelo Dorado', 'Naranja Dulce', 'Macadamia', 'Cacao Amargo'],
    roastLevel: 'Media - Oscura',
    harvestDate: 'Abril 2026',
    trustedNodes: 'Verified Multi-Sig',
    farmer: 'Pacto de Pequeños Productores d\'Oriente',
    blockchainHash: '0x9a4b...cd12'
  },
  {
    id: 'el-morro-honey',
    name: 'El Morro Honey',
    origin: 'Coastal Range Micro-lot',
    description: 'An extremely rare micro-lot grown where the Caribbean breeze sweeps the coastal mountains. Pulped with 50% mucilage remaining, drying in mountain fog, giving an insanely sweet, tea-like clarity and exotic stone-fruit flavor profile.',
    price: 45.00,
    rating: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3qrONIwY8C9705fqF_U9M_kole7lo3nHK5dTlvG13m9TPliQqLsZFaMCofzqojITpJCysuYdkIraiErVXwXR9-tVAVBNOwWA3pwbl9MLCykidMmQy9UGMo89tKM6s-vHnY0NWKoUy2K6YLhQ1NWPGhuHlDtuIi46JZzRXYOhvFFuDEhJ7EADkja-n783Vw7tpdOdVcc6OqYPXzIUGx-521pqZzlX3IgoB4ma3I8zb2oXxFyBZZ-paaROLKrnrKW1AR1b_re3kqabR',
    category: 'limited',
    altitude: '1,560m',
    process: 'Yellow Honey',
    notes: ['Dazno de Monte', 'Miel Silvestre', 'Té Blanco', 'Flor de Azahar'],
    roastLevel: 'Ligera',
    harvestDate: 'Abril 2026',
    trustedNodes: '9/9 Active',
    farmer: 'Sobeida Rangel, Micro-lote Altos del Morro',
    blockchainHash: '0x3c9f...ee33'
  }
];

export const BREW_TOOLS: BrewTool[] = [
  {
    id: 'comandante-c40',
    name: 'PRECISION GRINDER',
    subtitle: 'Manual Mastery',
    price: 295.00,
    description: 'World-renowned professional manual grinder featuring Nitro Blade steel burrs for unparalleled particle size consistency.',
    iconName: 'Sliders',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1nQw0qNWI_2MYwcqhBsy7YFIc13wvCQ6S7h_beGiw3_D7Sfggmj3BR9H11SJcY9fmCpVw_9EUoyZTjj3ocLrUV61sbpPwwpqcz-A1GFbPM9hOdsORvTSuMgC_mLqqxdlefyUEk8MTl_58kX3csyIzpddtxv0ASP7xa6_25n1XfIPFKwDQO0Dgih3BXoJWPp-xnbtRAUtkSZzv_IBFE9KGb0ts9SSmn7AfpXmDpRsj0X2s5uwyg2uHN_JBT3owQ1hex4NHB6YURRQ',
    ratio: 16,
    recommendedTemp: 'N/A',
    steps: [
      { title: 'Click Setting', duration: 15, instruction: 'Configure to 24 clicks for medium pour-over, or 12 clicks for fine espresso.' },
      { title: 'Slow Grind', duration: 45, instruction: 'Grind uniform, hand-crank strokes to avoid thermal build-up and protect organic oils.' }
    ]
  },
  {
    id: 'fellow-stagg',
    name: 'THERMAL KETTLE',
    subtitle: 'Digital Accuracy',
    price: 180.00,
    description: 'Precision-pour gooseneck kettle with variable speed control and high-end thermal design for flawless pour circles.',
    iconName: 'Sparkles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1OnSBN1AntFPIJ9lapiQUqVE8cYWyk8HresawlyDtC8BMOx0nSfujhUseN7Z8rPr1cTLRRhnDGLn_Pi-4J3W8xhUU332kDGdteAWMDFlkW_k956yz3XtwoqrvIMzpTCdvuNQ9ElrbV9gJFs__DdYHxUxEH4tM9glIgZSX6bFBp0qNfOOTwCathVAjOLXMS0yxlfoD2iJsGuw5Veh05T0VrtnHDv9xhOhFxl_cLHrhBsxlsOCeFbqVu0HWHXgTPSS4pvwEqDdxnSw',
    ratio: 15,
    recommendedTemp: '94°C',
    steps: [
      { title: 'Preheat', duration: 20, instruction: 'Rinse your paper filter with hot water from the kettle to wash out any paper taste.' },
      { title: 'Controlled Pours', duration: 90, instruction: 'Use the counterbalanced handle to draw a thin stream at precisely 2.5g/second.' },
      { title: 'Maintain Temp', duration: 40, instruction: 'Set the kettle back on the base between pours to hold your perfect brewing temperature.' }
    ]
  },
  {
    id: 'acaia-pearl',
    name: 'ANALYTIC SCALE',
    subtitle: 'Metric Precision',
    price: 145.00,
    description: 'Smart laboratory-grade scale displaying real-time flow rate, weight, and timing metrics on a crystal clear display.',
    iconName: 'CheckSquare',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5QPHuetci2hZLTp_FawZnANt5qG7Ij7CJuUGzg48WlaqfUfxZTlCvGNu62EjECNZqJr6LRncFsVusffpavnwNmkVcnNVLf8UMU5-2dE9itJL0qG2Dt_t6HeFQhxwsi0d1d9qT6rpbkr2Puzh_9_ljxn_KbQIaxRkuQNLHvwU3K2_4xJg51-zY8j_Na2IlND4rYkn2rsAzyT6sPkw6gHMu1FT7fsj8zlPJ8oH340XKb_ybMEEHeyTGYVOP-VTVUxfV_8dQgZD4jj0',
    ratio: 15,
    recommendedTemp: 'N/A',
    steps: [
      { title: 'Tare Vessel', duration: 10, instruction: 'Place your extraction server and dripper on the scale. Tare with dry grounds inside.' },
      { title: 'Flow Monitoring', duration: 120, instruction: 'Ensure your flow rate remains between 1.8g/s and 2.5g/s throughout the brew.' }
    ]
  },
  {
    id: 'hario-v60',
    name: 'SOVEREIGN DRIPPER',
    subtitle: 'Thermal Stability',
    price: 85.00,
    description: 'The solid copper build ensures incredible thermal stability, creating sweet, clean Extractions with high notes clarity.',
    iconName: 'Coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600&h=600',
    ratio: 16,
    recommendedTemp: '93°C',
    steps: [
      { title: 'Bloom', duration: 45, instruction: 'Pour 50g of water. Wait 45 seconds to let the coffee bloom and release CO2.' },
      { title: 'First Pour', duration: 60, instruction: 'Pour in concentric circles until you reach 150g. Keep the streams gentle and uniform.' },
      { title: 'Second Pour', duration: 45, instruction: 'Pour gently in the center until you reach 250g. Let it drain through.' },
      { title: 'Final Drawdown', duration: 30, instruction: 'Gently swirl the dripper and let the bed rest flat to complete drawdown.' }
    ]
  }
];

export const VERIFIABLE_BLOCKS: VerifiableBlock[] = [
  {
    blockNumber: 'GQR-2024-V3',
    lotId: 'SUC-CUM-33',
    originState: 'Sucre State, Venezuela',
    farmerName: 'Don Lorenzo Marcano',
    altitude: '1,450m',
    fairTradePremium: '+38% Direct Payout over Organic Standard',
    roastDate: '2026-05-24',
    moistureLevel: '10.8%',
    qualityScore: '88.5 SCAA pts',
    hash: '0x8f3c7ea1a600bc56b0d9990f11ac88eedaa9f001b6c77bb8bfb51aaa041ffff'
  },
  {
    blockNumber: 'GQR-2024-V2',
    lotId: 'MON-CAR-18',
    originState: 'Monagas State, Venezuela',
    farmerName: 'Familia Salazar',
    altitude: '1,320m',
    fairTradePremium: '+35% Direct Payout over Organic Standard',
    roastDate: '2026-05-22',
    moistureLevel: '11.1%',
    qualityScore: '86.5 SCAA pts',
    hash: '0x7e2db0812af1100bc1bcdc4745aa00bffe0e88ba201ab03924f78aaabf49ffe1'
  },
  {
    blockNumber: 'GQR-2024-V1',
    lotId: 'CAR-HOS-09',
    originState: 'Maritime Andes Multi-Lot',
    farmerName: 'Pacto Productores d\'Oriente',
    altitude: '1,400m average',
    fairTradePremium: '+30% Farm-Gate direct recompense',
    roastDate: '2026-05-20',
    moistureLevel: '10.9%',
    qualityScore: '85.5 SCAA pts',
    hash: '0x9a4bcd12fee0e88ba924fa001bbcdc4745ab00bffe201ab039abcdc8824f7fff9'
  },
  {
    blockNumber: 'GQR-2024-V4',
    lotId: 'SUC-MOR-55',
    originState: 'Altos del Morro, Coastal Range',
    farmerName: 'Sobeida Rangel',
    altitude: '1,560m',
    fairTradePremium: '+45% Sovereign Direct microlot payout',
    roastDate: '2026-05-25',
    moistureLevel: '10.5%',
    qualityScore: '89.5 SCAA pts',
    hash: '0x3c9fee33c7ea1aba3924f7ba001bbcdc4745ab00bffe201ab039abcdc8824ffac'
  }
];
