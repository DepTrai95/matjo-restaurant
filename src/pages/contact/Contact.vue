<template>
  <section class="contact" id="contact-page">
    <div class="border-waves-before">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 38 28" width="19px" height="14px">
        <defs>
          <pattern id="wavePattern" width="38" height="28" patternUnits="userSpaceOnUse" fill="none">
            <path
              d="M-8.8817842e-16,-0.000266139407 L-8.8817842e-16,28 C9,28 13,16 19,16 C25,16 29,28 38,28 L38,-0.000266139407 C29,8.67361738e-19 25,12 19,12 C13,12 9,0 -8.8817842e-16,-0.000266139407 Z"
              id="Path-3" fill="currentColor"></path>
          </pattern>
        </defs>
        <rect x="-10000" class="rect-anchor-50-50" width="20000" height="28" style="fill: url(#wavePattern);">
        </rect>
      </svg>
    </div>
    <div class="inner">
      <section class="contact-us" id="contact-us">
        <div class="grid--default grid-2--tablet-landscape-up">
          <div class="grid-item">
            <div class="reservation-info">
              <p>MATJO - BBQ & Hotpot</p>
              <p class="center">{{ $t('contact.reservationInfo.intro') }}</p>
              <p>
                {{ $t('contact.reservationInfo.alternative') }}:
                <span>{{ lunchTime }}</span>
                <span>{{ dinnerTime }}</span>
                {{ $t('contact.reservationInfo.contactPhone') }} <a :href="`tel:` + phoneNumber">{{ phoneNumber }}</a>
              </p>
              <p>{{ $t('contact.reservationInfo.otherInquiry') }} <a :href="`mailto:` + mailTo">{{ mailTo }}</a></p>
            </div>
          </div>
          <div class=" grid-item">
            <contact-form></contact-form>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import ContactForm from "../../components/form/ContactForm.vue";

export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      phoneNumber: "0351 81040272",
      lunchTime: "12:00 - 14:30",
      dinnerTime: "17:00 - 23:00",
      mailTo: "info@matjo.de"
    };
  },
};
</script>

<style lang="scss" scoped>
#contact-page {
  position: relative;
}

.contact-us {
  padding: 5rem 0;
}

.reservation-info {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @include for-phone-only {
    align-items: center;

    .center {
      text-align: center;
    }
  }

  span {
    display: block;
    margin-block: .5rem;
  }
}

a {
  color: $color-primary;
}

p {
  margin-block: 0 2rem;
}

.border-waves-before {
  color: $color-white;
  height: 15px;
  left: 0;
  position: absolute;
  top: -8px;
  width: 100%;
  z-index: 10;

  svg {
    display: block;
    width: 100%;
  }
}
</style>