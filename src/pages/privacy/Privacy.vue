<template>
  <section class="privacy">
    <div class="inner">
      <h2>{{ $t('privacy.privacyPolicy.headline') }}</h2>
      <p>{{ $t('privacy.privacyPolicy.intro.paragraphOne') }}</p>

      <h3>{{ $t('privacy.privacyPolicy.responsible.subHeadline') }}</h3>
      <p>{{ $t('privacy.privacyPolicy.responsible.paragraphOne') }}</p>

      <br>
      <p>{{ $t('privacy.privacyPolicy.responsible.companyName') }}</p>
      <p>{{ $t('privacy.privacyPolicy.responsible.address.street') }}</p>
      <p>{{ $t('privacy.privacyPolicy.responsible.address.city') }}</p>
      <p>
        {{ $t('privacy.privacyPolicy.responsible.phone') }}
        <a :href="'tel:' + $t('privacy.privacyPolicy.responsible.phoneLink')" class="link">{{
          $t('privacy.privacyPolicy.responsible.phoneLink') }}</a>
      </p>
      <p>
        {{ $t('privacy.privacyPolicy.responsible.email') }}
        <a href="mailto:info@matjo.de" class="link">info@matjo.de</a>
      </p>

      <h3>{{ $t('privacy.privacyPolicy.dataProcessing.subHeadline') }}</h3>
      <p>{{ $t('privacy.privacyPolicy.dataProcessing.paragraphOne') }}</p>
      <p>{{ $t('privacy.privacyPolicy.dataProcessing.paragraphTwo') }}</p>

      <h3>{{ $t('privacy.privacyPolicy.instagramAPI.subHeadline') }}</h3>
      <p>{{ $t('privacy.privacyPolicy.instagramAPI.paragraphOne') }}</p>
      <p>{{ $t('privacy.privacyPolicy.instagramAPI.paragraphTwo') }}</p>
      <p>
        {{ $t('privacy.privacyPolicy.instagramAPI.paragraphThree') }}
        <a href="https://privacycenter.instagram.com/policy/" class="link" target="_blank"
          rel="noopener noreferrer">{{ $t('privacy.privacyPolicy.instagramAPI.instagramDataPolicy') }}</a>.
      </p>


      <h3>{{ $t('privacy.privacyPolicy.dataRetention.subHeadline') }}</h3>
      <p>{{ $t('privacy.privacyPolicy.dataRetention.paragraphOne') }}</p>

      <h3>{{ $t('privacy.privacyPolicy.rights.subHeadline') }}</h3>
      <p>{{ $t('privacy.privacyPolicy.rights.paragraphOne') }}</p>

      <h3>{{ $t('privacy.privacyPolicy.consent.subHeadline') }}</h3>
      <p>{{ $t('privacy.privacyPolicy.consent.paragraphOne') }}</p>

      <h3>{{ $t('privacy.privacyPolicy.finalNotes.subHeadline') }}</h3>
      <p>{{ $t('privacy.privacyPolicy.finalNotes.paragraphOne') }}</p>
    </div>
  </section>
</template>
  
<script>
export default {
  name: 'Privacy',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.privacy {
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