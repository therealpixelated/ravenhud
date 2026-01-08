/**
 * Land Handlers - Browser-compatible version for demo
 * Ported from src/main/handlers/land-handlers.js
 */

// Cache for loaded data
let landTypesCache = null;
let landDataCache = null;
let communityLayoutsCache = null;
let nftLayoutsCache = null;
let nftShapesCache = null;

// In-memory storage for layouts (session only)
let savedLayouts = [];

// Max limits
const MAX_SAVED_LAYOUTS = 50;
const MAX_LAYOUT_NAME_LENGTH = 50;

/**
 * Generate a unique ID
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Load NFT shapes from JSON
 */
async function loadNFTShapes() {
  if (nftShapesCache) return nftShapesCache;

  try {
    const response = await fetch('data/land-shapes-nft.json');
    if (response.ok) {
      nftShapesCache = await response.json();
      console.log('[LandHandlers] Loaded NFT shapes');
      return nftShapesCache;
    }
  } catch (err) {
    console.warn('[LandHandlers] NFT shapes not found, using defaults');
  }
  return null;
}

/**
 * Get land type definitions
 */
async function getLandTypes() {
  if (landTypesCache) return landTypesCache;

  const nftShapes = await loadNFTShapes();

  const LAND_TYPES = {
    SMALL_COMMUNITY: {
      name: 'Small Community Land',
      width: 8,
      height: 7,
      shape: 'rectangle',
      getTiles: () => {
        const tiles = [];
        for (let y = 0; y < 7; y++) {
          for (let x = 0; x < 8; x++) {
            tiles.push({ x, y });
          }
        }
        return tiles;
      }
    },
    MEDIUM_COMMUNITY: {
      name: 'Medium Community Land',
      width: 11,
      height: 11,
      shape: 'L-shaped',
      getTiles: () => {
        const tiles = [];
        // Top section: 11 wide x 6 tall
        for (let y = 0; y < 6; y++) {
          for (let x = 0; x < 11; x++) {
            tiles.push({ x, y });
          }
        }
        // Bottom extension: 5 wide x 5 tall
        for (let y = 6; y < 11; y++) {
          for (let x = 0; x < 5; x++) {
            tiles.push({ x, y });
          }
        }
        return tiles;
      }
    },
    LARGE_COMMUNITY: {
      name: 'Large Community Land',
      width: 14,
      height: 13,
      shape: 'stepped',
      getTiles: () => {
        const tiles = [];
        // Top section: 14 wide x 5 tall
        for (let y = 0; y < 5; y++) {
          for (let x = 0; x < 14; x++) {
            tiles.push({ x, y });
          }
        }
        // Middle section: 8 wide x 4 tall (columns 6-13)
        for (let y = 5; y < 9; y++) {
          for (let x = 6; x < 14; x++) {
            tiles.push({ x, y });
          }
        }
        // Bottom section: 7 wide x 4 tall (columns 7-13)
        for (let y = 9; y < 13; y++) {
          for (let x = 7; x < 14; x++) {
            tiles.push({ x, y });
          }
        }
        return tiles;
      }
    },
    NFT_SMALL: {
      name: 'NFT Small Land',
      width: 10,
      height: 10,
      shape: 'rectangle',
      hasHouse: true,
      houseTiles: nftShapes?.NFT_SMALL?.tiles?.house || [],
      houseDoorTiles: nftShapes?.NFT_SMALL?.tiles?.house_door || [],
      doorClearanceTiles: nftShapes?.NFT_SMALL?.tiles?.door_clearance || [],
      getTiles: () => {
        const tiles = [];
        for (let y = 0; y < 10; y++) {
          for (let x = 0; x < 10; x++) {
            tiles.push({ x, y });
          }
        }
        return tiles;
      }
    },
    NFT_MEDIUM: {
      name: 'NFT Medium Land',
      width: 12,
      height: 12,
      shape: 'rectangle',
      hasHouse: true,
      houseTiles: nftShapes?.NFT_MEDIUM?.tiles?.house || [],
      houseDoorTiles: nftShapes?.NFT_MEDIUM?.tiles?.house_door || [],
      doorClearanceTiles: nftShapes?.NFT_MEDIUM?.tiles?.door_clearance || [],
      getTiles: () => {
        const tiles = [];
        for (let y = 0; y < 12; y++) {
          for (let x = 0; x < 12; x++) {
            tiles.push({ x, y });
          }
        }
        return tiles;
      }
    },
    NFT_LARGE: {
      name: 'NFT Large Land',
      width: 15,
      height: 15,
      shape: 'rectangle',
      hasHouse: true,
      houseTiles: nftShapes?.NFT_LARGE?.tiles?.house || [],
      houseDoorTiles: nftShapes?.NFT_LARGE?.tiles?.house_door || [],
      doorClearanceTiles: nftShapes?.NFT_LARGE?.tiles?.door_clearance || [],
      getTiles: () => {
        const tiles = [];
        for (let y = 0; y < 15; y++) {
          for (let x = 0; x < 15; x++) {
            tiles.push({ x, y });
          }
        }
        return tiles;
      }
    }
  };

  // Convert to array format expected by components
  landTypesCache = Object.keys(LAND_TYPES).map((key) => {
    const landType = LAND_TYPES[key];
    const result = {
      id: key,
      name: landType.name,
      width: landType.width,
      height: landType.height,
      shape: landType.shape,
      hasHouse: landType.hasHouse || false,
      tiles: landType.getTiles()
    };
    if (landType.hasHouse) {
      result.houseTiles = landType.houseTiles || [];
      result.houseDoorTiles = landType.houseDoorTiles || [];
      result.doorClearanceTiles = landType.doorClearanceTiles || [];
    }
    return result;
  });

  console.log('[LandHandlers] getLandTypes:', landTypesCache.length, 'types');
  return landTypesCache;
}

/**
 * Load land data from crops.json (transformed for sidebar display)
 */
async function getLandData() {
  if (landDataCache) return landDataCache;

  try {
    const response = await fetch('data/crops.json');
    const cropsData = await response.json();

    // Transform crops.json items into category-grouped format
    const result = {
      farming: [],
      herbalism: [],
      husbandry: [],
      Woodcutting: [],
      breeding: []
    };

    cropsData.items.forEach((item) => {
      const silverCost = item.yields && item.yields[0] ? item.yields[0].unitCost : 100;

      const yieldInfo = (item.yields || []).map((y) => ({
        resource: y.resource,
        min: y.min,
        max: y.max,
        avg: y.avg
      }));

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
        yields: yieldInfo
      };

      const category = item.category;
      if (result[category]) {
        result[category].push(landItem);
      }
    });

    // Sort each category by level
    Object.keys(result).forEach((cat) => {
      result[cat].sort((a, b) => (a.level || 0) - (b.level || 0));
    });

    landDataCache = result;
    return result;
  } catch (error) {
    console.error('Error loading land data:', error);
    throw error;
  }
}

/**
 * Get size key for an item
 */
function getItemSizeKey(item) {
  return `${item.width}x${item.height}`;
}

/**
 * Validate layout pattern (placement rules)
 */
function validateLayoutPattern(newX, newY, newWidth, newHeight, existingGrid) {
  if (existingGrid.length === 0) {
    return { valid: true };
  }

  const newSizeKey = `${newWidth}x${newHeight}`;
  const newXEnd = newX + newWidth - 1;
  const newYEnd = newY + newHeight - 1;

  for (const existing of existingGrid) {
    const exX = existing.x;
    const exY = existing.y;
    const exW = existing.item.width;
    const exH = existing.item.height;
    const exXEnd = exX + exW - 1;
    const exYEnd = exY + exH - 1;
    const exSizeKey = getItemSizeKey(existing.item);
    const sameSize = exSizeKey === newSizeKey;

    // Calculate gaps
    const xGap = newX > exXEnd ? newX - exXEnd - 1 : exX - newXEnd - 1;
    const yGap = newY > exYEnd ? newY - exYEnd - 1 : exY - newYEnd - 1;

    // Direct collision
    if (xGap < 0 && yGap < 0) {
      return { valid: false, message: 'Items overlap' };
    }

    // Check for full overlap in X (for vertical adjacency)
    const newXRange = [newX, newXEnd];
    const exXRange = [exX, exXEnd];
    const xFullOverlap =
      (newXRange[0] >= exXRange[0] && newXRange[1] <= exXRange[1]) ||
      (exXRange[0] >= newXRange[0] && exXRange[1] <= newXRange[1]);

    // Check for full overlap in Y (for horizontal adjacency)
    const newYRange = [newY, newYEnd];
    const exYRange = [exY, exYEnd];
    const yFullOverlap =
      (newYRange[0] >= exYRange[0] && newYRange[1] <= exYRange[1]) ||
      (exYRange[0] >= newYRange[0] && exYRange[1] <= newYRange[1]);

    // Vertical adjacency
    if (xFullOverlap && xGap < 0 && yGap >= 0) {
      if (sameSize && yGap < 0) {
        return { valid: false, message: 'Items overlap vertically' };
      }
      if (!sameSize && yGap < 1) {
        return { valid: false, message: 'Different sizes need 1 tile gap' };
      }
      continue;
    }

    // Horizontal adjacency
    if (yFullOverlap && yGap < 0 && xGap >= 0) {
      if (sameSize && xGap < 0) {
        return { valid: false, message: 'Items overlap horizontally' };
      }
      if (!sameSize && xGap < 1) {
        return { valid: false, message: 'Different sizes need 1 tile gap' };
      }
      continue;
    }

    // Diagonal/corner touching
    if (xGap <= 0 && yGap <= 0) {
      return { valid: false, message: 'Items must fully align in a row or column' };
    }
  }

  return { valid: true };
}

/**
 * Validate placement
 */
async function validatePlacement({ x, y, item, landType, existingGrid, enforceAdjacency = true }) {
  if (!item || !item.width || !item.height) {
    return { valid: false, message: 'Invalid item' };
  }

  const landTypes = await getLandTypes();
  const land = landTypes.find((l) => l.id === landType);
  if (!land) {
    return { valid: false, message: 'Invalid land type' };
  }

  const grid = existingGrid || [];
  const validTiles = land.tiles;

  // Check bounds
  for (let dy = 0; dy < item.height; dy++) {
    for (let dx = 0; dx < item.width; dx++) {
      const checkX = x + dx;
      const checkY = y + dy;
      if (!validTiles.some((tile) => tile.x === checkX && tile.y === checkY)) {
        return { valid: false, message: 'Placement outside land boundaries' };
      }
    }
  }

  // Check overlap
  for (let dy = 0; dy < item.height; dy++) {
    for (let dx = 0; dx < item.width; dx++) {
      const checkX = x + dx;
      const checkY = y + dy;
      if (
        grid.some((placed) => {
          const placedItem = placed.item;
          return (
            checkX >= placed.x &&
            checkX < placed.x + placedItem.width &&
            checkY >= placed.y &&
            checkY < placed.y + placedItem.height
          );
        })
      ) {
        return { valid: false, message: 'Cannot place on occupied tiles' };
      }
    }
  }

  // Check layout pattern
  if (enforceAdjacency) {
    const patternResult = validateLayoutPattern(x, y, item.width, item.height, grid);
    if (!patternResult.valid) {
      return patternResult;
    }
  }

  return { valid: true };
}

/**
 * Get saved layouts (in-memory for demo)
 */
function getLandLayouts() {
  return savedLayouts;
}

/**
 * Calculate total cost from grid
 */
function calculateTotalCost(grid) {
  return grid.reduce((total, placed) => total + (placed.item.silverCost || 0), 0);
}

/**
 * Sanitize layout name
 */
function sanitizeLayoutName(name) {
  if (typeof name !== 'string') return 'Unnamed Layout';
  return name
    .slice(0, MAX_LAYOUT_NAME_LENGTH)
    .replace(/[<>:"/\\|?*]/g, '')
    .trim() || 'Unnamed Layout';
}

/**
 * Save a layout (in-memory for demo)
 */
function saveLandLayout(layout) {
  if (!layout || typeof layout !== 'object') {
    throw new Error('Invalid layout');
  }

  const { name, landType, grid } = layout;

  if (!Array.isArray(grid)) {
    throw new Error('Invalid grid');
  }

  if (savedLayouts.length >= MAX_SAVED_LAYOUTS && !layout.id) {
    throw new Error(`Maximum of ${MAX_SAVED_LAYOUTS} layouts allowed`);
  }

  const sanitizedName = sanitizeLayoutName(name);
  const totalCost = calculateTotalCost(grid);

  const savedLayout = {
    id: layout.id || generateId(),
    name: sanitizedName,
    landType,
    grid,
    totalCost,
    lastModified: new Date().toISOString()
  };

  const existingIndex = savedLayouts.findIndex((l) => l.id === savedLayout.id);
  if (existingIndex >= 0) {
    savedLayouts[existingIndex] = savedLayout;
  } else {
    savedLayouts.push(savedLayout);
  }

  return savedLayout;
}

/**
 * Delete a layout
 */
function deleteLandLayout(layoutId) {
  const filtered = savedLayouts.filter((l) => l.id !== layoutId);
  if (filtered.length === savedLayouts.length) {
    throw new Error('Layout not found');
  }
  savedLayouts = filtered;
  return { success: true };
}

/**
 * Get community layouts
 */
async function getCommunityLayouts(landType) {
  if (!communityLayoutsCache) {
    try {
      const response = await fetch('data/community-layouts.json');
      communityLayoutsCache = await response.json();
    } catch (err) {
      console.warn('[LandHandlers] Community layouts not found');
      return { error: 'Community layouts not loaded' };
    }
  }

  if (landType) {
    return communityLayoutsCache[landType] || { error: `No layouts for ${landType}` };
  }
  return communityLayoutsCache;
}

/**
 * Get NFT layouts
 */
async function getNFTLayouts(landType) {
  if (!nftLayoutsCache) {
    try {
      const response = await fetch('data/nft-layouts.json');
      nftLayoutsCache = await response.json();
    } catch (err) {
      console.warn('[LandHandlers] NFT layouts not found');
      return { error: 'NFT layouts not loaded' };
    }
  }

  if (landType) {
    return nftLayoutsCache[landType] || { error: `No layouts for ${landType}` };
  }
  return nftLayoutsCache;
}

// Expose globally
window.LandHandlers = {
  getLandTypes,
  getLandData,
  validatePlacement,
  getLandLayouts,
  saveLandLayout,
  deleteLandLayout,
  getCommunityLayouts,
  getNFTLayouts
};
