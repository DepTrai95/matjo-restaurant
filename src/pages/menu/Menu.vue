<template>
  <div id="menu">
    <stage-separator class="stage__separator"></stage-separator>
    <section class="content-area">
      <div class="inner">
        <div class="menu grid--default grid-2--tablet-portrait-up">
          <div class="grid-item">
            <h2>Matjo's Menü</h2>
            <p>Um einen Einblick unserer Gerichte zu verschaffen, findest du hier unsere angebotene Speise- und
              Getränkekarte im Restaurant.</p>
            <p>Wir bereiten alle Speisen frisch zu! Vor euren Augen werden unsere Speisen zu Delikatessen.</p>
            <p>Werft einen Blick auf unser Menü oder lasst euch vor Ort einfach von uns überraschen oder beraten!</p>
            <p>Falls ihr nicht alles schaffen solltet, kann beim BBQ der Rest (aus Hygiene- und Gesundheitsgründen) auch
              gegrillt eingepackt werden!</p>
          </div>
          <div class="grid-item">
            <div class="menu-container grid--default grid-3--tablet-portrait-up">
              <div class="grid-item">
                <div class="menu-item">
                  <a href="#">
                    <img src="/img/bbq/bbq-large.webp" height alt="Bild für Hauptspeisen">
                    <span class="menu-category">Speisen</span>
                  </a>
                </div>
              </div>
              <div class="grid-item">
                <div class="menu-item">
                  <a href="#">
                    <img src="/img/drinks/drinks-large.webp" height alt="Bild für Getränke">
                    <span class="menu-category">Getränke</span>
                  </a>
                </div>
              </div>
              <div class="grid-item">
                <div class="menu-item">
                  <a href="#">
                    <img src="/img/lunch/lunch-large.webp" alt="Bild für Mittagsgerichte">
                    <span class="menu-category">Mittagskarte</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <stage-separator class="stage__separator--tinted"></stage-separator>
    <section class="content-area content-area--tinted">
      <div class="img-gallery">
        <div class="inner">
          <h2 class="text-center">Unsere Meisterwerke</h2>
          <div class="grid--default grid-2--tablet-portrait-up grid-4--tablet-landscape-up">
            <div class="grid-item" v-for="img in imgGallery" :key="img.id">
              <Img :img="img"></Img>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Img from '../../components/img/Img.vue'
import StageSeparator from '../../components/stage/StageSeparator.vue'

export default {
  name: 'Menu',
  components: {
    Img,
    StageSeparator
  },
  data() {
    return {
      title: 'Menüseite',
      imgGallery: [
        { id: 'img-bbq', imgSrc: '/img/bbq/bbq.webp' },
        { id: 'img-bbq-steak', imgSrc: '/img/bbq-steak/bbq-steak.webp' },
        { id: 'img-porkbelly', imgSrc: '/img/porkbelly/porkbelly.webp' },
        { id: 'img-streetfood', imgSrc: '/img/streetfood/streetfood.webp' },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu.grid--default {
    >.grid-item:first-child {
      width: 40%;
    }

    >.grid-item:last-child {
      margin-top: 50px;
      width: 60%;
    }
  } 

  .menu-item {
    border: 2px solid $color-primary;
    border-radius: 5px;
    max-height: 280px;
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
  