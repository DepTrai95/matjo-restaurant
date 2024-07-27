<template>
   <div class="toast-container">
      <div v-if="showNotification" class="toast"
         :class="{ 'toast--success': type === 'success', 'toast--error': type === 'error', 'is-visible': !toastFadedOut}">
         {{ message }}
      </div>
   </div>
</template>

<script>
import { toastStore } from '../../store/store.js';

export default {
   computed: {
      showNotification() {
         return toastStore().toastIsVisible;
      },
      toastFadedOut() {
         return toastStore().toastIsFadedOut;
      },
      message() {
         return toastStore().message;
      },
      type() {
         return toastStore().type;
      }
   }
};
</script>

<style lang="scss" scoped>
.toast-container {
   position: fixed;
   top: 20px;
   right: 20px;
   z-index: 9999;
}

.toast {
   color: white;
   border-radius: 5px;
   /* Green for success */
   background-color: #33a44bf2;
   opacity: 0;
   padding: 15px;
   transition: opacity 0.25s ease-in-out,  0.25s ease-in-out;
   transform: translateY(-50px);

   &.is-visible {
      opacity: 1;
      transform: translateY(0);
   }
}

.toast--error {
   /* Red for error */
   background-color: #da2f3fe3;
}
</style>
