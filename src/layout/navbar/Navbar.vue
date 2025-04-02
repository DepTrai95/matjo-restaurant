<template>
   <div class="inner">
      <div class="navbar" :class="{'is-open': isMenuExpanded && isMobile}">
         <div class="logo__container">
            <div class="logo">
               <router-link to="/">
                  <img v-if="!isInverted" src="../../assets/img/logo.webp" alt="zur Startseite" height="70"
                     width="70" />
                  <img v-else src="../../assets/img/logo-transparent.webp" alt="zur Startseite" height="70"
                     width="70" />
               </router-link>
            </div>
         </div>
         <div class="nav-main__wrapper" v-if="!isMobile">
            <nav class="nav-main" aria-label="Hauptnavigation">
               <ul class="list--unstyled">
                  <LinkRouter link="/" :label="$t('navigation.home')" />
                  <LinkRouter link="/menu" :label="$t('navigation.menu')" />
                  <LinkRouter link="/bbq" :label="$t('navigation.bbq')" />
                  <LinkRouter link="/hotpot" :label="$t('navigation.hotpot')" />
                  <LinkRouter link="/career" :label="$t('navigation.career')" />
                  <li class="form-group form-select">
                     <label class="sr-only" for="language">Sprache wechseln</label>
                     <select class="form-control" id="language" name="language" v-model="$i18n.locale">
                        <option value="de">{{ $t('German') }}</option>
                        <option value="en">{{ $t('English') }}</option>
                     </select>
                  </li>
               </ul>
            </nav>
         </div>

         <div class="nav-cta__wrapper" v-if="!isMobile">
            <OpenTableButton id="opentable__header" />
         </div>

         <div class="mobile-navigation" v-if="isMobile">
            <button id="mobile-navigation-button" type="button" class="navigation__button--mobile menu-toggle"
               :aria-expanded="isMenuExpanded ? 'true' : 'false'" aria-haspopup="true" aria-controls="mobile-navigation"
               aria-owns="mobile-navigation" @click="toggleMenu">
               <span class="sr-only">{{ isMenuExpanded ? $t('navigation.close') : $t('navigation.open') }}</span>
               <span class="hamburger" :class="{ 'is-open': isMenuExpanded }">
                  <span></span>
                  <span></span>
                  <span></span>
               </span>
            </button>

            <div class="nav-main__wrapper" id="mobile-navigation" :class="{'is-open': isMenuExpanded}"
               :aria-hidden="!isMenuExpanded">
               <nav class="nav-main">
                  <ul class="list--unstyled">
                     <LinkRouter link="/" :label="$t('navigation.home')" @click="closeMenu" />
                     <LinkRouter link="/menu" :label="$t('navigation.menu')" @click="closeMenu" />
                     <LinkRouter link="/bbq" :label="$t('navigation.bbq')" @click="closeMenu" />
                     <LinkRouter link="/hotpot" :label="$t('navigation.hotpot')" @click="closeMenu" />
                     <LinkRouter link="/career" :label="$t('navigation.career')" @click="closeMenu" />
                     <li>
                        <OpenTableButton class="nav-main__reservation" id="opentable__header__mobile" />
                     </li>
                     <li class="form-group form-select">
                        <label class="sr-only" for="language">Sprache wechseln</label>
                        <select class="form-control" id="language" name="language" aria-label="Sprache ändern"
                           v-model="$i18n.locale">
                           <option value="de">Deutsch</option>
                           <option value="en">English</option>
                        </select>
                     </li>
                  </ul>
                  <ul class="list--unstyled social-media-menu">
                     <li class="social-media-menu__item">
                        <a aria-label="Besuche uns auf Facebook" href="https://www.facebook.com/matjo.dresden"
                           target="_blank" rel="noopener noreferrer">
                           <Icon :icon="'facebook'"></Icon>
                        </a>
                     </li>
                     <li class="social-media-menu__item">
                        <a aria-label="Besuche uns auf Instagram" href="https://www.instagram.com/matjo.dresden/"
                           target="_blank" rel="noopener noreferrer">
                           <Icon :icon="'instagram'"></Icon>
                        </a>
                     </li>
                     <li class="social-media-menu__item">
                        <a aria-label="Besuche uns auf TikTok" href="https://www.tiktok.com/@matjo.dresden"
                           target="_blank" rel="noopener noreferrer">
                           <Icon :icon="'tiktok'"></Icon>
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
import LinkRouter from "@/components/link/LinkRouter.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import OpenTableButton from "@/components/button/OpenTableButton.vue";
import Icon from '@/assets/svg/Icon.vue';

export default {
   components: {
      LinkRouter,
      BaseButton,
      OpenTableButton,
      Icon,
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
         window.addEventListener('keydown', this.handleKeydown);
      },
      handleKeydown(event) {
         if (event.key === 'Escape') {
            this.closeMenu();
         }
      },
      closeMenu() {
         this.isMenuExpanded = false;
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
            this.isInverted = window.innerWidth <= 599;
      },
      handleHeaderVisibility (currentScrollPos) {
         let prevScrollPos = window.pageYOffset;

         if (currentScrollPos < 150) {
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
      window.addEventListener("resize", () => {
         this.throttledCheckIsMobile();
         if (this.isMobile) {
            document.querySelector(".header").classList.remove('header--inverted');
         }
      });
      window.addEventListener("scroll", () => {
         if (!this.isMobile) {
            let currentScrollPos = window.pageYOffset;
            this.handleHeaderVisibility(currentScrollPos);
            }
      });
   },
   destroyed() {
      window.removeEventListener("resize", this.throttledCheckIsMobile);
   },
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
};
</script>

<style lang="scss" scoped>
.inner {
  .header--inverted & {
      color: $color-header;
      // background-color: rgba(255, 255, 255, 0.9);
      border-radius: 50px;
  }

  .navbar {
      --navbar-height: 80px;
      display: flex;
      flex-direction: row-reverse;
      padding: 1rem;
      position: relative;
   
      
      @include for-phone-only {
         height: $header-height-mobile;
         border: 1px solid rgba(255, 255, 255, 0.3);
         border-radius: 30px;
         box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
         padding: 0;
      
         &::before {
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.4);
            border-radius: 30px;
            content: "";
            inset: 0;
            position: absolute;
         }
      }

      @include for-tablet-portrait-up {
         flex-direction: row;
         justify-content: space-between;
         min-height: var(--navbar-height);
      }

      @include for-tablet-landscape-up {
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

   @include for-tablet-portrait-up {
      min-width: 75px;
   }

   @include for-tablet-landscape-up {
      min-width: 150px;
   }

   .logo {
      a {
         display: block;
      }

      img {
         width: unset;
         
         @include for-phone-only {
            height: 50px;
            width: 50px;
         }
      }
   }
}

.mobile-navigation {
  @include for-phone-only {
     align-items: center;
     display: flex;
     margin-inline-end: 2rem;
  }

  .nav-main__wrapper {
      @include for-phone-only {
         justify-content: center;
         height: 0;
         left: 0;
         overflow: hidden;
         position: absolute;
         top: calc($header-height-mobile + 10px);
         transition: height 0.3s ease-in-out;
         width: 100%;
         z-index: 900;
         //glasmorph effect
         background: rgba(255, 255, 255, 0.4);
         border-radius: 30px;
         box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
         -webkit-backdrop-filter: blur(10px);
         backdrop-filter: blur(10px);
         border: 0px solid rgba(255, 255, 255, 0.3);

         &::before {
            position: absolute;
            inset: 0;
            content: "";
         }

         &.is-open {
            border: 1px solid rgba(255, 255, 255, 0.3);
            height: 55vh;
         }
      }

      &[aria-hidden="true"] {
         li, li a {
            pointer-events: none;
            visibility: hidden;
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
         gap: 1rem;
         padding: 5px;
         text-transform: uppercase;
         width: 100%;

         @include for-phone-only {
            color: $color-black;
         }

         .icon {
            height: 2rem;
            width: 2rem;
         }
      }

      .nav-main__reservation {
         display: flex;
         justify-content: center;
         margin-block: 1rem
      }

      .social-media-menu__item {
         width: auto;
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

  @include for-tablet-portrait-up {
     ul {
        align-items: center;
        display: flex;
        flex-direction: row;
     }
  }


  li {
     @include responsive-font-size(1.3rem, 1.5rem);
     font-weight: 500;
     letter-spacing: 1px;
     text-align: center;
     text-transform: uppercase;

      @include for-tablet-portrait-up {
         margin-inline: 1.5rem;
      }
  }
}

.form-select {
   position: relative;

   @include for-tablet-portrait-up {
      &::after {
         background-image: url("../../assets/svg/icon-arrow-down.svg");
         background-position: center;
         background-repeat: no-repeat;
         background-size: 20px 20px;
         bottom: 0;
         content: "";
         display: block;
         height: 4rem;
         inset-inline-end: 0;
         position: absolute;
         pointer-events: none;
         width: 4rem;
      }
   }

   select {
      min-height: 4rem;
      width: 100px;

      @include for-tablet-portrait-up {
         appearance: none;
      }
   }

   .form-control {
      @include responsive-font-size(1.5rem, 1.6rem);
      border: 1px solid transparent;
      border: 1px solid #0000006b;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 5px;
      font-family: "Roboto", "Calibri", Helvetica, Arial, sans-serif;
      line-height: 1.5;
      padding-block: 0.75rem;
      padding-inline: 1rem;
      transition: border 0.3s ease-in-out;

      @include for-phone-only {
         @include responsive-font-size(1.6rem, 1.7rem);
         background-color: transparent;
      }

      .header--inverted & {
         border: 1px solid #000;
         border: 1px solid #0000006b;
      }
   }
}
</style>

<style lang="scss">
.social-media-menu {
   display: flex;
   justify-content: center;
   gap: 1rem;
}

.social-media-menu__item {
   .icon-container .icon {
      height: 2.5rem;
      width: 2.5rem;
   }
}
</style>