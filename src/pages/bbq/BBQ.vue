<template>
  <div id="bbq">
    <h2 class="sr-only">{{ $t('bbq.headline') }}</h2>
    <stage-separator class="stage__separator"></stage-separator>
    <section class="content-area">
      <div class="inner">
        <div class="menu grid--default grid-2--tablet-portrait-up">
          <div class="grid-item">
            <h3>{{ $t('bbq.history.subHeadline') }}</h3>
            <p>{{ $t('bbq.history.paragraphOne') }}</p>
            <p>{{ $t('bbq.history.paragraphTwo') }}</p>

            <h3>{{ $t('bbq.howTo.subHeadline') }}</h3>
            <p>{{ $t('bbq.howTo.paragraphOne') }}</p>
            <p>{{ $t('bbq.howTo.paragraphTwo') }}</p>
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
      isDialogOpen: false,
      bbqImg: { id: 'img-bbq', imgSrc: '/img/bbq-table/bbq-table.webp' },
    }
  },
  methods: {
    openMenuModal() {
      this.isDialogOpen = true;
    }
  }
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
</style>
