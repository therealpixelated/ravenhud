/**
 * API Mock for RavenHUD Web Demo
 * Replaces window.electronAPI with browser-compatible fetch-based implementations
 */

// Cache for loaded data
const dataCache = {};

// Fetch and cache JSON data
async function fetchData(filename) {
  if (dataCache[filename]) return dataCache[filename];
  const response = await fetch(`data/${filename}`);
  const data = await response.json();
  dataCache[filename] = data;
  return data;
}

// Land type definitions (normally in land-handlers.js)
const LAND_TYPES = {
  SMALL_COMMUNITY: {
    id: 'SMALL_COMMUNITY',
    name: 'Small Community Land',
    category: 'community',
    width: 8,
    height: 8,
    farmableTiles: 44,
    hasHouse: true,
    houseWidth: 3,
    houseHeight: 3,
    houseTiles: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
      { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }
    ],
    houseDoorTiles: [{ x: 1, y: 2 }],
    doorClearanceTiles: [{ x: 1, y: 3 }, { x: 1, y: 4 }]
  },
  MEDIUM_COMMUNITY: {
    id: 'MEDIUM_COMMUNITY',
    name: 'Medium Community Land',
    category: 'community',
    width: 10,
    height: 10,
    farmableTiles: 75,
    hasHouse: true,
    houseWidth: 4,
    houseHeight: 4,
    houseTiles: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
      { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
      { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }
    ],
    houseDoorTiles: [{ x: 1, y: 3 }, { x: 2, y: 3 }],
    doorClearanceTiles: [{ x: 1, y: 4 }, { x: 2, y: 4 }, { x: 1, y: 5 }, { x: 2, y: 5 }]
  },
  LARGE_COMMUNITY: {
    id: 'LARGE_COMMUNITY',
    name: 'Large Community Land',
    category: 'community',
    width: 12,
    height: 12,
    farmableTiles: 112,
    hasHouse: true,
    houseWidth: 5,
    houseHeight: 5,
    houseTiles: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
      { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
      { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 },
      { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }
    ],
    houseDoorTiles: [{ x: 2, y: 4 }],
    doorClearanceTiles: [{ x: 2, y: 5 }, { x: 2, y: 6 }]
  },
  NFT_SMALL: {
    id: 'NFT_SMALL',
    name: 'Small NFT Land',
    category: 'nft',
    width: 8,
    height: 8,
    farmableTiles: 64,
    hasHouse: false
  },
  NFT_MEDIUM: {
    id: 'NFT_MEDIUM',
    name: 'Medium NFT Land',
    category: 'nft',
    width: 10,
    height: 10,
    farmableTiles: 100,
    hasHouse: false
  },
  NFT_LARGE: {
    id: 'NFT_LARGE',
    name: 'Large NFT Land',
    category: 'nft',
    width: 12,
    height: 12,
    farmableTiles: 144,
    hasHouse: false
  }
};

// Mock user profile (demo defaults)
let mockProfile = {
  defaultLaborCost: 5,
  defaultSellMultiplier: 1.0,
  includeLabor: true
};

// Mock owned lands (empty for demo)
let mockOwnedLands = [];

// Mock saved layouts (empty for demo)
let mockLayouts = [];

// Create the electronAPI mock
window.electronAPI = {
  // === Data Loading ===
  getLandData: async () => {
    const crops = await fetchData('crops.json');
    return {
      landTypes: LAND_TYPES,
      crops: crops.items || crops
    };
  },

  getLandTypes: async () => LAND_TYPES,

  getCropData: async () => {
    const data = await fetchData('crops.json');
    return data.items || data;
  },

  getTradepackData: async () => {
    const data = await fetchData('tradepacks.json');
    return data.items || data;
  },

  getMaterialsData: async () => {
    const data = await fetchData('materials.json');
    return data.items || data;
  },

  getCommunityLayouts: async (landType) => {
    const data = await fetchData('community-layouts.json');
    return data[landType] || [];
  },

  getNFTLayouts: async (landType) => {
    const data = await fetchData('nft-layouts.json');
    return data[landType] || [];
  },

  // === Profile & Settings ===
  getProfile: async () => mockProfile,

  saveProfile: async (profile) => {
    mockProfile = { ...mockProfile, ...profile };
    return { success: true };
  },

  getSettings: async () => ({
    theme: 'dark',
    animationsEnabled: true
  }),

  // === Owned Lands ===
  getOwnedLands: async () => mockOwnedLands,

  updateOwnedLands: async (lands) => {
    mockOwnedLands = lands;
    return { success: true };
  },

  // === Layout Management (no persistence in demo) ===
  getLandLayouts: async () => mockLayouts,

  saveLandLayout: async (layout) => {
    const existingIndex = mockLayouts.findIndex(l => l.id === layout.id);
    if (existingIndex >= 0) {
      mockLayouts[existingIndex] = layout;
    } else {
      layout.id = layout.id || `layout_${Date.now()}`;
      mockLayouts.push(layout);
    }
    return { success: true, layout };
  },

  deleteLandLayout: async (layoutId) => {
    mockLayouts = mockLayouts.filter(l => l.id !== layoutId);
    return { success: true };
  },

  // === Validation (simplified for demo) ===
  validateLandPlacement: async ({ landType, placements, housePosition, houseRotation }) => {
    const land = LAND_TYPES[landType];
    if (!land) return { valid: false, errors: ['Invalid land type'] };

    // Basic validation - just check if placements are within bounds
    const errors = [];
    const warnings = [];

    for (const p of placements) {
      if (p.x < 0 || p.y < 0 || p.x >= land.width || p.y >= land.height) {
        errors.push(`Placement at (${p.x}, ${p.y}) is out of bounds`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      utilization: Math.round((placements.length / land.farmableTiles) * 100)
    };
  },

  // === Tradepack Calculations (simplified) ===
  calculateTradepackProfit: async ({ tradepack, landType, laborCost, sellMultiplier }) => {
    // Simplified profit calculation for demo
    const tp = tradepack || {};
    const baseProfit = tp.basePrice || 100;
    const labor = laborCost || 5;
    const multiplier = sellMultiplier || 1.0;

    return {
      baseProfit,
      finalProfit: Math.round(baseProfit * multiplier - labor),
      laborCost: labor,
      sellMultiplier: multiplier,
      materials: tp.materials || [],
      profitPerTile: Math.round((baseProfit * multiplier - labor) / 10)
    };
  },

  compareAllLandTypes: async ({ tradepack, laborCost, sellMultiplier }) => {
    // Return mock comparison data
    const results = [];
    for (const [key, land] of Object.entries(LAND_TYPES)) {
      results.push({
        landType: key,
        landName: land.name,
        profit: Math.round(Math.random() * 1000 + 500),
        profitPerTile: Math.round(Math.random() * 50 + 10),
        farmableTiles: land.farmableTiles
      });
    }
    return results;
  },

  optimizeCropBalance: async ({ crops, constraints }) => {
    // Return mock optimization result
    return {
      success: true,
      allocations: [],
      totalProfit: 0,
      message: 'Demo mode - optimization not available'
    };
  },

  // === Farming Simulation (simplified) ===
  simulateFarmingSelection: async ({ landType, crops, profile }) => {
    const land = LAND_TYPES[landType];
    if (!land) return { success: false, error: 'Invalid land type' };

    return {
      success: true,
      totalYield: 0,
      placements: [],
      utilization: 0,
      message: 'Demo mode - run the full app for detailed simulations'
    };
  },

  simulateTradepackOwnedLands: async (params) => {
    return {
      success: true,
      results: [],
      totalProfit: 0,
      message: 'Demo mode - configure owned lands in the full app'
    };
  },

  // === Session Management (disabled in demo) ===
  startFarmingSession: async () => ({ success: false, error: 'Sessions not available in demo' }),
  getActiveSession: async () => null,
  endFarmingSession: async () => ({ success: true }),

  // === UI Helpers (no-op in demo) ===
  showToast: (message, type) => {
    console.log(`[${type}] ${message}`);
  }
};

// Also expose a uiHelpers mock
window.uiHelpers = {
  showToast: (message, type) => {
    console.log(`[${type}] ${message}`);
    // Could show actual toast in demo
  },
  formatNumber: (n) => n?.toLocaleString() || '0',
  formatTime: (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}m ${secs}s`;
  }
};

console.log('RavenHUD Demo API Mock loaded');
