<template>
  <div id="menu">
    <stage-separator class="stage__separator"></stage-separator>
    <section class="content-area">
      <div class="inner">
        <div class="menu grid--default grid-2--tablet-portrait-up">
          <div class="grid-item">
            <h2>{{ $t('menu.menuIntro.headline') }}</h2>
            <p>{{ $t('menu.menuIntro.paragraphOne') }}</p>
            <p>{{ $t('menu.menuIntro.paragraphTwo') }}</p>
            <p>{{ $t('menu.menuIntro.paragraphThree') }}</p>
          </div>
          <div class="grid-item">
            <div class="menu-container grid--default grid-3--tablet-portrait-up">
              <div class="grid-item">
                <div class="menu-item">
                  <a href="/fileadmin/a-la-carte.pdf" title="Stand 17.12.2024">
                    <img src="/img/lunch/lunch-large.webp" height alt="Bild für Hauptspeisen und Getränke">
                    <span class="menu-category">{{ $t('menu.menuButtons.mainDishes') }}</span>
                  </a>
                </div>
              </div>
              <div class="grid-item">
                <div class="menu-item">
                  <a href="/fileadmin/bbq_menu.pdf" title="Stand 12.03.2025">
                    <img src="/img/bbq-menu/bbq-menu-large.webp" height alt="Bild für BBQ Gerichte">
                    <span class="menu-category">{{ $t('menu.menuButtons.bbq') }}</span>
                  </a>
                </div>
              </div>
              <div class="grid-item">
                <div class="menu-item">
                  <a href="/fileadmin/hotpot_menu.pdf" title="Stand 12.03.2025">
                    <img src="/img/hotpot-vertical/hotpot-large.webp" height alt="Bild für Hotpot Gerichte">
                    <span class="menu-category">{{ $t('menu.menuButtons.hotpot') }}</span>
                  </a>
                </div>
              </div>
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
    @include for-tablet-portrait-up {
      >.grid-item:first-child {
        width: 40%;
      }
  
      >.grid-item:last-child {
        margin-top: 50px;
        width: 60%;
      }
    }
  }
  
  .menu-container {
    
    .grid-item {
      margin-block: 1.5rem;
    }
  }

  .menu-item {
    border: 2px solid $color-primary;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    
    @include for-tablet-portrait-up {
      max-height: 280px;
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
      border-radius: 4px;
      display: block;
      padding: 1rem;
      transition: padding 0.4s ease-in-out;
      
      @include for-phone-only {
        aspect-ratio: 1;
        object-fit: cover;
      }
    }

    .menu-category {
      background-color: $color-primary;
      border-radius: 8px; 
      bottom: 0;
      color: $color-white;
      left: 50%;
      padding: 5px 10px;
      position: absolute;
      transform: translate(-50%, -50%);
      transition: transform 0.4s ease-in-out;
    }
  }
</style>
