/**
 * Land Simulator Controller
 * Manages the land simulator tab functionality
 * Demo version - adapted for web
 */

/* global LandGrid, LandSidebar, LandOptimized */

let landGrid = null;
let landSidebar = null;
let landOptimized = null;
let currentLandType = null;
let landStatsPanel = null;

/**
 * Initialize the land simulator
 */
async function initLandSimulator() {
  console.log('[Land] initLandSimulator starting...');

  // Initialize components
  const gridContainer = document.getElementById('landGrid');
  const sidebarContainer = document.getElementById('landSidebar');
  const optimizedContainer = document.getElementById('landOptimized');

  console.log('[Land] Containers found - grid:', !!gridContainer, 'sidebar:', !!sidebarContainer, 'optimized:', !!optimizedContainer);

  if (!gridContainer || !sidebarContainer) {
    console.error('[Land] Land simulator containers not found!');
    return;
  }

  // Create sidebar
  landSidebar = new LandSidebar(sidebarContainer, {
    onItemSelect: handleItemSelect,
    onLayoutLoad: handleLayoutLoad
  });

  // Create grid (no land type selected yet)
  console.log('[Land] Creating LandGrid with landType: null');
  landGrid = new LandGrid(gridContainer, {
    landType: null,
    onGridChange: handleGridChange,
    onItemDeselect: handleItemDeselect,
    onHouseStateChange: handleHouseStateChange
  });
  console.log('[Land] LandGrid created, instance:', !!landGrid);

  // Create optimized layouts panel
  if (optimizedContainer) {
    landOptimized = new LandOptimized(optimizedContainer, {
      onApplyLayout: handleApplyOptimizedLayout
    });
  }

  // Setup stats panel
  landStatsPanel = document.getElementById('landStats');
  updateStatsPanel(null, []);

  // Setup event listeners
  setupEventListeners();

  // Initialize owned lands configuration
  initOwnedLandsConfig();

  // Check if dropdown already has a value selected (browser autocomplete, etc.)
  const landTypeSelect = document.getElementById('landTypeSelect');
  if (landTypeSelect && landTypeSelect.value) {
    // Trigger the change handler to initialize the grid with the pre-selected value
    handleLandTypeChange({ target: landTypeSelect });
  }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  console.log('[Land] setupEventListeners called');

  // Land type selector - single delegated listener on document
  // (removed duplicate direct listener that was causing double grid creation)
  document.addEventListener('change', (e) => {
    if (e.target && e.target.id === 'landTypeSelect') {
      console.log('[Land] Change event for landTypeSelect');
      handleLandTypeChange(e);
    }
  });
  console.log('[Land] Change listener attached for #landTypeSelect');

  // Clear grid button
  const clearGridBtn = document.getElementById('clearGridBtn');
  if (clearGridBtn) {
    clearGridBtn.addEventListener('click', handleClearGrid);
  }

  // Ctrl+S to save current layout
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      // Only save if Land tab is active
      const landTab = document.getElementById('tab-land');
      if (landTab?.classList.contains('active') && landSidebar) {
        e.preventDefault();
        landSidebar.saveCurrentLayout();
      }
    }
  });
}

/**
 * Handle land type change
 */
async function handleLandTypeChange(e) {
  const landType = e.target.value;
  console.log('[Land] handleLandTypeChange called with:', landType);

  if (!landType) {
    currentLandType = null;
    if (landGrid) {
      await landGrid.setLandType(null);
    }
    if (landSidebar) {
      landSidebar.setLandType(null);
    }
    if (landOptimized) {
      landOptimized.setLandType(null);
    }
    return;
  }

  currentLandType = landType;

  if (landGrid) {
    console.log('[Land] Calling landGrid.setLandType with:', landType);
    try {
      await landGrid.setLandType(landType);
      console.log('[Land] landGrid.setLandType completed');
    } catch (err) {
      console.error('[Land] landGrid.setLandType FAILED:', err);
    }
  } else {
    console.error('[Land] landGrid is null!');
  }

  if (landSidebar) {
    landSidebar.setLandType(landType);
  }

  if (landOptimized) {
    landOptimized.setLandType(landType);
  }

  // Update stats panel
  updateStatsPanel(landType, []);
}

/**
 * Handle item selection from sidebar
 */
function handleItemSelect(item) {
  if (landGrid) {
    landGrid.setSelectedItem(item);
  }
}

/**
 * Handle item deselection (right-click to cancel placement)
 */
function handleItemDeselect() {
  if (landSidebar) {
    landSidebar.deselectItem();
  }
}

/**
 * Handle grid changes
 */
function handleGridChange(grid) {
  if (landSidebar) {
    landSidebar.updateGrid(grid);
  }

  // Update stats panel
  updateStatsPanel(currentLandType, grid);
}

/**
 * Handle house state changes (for NFT lands)
 */
function handleHouseStateChange(state) {
  if (landOptimized && landGrid) {
    // Pass house position and rotation to optimized panel
    const houseState = landGrid.getHouseState();
    landOptimized.setHouseState(houseState.position, houseState.rotation);
  }
}

/**
 * Handle layout load
 */
function handleLayoutLoad(layout) {
  // Change land type if needed
  if (layout.landType !== currentLandType) {
    const landTypeSelect = document.getElementById('landTypeSelect');
    if (landTypeSelect) {
      landTypeSelect.value = layout.landType;
      currentLandType = layout.landType;
    }
  }

  // Load layout into grid
  if (landGrid) {
    landGrid.setLandType(layout.landType).then(() => {
      landGrid.loadLayout(layout);
    });
  }
}

/**
 * Handle clear grid
 */
function handleClearGrid() {
  if (!landGrid) return;

  if (confirm('Are you sure you want to clear the grid?')) {
    landGrid.clear();
  }
}

/**
 * Handle applying an optimized layout pattern
 * This shows the pattern visually but doesn't assign specific items
 */
function handleApplyOptimizedLayout(layout) {
  if (!landGrid || !currentLandType) return;

  // Handle house position hint (auto-place house from optimal suggestions)
  if (layout.isHousePositionHint && layout.housePosition) {
    const { x, y } = layout.housePosition;
    const rotation = layout.houseRotation || 0;

    const success = landGrid.placeHouseAt(x, y, rotation);
    if (success) {
      // Show a brief success message
      showToast(`House placed at (${x}, ${y}) with ${rotation}° rotation`, 'success');
    }
    return;
  }

  // Show info about the layout
  const message =
    `Layout: ${layout.name}\n` +
    `Items: ${layout.itemCount}\n` +
    `Tiles used: ${layout.tilesUsed}\n` +
    `Efficiency: ${layout.efficiency}%\n\n${
      layout.breakdown
        ? `Breakdown:\n${Object.entries(layout.breakdown)
            .map(([size, count]) => `  ${size}: ${count} items`)
            .join('\n')}\n\n`
        : ''
    }This shows the optimal placement positions.\n` +
    `Use the item palette to place specific crops/items.`;

  alert(message);
}

/**
 * Show a toast notification
 */
function showToast(message, type = 'info') {
  // Use UIHelpers if available
  if (window.UIHelpers?.showToast) {
    window.UIHelpers.showToast(message, type);
    return;
  }

  const toast = document.createElement('div');
  toast.className = 'land-toast';
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.right = '20px';
  toast.style.padding = '12px 16px';
  toast.style.borderRadius = '4px';
  toast.style.zIndex = '10000';
  toast.style.fontSize = '14px';
  toast.style.color = '#fff';

  if (type === 'success') {
    toast.style.background = '#10B981';
  } else if (type === 'error') {
    toast.style.background = '#EF4444';
  } else {
    toast.style.background = '#3B82F6';
  }

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

/**
 * Get color for efficiency percentage
 */
function getEfficiencyColor(efficiency) {
  if (efficiency >= 70) return '#10B981';
  if (efficiency >= 50) return '#FBBF24';
  return '#EF4444';
}

/**
 * Update the stats panel below the grid
 */
async function updateStatsPanel(landType, grid) {
  if (!landStatsPanel) return;

  // Hide panel if no land selected
  if (!landType) {
    landStatsPanel.style.display = 'none';
    return;
  }

  landStatsPanel.style.display = 'block';

  // Get land data for total tiles
  let totalTiles = 0;
  try {
    const landTypes = await window.electronAPI.getLandTypes();
    const landData = landTypes.find((l) => l.id === landType);
    if (landData) {
      totalTiles = landData.tiles?.length || 0;
    }
  } catch (e) {
    console.error('Failed to get land data for stats:', e);
  }

  // Calculate stats from grid
  const itemCount = grid.length;
  const tilesUsed = grid.reduce((sum, placed) => sum + placed.item.width * placed.item.height, 0);
  const totalSilver = grid.reduce((sum, placed) => sum + (placed.item.silverCost || 0), 0);
  const efficiency = totalTiles > 0 ? Math.round((tilesUsed / totalTiles) * 100) : 0;

  // Group by size
  const sizeBreakdown = {};
  grid.forEach((placed) => {
    const size = placed.item.size || `${placed.item.width}x${placed.item.height}`;
    sizeBreakdown[size] = (sizeBreakdown[size] || 0) + 1;
  });

  const breakdownHtml = Object.entries(sizeBreakdown)
    .map(([size, count]) => `<span class="stat-breakdown-item">${count}x ${size}</span>`)
    .join('');

  // Calculate total yields (aggregate by resource)
  const yieldTotals = {};
  grid.forEach((placed) => {
    if (placed.item.yields && placed.item.yields.length > 0) {
      placed.item.yields.forEach((y) => {
        if (!yieldTotals[y.resource]) {
          yieldTotals[y.resource] = { min: 0, max: 0, avg: 0 };
        }
        yieldTotals[y.resource].min += y.min;
        yieldTotals[y.resource].max += y.max;
        yieldTotals[y.resource].avg += y.avg;
      });
    }
  });

  // Build yields HTML
  let yieldsHtml = '';
  const yieldEntries = Object.entries(yieldTotals);
  if (yieldEntries.length > 0) {
    yieldsHtml = `
      <div class="stats-yields">
        <span class="yields-header">Expected Yields:</span>
        ${yieldEntries
          .map(
            ([resource, totals]) =>
              `<span class="yield-item"><strong>${resource}:</strong> ${totals.min}-${totals.max} (~${Math.round(totals.avg)})</span>`
          )
          .join('')}
      </div>
    `;
  }

  landStatsPanel.innerHTML = `
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-label">Crops Planted</span>
        <span class="stat-value">${itemCount}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Tiles Used</span>
        <span class="stat-value">${tilesUsed} / ${totalTiles}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Efficiency</span>
        <span class="stat-value" style="color: ${getEfficiencyColor(efficiency)};">${efficiency}%</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Silver Cost</span>
        <span class="stat-value" style="color: var(--color-gold);">${totalSilver.toLocaleString()}</span>
      </div>
    </div>
    ${breakdownHtml ? `<div class="stats-breakdown">${breakdownHtml}</div>` : ''}
    ${yieldsHtml}
  `;
}

// ============================================
// Owned Lands Configuration
// ============================================

/**
 * Initialize owned lands configuration panel
 */
async function initOwnedLandsConfig() {
  try {
    const ownedLandsData = await window.electronAPI.getOwnedLands();

    // Set community land checkboxes
    const smallCommunity = document.getElementById('ownSmallCommunity');
    const mediumCommunity = document.getElementById('ownMediumCommunity');
    const largeCommunity = document.getElementById('ownLargeCommunity');

    if (smallCommunity) smallCommunity.checked = ownedLandsData.ownedLands?.SMALL_COMMUNITY > 0;
    if (mediumCommunity) mediumCommunity.checked = ownedLandsData.ownedLands?.MEDIUM_COMMUNITY > 0;
    if (largeCommunity) largeCommunity.checked = ownedLandsData.ownedLands?.LARGE_COMMUNITY > 0;

    // Set NFT land inputs
    const nftSmall = document.getElementById('ownNftSmall');
    const nftMedium = document.getElementById('ownNftMedium');
    const nftLarge = document.getElementById('ownNftLarge');

    if (nftSmall) nftSmall.value = ownedLandsData.ownedLands?.NFT_SMALL || 0;
    if (nftMedium) nftMedium.value = ownedLandsData.ownedLands?.NFT_MEDIUM || 0;
    if (nftLarge) nftLarge.value = ownedLandsData.ownedLands?.NFT_LARGE || 0;

    updateNftLandCount();
    updateTotalOwnedTiles();
    setupOwnedLandsListeners();
  } catch (error) {
    console.error('Error initializing owned lands config:', error);
  }
}

/**
 * Setup event listeners for owned lands inputs
 */
function setupOwnedLandsListeners() {
  const communityInputs = ['ownSmallCommunity', 'ownMediumCommunity', 'ownLargeCommunity'];
  const nftInputs = ['ownNftSmall', 'ownNftMedium', 'ownNftLarge'];

  // Community land checkboxes
  communityInputs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        updateTotalOwnedTiles();
        saveOwnedLands();
      });
    }
  });

  // NFT land inputs - also enforce combined limit
  nftInputs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        updateNftLandCount();
        updateTotalOwnedTiles();
      });
      el.addEventListener('change', saveOwnedLands);
    }
  });

  // Initial update of NFT count display
  updateNftLandCount();
}

/**
 * Save owned lands configuration
 */
async function saveOwnedLands() {
  const ownedLands = {
    SMALL_COMMUNITY: document.getElementById('ownSmallCommunity')?.checked ? 1 : 0,
    MEDIUM_COMMUNITY: document.getElementById('ownMediumCommunity')?.checked ? 1 : 0,
    LARGE_COMMUNITY: document.getElementById('ownLargeCommunity')?.checked ? 1 : 0,
    NFT_SMALL: parseInt(document.getElementById('ownNftSmall')?.value, 10) || 0,
    NFT_MEDIUM: parseInt(document.getElementById('ownNftMedium')?.value, 10) || 0,
    NFT_LARGE: parseInt(document.getElementById('ownNftLarge')?.value, 10) || 0
  };

  try {
    await window.electronAPI.updateOwnedLands(ownedLands);
    updateTotalOwnedTiles();
  } catch (error) {
    console.error('Error saving owned lands:', error);
  }
}

/**
 * Maximum total NFT lands allowed (combined across all sizes)
 */
const MAX_NFT_LANDS = 7;

/**
 * Get total NFT lands currently configured
 */
function getTotalNftLands() {
  const small = parseInt(document.getElementById('ownNftSmall')?.value, 10) || 0;
  const medium = parseInt(document.getElementById('ownNftMedium')?.value, 10) || 0;
  const large = parseInt(document.getElementById('ownNftLarge')?.value, 10) || 0;
  return small + medium + large;
}

/**
 * Update NFT land count display and enforce combined limit
 */
function updateNftLandCount() {
  const total = getTotalNftLands();
  const countEl = document.getElementById('nftLandCount');
  if (countEl) {
    countEl.textContent = total;
  }

  // Update max values on each input based on remaining slots
  const small = parseInt(document.getElementById('ownNftSmall')?.value, 10) || 0;
  const medium = parseInt(document.getElementById('ownNftMedium')?.value, 10) || 0;
  const large = parseInt(document.getElementById('ownNftLarge')?.value, 10) || 0;

  const smallEl = document.getElementById('ownNftSmall');
  const mediumEl = document.getElementById('ownNftMedium');
  const largeEl = document.getElementById('ownNftLarge');

  // Each input's max = current value + remaining slots
  const remaining = MAX_NFT_LANDS - total;
  if (smallEl) smallEl.max = small + remaining;
  if (mediumEl) mediumEl.max = medium + remaining;
  if (largeEl) largeEl.max = large + remaining;
}

/**
 * Update total tiles display
 */
function updateTotalOwnedTiles() {
  const tiles = {
    SMALL_COMMUNITY: 56,
    MEDIUM_COMMUNITY: 91,
    LARGE_COMMUNITY: 130,
    NFT_SMALL: 100,
    NFT_MEDIUM: 144,
    NFT_LARGE: 225
  };

  let total = 0;
  total += document.getElementById('ownSmallCommunity')?.checked ? tiles.SMALL_COMMUNITY : 0;
  total += document.getElementById('ownMediumCommunity')?.checked ? tiles.MEDIUM_COMMUNITY : 0;
  total += document.getElementById('ownLargeCommunity')?.checked ? tiles.LARGE_COMMUNITY : 0;
  total += (parseInt(document.getElementById('ownNftSmall')?.value, 10) || 0) * tiles.NFT_SMALL;
  total += (parseInt(document.getElementById('ownNftMedium')?.value, 10) || 0) * tiles.NFT_MEDIUM;
  total += (parseInt(document.getElementById('ownNftLarge')?.value, 10) || 0) * tiles.NFT_LARGE;

  const totalEl = document.getElementById('totalOwnedTiles');
  if (totalEl) {
    totalEl.textContent = `${total} tiles`;
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLandSimulator);
} else {
  initLandSimulator();
}
