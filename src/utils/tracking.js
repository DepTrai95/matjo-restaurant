/**
 * Google Tag (gtag.js) Tracking Utility
 * Dynamically loads Google Tag only after user consent (DSGVO-compliant)
 * For Google Ads conversion tracking
 */

// Google Ads Conversion ID - Replace with your actual AW ID
const AW_ID = `AW-${process.env.GOOGLE_GTAG_KEY}`;

// Flag to prevent multiple script injections
let gtagLoaded = false;

/**
 * Check if gtag.js script is already present in the DOM
 * @returns {boolean}
 */
function isGtagScriptPresent() {
  return document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${AW_ID}"]`) !== null;
}

/**
 * Enable Google Tag (gtag.js) tracking
 * Dynamically injects gtag.js script into <head> and initializes tracking
 * Only loads if not already present (prevents duplicate loading)
 */
export function enableTracking() {
  // Prevent duplicate loading
  if (gtagLoaded || isGtagScriptPresent()) {
    console.warn('Google Tag is already loaded. Skipping duplicate injection.');
    return;
  }

  try {
    // Initialize dataLayer before script loads
    window.dataLayer = window.dataLayer || [];
    
    // Define gtag function
    function gtag() {
      window.dataLayer.push(arguments);
    }
    
    // Make gtag available globally
    window.gtag = gtag;
    
    // Create and inject gtag.js script into <head>
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${AW_ID}`;
    script.id = 'gtag-script';
    
    // Insert script into head
    document.head.appendChild(script);
    
    // Initialize gtag after script loads
    script.onload = () => {
      // Set JavaScript date
      gtag('js', new Date());
      // Configure Google Ads
      gtag('config', AW_ID);
    };
    
    // Fallback: Initialize immediately if script already cached
    if (script.complete || script.readyState === 'complete') {
      gtag('js', new Date());
      gtag('config', AW_ID);
    }
    
    gtagLoaded = true;
    console.log('Google Tag (gtag.js) enabled');
  } catch (error) {
    console.error('Error enabling Google Tag:', error);
  }
}

/**
 * Disable Google Tag tracking
 * Removes gtag.js script from DOM and sets opt-out flag
 */
export function disableTracking() {
  try {
    // Remove gtag.js script from <head>
    const script = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${AW_ID}"]`);
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
    }
    
    // Set Google Ads opt-out flag
    // This prevents tracking even if script is loaded elsewhere
    window[`ga-disable-${AW_ID}`] = true;
    
    // Clear dataLayer if it exists
    if (window.dataLayer) {
      window.dataLayer = [];
    }
    
    // Remove global gtag function
    if (window.gtag) {
      delete window.gtag;
    }
    
    gtagLoaded = false;
    console.log('Google Tag (gtag.js) disabled');
  } catch (error) {
    console.error('Error disabling Google Tag:', error);
  }
}

/**
 * Check if tracking is currently enabled
 * @returns {boolean}
 */
export function isTrackingEnabled() {
  // Check if script is present
  const scriptPresent = isGtagScriptPresent();
  
  // Check if opt-out flag is set
  const optOutFlag = window[`ga-disable-${AW_ID}`];
  
  // Tracking is enabled if script is present AND opt-out is not set
  return scriptPresent && !optOutFlag;
}

/**
 * Get Google Ads Conversion ID (for reference)
 * @returns {string}
 */
export function getAWId() {
  return AW_ID;
}
