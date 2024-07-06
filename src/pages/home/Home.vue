<template>
  <div>
    <stage-separator class="stage__separator--tinted"></stage-separator>
    <section class="content-area content-area--tinted">
      <div class="img-gallery">
        <div class="inner">
          <h2>Unsere Meisterwerke</h2>
          <div class="grid--default grid-2--tablet-portrait-up grid-4--tablet-landscape-up">
            <div class="grid-item" v-for="img in imgGallery" :key="img.id">
              <Img :img="img"></Img>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Content :content="aboutUsText"></Content>

    <stage-separator class="stage__separator--tinted"></stage-separator>
    <section class="content-area content-area--tinted">
      <div class="inner">
        <h2>Häufige Fragen</h2>
        <Accordion :items="faqItems"></Accordion>
      </div>
    </section>
  </div>
</template>

<script>
import Accordion from '../../components/accordion/Accordion.vue';
import Content from '../../components/content/Content.vue';
import Img from '../../components/img/Img.vue';
import StageSeparator from '../../components/stage/StageSeparator.vue';

export default {
  name: 'Home',
  components: {
    Accordion,
    Content,
    Img,
    StageSeparator,
  },
  data() {
    return {
      title: 'Homepage',
      aboutUsText: {
        id: 'about-us',
        heading: 'Über uns',
        headingDescription: 'Discover',
        content: [
          { id: '1', text: 'Matjo ist ein koreanisches Restaurant am Eingang von Dresdens schöner Neustadt.'},
          { id: '2', text: 'Entdecken Sie bei uns eine Fusion von Aromen in unserem BBQ- und Hotpot-Lokalm in welchem Tradition auf Geschmack trifft.' },
        ]
      },
      faqItems: [
        { title: 'Welche Zutaten sind im Hotpot?', content: 'Unser Hotpot enthält eine Vielzahl frischer Zutaten wie Gemüse, Fleisch und Nudeln, die Sie nach Belieben kombinieren können.' },
        { title: 'Gibt es vegetarische Optionen?', content: 'Ja, wir bieten Auswahl an vegetarischen Zutaten für den Hotpot, so wie spezielle vegetarische BBQ-Gerichte an.' },
        { title: 'Sind Reservierungen erforderlich?', content: 'Wir empfehlen Reservierungen, besonders an Wochenenden, um sicherzustellen, dass Sie einen Tisch bekommen. Aber spontane Besuche sind auch willkommen!' },
      ],
      imgGallery: [
        { id: 'img-bbq', imgSrc: '/img/bbq/bbq.webp'},
        { id: 'img-bbq-steak', imgSrc: '/img/bbq-steak/bbq-steak.webp' },
        { id: 'img-porkbelly', imgSrc: '/img/porkbelly/porkbelly.webp' },
        { id: 'img-streetfood', imgSrc: '/img/streetfood/streetfood.webp' },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.img-gallery {
  text-align: center; 
}
</style>
