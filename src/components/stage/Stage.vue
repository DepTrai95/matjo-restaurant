<template>
   <div class="stage" :class="{ 'stage__half-height': !headerHeightMax, 'stage__full-height': headerHeightMax }">
      <div class="stage__background">
         <div class="blur"></div>
         <picture v-if="showBackground">
            <source type="image/webp" srcset="
                  ../../assets/img/stage-img/stage-background-small.webp 400w,
                  ../../assets/img/stage-img/stage-background-medium.webp 600w,
                  ../../assets/img/stage-img/stage-background-large.webp 1200w
               " sizes="(max-width: 599px) 400px, (max-width: 899px) 600px, 1200px" />
            <img src="../../assets/img/stage-img/stage-background-large.webp" width="1920" height="1200" alt="" />
         </picture>
      </div>
      <hgroup class="stage__headline">
         <div class="stage__cta__wrapper" v-if="!isMobile && showSubHeader">
            <router-link class="btn--primary" to="/menu">{{ $t('home.home.menuButton') }}</router-link>
            <router-link class="btn--primary" to="/reservation">{{ $t('home.home.reserveButton') }}</router-link>
         </div>
         <h1>{{ headline }}</h1>
         <h2 v-if="showSubHeader">MATJO</h2>
      </hgroup>
      <div v-if="showSubHeader" class="stage__arrow-down" @click="scrollToNextSection">
         <div class="arrow"></div>
         <div class="arrow arrow__second"></div>
      </div>
   </div>
</template>
 
<script>
export default {
   props: {
      headerHeightMax: {
         type: Boolean,
         default: false,
      },
      headline: {
         type: String,
         required: true,
      },
      showSubHeader: {
         type: Boolean,
         default: false,
      },
      showBackground: {
         type: Boolean,
         default: false,
      },
   },
   watch: {
      '$route': {
         immediate: true,
         handler(to) {
            this.animateStageHeadline();
         }
      }
   },
   methods: {
      scrollToNextSection() {
         const nextSection = document.querySelector('.content-area');
         const headerHeight = document.querySelector('header').offsetHeight;

         if (nextSection) {
            window.scrollTo({
               top: nextSection.offsetTop - headerHeight,
               behavior: 'smooth'
            });
         }
      },
      animateStageHeadline() {
         const header = document.querySelector('h1');

         setTimeout(() => {
            header?.classList.add('visible');
         }, 250);

         setTimeout(() => {
            const headerDescr = document.querySelector('h2');
            const arrow = document.querySelector('.stage__arrow-down');

            headerDescr?.classList.add('visible');
            arrow?.classList.add('visible');
         }, 400);
      }
   },
}
</script>
 
<style lang="scss" scoped>
.stage {
   min-height: 100vh;
   // min-height: 100dvh;
   position: relative;

   &.stage__full-height {
      .stage__headline {
         @include for-tablet-landscape-up {
            width: 50%;
         }
      }
   }
 }
 
.stage__half-height {
   min-height: 50vh;
   // min-height: 50dvh;
}
 
.stage__background {
   background-color: #333;
   inset: 0;
   position: absolute;

   img {
      height: 100%;
      object-fit: cover;
      width: 100%;
   }
}

.blur {
   inset: 0;
   position: absolute;
   // background: linear-gradient(to right, rgba(243, 231, 233, 0.5), rgba(243, 231, 233, 0));
   background: linear-gradient(to right, rgb(163 163 163 / 50%), rgb(35 35 35 / 40%));
   background: linear-gradient(to right, rgb(151 150 150 / 50%), rgb(51 50 50 / 40%));
}
 
.stage__headline {
   display: flex;
   flex-direction: column-reverse;
   inset: 0;
   justify-content: center;
   padding-inline: 1.8rem;
   position: absolute;

   h1 {
      color: $color-white;
      font-family: "JosefinSans", "Calibri", sans-serif;
      margin: 0;
      margin-block-start: -1.5rem;

      @include for-tablet-landscape-up {
         @include responsive-font-size(3.6rem, 4rem);
      }
   }

   h2 {
   @include responsive-font-size(8rem, 9rem);
      color: $color-primary;
      font-family: "Baron", "Calibri", sans-serif;
      font-weight: 400;
      letter-spacing: 30px;
      margin: 0;
      text-align: center;

      @include for-tablet-landscape-up {
         @include responsive-font-size(10rem, 10.5rem);
      }
   }
}

.stage__cta__wrapper {
   display: flex;
   flex-direction: row;
   justify-content: center;
   margin-block-start: 1.5rem;
   
   .btn--primary {
      @include responsive-font-size(1.6rem, 1.7rem);
      box-shadow: 0px 5px 15px 8px rgba(150, 150, 150, 0.3);
      min-width: 150px;
      text-align: center;
   }

   .btn--primary + .btn--primary{
      margin-inline: 1rem;
   }
}
 
 // animation h1 and h2
 h1 {
    opacity: 0;
    transform: scale(1.2) translateY(15px);
    transition: opacity 0.2s ease-in, transform 0.25s ease-in;
 
    &.visible {
       opacity: 1;
       transform: scale(1) translateY(0);;
    }
 }
 
 h2 {
    opacity: 0;
    transform: translateY(25px);
    transition: opacity 0.15s ease-in, transform 0.2s ease-in;
 
    &.visible {
       opacity: 1;
       transform: translateY(0);
       ;
    }
 }
 
 .stage__arrow-down {
    bottom: 0;
    cursor: pointer;
    display: block;
    height: 80px;
    left: 50%;
    opacity: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    transition: opacity 0.25s ease-in;
    width: 80px;
    z-index: 100;
 
    &.visible {
       opacity: 0.7;
       
    }
 }
 
 .stage__arrow-down .arrow {
   // animation: jumpyOne 3s infinite;
   border-bottom: 3px solid white;
   border-right: 3px solid white;
   height: 20px;
   left: 50%;
   margin-left: -12px;
   margin-top: -12px;
   position: absolute;
   top: 50%;
   transform: rotate(45deg);
   width: 20px;
 }

 .stage__arrow-down .arrow__second {
   // animation: jumpyTwo 3s infinite;
   top: 60%;
 }

@keyframes jumpyOne {
   0% {
      transform: rotate(45deg) translate(0px);
   }

   50% {
      transform: rotate(45deg) translate(-5px, -5px);
   }

   100% {
      transform: rotate(45deg) translate(0px);
   }
}

@keyframes jumpyTwo {
   0% {
      transform: rotate(45deg) translate(0px);
   }

   50% {
      transform: rotate(45deg) translate(-7px, -7px);
   }

   100% {
      transform: rotate(45deg) translate(0px);
   }
}
</style>