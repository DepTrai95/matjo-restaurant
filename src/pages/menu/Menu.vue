<template>
  <div id="menu">
    <stage-separator class="stage__separator"></stage-separator>
    <section class="content-area">
      <div class="inner">
        <div class="menu grid--default grid-2--tablet-landscape-up">
            <div class="grid-item">
               <h2>{{ $t('menu.menuIntro.headline') }}</h2>
               <p>{{ $t('menu.menuIntro.paragraphOne') }}</p>
               <p>{{ $t('menu.menuIntro.paragraphTwo') }}</p>
               <p>{{ $t('menu.menuIntro.paragraphThree') }}</p>
            </div>
            <div class="grid-item">
               <div class="menu-item">
                  <a href="/fileadmin/matjo-menu.pdf" title="Stand 25.04.2024">
                     <img src="/img/lunch/lunch-large.webp" height alt="Repräsentatives Bild für Speisen">
                     <span class="menu-category">{{ $t('menu.menuButtons.dishes') }}</span>
                  </a>
               </div>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Img from '../../components/img/Img.vue'
import Dialog from '../../components/dialog/Dialog.vue'
import StageSeparator from '../../components/stage/StageSeparator.vue'

export default {
  name: 'Menu',
  components: {
    Img,
    Dialog,
    StageSeparator
  },
  data() {
    return {
      title: 'Menüseite',
    }
  }
}
</script>

<style lang="scss" scoped>
   .menu.grid--default {
      @include for-tablet-landscape-up {
         >.grid-item:first-child {
            width: calc(100% / 1.5); //66.66%
         }
   
         >.grid-item:last-child {
            margin-top: 50px;
            width: calc(100% / 3); //33.33%
         }
      }
   }

   .grid-item {
      display: flex;
      justify-content: center;
      gap: 1rem;

      &:first-child {
         flex-direction: column;
         margin-block-end: 2.5rem;
      }

      h2 {
         margin-block-end: 1rem;
      }

      p {
         margin-block: 0;
      }
   }

   .menu-item {
      border: 2px solid $color-primary;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      overflow: hidden;
      position: relative;
      
      a {
         vertical-align: bottom;

         &:hover {
            img {
               padding: 0;
            }

            .menu-category {
               transform: translate(-50%, -100%);
            }
         }
      }
      
      img {
         border-radius: 4px;
         display: block;
         padding: 1rem;
         transition: padding 0.4s ease-in-out;
         
         @include for-phone-only {
            // aspect-ratio: 1;
            object-fit: cover;
         }
      }

      .menu-category {
         background-color: $color-primary;
         border-radius: 8px; 
         bottom: 0;
         color: $color-white;
         left: 50%;
         // padding: 5px 10px;
         padding: 1rem 1.5rem;
         position: absolute;
         transform: translate(-50%, -50%);
         transition: transform 0.4s ease-in-out;
      }
   }
</style>
