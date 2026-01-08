/**
 * Land Sidebar Component
 * Displays item palette, profitability stats, and saved layouts
 * Demo version - adapted for web
 */

class LandSidebar {
  constructor(container, options = {}) {
    this.container = container;
    this.landData = null;
    this.selectedCategory = 'farming';
    this.searchQuery = '';
    this.onItemSelect = options.onItemSelect || (() => {});
    this.onLayoutLoad = options.onLayoutLoad || (() => {});
    this.currentGrid = [];
    this.currentLandType = null;

    this.init();
  }

  /**
   * Initialize the sidebar
   */
  async init() {
    this.container.innerHTML = '';
    this.container.className = 'land-sidebar';

    // Load land data
    try {
      this.landData = await window.electronAPI.getLandData();
    } catch (error) {
      console.error('Failed to load land data:', error);
      this.showError('Failed to load land data');
      return;
    }

    // Create sidebar sections
    this.createItemPalette();
    this.createStatsSection();
    this.createLayoutsSection();
  }

  /**
   * Create item palette section
   */
  createItemPalette() {
    const section = document.createElement('div');
    section.className = 'sidebar-section';

    const header = document.createElement('h3');
    header.className = 'sidebar-header';
    header.textContent = 'Place Items';
    section.appendChild(header);

    // Search bar
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'search-wrapper';
    searchWrapper.innerHTML = `
      <input type="text" class="search-input" placeholder="Search crops..." id="cropSearch">
      <span class="search-icon">🔍</span>
    `;
    section.appendChild(searchWrapper);

    // Add search event listener
    const searchInput = searchWrapper.querySelector('#cropSearch');
    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderItems();
    });

    // Category tabs
    const tabs = document.createElement('div');
    tabs.className = 'category-tabs';

    const categories = [
      { id: 'farming', label: 'Farming', icon: '🌾' },
      { id: 'herbalism', label: 'Herbalism', icon: '🌿' },
      { id: 'husbandry', label: 'Husbandry', icon: '🐷' },
      { id: 'Woodcutting', label: 'Woodcutting', icon: '🌳' },
      { id: 'breeding', label: 'Breeding', icon: '🦅' }
    ];

    categories.forEach((cat) => {
      const tab = document.createElement('button');
      tab.className = 'category-tab';
      tab.dataset.category = cat.id;
      tab.innerHTML = `<span class="tab-icon">${cat.icon}</span><span class="tab-label">${cat.label}</span>`;
      tab.onclick = () => this.selectCategory(cat.id);

      if (cat.id === this.selectedCategory) {
        tab.classList.add('active');
      }

      tabs.appendChild(tab);
    });

    section.appendChild(tabs);

    // Items container
    this.itemsContainer = document.createElement('div');
    this.itemsContainer.className = 'items-container';
    section.appendChild(this.itemsContainer);

    this.container.appendChild(section);
    this.renderItems();
  }

  /**
   * Select a category
   */
  selectCategory(category) {
    this.selectedCategory = category;

    // Update tab styles
    const tabs = this.container.querySelectorAll('.category-tab');
    tabs.forEach((tab) => {
      if (tab.dataset.category === category) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    this.renderItems();
  }

  /**
   * Render items for selected category
   */
  renderItems() {
    if (!this.landData || !this.itemsContainer) return;

    this.itemsContainer.innerHTML = '';

    let items = this.landData[this.selectedCategory] || [];

    // Filter by search query if present
    if (this.searchQuery) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(this.searchQuery) ||
          item.size.toLowerCase().includes(this.searchQuery)
      );
    }

    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-message';
      empty.textContent = this.searchQuery
        ? 'No matching items. Try a different search term.'
        : 'No items in this category. Select a different category above.';
      this.itemsContainer.appendChild(empty);
      return;
    }

    items.forEach((item) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'palette-item';

      // Build yield display string
      let yieldHtml = '';
      if (item.yields && item.yields.length > 0) {
        const y = item.yields[0]; // Primary yield
        yieldHtml = `<div class="item-yield">
          <span class="yield-resource">${y.resource}</span>
          <span class="yield-range">${y.min}-${y.max} (avg ${y.avg})</span>
        </div>`;
      }

      itemEl.innerHTML = `
        <div class="item-icon">${item.icon}</div>
        <div class="item-info">
          <div class="item-name">${item.name}</div>
          <div class="item-details">
            <span class="item-size">${item.size}</span>
            <span class="item-cost">${item.silverCost.toLocaleString()} silver</span>
          </div>
          ${yieldHtml}
        </div>
      `;

      itemEl.onclick = () => {
        // Deselect other items
        this.itemsContainer.querySelectorAll('.palette-item').forEach((el) => {
          el.classList.remove('selected');
        });

        // Select this item
        itemEl.classList.add('selected');
        this.onItemSelect(item);
      };

      this.itemsContainer.appendChild(itemEl);
    });
  }

  /**
   * Create stats section
   */
  createStatsSection() {
    const section = document.createElement('div');
    section.className = 'sidebar-section';

    const header = document.createElement('h3');
    header.className = 'sidebar-header';
    header.textContent = 'Layout Stats';
    section.appendChild(header);

    this.statsContainer = document.createElement('div');
    this.statsContainer.className = 'stats-container';
    section.appendChild(this.statsContainer);

    this.container.appendChild(section);
    this.updateStats();
  }

  /**
   * Update stats display
   */
  updateStats() {
    if (!this.statsContainer) return;

    const totalCost = this.currentGrid.reduce(
      (sum, placed) => sum + (placed.item.silverCost || 0),
      0
    );

    const tilesUsed = this.currentGrid.reduce(
      (sum, placed) => sum + placed.item.width * placed.item.height,
      0
    );

    // Calculate total yields (aggregate by resource)
    const yieldTotals = {};
    this.currentGrid.forEach((placed) => {
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
        <div class="stat-section">
          <div class="stat-section-header">Expected Yields</div>
          ${yieldEntries
            .map(
              ([resource, totals]) => `
            <div class="stat-row yield-row">
              <span class="stat-label">${resource}:</span>
              <span class="stat-value">${totals.min}-${totals.max} <span class="yield-avg">(~${Math.round(totals.avg)})</span></span>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }

    this.statsContainer.innerHTML = `
      <div class="stat-row">
        <span class="stat-label">Total Silver Cost:</span>
        <span class="stat-value">${totalCost.toLocaleString()}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Items Placed:</span>
        <span class="stat-value">${this.currentGrid.length}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Tiles Used:</span>
        <span class="stat-value">${tilesUsed}</span>
      </div>
      ${yieldsHtml}
    `;
  }

  /**
   * Create saved layouts section
   */
  createLayoutsSection() {
    const section = document.createElement('div');
    section.className = 'sidebar-section';

    const header = document.createElement('div');
    header.className = 'sidebar-header-row';
    header.innerHTML = `
      <h3 class="sidebar-header">Saved Layouts</h3>
      <button class="btn-small" id="save-layout-btn">Save Current</button>
    `;
    section.appendChild(header);

    this.layoutsContainer = document.createElement('div');
    this.layoutsContainer.className = 'layouts-container';
    section.appendChild(this.layoutsContainer);

    this.container.appendChild(section);

    // Save button handler
    document.getElementById('save-layout-btn').onclick = () => this.saveCurrentLayout();

    this.loadSavedLayouts();
  }

  /**
   * Load and display saved layouts
   */
  async loadSavedLayouts() {
    if (!this.layoutsContainer) return;

    try {
      const layouts = await window.electronAPI.getLandLayouts();

      // Filter by current land type if set
      const filtered = this.currentLandType
        ? layouts.filter((l) => l.landType === this.currentLandType)
        : layouts;

      this.layoutsContainer.innerHTML = '';

      if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-message';
        empty.textContent = 'No saved layouts';
        this.layoutsContainer.appendChild(empty);
        return;
      }

      filtered.forEach((layout) => {
        const layoutEl = document.createElement('div');
        layoutEl.className = 'saved-layout';
        layoutEl.innerHTML = `
          <div class="layout-info">
            <div class="layout-name">${layout.name}</div>
            <div class="layout-details">
              ${layout.grid.length} items · ${layout.totalCost} silver
            </div>
          </div>
          <div class="layout-actions">
            <button class="btn-icon load-btn" title="Load">📂</button>
            <button class="btn-icon delete-btn" title="Delete">🗑️</button>
          </div>
        `;

        layoutEl.querySelector('.load-btn').onclick = () => this.loadLayout(layout);
        layoutEl.querySelector('.delete-btn').onclick = (e) => {
          e.stopPropagation();
          this.deleteLayout(layout.id);
        };

        this.layoutsContainer.appendChild(layoutEl);
      });
    } catch (error) {
      console.error('Failed to load layouts:', error);
      this.showError('Failed to load saved layouts');
    }
  }

  /**
   * Save current layout
   */
  async saveCurrentLayout() {
    if (!this.currentLandType) {
      this.showError('Please select a land type first');
      return;
    }

    if (this.currentGrid.length === 0) {
      this.showError('Grid is empty - place some items first');
      return;
    }

    const name = prompt('Enter a name for this layout:');
    if (!name) return;

    try {
      const layout = {
        name,
        landType: this.currentLandType,
        grid: this.currentGrid
      };

      await window.electronAPI.saveLandLayout(layout);
      this.loadSavedLayouts();
      this.showSuccess('Layout saved successfully');
    } catch (error) {
      console.error('Failed to save layout:', error);
      this.showError(`Failed to save layout: ${error.message}`);
    }
  }

  /**
   * Load a saved layout
   */
  loadLayout(layout) {
    this.onLayoutLoad(layout);
  }

  /**
   * Delete a saved layout
   */
  async deleteLayout(layoutId) {
    if (!confirm('Are you sure you want to delete this layout?')) {
      return;
    }

    try {
      await window.electronAPI.deleteLandLayout(layoutId);
      this.loadSavedLayouts();
      this.showSuccess('Layout deleted');
    } catch (error) {
      console.error('Failed to delete layout:', error);
      this.showError('Failed to delete layout');
    }
  }

  /**
   * Update current grid for stats
   */
  updateGrid(grid) {
    this.currentGrid = grid;
    this.updateStats();
  }

  /**
   * Deselect any selected item in the palette
   */
  deselectItem() {
    if (this.itemsContainer) {
      this.itemsContainer.querySelectorAll('.palette-item').forEach((el) => {
        el.classList.remove('selected');
      });
    }
  }

  /**
   * Set current land type
   */
  setLandType(landType) {
    this.currentLandType = landType;
    this.loadSavedLayouts();
  }

  /**
   * Show error toast
   */
  // eslint-disable-next-line class-methods-use-this
  showError(message) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-error';
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.background = '#EF4444';
    toast.style.color = '#fff';
    toast.style.padding = '12px 16px';
    toast.style.borderRadius = '4px';
    toast.style.zIndex = '10000';

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  /**
   * Show success toast
   */
  // eslint-disable-next-line class-methods-use-this
  showSuccess(message) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.background = '#10B981';
    toast.style.color = '#fff';
    toast.style.padding = '12px 16px';
    toast.style.borderRadius = '4px';
    toast.style.zIndex = '10000';

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}

// Expose globally for demo
window.LandSidebar = LandSidebar;
