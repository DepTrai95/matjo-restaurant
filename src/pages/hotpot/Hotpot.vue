<template>
   <div id="hotpot">
      <h2 class="sr-only">{{ $t('hotpot.headline') }}</h2>
      <stage-separator class="stage__separator"></stage-separator>
      <section class="content-area">
         <div class="inner">
         <div class="menu grid--default grid-2--tablet-portrait-up">
            <div class="grid-item">
               <h3>{{ $t('hotpot.history.subHeadline') }}</h3>
               <p>{{ $t('hotpot.history.paragraphOne') }}</p>
               <p>{{ $t('hotpot.history.paragraphTwo') }}</p>
               <p>{{ $t('hotpot.history.paragraphThree') }}</p>

               <h3>{{ $t('hotpot.howTo.subHeadline') }}</h3>
               <p>{{ $t('hotpot.howTo.paragraphOne') }}</p>
               <p>{{ $t('hotpot.howTo.paragraphTwo') }}</p>
               <p>{{ $t('hotpot.howTo.paragraphThree') }}</p>
            </div>
            <div class="grid-item">
               <Img :img="bbqImg" :id="bbqImg.id"></Img>
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
         bbqImg: { id: 'img-hotpot', imgSrc: '/img/hotpot/hotpot.webp' },
      }
   },
}
</script>

<style lang="scss" scoped>
h3 {
  @include responsive-font-size(2rem, 2.4rem);
  margin-block: 0;
}

p + h3 {
  margin-top: 3rem;
}

p {
  @include responsive-font-size(1.5rem, 1.6rem);
  margin-block: 1rem;
}
</style>
