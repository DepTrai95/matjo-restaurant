<template>
  <section class="voucher" id="voucher-page">
    <div class="border-waves-before">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 38 28"
        width="19px"
        height="14px"
      >
        <defs>
          <pattern id="wavePatternVoucher" width="38" height="28" patternUnits="userSpaceOnUse" fill="none">
            <path
              d="M-8.8817842e-16,-0.000266139407 L-8.8817842e-16,28 C9,28 13,16 19,16 C25,16 29,28 38,28 L38,-0.000266139407 C29,8.67361738e-19 25,12 19,12 C13,12 9,0 -8.8817842e-16,-0.000266139407 Z"
              id="Path-3-voucher"
              fill="currentColor"
            ></path>
          </pattern>
        </defs>
        <rect
          x="-10000"
          class="rect-anchor-50-50"
          width="20000"
          height="28"
          style="fill: url(#wavePatternVoucher);"
        >
        </rect>
      </svg>
    </div>
    <div class="inner">
      <div class="grid--default grid-2--tablet-landscape-up">
         <div class="grid-item">
            <div class="voucher-info">
              <h1>{{ $t('MATJO') }} {{ $t('voucher.voucherIntro.headline') }}</h1>
              <p>{{ $t('voucher.voucherIntro.paragraphOne') }}</p>
              <p>{{ $t('voucher.voucherIntro.paragraphTwo') }}</p>
              <p>{{ $t('voucher.voucherIntro.paragraphThree') }}</p>
              <p>{{ $t('voucher.voucherIntro.paragraphFour') }}</p>
            </div>
         </div>
         <div class="grid-item">
            <img :src="voucherImg" alt="">
         </div>
      </div>
    </div>
  </section>
</template>

<script>
import voucherImg from '@/assets/img/voucher.webp'
export default {
   name: 'Voucher',
   data() {
      return {
         voucherImg
      }
   }
};
</script>

<style lang="scss" scoped>
#voucher-page {
  position: relative;
}

.voucher {
   padding: 5rem 0;
}

.voucher-info {
   h1 {
      @include responsive-font-size(2.5rem, 3rem);
      text-align: unset;
      width: 25ch;

      @include for-tablet-portrait-up {
         @include responsive-font-size(3.5rem, 4rem);
      }
   }

   p {
      margin-block: 0 1.5rem;
      max-width: 600px;
   }
}

.border-waves-before {
   color: $color-white;
   height: 15px;
   left: 0;
   position: absolute;
   top: -8px;
   width: 100%;
   z-index: 10;

   svg {
      display: block;
      width: 100%;
   }
}
</style>