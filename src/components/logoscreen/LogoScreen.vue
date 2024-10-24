<template>
   <div v-if="showTransitionItem" class="transition" :class="{'transitioned' : isTransitioned}">
      <div class="transition-content">
         <div class="transition-logo-container">
            <img class="logo" src="../../assets/img/logo-transparent-big.webp" alt="" height="300" width="300">
            <p>Best BBQ & HOTPOT in Town</p>
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
      height: 150px;
      width: 150px;

      @include for-tablet-portrait-up {
         height: 180px;
         width: 180px;
      }

      @include for-tablet-portrait-up {
         height: 240px;
         width: 240px;
      }

      @include for-desktop-up {
         height: 300px;
         width: 300px;
      }
   }

   p {
      @include responsive-font-size(2rem, 2.4rem);
      font-weight: 500;
   }
}
</style>