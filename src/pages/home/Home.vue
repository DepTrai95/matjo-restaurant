<template>
  <div>
    <stage-separator class="stage__separator"></stage-separator>
    <Content :content="introduction"></Content>

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

    <stage-separator class="stage__separator"></stage-separator>
    <Content :content="koreanBbqIntro"></Content>

    <section class="content-area content-area--tinted">
      <div class="inner">
        <h2 class="text-center">Häufige Fragen</h2>
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
      introduction: {
        id: 'about-us',
        title: 'Über uns',
        subTitle: 'Unser Versprechen',
        textContent: [
          'Matjo ist ein koreanisches Restaurant am Eingang von Dresdens schöner Neustadt.',
          'Entdecken Sie bei uns eine Fusion von Aromen in unserem BBQ- und Hotpot-Lokalm in welchem Tradition auf Geschmack trifft.',
          'Seit unserer Eröffnung im August 2024 sind wir bestrebt exzellenten Service und eine kulinarische Reise durch die koreanische Küche zu bieten.',
          'Schauen Sie sich unsere Karte an und buchen Sie jetzt Ihren Tisch und lassen Sie sich von magischem Geschmack verzaubern.',
        ],
        callToAction: { to: '/menu', text: 'Speisekarte/Menu' },
        images: [
          { id: 'img-korean-pot', imgSrc: '/img/korean-pot/korean-pot.webp' },
          { id: 'img-tischgrill', imgSrc: '/img/tischgrill/tischgrill.webp' },
        ]
      },

      koreanBbqIntro: {
        id: 'intro',
        title: 'BBQ und Hotpot',
        subTitle: 'Unsere Delikatessen',
        textContent: [
          'In jedem koreanischen Restaurant steht das Ziel, eine außergewöhnliche kulinarische Erfahrung zu bieten.',
          'Bei Matjo werden die Gerichte für euch nach saisonalen Charakteristiken gestaltet und nur die frischesten und hochwertigsten Zutaten verwendet.',
          'Unsere Atmossphäre ist traditionell, gleichzeitig aber modern. Jedes Gericht ist eine spannende Komposition, die ein zugängliches kulinarisches Abenteuer bietet.',
          'Besuchen Sie uns und lassen sich verzaubern.',
        ],
        reverse: true,
        callToAction: { to: '/contact', text: 'Jetzt Reservieren' },
        images: [
          { id: 'img-korean-pot', imgSrc: '/img/korean-pot/korean-pot.webp' },
          { id: 'img-tischgrill', imgSrc: '/img/tischgrill/tischgrill.webp' },
        ]
      },

      faqItems: [
        { title: 'Was ist Korean BBQ?', content: 'Korean BBQ ist eine mittlerweile fast weltweit populäre Art des Grillens von direkt am Tisch. Es ist eine tolle Dining Experience, in welcher die Speisen selber frisch gegrillt werden.' },
        { title: 'Was für Fleisch ist typisch für koreanische BBQs?', content: 'Typischerweise werden Fleischsorten wie Bulgogi (mariniertes Rind), Galbi (marinierte Rippchen), Samgyeopsal (Schweinebauch) und Dak-Galbi (scharf mariniertes Hühnchen).' },
        { title: 'Wie wird Korean BBQ serviert?', content: 'Zu den zahlreichen Fleisch-/Gemüsespeisen und Gerichten werden viele Beilagen serviert, auch bekannt als "Banchan", diese schließen ein: Kimchi, eingelegtes Gemüse und Reis. Die gegrillten Speisen werden in Salatblättern gewickelt und mit Saucen und Gewürzen gedipped.' },
        { title: 'Welche Zutaten sind im Hotpot?', content: 'Unser Hotpot enthält eine Vielzahl frischer Zutaten wie Gemüse, Fleisch und Nudeln, die Sie nach Belieben kombinieren können.' },
        { title: 'Gibt es vegetarische Optionen?', content: 'Ja, wir bieten Auswahl an vegetarischen Zutaten für den Hotpot, so wie spezielle vegetarische BBQ-Gerichte an.' },
        { title: 'Können Allergien berücksichtig werden?', content: 'Selbstverständlich! Bitte informieren Sie unser Personal über Ihre Allergien, damit wir Ihnen eine sichere und köstliche Mahlzeit zubereiten können.' },
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
