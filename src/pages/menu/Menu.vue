<template>
  <div id="menu">
    <div class="content-area">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      title: 'Menüseite'
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
  