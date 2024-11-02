<template>
   <Teleport to="body">
      <dialog ref="dialog" class="dialog">
         <div class="dialog-header">
            <h2>
               <slot name="dialogHeader"></slot>
            </h2>
            <button class="btn-dialog-close" @click="closeDialog" autofocus>
               <span class="icon-container">
                  <svg class="icon" aria-hidden="true" focusable="false">
                     <use href="#icon-close"></use>
                  </svg>
               </span>

            </button>
         </div>
         <div class="dialog-body">
            <p>
               <slot name="dialogBody"></slot>
            </p>
         </div>
         <base-button mode="btn--primary" @click="closeDialog">Schließen</base-button>
      </dialog>
   </Teleport>
</template>

<script>
import BaseButton from '../button/BaseButton.vue';

export default {
   components: {
      BaseButton,
   },
   methods: {
      openDialog() {
         this.$refs.dialog.showModal();
         window.addEventListener('keydown', this.handleKeydown);
      },
      closeDialog() {
         this.$refs.dialog.close();
         window.removeEventListener('keydown', this.handleKeydown);
      },
      handleKeydown(event) {
         if (event.key === 'Escape') { 
            this.closeDialog();
         }
      }
   },
   unmounted() {
      window.removeEventListener('keydown', this.handleKeydown); // Clean up event listener
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

   @include for-tablet-portrait-up {
      max-width: 750px;
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
</style>
