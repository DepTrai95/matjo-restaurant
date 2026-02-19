import { defineStore } from 'pinia';

// localStorage key for cookie consent
const STORAGE_KEY = 'cookieConsent';

/**
 * Cookie Consent Store
 * Manages the user's cookie consent status (accepted/rejected/null)
 * Persists to localStorage for cross-session persistence
 */
export const cookieConsentStore = defineStore('cookieConsent', {
  state: () => {
    return {
      consentStatus: null, // "accepted" | "rejected" | null
      shouldShowDialog: false // Flag to trigger dialog display
    };
  },
  
  getters: {
    /**
     * Check if user has given consent
     * @returns {boolean}
     */
    hasConsented() {
      return this.consentStatus === 'accepted';
    },
    
    /**
     * Check if user has rejected consent
     * @returns {boolean}
     */
    hasRejected() {
      return this.consentStatus === 'rejected';
    },
    
    /**
     * Check if consent decision has been made
     * @returns {boolean}
     */
    hasDecided() {
      return this.consentStatus !== null;
    }
  },
  
  actions: {
    /**
     * Initialize consent status from localStorage
     * Called on app startup
     */
    initialize() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'accepted' || stored === 'rejected') {
          this.consentStatus = stored;
        }
      } catch (error) {
        console.error('Error reading cookie consent from localStorage:', error);
        this.consentStatus = null;
      }
    },
    
    /**
     * Accept cookie consent
     * Saves to state and localStorage
     */
    accept() {
      this.consentStatus = 'accepted';
      try {
        localStorage.setItem(STORAGE_KEY, 'accepted');
      } catch (error) {
        console.error('Error saving cookie consent to localStorage:', error);
      }
    },
    
    /**
     * Reject cookie consent
     * Saves to state and localStorage
     */
    reject() {
      this.consentStatus = 'rejected';
      try {
        localStorage.setItem(STORAGE_KEY, 'rejected');
      } catch (error) {
        console.error('Error saving cookie consent to localStorage:', error);
      }
    },
    
    /**
     * Get current consent status
     * @returns {string|null} "accepted" | "rejected" | null
     */
    getConsentStatus() {
      return this.consentStatus;
    },
    
    /**
     * Reset consent (for testing/debugging)
     * Removes from localStorage
     */
    reset() {
      this.consentStatus = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Error removing cookie consent from localStorage:', error);
      }
    },
    
    /**
     * Request to show cookie dialog (for cookie settings link)
     */
    requestShowDialog() {
      this.shouldShowDialog = true;
    },
    
    /**
     * Clear dialog request flag (after dialog is shown)
     */
    clearDialogRequest() {
      this.shouldShowDialog = false;
    }
  }
});
