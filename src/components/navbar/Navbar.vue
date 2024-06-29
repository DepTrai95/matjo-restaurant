<template>
  <div class="navbar" :class="{'is-open': isMenuExpanded && isMobile}">
     <div class="inner">
        <div class="logo__container">
           <div class="logo">
              <router-link to="/">
                 <img v-if="!isInverted" src="../../assets/img/logo.webp" alt="zur Startseite" height="50" width="50" />
                 <img v-else src="../../assets/img/logo.webp" alt="zur Startseite" height="50" width="50" />
              </router-link>
           </div>
        </div>
        <div class="nav-main__wrapper" v-if="!isMobile">
           <nav class="nav-main">
              <ul class="list--unstyled">
                 <LinkRouter link="/" label="Home" />
                 <LinkRouter link="/menu" label="Our Menu" />
                 <LinkRouter link="/contact" label="Contact" />
              </ul>
           </nav>
        </div>

        <div class="nav-cta__wrapper" v-if="!isMobile">
         <LinkRouter link="/contact" label="Reserve" class="btn--primary"/>
        </div>

        <div class="mobile-navigation" v-if="isMobile">
           <button id="mobile-navigation-button" type="button" class="navigation__button--mobile menu-toggle"
              :aria-expanded="isMenuExpanded ? 'true' : 'false'" aria-haspopup="true" aria-controls="mobile-navigation"
              @click="toggleMenu">
              <span class="sr-only">Hauptnavigation</span>
              <span class="hamburger" :class="{ 'is-open': isMenuExpanded }">
                 <span></span>
                 <span></span>
                 <span></span>
              </span>
           </button>

           <div class="nav-main__wrapper" :class="{'is-open': isMenuExpanded}" @click="toggleMenu">
              <nav class="nav-main">
                 <ul class="list--unstyled">
                    <LinkRouter link="/" label="Home" />
                    <LinkRouter link="/menu" label="Menu" />
                    <LinkRouter link="/contact" label="Kontakt" />
                 </ul>
                 <ul class="list--unstyled social-media-menu">
                    <li class="social-media-menu__item">
                       <a href="">
                          <span class="icon-container">
                             <svg class="icon" aria-hidden="true" focusable="false">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-facebook"></use>
                             </svg>
                          </span>
                       </a>
                    </li>
                 </ul>
              </nav>
           </div>
        </div>
     </div>
  </div>
</template>

<script>
import LinkRouter from "../link/LinkRouter.vue";
import BaseButton from "../button/BaseButton.vue";

export default {
  components: {
     LinkRouter,
     BaseButton,
  },
  data() {
     return {
        isInverted: false,
        isMobile: "",
        isMenuExpanded: false,
        throttleTimeout: null,
     };
  },
  methods: {
     toggleMenu() {
        this.isMenuExpanded = !this.isMenuExpanded;

        if (this.isMenuExpanded) {
           document.body.style.overflow = 'hidden';
        } else {
           document.body.removeAttribute('style');
        }
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
     handleHeaderVisibility (currentScrollPos) {
        let prevScrollPos = window.pageYOffset;

        if (currentScrollPos < 300) {
           this.isInverted = false;
           return;
        }

        if (prevScrollPos > currentScrollPos) {
           this.isInverted = false;
        } else {
           this.isInverted = true;
        }

        prevScrollPos = currentScrollPos;
     },
  },
  mounted() {
     //loading page check size
     this.checkIsMobile();
     window.addEventListener("resize", this.checkIsMobile);
     window.addEventListener("scroll", () => {
        if (!this.checkIsMobile()) {
           let currentScrollPos = window.pageYOffset;
           this.handleHeaderVisibility(currentScrollPos);
        }
     });
  },
  destroyed() {
     window.removeEventListener("resize", this.throttledCheckIsMobile);
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  .header--inverted & {
     color: $color-header;
  }

  .inner {
     display: flex;
     flex-direction: row-reverse;
     padding: 1rem;
     
     @include for-phone-only {
         height: $header-height-mobile;
         background: rgba(255, 255, 255, 0.4);
         border-radius: 30px;
         box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
         backdrop-filter: blur(10px);
         border: 1px solid rgba(255, 255, 255, 0.28);
     }

     @include for-tablet-portrait-up {
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem 2.5rem;
     }
  }
}

.logo__container {
  align-items: center;
  display: flex;
  
  @include for-phone-only {
     left: 50%;
     position: absolute;
     top: 50%;
     transform: translate(-50%, -50%);
  }

  .logo {
     a {
        display: block;
     }

     img {
        @include for-phone-only {
           height: 50px;
        }
     }
  }
}

.mobile-navigation {
  @include for-phone-only {
     align-items: center;
     display: flex;
  }

  .nav-main__wrapper {
     display: flex;

     @include for-phone-only {
         justify-content: center;
         display: none;
         left: 0;
         position: absolute;
         top: calc($header-height-mobile + 10px);
         width: 100%;
         z-index: 900;
         //glasmorph effect
         background: rgba(185, 185, 185, 0.6);
         border-radius: 30px;
         box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
         backdrop-filter: blur(4px);
         border: 1px solid rgba(255, 255, 255, 0.28);
         transition: height 0.3s ease-in-out;

         &.is-open {
            display: block;
         }
     }
  }

  .nav-main {
     display: flex;
     flex-direction: column;

     li {
        @include responsive-font-size(1.8rem, 2rem);
        color: $color-white;
        justify-content: center;
        padding: 10px;
        text-transform: uppercase;
        width: 100%;

        .icon {
           height: 2rem;
           width: 2rem;
        }
     }
  }
}

.menu-toggle {
  background-color: transparent;
  border: 0;
  color: currentColor;
  cursor: pointer;
  height: 3.6rem;
  padding: 10px;
  width: 3.6rem;

  @include for-phone-only {
     z-index: 1000;
  }
}

.hamburger {
  display: flex;
  height: 100%;
  position: relative;
  width: 100%;

  span {
     background-color: currentColor;
     border: 1px solid currentColor;
     position: absolute;
     transition: all 0.3s;

     &:first-child {
        top: 0;
        width: 25px;
     }

     &:nth-child(2) {
        top: 50%;
        width: 25px;
     }

     &:nth-child(3) {
        top: 100%;
        width: 25px;
     }
  }
}

.hamburger.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(-45deg);
}

.hamburger.is-open span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-open span:nth-child(3) {
  transform: translateY(-9px) rotate(45deg);
}

.nav-main__wrapper,
.nav-cta__wrapper {
  align-items: center;
  display: flex;
  justify-content: flex-end;
}

.nav-main {
  display: flex;
  flex-direction: row;

  li {
     @include responsive-font-size(1.3rem, 1.5rem);
     font-weight: 500;
     letter-spacing: 1px;
     padding-inline: 1.5rem;
     text-align: center;
     text-transform: uppercase;
  }
}
</style>