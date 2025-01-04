<template>
  <section>
    <div class="inner">
      <div class="text-center">
        <p>{{ $t('successMessage.firstLine') }} {{ $t('successMessage.secondLine') }}</p>
        <p>{{ $t('successMessage.thirdLine') }}</p>
        <router-link to="/" class="btn--primary">← {{ $t('goBack') }}</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  watch: {
    '$i18n.locale'(newLocale) {
      localStorage.setItem('matjoLang', newLocale);
    }
  },
  created() {
    const savedLocale = localStorage.getItem('matjoLang');
    if (savedLocale) {
      this.$i18n.locale = savedLocale;
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  margin-block: 7rem;
}

p {
  @include responsive-font-size(1.8rem, 2rem);
  margin-block: 1rem;
}
</style>
