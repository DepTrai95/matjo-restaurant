<template>
  <section class="reservation" id="reservation-page">
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
      <div class="reservation-info">
        <p class="center">{{ $t('reservation.reservationInfo.introHeader') }}</p>
        <p class="center">{{ $t('reservation.reservationInfo.intro') }}</p>
        <p class="center">{{ $t('reservation.reservationInfo.introSecondLine') }}</p>
        <p>
          {{ $t('reservation.reservationInfo.contactPhone') }}
          <span>{{ lunchTime }}</span>
          <span>{{ dinnerTime }}</span>
          {{ $t('reservation.reservationInfo.contactPhoneNumber') }} <a :href="`tel:` + phoneNumber">{{ phoneNumber
            }}</a> {{ $t('reservation.reservationInfo.available') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import ReservationForm from "../../components/form/ReservationForm.vue";

export default {
  components: {
    ReservationForm,
  },
  data() {
    return {
      phoneNumber: "0351 81040272",
      lunchTime: "12:00 - 15:00",
      dinnerTime: "17:00 - 23:00",
      mailTo: "info@matjo.de"
    };
  },
};
</script>

<style lang="scss" scoped>
#reservation-page {
  position: relative;
}

.reservation {
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