<template>
  <div>
    <skip-links></skip-links>
    <stage-separator class="stage__separator stage__separator--tinted"></stage-separator>
    <Content class="content-area--tinted" :content="localizedIntroduction"></Content>
    <stage-separator class="stage__separator "></stage-separator>
    <IconList :heading="localizedValues.title" :iconList="localizedValues.iconList"></IconList>

    <div v-if="1 == 0">
      <stage-separator class="stage__separator--tinted"></stage-separator>
      <section class="content-area content-area--tinted">
        <div class="img-gallery">
          <div class="inner">
            <h2 class="text-center">{{ $t('imageGalleryHeader') }}</h2>
            <div class="grid--default grid-2 grid-4--tablet-landscape-up">
              <div class="grid-item" v-for="img in imgGallery" :key="img.id">
                <Img :img="img"></Img>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <stage-separator class="stage__separator--tinted"></stage-separator>
    <InstagramGallery id="instagram" class="content-area--tinted"></InstagramGallery>

    <div v-if="1 == 0">
      <!-- hide this block -->
      <stage-separator class="stage__separator stage__separator--tinted"></stage-separator>
      <section id="faq" class="content-area content-area--tinted">
        <div class="inner">
          <h2 class="text-center">{{ localizedFaq.title }}</h2>
          <Accordion :items="localizedFaq.faqList"></Accordion>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import SkipLinks from '../../components/skiplinks/SkipLinks.vue';
import Accordion from '../../components/accordion/Accordion.vue';
import Content from '../../components/content/Content.vue';
import IconList from '../../components/icon-text-list/IconList.vue';
import Icon from '../../assets/svg/Icon.vue';
import StageSeparator from '../../components/stage/StageSeparator.vue';
import InstagramGallery from '../../components/instagram-gallery/InstagramGallery.vue';
import Img from '../../components/img/Img.vue';

export default {
   name: 'Home',
   components: {
      SkipLinks,
      Accordion,
      Content,
      IconList,
      Icon,
      Img,
      InstagramGallery,
      StageSeparator,
   },
   data() {
      return {
         title: 'Homepage',
         imgGallery: [
            { id: 'img-bbq', imgSrc: '/img/bbq/bbq.webp' },
            { id: 'img-bbq-steak', imgSrc: '/img/bbq-steak/bbq-steak.webp' },
            { id: 'img-porkbelly', imgSrc: '/img/porkbelly/porkbelly.webp' },
            { id: 'img-streetfood', imgSrc: '/img/streetfood/streetfood.webp' },
         ],
         koreanBbqIntro: {
         id: 'intro',
         title: 'BBQ und Hotpot',
         subTitle: 'Unsere Delikatessen',
         textContent: [
            'In jedem Restaurant steht das Ziel, eine außergewöhnliche kulinarische Erfahrung zu bieten.',
            'Bei MATJO werden die Gerichte für euch nach saisonalen Charakteristiken gestaltet und nur die frischesten und hochwertigsten Zutaten verwendet.',
            'Unsere Atmossphäre ist traditionell, gleichzeitig aber modern. Jedes Gericht ist eine spannende Komposition, die ein zugängliches kulinarisches Abenteuer bietet.',
            'Besuchen Sie uns und lassen sich verzaubern.',
         ],
         reverse: true,
         images: [
            { id: 'img-bbq-table', imgSrc: '/img/bbq-table/bbq-table.webp' },
            { id: 'img-bbq-hotpot', imgSrc: '/img/bbq-hotpot/bbq-hotpot.webp' },
         ]
         },
      }
   },
   computed: {
      localizedIntroduction() {
         const currentLocale = this.$i18n.locale;
         const localizedObject = this.$i18n.getLocaleMessage(currentLocale).home;

         return {
            id: 'about-us',
            title: localizedObject.aboutUs.title,
            subTitle: localizedObject.aboutUs.subTitle,
            description: localizedObject.aboutUs.description,
            callToActionOne: {
               to: '/reservation',
               text: localizedObject.aboutUs.callToActionOne.text
            },
            callToActionTwo: {
               to: '/reservation',
               text: localizedObject.aboutUs.callToActionTwo.text
            },
            images: [
               { id: 'img-korean-pot', imgSrc: '/img/korean-pot/korean-pot.webp' },
               { id: 'img-tischgrill', imgSrc: '/img/tischgrill/tischgrill.webp' }
            ]
         };
      },
      localizedValues() {
         const currentLocale = this.$i18n.locale;
         const localizedObject = this.$i18n.getLocaleMessage(currentLocale).home;

         return {
            title: localizedObject.ourValues.title,
            iconList: localizedObject.ourValues.valueList,
         }
      },
      localizedFaq() {
         const currentLocale = this.$i18n.locale;
         const localizedObject = this.$i18n.getLocaleMessage(currentLocale).home;

         return {
            title: localizedObject.faq.title,
            faqList: localizedObject.faq.faqList,
         }
      },
   },
   methods: {
      loadOpenTableScript() {
         const script = document.createElement("script");
         const language = this.$i18n.locale === 'de' ? 'de-DE' : 'en-US';
         script.src = `https://www.opentable.de/widget/reservation/loader?rid=400416&type=button&theme=wide&color=1&iframe=iframe&domain=de&lang=${language}&newtab=false&ot_source=Restaurant%20website`;
         script.async = true;

         script.onload = () => {
            this.opentableLoaded = true;
            this.initializeOpenTable();
         };

         const container = document.getElementById("opentable-widget-container__header");
         container.appendChild(script);
      }
   },
   mounted() {
      // this.loadOpenTableScript();
   }
}
</script>

<style lang="scss" scoped>
.img-gallery {
  text-align: center; 
}
</style>
