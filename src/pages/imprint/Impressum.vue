<template>
  <section class="Imprint">
    <div class="inner">
      <h2>{{ $t('imprint.imprint.headline') }}</h2>
      <p>{{ $t('imprint.imprint.companyName') }}</p>
      <p>{{ $t('imprint.imprint.address.street') }}</p>
      <p>{{ $t('imprint.imprint.address.city') }}</p>

      <h3>{{ $t('imprint.imprint.representedBy.headline') }}</h3>
      <p>{{ $t('imprint.imprint.representedBy.name') }}</p>

      <h3>{{ $t('imprint.imprint.contact.headline') }}</h3>
      <p>
        {{ $t('imprint.imprint.contact.phone') }}
        <a :href="'tel:' + $t('imprint.imprint.contact.phoneLink')" class="link">{{ $t('imprint.imprint.contact.phoneLink') }}</a>
      </p>
      <p>
        {{ $t('imprint.imprint.contact.email') }}
        <a href="mailto:info@matjo.de" class="link">info@matjo.de</a>
      </p>

      <!-- <h3>{{ $t('imprint.imprint.registerEntry.headline') }}</h3>
      <p>{{ $t('imprint.imprint.registerEntry.court') }}</p>
      <p>{{ $t('imprint.imprint.registerEntry.registerNumber') }}</p> -->
      <p>{{ $t('imprint.imprint.registerEntry.taxId') }}</p>

      <h3>{{ $t('imprint.imprint.supervisoryAuthority.headline') }}</h3>
      <p>{{ $t('imprint.imprint.supervisoryAuthority.name') }}</p>
      <p>{{ $t('imprint.imprint.supervisoryAuthority.note') }}</p>

      <h3>{{ $t('imprint.imprint.liabilityForContent.headline') }}</h3>
      <p>{{ $t('imprint.imprint.liabilityForContent.paragraphOne') }}</p>
      <p>{{ $t('imprint.imprint.liabilityForContent.paragraphTwo') }}</p>

      <h3>{{ $t('imprint.imprint.liabilityForLinks.headline') }}</h3>
      <p>{{ $t('imprint.imprint.liabilityForLinks.paragraphOne') }}</p>
      <p>{{ $t('imprint.imprint.liabilityForLinks.paragraphTwo') }}</p>

      <h3>{{ $t('imprint.imprint.copyright.headline') }}</h3>
      <p>{{ $t('imprint.imprint.copyright.paragraphOne') }}</p>
      <p>{{ $t('imprint.imprint.copyright.paragraphTwo') }}</p>
    </div>
  </section>
</template>
  
<script>
export default {
  name: 'Imprint',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.Imprint {
  padding-block: 5rem;
}

h2,
h3 {
  margin-block: 1.5rem;
}

h2,
.h2 {
  @include responsive-font-size(2.2rem, 2.4rem);
}

p {
  line-height: 1.6;
  margin-block: 0;
}

.link {
  margin-block: 0;
}
</style>