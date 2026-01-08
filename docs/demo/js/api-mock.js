/**
 * API Mock for RavenHUD Web Demo
 * Replaces window.electronAPI with browser-compatible implementations
 * Uses ported handlers from js/handlers/ directory
 */

// Cache for loaded data
const dataCache = {};

// Fetch and cache JSON data
async function fetchData(filename) {
  if (dataCache[filename]) return dataCache[filename];
  try {
    const response = await fetch(`data/${filename}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    dataCache[filename] = data;
    return data;
  } catch (err) {
    console.warn(`[API Mock] Failed to load ${filename}:`, err.message);
    return null;
  }
}

// Mock user profile (demo defaults)
let mockProfile = {
  simulationTimeWindow: 48,
  defaultLaborCost: 5,
  defaultSellMultiplier: 1.0,
  includeLabor: true
};

// Mock owned lands (with proper structure for demo)
let mockOwnedLands = {
  ownedLands: {
    SMALL_COMMUNITY: 0,
    MEDIUM_COMMUNITY: 0,
    LARGE_COMMUNITY: 0,
    NFT_SMALL: 0,
    NFT_MEDIUM: 0,
    NFT_LARGE: 0
  },
  totalTiles: { total: 0 }
};

// Calculate total tiles from owned lands
function calculateTotalTiles(ownedLands) {
  const tiles = {
    SMALL_COMMUNITY: 56,
    MEDIUM_COMMUNITY: 91,
    LARGE_COMMUNITY: 130,
    NFT_SMALL: 100,
    NFT_MEDIUM: 144,
    NFT_LARGE: 225
  };
  let total = 0;
  for (const [type, count] of Object.entries(ownedLands)) {
    total += (count || 0) * (tiles[type] || 0);
  }
  return { total };
}

// Create the electronAPI mock
window.electronAPI = {
  // === Land Data (uses LandHandlers) ===
  getLandTypes: async () => {
    // Use LandHandlers if available, otherwise fallback
    if (window.LandHandlers) {
      return await window.LandHandlers.getLandTypes();
    }
    console.warn('[API Mock] LandHandlers not loaded, using fallback');
    return [];
  },

  getLandData: async () => {
    if (window.LandHandlers) {
      return await window.LandHandlers.getLandData();
    }
    // Fallback: load from crops.json and transform
    const crops = await fetchData('crops.json');
    if (!crops) return {};

    const result = {
      farming: [],
      herbalism: [],
      husbandry: [],
      Woodcutting: [],
      breeding: []
    };

    (crops.items || []).forEach((item) => {
      const silverCost = item.yields?.[0]?.unitCost || 100;
      const landItem = {
        id: item.id,
        name: item.name,
        size: item.size || '1x1',
        width: item.width || 1,
        height: item.height || 1,
        silverCost,
        icon: item.icon || '🌱',
        level: item.level,
        category: item.category,
        growthTime: item.growthTime,
        yields: (item.yields || []).map(y => ({
          resource: y.resource,
          min: y.min,
          max: y.max,
          avg: y.avg
        }))
      };
      if (result[item.category]) {
        result[item.category].push(landItem);
      }
    });

    return result;
  },

  getCropData: async () => {
    const data = await fetchData('crops.json');
    return data || { items: [] };
  },

  getTradepackData: async () => {
    const data = await fetchData('tradepacks.json');
    return data || { tradepacks: [] };
  },

  getMaterialsData: async () => {
    const data = await fetchData('materials.json');
    return data || { items: [] };
  },

  // === Layout Data ===
  getCommunityLayouts: async (landType) => {
    if (window.LandHandlers) {
      return await window.LandHandlers.getCommunityLayouts(landType);
    }
    const data = await fetchData('community-layouts.json');
    if (!data) return { error: 'Not loaded' };
    return landType ? (data[landType] || { error: 'Not found' }) : data;
  },

  getNFTLayouts: async (landType) => {
    if (window.LandHandlers) {
      return await window.LandHandlers.getNFTLayouts(landType);
    }
    const data = await fetchData('nft-layouts.json');
    if (!data) return { error: 'Not loaded' };
    return landType ? (data[landType] || { error: 'Not found' }) : data;
  },

  // === Profile & Settings ===
  getProfile: async () => mockProfile,

  saveProfile: async (profile) => {
    mockProfile = { ...mockProfile, ...profile };
    return { success: true };
  },

  getSettings: async () => ({
    theme: 'dark',
    animationsEnabled: true,
    developerMode: false
  }),

  // === Owned Lands ===
  getOwnedLands: async () => mockOwnedLands,

  updateOwnedLands: async (lands) => {
    // Update with proper structure
    mockOwnedLands = {
      ownedLands: lands,
      totalTiles: calculateTotalTiles(lands)
    };
    return { success: true };
  },

  // === Layout Management ===
  getLandLayouts: async () => {
    if (window.LandHandlers) {
      return window.LandHandlers.getLandLayouts();
    }
    return [];
  },

  saveLandLayout: async (layout) => {
    if (window.LandHandlers) {
      return window.LandHandlers.saveLandLayout(layout);
    }
    return { success: false, error: 'Handler not loaded' };
  },

  deleteLandLayout: async (layoutId) => {
    if (window.LandHandlers) {
      return window.LandHandlers.deleteLandLayout(layoutId);
    }
    return { success: false, error: 'Handler not loaded' };
  },

  // === Validation ===
  validateLandPlacement: async (params) => {
    if (window.LandHandlers) {
      return await window.LandHandlers.validatePlacement(params);
    }
    // Fallback basic validation
    return { valid: true };
  },

  // === Material Sources ===
  getMaterialSources: async (materialName) => {
    // Load creatures data and find creatures that drop this material
    const creatures = await fetchData('creatures.json');
    if (!creatures || !creatures.items) return [];

    const searchName = materialName.toLowerCase();
    return creatures.items.filter(creature => {
      const drops = creature.drops || [];
      return drops.some(drop => drop.toLowerCase().includes(searchName));
    }).map(creature => ({
      name: creature.name,
      level: creature.level,
      levelMin: creature.levelMin,
      levelMax: creature.levelMax
    }));
  },

  // === Tradepack Calculations ===
  calculateTradepackProfit: async ({ tradepack, landType, laborCost, sellMultiplier }) => {
    const crops = await fetchData('crops.json');
    const tp = tradepack || {};
    const baseValue = tp.total_cost || tp.basePrice || 0;
    const labor = laborCost || mockProfile.defaultLaborCost || 5;
    const multiplier = sellMultiplier || mockProfile.defaultSellMultiplier || 1.0;

    // Calculate material costs from crop yields
    let totalMaterialCost = 0;
    const materialBreakdown = [];

    if (tp.materials && crops?.items) {
      for (const mat of tp.materials) {
        const materialName = mat.item?.toLowerCase() || '';
        const quantity = mat.quantity || 0;

        // Find crop that produces this material
        const crop = crops.items.find(c =>
          c.yields?.some(y => y.resource?.toLowerCase() === materialName)
        );

        if (crop) {
          const yieldData = crop.yields.find(y => y.resource?.toLowerCase() === materialName);
          const unitCost = yieldData?.unitCost || 0;
          const cost = unitCost * quantity;
          totalMaterialCost += cost;
          materialBreakdown.push({
            item: mat.item,
            quantity,
            unitCost,
            totalCost: cost,
            source: crop.name
          });
        } else {
          materialBreakdown.push({
            item: mat.item,
            quantity,
            unitCost: 0,
            totalCost: 0,
            source: 'Unknown'
          });
        }
      }
    }

    const adjustedValue = Math.floor(baseValue * multiplier);
    const profit = adjustedValue - totalMaterialCost;

    return {
      tradepack: { id: tp.id, name: tp.name },
      materials: materialBreakdown,
      totalMaterialCost,
      baseValue,
      demandMultiplier: multiplier,
      adjustedValue,
      profit,
      profitMargin: baseValue > 0 ? ((profit / baseValue) * 100).toFixed(1) : 0
    };
  },

  compareAllLandTypes: async ({ tradepack, laborCost, sellMultiplier }) => {
    const landTypes = await window.electronAPI.getLandTypes();
    const results = [];

    for (const land of landTypes) {
      const farmableTiles = land.tiles?.length || 0;
      const profitCalc = await window.electronAPI.calculateTradepackProfit({
        tradepack,
        landType: land.id,
        laborCost,
        sellMultiplier
      });

      results.push({
        landType: land.id,
        landName: land.name,
        profit: profitCalc.profit,
        profitPerTile: farmableTiles > 0 ? Math.round(profitCalc.profit / farmableTiles) : 0,
        farmableTiles,
        hasHouse: land.hasHouse || false
      });
    }

    return results.sort((a, b) => b.profit - a.profit);
  },

  optimizeCropBalance: async ({ crops, constraints }) => {
    return {
      success: true,
      allocations: [],
      totalProfit: 0,
      message: 'Demo mode - optimization not fully available'
    };
  },

  // === Farming Simulation ===
  simulateFarmingSelection: async ({ landType, crops, profile }) => {
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
  startFarmingSession: async () => ({
    success: false,
    error: 'Sessions not available in web demo'
  }),
  getActiveSession: async () => null,
  endFarmingSession: async () => ({ success: true }),

  // === UI Helpers ===
  showToast: (message, type) => {
    console.log(`[Toast ${type}] ${message}`);
    // Use UIHelpers if available
    if (window.UIHelpers?.showToast) {
      window.UIHelpers.showToast(message, type);
    }
  }
};

// Expose uiHelpers mock for backward compatibility
window.uiHelpers = {
  showToast: (message, type) => {
    if (window.UIHelpers?.showToast) {
      window.UIHelpers.showToast(message, type);
    } else {
      console.log(`[${type}] ${message}`);
    }
  },
  formatNumber: (n) => n?.toLocaleString() || '0',
  formatTime: (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}m ${secs}s`;
  }
};

console.log('[Demo] RavenHUD API Mock loaded');
