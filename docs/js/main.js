/**
 * RavenHUD Website - Main JavaScript
 * Fetches release info from GitHub API and updates download links
 */

const GITHUB_REPO = 'therealpixelated/ravenhud';
const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;

/**
 * Throttle function to limit execution rate
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Fetch latest release info from GitHub
 */
async function fetchLatestRelease() {
  try {
    const response = await fetch(GITHUB_API);
    
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }
    
    const release = await response.json();
    return release;
  } catch (error) {
    console.error('Failed to fetch release info:', error);
    return null;
  }
}

/**
 * Format file size in human readable format
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Format date in relative time
 */
function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Update UI with release information
 */
function updateUI(release) {
  const versionInfo = document.getElementById('version-info');
  const downloadBtn = document.getElementById('download-btn');
  const downloadFilename = document.getElementById('download-filename');
  const downloadSize = document.getElementById('download-size');
  
  if (!release) {
    // No release found - use placeholder
    if (versionInfo) {
      versionInfo.textContent = 'First release coming soon!';
    }
    if (downloadBtn) {
      downloadBtn.href = `https://github.com/${GITHUB_REPO}/releases`;
      downloadBtn.textContent = 'View Releases';
    }
    return;
  }
  
  // Find the Windows ZIP asset (guard against empty assets array)
  const assets = release.assets || [];
  const windowsAsset = assets.find(asset =>
    asset.name.includes('win32') ||
    asset.name.includes('windows') ||
    asset.name.endsWith('.zip')
  ) || assets[0] || null;
  
  // Update version info
  if (versionInfo) {
    const relativeDate = formatRelativeDate(release.published_at);
    versionInfo.textContent = `${release.tag_name} • Released ${relativeDate}`;
  }
  
  // Update download button
  if (downloadBtn && windowsAsset) {
    downloadBtn.href = windowsAsset.browser_download_url;
  } else if (downloadBtn) {
    downloadBtn.href = release.html_url;
  }
  
  // Update download details
  if (downloadFilename && windowsAsset) {
    downloadFilename.textContent = windowsAsset.name;
  }
  
  if (downloadSize && windowsAsset) {
    downloadSize.textContent = formatFileSize(windowsAsset.size);
  }
}

/**
 * Add smooth scroll behavior for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      // Skip if href is just "#" or empty
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Add parallax effect to hero section
 */
function initParallax() {
  const heroPreview = document.querySelector('.hero-preview');
  if (!heroPreview) return;

  const handleScroll = throttle(() => {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.3;
    heroPreview.style.transform = `translateY(${rate}px)`;
  }, 16); // ~60fps

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Lazy load GIF images for better performance
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

/**
 * Add header background on scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = throttle(() => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Initialize the page
 */
async function init() {
  // Initialize UI enhancements
  initSmoothScroll();
  initParallax();
  initLazyLoading();
  initHeaderScroll();
  
  // Fetch and display release info
  const release = await fetchLatestRelease();
  updateUI(release);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
