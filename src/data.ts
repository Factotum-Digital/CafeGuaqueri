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
    subtitle: 'Control Manual',
    price: 295.00,
    description: 'Molino manual profesional de renombre mundial con muelas de acero Nitro Blade para una consistencia inigualable del tamaño de molienda.',
    iconName: 'Sliders',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1nQw0qNWI_2MYwcqhBsy7YFIc13wvCQ6S7h_beGiw3_D7Sfggmj3BR9H11SJcY9fmCpVw_9EUoyZTjj3ocLrUV61sbpPwwpqcz-A1GFbPM9hOdsORvTSuMgC_mLqqxdlefyUEk8MTl_58kX3csyIzpddtxv0ASP7xa6_25n1XfIPFKwDQO0Dgih3BXoJWPp-xnbtRAUtkSZzv_IBFE9KGb0ts9SSmn7AfpXmDpRsj0X2s5uwyg2uHN_JBT3owQ1hex4NHB6YURRQ',
    ratio: 16,
    recommendedTemp: 'N/A',
    steps: [
      { title: 'Ajuste de Clics', duration: 15, instruction: 'Configura a 24 clics para vertido medio, o 12 clics para espresso fino.' },
      { title: 'Molienda Lenta', duration: 45, instruction: 'Asienta pasadas uniformes para evitar calentamiento térmico y proteger los aceites orgánicos.' }
    ]
  },
  {
    id: 'fellow-stagg',
    name: 'THERMAL KETTLE',
    subtitle: 'Precisión Digital',
    price: 180.00,
    description: 'Hervidor de cuello de ganso con control de flujo variable y diseño térmico de alta gama para vertidos perfectos.',
    iconName: 'Sparkles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1OnSBN1AntFPIJ9lapiQUqVE8cYWyk8HresawlyDtC8BMOx0nSfujhUseN7Z8rPr1cTLRRhnDGLn_Pi-4J3W8xhUU332kDGdteAWMDFlkW_k956yz3XtwoqrvIMzpTCdvuNQ9ElrbV9gJFs__DdYHxUxEH4tM9glIgZSX6bFBp0qNfOOTwCathVAjOLXMS0yxlfoD2iJsGuw5Veh05T0VrtnHDv9xhOhFxl_cLHrhBsxlsOCeFbqVu0HWHXgTPSS4pvwEqDdxnSw',
    ratio: 15,
    recommendedTemp: '94°C',
    steps: [
      { title: 'Precalentamiento', duration: 20, instruction: 'Enjuaga el filtro de papel con agua caliente del hervidor para eliminar cualquier sabor a papel.' },
      { title: 'Vertidos Controlados', duration: 90, instruction: 'Usa el mango contrapesado para verter un flujo fino a exactamente 2.5g/segundo.' },
      { title: 'Mantener Temperatura', duration: 40, instruction: 'Regresa el hervidor a la base entre vertidos para mantener tu temperatura de extracción ideal.' }
    ]
  },
  {
    id: 'acaia-pearl',
    name: 'ANALYTIC SCALE',
    subtitle: 'Precisión Métrica',
    price: 145.00,
    description: 'Báscula inteligente de grado de laboratorio que muestra el flujo de agua en tiempo real, el peso y métricas de tiempo.',
    iconName: 'CheckSquare',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5QPHuetci2hZLTp_FawZnANt5qG7Ij7CJuUGzg48WlaqfUfxZTlCvGNu62EjECNZqJr6LRncFsVusffpavnwNmkVcnNVLf8UMU5-2dE9itJL0qG2Dt_t6HeFQhxwsi0d1d9qT6rpbkr2Puzh_9_ljxn_KbQIaxRkuQNLHvwU3K2_4xJg51-zY8j_Na2IlND4rYkn2rsAzyT6sPkw6gHMu1FT7fsj8zlPJ8oH340XKb_ybMEEHeyTGYVOP-VTVUxfV_8dQgZD4jj0',
    ratio: 15,
    recommendedTemp: 'N/A',
    steps: [
      { title: 'Tarar Recipiente', duration: 10, instruction: 'Coloca el servidor de extracción y el gotero en la báscula. Tara con el café seco adentro.' },
      { title: 'Monitorear Flujo', duration: 120, instruction: 'Asegura que tu tasa de flujo se mantenga entre 1.8g/s y 2.5g/s durante toda la preparación.' }
    ]
  },
  {
    id: 'hario-v60',
    name: 'SOVEREIGN DRIPPER',
    subtitle: 'Estabilidad Térmica',
    price: 85.00,
    description: 'La construcción de cobre macizo garantiza una increíble estabilidad térmica, creando extracciones dulces y limpias con alta claridad.',
    iconName: 'Coffee',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3qrONIwY8C9705fqF_U9M_kole7lo3nHK5dTlvG13m9TPliQqLsZFaMCofzqojITpJCysuYdkIraiErVXwXR9-tVAVBNOwWA3pwbl9MLCykidMmQy9UGMo89tKM6s-vHnY0NWKoUy2K6YLhQ1NWPGhuHlDtuIi46JZzRXYOhvFFuDEhJ7EADkja-n783Vw7tpdOdVcc6OqYPXzIUGx-521pqZzlX3IgoB4ma3I8zb2oXxFyBZZ-paaROLKrnrKW1AR1b_re3kqabR',
    ratio: 16,
    recommendedTemp: '93°C',
    steps: [
      { title: 'Pre-infusión (Bloom)', duration: 45, instruction: 'Vierte 50g de agua. Espera 45 segundos para dejar florecer el café y liberar CO2.' },
      { title: 'Primer Vertido', duration: 60, instruction: 'Vierte en círculos concéntricos hasta alcanzar 150g. Mantén un flujo suave y uniforme.' },
      { title: 'Segundo Vertido', duration: 45, instruction: 'Vierte suavemente en el centro hasta alcanzar 250g. Deja filtrar por completo.' },
      { title: 'Filtrado Final', duration: 30, instruction: 'Mueve suavemente el gotero y deja que la cama de café se asiente plana para finalizar el goteo.' }
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
