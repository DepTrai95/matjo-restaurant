<template>
  <div id="career">
    <stage-separator class="stage__separator--tinted"></stage-separator>
    <div class="content-area content-area--tinted">
      <div class="inner">
        <div class="career">
          <h2>{{ $t('career.joinTeam.heading') }}</h2>
          <p>{{ $t('career.joinTeam.paragraph1') }}</p>
          <p>{{ $t('career.joinTeam.paragraph2') }}</p>
          <p>{{ $t('career.joinTeam.coverletter') }} <a href="info@matjo.de">info@matjo.de</a></p>

          <div class="career__jobs">
            <div class="grid--default grid-2--tablet-portrait-up">
              <div class="grid-item career__jobs__item" v-for="job in localizedJobs.jobs" :key="job.id">
                <CareerCard :career="job" :mailSubject="job.subject"></CareerCard>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CareerCard from '../../components/card/CareerCard.vue';
import StageSeparator from '../../components/stage/StageSeparator.vue';

export default {
  name: 'Karriere',
  components: {
    CareerCard,
    StageSeparator
  },
  data() {
    return {
      title: 'Karriereseite',
    }
  },
  methods: {
    observeElement(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    },
    getThreshold() {
      const width = window.innerWidth;
      if (width < 768) {
        return 0.5; // Mobile devices
      } else {
        return 0.7; // Tablets + Desktop
      }
    },
    createObserver() {
      if (this.observer) {
        this.observer.disconnect();
      }

      this.observer = new IntersectionObserver(this.observeElement, {
        threshold: [this.getThreshold()],
      });

      this.observeElements();
    },
    observeElements() {
      const headline = this.$el.querySelector('h2');
      if (headline) {
        this.observer.observe(headline);
      }

      const contentBlocks = this.$el.querySelectorAll('.career__jobs .career__jobs__item');
      if (contentBlocks) {
        contentBlocks.forEach(block => {
          this.observer.observe(block);
        });
      }
    },
    handleResize() {
      this.createObserver();
    }
  },
  mounted() {
    this.createObserver();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    localizedJobs() {
      const currentLocale = this.$i18n.locale;
      const localizedObject = this.$i18n.getLocaleMessage(currentLocale).career;

      return {
        jobs: localizedObject.jobs,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: $color-primary;
}

.career__jobs {
  margin-block-start: 3rem;

  .career__jobs__item {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.3s ease-in, transform 0.3s ease-in;

    @include for-phone-only {
      margin-block-end: 2rem;
    }  

    &.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

</style>
  