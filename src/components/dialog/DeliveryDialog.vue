<template>
   <Dialog ref="deliveryDialog">
      <template #dialogHeader>
         {{ $t('dialog.deliveryDialog.title') }}
      </template>
      <template #dialogBody>
         <div class="delivery-content">
            <p class="delivery-message">{{ $t('dialog.deliveryDialog.message') }}</p>
            <div class="delivery-buttons">
               <a class="btn--primary" :href="lieferandoLink" target="_blank" rel="noopener noreferrer">
                  <img class="delivery-logo" :src="lieferandoLogo" alt="" height="20" width="20">
                  {{ $t('dialog.deliveryDialog.lieferandoButton') }}
               </a>
               <a class="btn--primary" :href="secondDeliveryLink" target="_blank" rel="noopener noreferrer">
                  <img class="delivery-logo" :src="woltLogo" alt="" height="20" width="20">
                  {{ $t('dialog.deliveryDialog.secondDeliveryButton') }}
               </a>
            </div>
         </div>
      </template>
   </Dialog>
</template>

<script>
import Dialog from './Dialog.vue';

export default {
  name: 'DeliveryDialog',
  components: {
    Dialog,
  },
  data() {
    return {
      lieferandoLink: 'https://www.lieferando.de/speisekarte/matjo-bbq-hotpot',
      secondDeliveryLink: 'https://wolt.com/de/deu/dresden/restaurant/matjo-bbq-hotpot',
      lieferandoLogo: null, // Will be loaded asynchronously
      woltLogo: null,
    };
  },
  async mounted() {
    // Load images asynchronously when component mounts
    await this.loadImages();
  },
  methods: {
    async loadImages() {
      try {
        // Dynamic import() returns a module, so we need to access the default export
        const lieferandoModule = await import('@/assets/img/lieferando-logo.png');
        this.lieferandoLogo = lieferandoModule.default || lieferandoModule;
        const woltModule = await import('@/assets/img/wolt-logo.png');
        this.woltLogo = woltModule.default || woltModule;
      } catch (error) {
        console.error('Error loading images:', error);
      }
    },
    async showDialog() {
      // Optionally load images when dialog is shown (lazy loading)
      if (!this.lieferandoLogo || !this.woltLogo) {
        await this.loadImages();
      }
      if (this.$refs.deliveryDialog) {
        this.$refs.deliveryDialog.openDialog();
      }
    },
    closeDialog() {
      if (this.$refs.deliveryDialog) {
        this.$refs.deliveryDialog.closeDialog();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.delivery-buttons .btn--primary {
   gap: 1rem;

   &:first-child {
      background-color: #ff7f00; //lieferando
   }

   &:last-child {
      background-color: #00C2E8; //wolt
   }
}

.delivery-logo {
   height: auto;
   width: 30px;   
}

.delivery-content {
   text-align: center;
   
   .delivery-message {
      @include responsive-font-size(1.6rem, 1.8rem);
      margin-block-end: 2rem;
      
      @include for-tablet-portrait-down {
         @include responsive-font-size(1.5rem, 1.6rem);
      }
   }
   
   .delivery-buttons {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: center;
      
      @include for-tablet-portrait-up {
         flex-direction: row;
         justify-content: center;
      }
      
      .btn--primary {
         @include responsive-font-size(1.6rem, 1.7rem);
         box-shadow: 0px 5px 15px 8px rgba(150, 150, 150, 0.3);
         min-width: 200px;
         text-align: center;
         text-decoration: none;
         
         @include for-tablet-portrait-down {
            width: 100%;
         }
      }
   }
}
</style>

