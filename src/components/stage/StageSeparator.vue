<template>
   <div class="stage__separator"></div>
</template>

<script>
   export default {
      
   }
</script>

<style lang="scss" scoped>
.stage__separator {
   background-image: url(../../assets/svg/stage-crack.svg);
   height: 20px;
   margin-block-start: -15px;
   position: relative;

   @include for-tablet-portrait-up {
      height: 25px;
   }

   @include for-tablet-landscape-up {
      height: 30px;
   }

   &--tinted {
      background-image: url(../../assets/svg/stage-crack-tinted.svg);
   }

   &--black {
      background-image: url(../../assets/svg/stage-crack-dark.svg);
   }
}
</style>