<template>
    <div class="stage" :class="{ 'stage__half-height': !headerHeightMax }">
       <div class="stage__background">
          <picture v-if="showBackground">
             <source 
                type="image/webp" 
                srcset="
                   ../../assets/img/stage-background-small.webp 400w,
                   ../../assets/img/stage-background-medium.webp 600w,
                   ../../assets/img/stage-background-large.webp 1200w
                " 
                sizes="(max-width: 599px) 400px, (max-width: 899px) 600px, 1200px" />
             <img src="../../assets/img/stage-background-large.webp" width="1200" height="600" alt=""/>
          </picture>
       </div>
       <hgroup class="stage__headline">
          <h1>{{ headline }}</h1>
          <h2 v-if="showSubHeader">Welcome - Xin chào</h2>
       </hgroup>
       <div v-if="showSubHeader" class="stage__arrow-down" @click="scrollToNextSection">
          <div class="arrow"></div>
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
             const nextSection = document.querySelector('.content');
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
    min-height: 100dvh;
    position: relative;
 }
 
 .stage__half-height {
    min-height: 50vh;
    min-height: 50dvh;
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
 
 .stage__headline {
    display: flex;
    flex-direction: column-reverse;
    inset: 0;
    justify-content: center;
    padding-inline: 1.8rem;
    position: absolute;
 
    h1 {
       color: $color-white;
       margin: 0;
       margin-block-start: -3rem;
 
       @include for-tablet-landscape-up {
          @include responsive-font-size(4.5rem, 4.8rem);
       }
    }
 
    h2 {
      @include responsive-font-size(8.5rem, 9rem);
       color: $color-secondary;
       font-family: "HerrVonMuellerhoff", "Brush Script MT Italic", sans-serif;
       font-weight: 400;
       text-align: center;
 
       @include for-tablet-landscape-up {
          @include responsive-font-size(10rem, 10.5rem);
       }
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
    border-bottom: 3px solid white;
    border-right: 3px solid white;
    height: 24px;
    left: 50%;
    margin-left: -12px;
    margin-top: -12px;
    position: absolute;
    top: 50%;
    transform: rotate(45deg);
    width: 24px;
 }
 </style>