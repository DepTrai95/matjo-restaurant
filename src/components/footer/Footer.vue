<template>
   <footer class="footer">
      <stage-separator class="stage__separator--black"></stage-separator>
      <div class="restaurant__information">
         <div class="footer__addresses">
            <h3>{{ localizedFooter.footer.address }}</h3>
            <a href="https://maps.app.goo.gl/3DXUeW2gvcD2YbBx8/" target="_blank" noopener noreferrer>
               <span>MATJO - BBQ & HOTPOT</span>
               <span class="street">Alaunstraße 9</span>
               <span class="postcode">01099 Dresden</span>
            </a>

            <div class="footer__contact">
               <h3>{{ localizedFooter.footer.contact }}</h3>
               <a href="tel:+4935181040272">
                  <Icon :icon='"phone"'></Icon>
                  0351 81040272
               </a>
               <a href="mailto:info@matjo.de">
                  <Icon :icon='"mail"'></Icon>
                  info@matjo.de
               </a>
            </div>

         </div>
         <div class="footer__opening-hours">
            <h3>{{ localizedFooter.footer.openingHours }}:</h3>
            <p>
               {{ localizedFooter.footer.monday }} - {{ localizedFooter.footer.friday }}:<br>
               11:30 - 15:00 {{ localizedFooter.footer.hours }}<br>
               17:00 - 23:00 {{ localizedFooter.footer.hours }}
            </p>
            <p>{{ localizedFooter.footer.saturday }}, {{ localizedFooter.footer.sunday }} {{ $t('and') }}
               {{ localizedFooter.footer.holiday }}:<br>
               11:00 - 23:00 {{ localizedFooter.footer.hours }}
            </p>
         </div>
         <div v-if="isMobile" class="footer__social-media">
            <h3>Social Media:</h3>
            <ul class="list--unstyled social-media-list">
               <li class="social-media-list__item">
                  <a aria-label="Besuche uns auf Facebook" href="" target="_blank" rel="noopener noreferrer">
                     <Icon :icon="'facebook'"></Icon>
                  </a>
               </li>
               <li class="social-media-list__item">
                  <a aria-label="Besuche uns auf Instagram" href="" target="_blank" rel="noopener noreferrer">
                     <Icon :icon="'instagram'"></Icon>
                  </a>
               </li>
               <li class="social-media-list__item">
                  <a aria-label="Besuche uns auf TikTok" href="" target="_blank" rel="noopener noreferrer">
                     <Icon :icon="'tiktok'"></Icon>
                  </a>
               </li>
            </ul>
         </div>
      </div>
      <div class="copyright__area">
         <svg class="blurp--bottom" width="192" height="61" id="svg-footer-bottom" viewBox="0 0 160.7 61.5">
            <path fill="#fff"
               d="M80.3,61.5c0,0,22.1-2.7,43.1-5.4s41-5.4,36.6-5.4c-21.7,0-34.1-12.7-44.9-25.4S95.3,0,80.3,0c-15,0-24.1,12.7-34.9,25.4S22.3,50.8,0.6,50.8c-4.3,0-6.5,0,3.5,1.3S36.2,56.1,80.3,61.5z">
            </path>
         </svg>
         <div class="btn--top">
            <a href="#" class="btn--top_text">
               <span class="sr-only">Gehe zum Start der Seite</span>
               <span class="btn__arrow btn__arrow--top"></span>
               <span class="btn__arrow btn__arrow--bottom"></span>
            </a>
         </div>
         <div class="copyright__area__container">
            <ul class="copyright__area__container__list">
               <li><span class="copyright-logo">© {{ getCurrentYear }} MATJO</span></li>
               <LinkRouter link="/impressum" :label="$t('Imprint')" />
               <LinkRouter link="/privacy" :label="$t('Privacy')" />
               <LinkRouter link="/contact" :label="$t('Contact')" />
            </ul>
         </div>
      </div>
   </footer>
</template>

<script>
import LinkRouter from '../link/LinkRouter.vue'
import StageSeparator from '../stage/StageSeparator.vue';
import Icon from '../../assets/svg/Icon.vue';

export default {
  components: {
     LinkRouter,
     StageSeparator,
     Icon,
  },
  data() {
     return {
        scrollListener: null,
        throttleTimeout: null,
        isMobile: "",
     };
  },
   methods: {
      handleScroll() {
         if (this.throttleTimeout) {
            return;
         }
         this.throttleTimeout = setTimeout(() => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const bottomPosition = document.documentElement.scrollHeight - 150;
            if (scrollPosition >= bottomPosition) {
               this.onScrollEnd();
            } else {
               this.onScrollBack();
            }
            this.throttleTimeout = null;
         }, 150); 
      },
      onScrollEnd() {
         document.querySelector('.blurp--bottom').classList.add('fade-in');
         document.querySelectorAll('.btn__arrow').forEach((arrow, index) => {
            setTimeout(() => {
               arrow.classList.add('bouncing');
            }, index * 250);
         })
      },
      onScrollBack() {
         document.querySelector('.blurp--bottom').classList.remove('fade-in');
         document.querySelectorAll('.btn__arrow').forEach((arrow, index) => {
            setTimeout(() => {
               arrow.classList.remove('bouncing');
            }, index * 250);
         })
      },
      throttledCheckIsMobile() {
         if (!this.throttleTimeout) {
            this.throttleTimeout = setTimeout(() => {
               this.checkIsMobile();
               this.throttleTimeout = null;
            }, 250);
         }
      },
      checkIsMobile() {
         this.isMobile = window.innerWidth <= 599;
      },
   },
   computed: {
      getCurrentYear() {
         const date = new Date();
         return date.getFullYear();
      },
      localizedFooter() {
         const currentLocale = this.$i18n.locale;
         const localizedObject = this.$i18n.getLocaleMessage(currentLocale).home;

         return {
            footer: localizedObject.footer,
         }
      }
   },
   mounted() {
      window.addEventListener("resize", () => this.throttledCheckIsMobile());
      this.scrollListener = this.handleScroll.bind(this);
      window.addEventListener('scroll', this.scrollListener);
   },
   destroyed() {
      window.removeEventListener("resize", this.throttledCheckIsMobile);
   },
}
</script>

<style lang="scss" scoped>
.footer {
   @include responsive-font-size(1.5rem, 1.6rem);
   background-color: $color-background;
   color: $color-white;
   letter-spacing: 1px;

   &__addresses,
   &__opening-hours {
      @include responsive-font-size(1.5rem, 1.6rem);
      margin-block-end: 5rem;

      @include for-tablet-portrait-up {
         width: 50%;
      }

      h3 {
         @include responsive-font-size(1.7rem, 1.8rem);
         text-transform: uppercase;
      }

      p {
         margin-block-end: 1rem;
         margin-block-start: 0;
      }
   }

  &__social-media {
      .social-media-list {
         display: flex;
         flex-direction: row;
         gap: 1.5rem;
         margin-block-end: 5rem;
      }
  }
}

.restaurant__information {
   margin-inline: 3rem;

   @include for-tablet-portrait-up {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 3rem;
      margin: 0 auto;
      max-width: $content-max-width - (2 * $content-padding);
      width: calc(100% / 1.5);
   }

   @include for-tablet-landscape-up {
      width: calc(100% / 2);
   }

   @include for-desktop-up {
      width: calc(100% / 3);
   }

   a {
      align-items: start;
      color: inherit;
      display: flex;
      flex-direction: column;
      line-height: 1.5;
      transition: color 0.2s ease-in;
      width: auto;

      &:hover,
      &:focus {
         color: $color-primary;
      }
   }

   .footer__contact {
      a {
         align-items: center;
         flex-direction: row;
         gap: 0.5rem;
      }
   }
}

.copyright__area {
  background-color: $color-background-copyright;
  color: $color-body-copyright;
  padding-block: 2.5rem;
  position: relative;
}

.copyright__area__container {
   position: relative;
   z-index: 1;
}

.copyright__area__container__list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding-inline: 0;

  .copyright-logo {
      @include responsive-font-size(1.2rem, 1.3rem);
      color: inherit;
      display: flex;
      flex-direction: column;
      letter-spacing: 1px;
      line-height: 1.5;
      margin-inline: 1rem;
      padding-block: 0.5rem;
      text-transform: uppercase;
  }
}

// footer button to top
.blurp--bottom {
  transform: translateY(50px) scale(0);
  transition: transform 0.3s ease-in-out;

  &.fade-in {
     transform: translateY(0) scale(0.9);
  }
}

.copyright__area svg {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -96px;
  margin-top: -35px;

  path {
     fill: $color-header;
  }
}

.btn--top {
  position: absolute;
  left: 50%;
  top: -12px;
  transform: translateY(-50%);
}

.btn--top_text .btn__arrow--top {
   top: 20px;
}

.btn--top_text .btn__arrow--bottom {
  top: 15px;
}

.btn--top_text {
  color: white;
  display: block;
  font-size: 12px;
  font-weight: 700;
  height: 50px;
  left: 50%;
  letter-spacing: 2px;
  position: absolute;
  text-transform: uppercase;
  top: 0;
  transform: translate(-50%, -30%);
  width: 50px;
}

.btn--top_text .btn__arrow {
  border-left: 2px solid white;
  border-top: 2px solid white;
  display: block;
  height: 10px;
  left: 50%;
  opacity: 0;
  position: absolute;
  transform: translateX(-50%) rotate(45deg);
  width: 10px;
}

.bouncing {
  animation: bounce 1.5s forwards;
}

@keyframes bounce {
  0% {
     transform: translate(-50%, 10px) rotate(45deg);
     opacity: 0;
  }

  50% {
     transform: translate(-50%, 0) rotate(45deg);
     opacity: 1;
  }

  100% {
     transform: translate(-50%, 0) rotate(45deg);
     opacity: 1;
  }
}
</style>

<style lang="scss">
.copyright__area__container__list {
  align-items: center;
  display: flex;

  li {
      align-items: center;

     @include for-tablet-landscape-up {
        &::after {
           content: "\2022";
           font-size: 1.5rem;
           margin: 0 0.5rem;
        }
     }

     a {
        @include responsive-font-size(1.2rem, 1.3rem);
        align-items: center;
        display: flex;
        letter-spacing: 1px;
        line-height: 1.2;
        margin-block: 0.25rem;
        margin-inline: 1rem;
        padding: 0.6rem 0;
        text-transform: uppercase;
     }
     
     &:last-child::after {
        content: "";
     }
  }
}
</style>