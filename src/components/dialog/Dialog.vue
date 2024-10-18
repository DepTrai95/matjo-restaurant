<template>
   <Teleport to="body">
      <dialog ref="dialog" class="dialog">
         <div class="dialog-header">
            <h2>
               <slot name="dialogHeader"></slot>
            </h2>
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
      BaseButton
   },
   props: {
      dialogIsOpen: {
         type: Boolean,
         default: false
      }
   },
   watch: {
      dialogIsOpen(newValue) {
         if (newValue) {
            this.showDialog();
         } else {
            this.closeDialog();
         }
      }
   },
   methods: {
      showDialog() {
         this.$refs.dialog.showModal();
         window.addEventListener('keydown', this.handleKeydown);
      },
      closeDialog() {
         this.$refs.dialog.close();
         this.$emit('update:dialogIsOpen', false); // Emit event to update parent state
         window.removeEventListener('keydown', this.handleKeydown);
      },
      handleKeydown(event) {
         if (event.key === 'Escape') { 
            this.closeDialog();
         }
      }
   },
   beforeDestroy() {
      window.removeEventListener('keydown', this.handleKeydown); // Clean up event listener
   }
};
</script>

<style lang="scss" scoped>
.dialog {
   border-color: transparent;
   border-radius: 5px;

   @include for-tablet-portrait-up {
      max-width: 750px;
   }

   h2 {
      @include responsive-font-size(2.4rem, 2.6rem);
      border-bottom: 1px solid $color-body;
      margin-block: 2rem;
      padding-block-end: 2rem;

      @include for-tablet-portrait-down {
         @include responsive-font-size(2.2rem, 2.4rem);
      }
   }

   p {
      @include responsive-font-size(1.6rem, 1.8rem);

      @include for-tablet-portrait-down {
         @include responsive-font-size(1.5rem, 1.6rem);
         margin-block: 1rem;
      }
   }
}
</style>
