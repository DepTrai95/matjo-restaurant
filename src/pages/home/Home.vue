<template>
  <div>
    <skip-links></skip-links>
    <stage-separator class="stage__separator stage__separator--tinted"></stage-separator>
    <h2 class="sr-only">{{ localizedIntroduction.invisibleTagOne }}</h2>
    <Content class="content-area--tinted" :content="localizedIntroduction"></Content>
    <stage-separator class="stage__separator "></stage-separator>
    <IconList :heading="localizedValues.title" :iconList="localizedValues.iconList"></IconList>

    <stage-separator class="stage__separator--tinted"></stage-separator>
    <InstagramGallery id="instagram" class="content-area--tinted"></InstagramGallery>
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
   computed: {
      localizedIntroduction() {
         const currentLocale = this.$i18n.locale;
         const localizedObject = this.$i18n.getLocaleMessage(currentLocale).home;

         return {
            id: 'about-us',
            title: localizedObject.aboutUs.title,
            subTitle: localizedObject.aboutUs.subTitle,
            description: localizedObject.aboutUs.description,
            invisibleTagOne: localizedObject.aboutUs.invisibleTagOne,
            invisibleTagTwo: localizedObject.aboutUs.invisibleTagTwo,
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
