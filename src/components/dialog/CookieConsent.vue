<template>
   <Teleport to="body">
      <dialog 
         ref="dialog" 
         class="cookie-dialog dialog"
         role="dialog"
         aria-labelledby="cookie-dialog-title"
         aria-describedby="cookie-dialog-description"
         aria-modal="true"
      >
         <div class="dialog-header">
            <h2 id="cookie-dialog-title">
               {{ $t('cookie.title') }}
            </h2>
            <!-- Close button hidden - user must make a decision -->
         </div>
         <div class="dialog-body" id="cookie-dialog-description">
            <div class="cookie-content">
               <p class="cookie-description">{{ $t('cookie.description') }}</p>
               <p class="cookie-privacy-link">
                  <router-link to="/privacy" class="link" @click="closeDialog">
                     {{ $t('cookie.privacyLinkText') }}
                  </router-link>
               </p>
               <div class="cookie-buttons">
                  <button 
                     class="btn--primary btn--accept" 
                     @click="handleAccept"
                     :ref="el => { if (el) acceptButtonRef = el }"
                     aria-label="Cookies akzeptieren"
                  >
                     {{ $t('cookie.accept') }}
                  </button>
                  <button 
                     class="btn--primary btn--reject" 
                     @click="handleReject"
                     :ref="el => { if (el) rejectButtonRef = el }"
                     aria-label="Cookies ablehnen"
                  >
                     {{ $t('cookie.reject') }}
                  </button>
               </div>
            </div>
         </div>
      </dialog>
   </Teleport>
</template>

<script>
import { cookieConsentStore } from '@/store/cookieConsentStore';
import { enableTracking, disableTracking } from '@/utils/tracking';

export default {
  name: 'CookieConsent',
  data() {
    return {
      acceptButtonRef: null,
      rejectButtonRef: null,
      focusableElements: [],
      firstFocusableElement: null,
      lastFocusableElement: null,
    };
  },
  methods: {
    /**
     * Open the cookie consent dialog
     * Sets up focus trap and prevents closing without decision
     */
    openDialog() {
      if (this.$refs.dialog) {
        this.$refs.dialog.showModal();
        this.setupFocusTrap();
        // Prevent closing via Escape key
        this.$refs.dialog.addEventListener('cancel', this.preventClose);
        // Focus first button
        this.$nextTick(() => {
          if (this.acceptButtonRef) {
            this.acceptButtonRef.focus();
          }
        });
      }
    },
    
    /**
     * Close the cookie consent dialog
     * Removes event listeners
     */
    closeDialog() {
      if (this.$refs.dialog) {
        this.$refs.dialog.close();
        this.removeFocusTrap();
        this.$refs.dialog.removeEventListener('cancel', this.preventClose);
      }
    },
    
    /**
     * Prevent dialog from closing (user must make a decision)
     * @param {Event} event
     */
    preventClose(event) {
      event.preventDefault();
    },
    
    /**
     * Setup focus trap - keeps focus within dialog
     */
    setupFocusTrap() {
      if (!this.$refs.dialog) return;
      
      // Get all focusable elements within dialog
      const focusableSelectors = [
        'button:not([disabled])',
        '[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ].join(', ');
      
      this.focusableElements = Array.from(
        this.$refs.dialog.querySelectorAll(focusableSelectors)
      );
      
      if (this.focusableElements.length > 0) {
        this.firstFocusableElement = this.focusableElements[0];
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
        
        // Add keyboard event listener for Tab key
        this.$refs.dialog.addEventListener('keydown', this.handleTabKey);
      }
    },
    
    /**
     * Remove focus trap
     */
    removeFocusTrap() {
      if (this.$refs.dialog) {
        this.$refs.dialog.removeEventListener('keydown', this.handleTabKey);
      }
      this.focusableElements = [];
      this.firstFocusableElement = null;
      this.lastFocusableElement = null;
    },
    
    /**
     * Handle Tab key navigation - trap focus within dialog
     * @param {KeyboardEvent} event
     */
    handleTabKey(event) {
      if (event.key !== 'Tab') return;
      
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === this.firstFocusableElement) {
          event.preventDefault();
          this.lastFocusableElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === this.lastFocusableElement) {
          event.preventDefault();
          this.firstFocusableElement.focus();
        }
      }
    },
    
    /**
     * Handle accept button click
     * Saves consent, enables tracking, closes dialog
     */
    handleAccept() {
      const store = cookieConsentStore();
      store.accept();
      enableTracking();
      this.closeDialog();
    },
    
    /**
     * Handle reject button click
     * Saves rejection, disables tracking, closes dialog
     */
    handleReject() {
      const store = cookieConsentStore();
      store.reject();
      disableTracking();
      this.closeDialog();
    },
    
    /**
     * Show dialog (public method for external calls)
     */
    showDialog() {
      this.openDialog();
    }
  },
  unmounted() {
    // Cleanup
    this.removeFocusTrap();
    if (this.$refs.dialog) {
      this.$refs.dialog.removeEventListener('cancel', this.preventClose);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
   border-color: transparent;
   border-radius: 5px;
   display: none;
   animation: vanish .4s forwards;
   transition: display .4s allow-discrete, overlay .4s allow-discrete;

   &[open] {
      display: block;
      animation: appear 0.4s forwards;
   }
   
   @keyframes appear {
      from {
         opacity: 0;
      }

      to {
         opacity: 1;
      }
   }
   
   @keyframes vanish {
      from {
         display: block;
         opacity: 1;
      }

      to {
         display: none;
         opacity: 0;
      }
   }

   @include for-phone-only {
      margin-inline: 2rem;
   }

   @include for-tablet-landscape-up {
      max-width: 800px;
   }

   .dialog-header {
      align-items: center;
      border-bottom: 1px solid $color-body;
      display: flex;
      justify-content: space-between;
      padding-block-end: 1.5rem;
      
      h2 {
         @include responsive-font-size(2.4rem, 2.6rem);
         margin: 0;
         
         @include for-tablet-portrait-down {
            @include responsive-font-size(2.2rem, 2.4rem);
         }
      }

      .btn-dialog-close {
         border: 0;
         border-radius: 100%;
         background-color: transparent;
         cursor: pointer;
         padding: 0.5rem;
         transition: background-color 0.3s;

         &:hover {
            background-color: rgba(0, 0, 0, 0.05);
         }

         .icon-container {
            display: flex;
            align-items: center;
         }

         .icon {
            height: 24px;
            width: 24px;
         }
      }
   }

   .dialog-body {
      @include responsive-font-size(1.6rem, 1.8rem);

      @include for-tablet-portrait-down {
         @include responsive-font-size(1.5rem, 1.6rem);
         margin-block: 1rem;
      }
   }
}

.cookie-dialog {
  // Inherit styles from base Dialog component
  // Additional styles specific to cookie consent
  
  .dialog-header {
    // Hide close button - user must make a decision
    .btn-dialog-close {
      display: none;
    }
  }
  
  .cookie-content {
    text-align: center;
    
    .cookie-description {
      @include responsive-font-size(1.6rem, 1.8rem);
      line-height: 1.6;
      margin-block-end: 1.5rem;
      
      @include for-tablet-portrait-down {
        @include responsive-font-size(1.5rem, 1.6rem);
      }
    }
    
    .cookie-privacy-link {
      margin-block-end: 2rem;
      
      .link {
        color: $color-primary;
        margin: 0;
        text-decoration: underline;
        transition: color 0.2s ease-in;
        
        &:hover,
        &:focus {
          color: darken($color-primary, 10%);
        }
      }
    }
    
    .cookie-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      margin-block-start: 2rem;
      
      @include for-tablet-portrait-up {
        flex-direction: row;
        justify-content: center;
      }
      
      .btn--primary {
        min-width: 150px;
        
        @include for-tablet-portrait-down {
          width: 100%;
        }
        
        &.btn--reject {
          background-color: transparent;
          border: 2px solid $color-primary;
          color: $color-primary;
          
          &:hover,
          &:focus {
            background-color: $color-primary;
            color: $color-white;
          }
        }
      }
    }
  }
}

// Ensure dialog overlay prevents interaction with background
.cookie-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
}
</style>
