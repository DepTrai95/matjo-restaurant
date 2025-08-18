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
                  <p>{{ $t('menu.menuIntro.paragraphFour') }}</p>
                  <a href="https://www.lieferando.de/speisekarte/matjo-bbq-hotpot" class="btn btn--primary">{{
                     $t('menu.menuDelivery') }}</a>
               </div>
               <div class="grid-item">
                  <div class="menu-item">
                     <a href="/fileadmin/matjo-mittagsangebot.pdf" title="Stand 18.06.2025">
                        <img src="/img/lunch/lunch-large.webp" height alt="Repräsentatives Bild für Speisen">
                        <span class="menu-category">{{ $t('menu.menuButtons.lunch') }}</span>
                     </a>
                  </div>
                  <div class="menu-item">
                     <a href="/fileadmin/matjo-menu.pdf" title="Stand 18.06.2025">
                        <img src="/img/streetfood/streetfood-large.webp" height alt="Repräsentatives Bild für Speisen">
                        <span class="menu-category">{{ $t('menu.menuButtons.mainDishes') }}</span>
                     </a>
                  </div>
                  <div class="menu-item">
                     <a href="/fileadmin/matjo-bbq-and-hotpot.pdf" title="Stand 18.06.2025">
                        <img src="/img/bbq-menu/bbq-menu-large.webp" height alt="Repräsentatives Bild für Speisen">
                        <span class="menu-category">
                           {{ $t('menu.menuButtons.bbq') }} {{ $t('and') }} {{ $t('menu.menuButtons.hotpot') }}
                        </span>
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
         align-items: center;

         >.grid-item:last-child {
            width: calc(100% / 1.5); //66.66%
         }
      }

      @include for-desktop-up {
         >.grid-item:first-child {
            margin-top: 50px;
            width: calc(100% / 3); //33.33%
         }

         >.grid-item:last-child {
            width: calc(100% / 1.5); //66.66%
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

      &:last-child {
         flex-wrap: wrap;
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

      @include for-phone-only {
         width: fit-content;
      }
      
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
         aspect-ratio: 0.75;
         border-radius: 4px;
         display: block;
         max-height: 300px;
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
         min-width: 155px;
         // padding: 5px 10px;
         padding: 1rem 1.5rem;
         position: absolute;
         text-align: center;
         transform: translate(-50%, -50%);
         transition: transform 0.4s ease-in-out;
      }
   }

   .btn--primary {
      align-self: flex-start;
   }
</style>