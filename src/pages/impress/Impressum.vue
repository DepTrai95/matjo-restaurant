<template>
  <section class="impress">
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
        <a :href="'mailto:' + $t('imprint.imprint.contact.emailLink')" class="link">{{ $t('imprint.imprint.contact.emailLink') }}</a>
      </p>

      <h3>{{ $t('imprint.imprint.registerEntry.headline') }}</h3>
      <p>{{ $t('imprint.imprint.registerEntry.court') }}</p>
      <p>{{ $t('imprint.imprint.registerEntry.info') }}</p>
      <!-- <p>{{ $t('imprint.imprint.registerEntry.registerNumber') }}</p>
      <p>{{ $t('imprint.imprint.registerEntry.taxId') }}</p> -->

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
  name: 'Impress',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.impress {
  padding-block: 5rem;
}

h2,
h3 {
  margin-block: 4rem 3rem;
  // text-transform: uppercase;
}

h2,
.h2 {
  @include responsive-font-size(3.5rem, 4rem);
}

h3 {
  @include responsive-font-size(2.6rem, 2.8rem);
  margin-block: 1em;
}

p {
  line-height: 1.6;
  margin-block: 1rem;
}

.link {
  margin-block: 0;
}
</style>