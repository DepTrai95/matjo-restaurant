<template>
   <Dialog ref="discountDialog">
      <template #dialogHeader>
         {{ $t('discountDialog.title') }}
      </template>
      <template #dialogBody>
         <div class="discount-content">
            <p class="discount-message">{{ $t('discountDialog.message') }}</p>
            <p class="discount-message">{{ $t('discountDialog.message2') }}</p>
            <p class="discount-validity">{{ $t('discountDialog.validUntil') }}</p>
            <img :src="sixMonthsHighlightsImg" :height="imageHeight" alt="MATJO 6 Monate Highlights">
         </div>
      </template>
   </Dialog>
</template>

<script>
import Dialog from './Dialog.vue';
import sixMonthsHighlightsImg from '@/assets/img/matjo-6-months-highlights.jpeg';

export default {
  name: 'DiscountDialog',
  components: {
    Dialog,
  },
  data() {
    return {
      sixMonthsHighlightsImg
    };
  },
  computed: {
    imageHeight() {
      // Check if we're on mobile (you can adjust this logic)
      if (window.innerWidth < 600) {
        return 400;
      } else {
        return 500;
      }
    }
  },
  methods: {
    showDialog() {
      if (this.$refs.discountDialog) {
        this.$refs.discountDialog.openDialog();
      }
    },
    closeDialog() {
      if (this.$refs.discountDialog) {
        this.$refs.discountDialog.closeDialog();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.discount-content {
   text-align: center;
   
   .discount-message {
      font-size: 1.6rem;
      font-weight: 500;
      margin: 0;
   }
   
   .discount-validity {
      font-size: 1.4rem;
      font-style: italic;
      color: grey;
      margin-block-start: 1rem;
   }

   .discount-info {
      font-size: 1.8rem;
      font-weight: 400;
      margin-block-end: 1rem;
   
      @include for-tablet-portrait-down {
         font-size: 1.6rem;
      }
   }

   img {
      width: unset;
      height: 400px; // Default height for mobile
      
      @media (min-width: 600px) {
         height: 500px; // Height for tablets and desktop
      }
      
      // Alternative: Falls du deine Mixins wieder aktivierst
      // @include for-tablet-portrait-up {
      //    height: 500px;
      // }
   }
}
</style> 