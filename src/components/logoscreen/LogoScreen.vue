<template>
   <div v-if="showTransitionItem" class="transition" :class="{'transitioned' : isTransitioned}">
      <div class="transition-content">
         <div class="transition-logo-container">
            <img class="logo" src="../../assets/img/logo.webp" alt="" height="230" width="230">
            <p>Best Korean Food in Town</p>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      data() {
         return {
            showTransitionItem: true,
            isTransitioned: false,
         }
      },
      mounted() {
         setTimeout(() => {
            this.isTransitioned = true;
            setTimeout(() => {
               this.showTransitionItem = false;
            }, 300);
         }, 700);
      }
   }
</script>

<style lang="scss" scoped>
.transition {
   background-color: $color-secondary;
   height: 100vh;
   inset: 0;
   overflow: hidden;
   position: fixed;
   transition: height 0.3s ease-in-out;
   width: 100%;
   z-index: 9999;
}

.transitioned {
   height: 0px;
}

.transition-content {
   align-items: center;
   display: flex;
   flex-direction: column;
   height: 100vh;
   justify-content: center;
   inset: 0;
   position: absolute;
   width: 100%;
}

.transition-logo-container {
   align-items: center;
   display: flex;
   flex-direction: column;

   .logo {
      height: 100px;
      width: 100px;

      @include for-tablet-portrait-up {
         height: 160px;
         width: 160px;
      }
   }

   p {
      @include responsive-font-size(2rem, 2.4rem);
      font-weight: 500;

      @include for-tablet-portrait-up {
         @include responsive-font-size(3rem, 3.4rem);
      }
   }
}
</style>