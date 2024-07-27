import { defineStore } from 'pinia';

// state ~= data, getters ~= computed, actions ~= methods 
export const toastStore = defineStore('toast', {
  state: () => {
      return { 
        toastIsVisible: false,
        toastIsFadedOut: false,
        message: '',
        type: 'success'
      }
  },
  getters: {}, 
  actions: {
    showToast(type = 'success', message) {
      this.toastIsVisible = true;
      this.message = message;
      this.type = type;

      setTimeout(() => {
        this.toastIsFadedOut = true;
      }, 2500);

      setTimeout(() => {
        this.toastIsVisible = false;
        this.message = '';
      }, 3000);
    }
  },
})