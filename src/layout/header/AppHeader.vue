<template>
  <header class="header">
     <the-navbar></the-navbar>
  </header>
  <the-stage 
     :headerHeightMax="headerHeightMax"
     :headline="$t(headline)" 
     :showSubHeader="showSubHeader" 
     :showBackground="showBackground"
  >
  </the-stage>
</template>

<script>
import TheNavbar from '../navbar/Navbar.vue';
import TheStage from '@/components/stage/Stage.vue';

export default {
  components: {
     TheNavbar,
     TheStage,
  },
  data() {
     return {
        isMobile: null,
        headerHeightMax: false,
        headline: 'BBQ & HOTPOT',
        showSubHeader: false,
        showBackground: false,
        throttleTimeout: null,
     };
  },
  watch: {
     '$route': {
        immediate: true,
        handler(to) {
           this.updateHeaderProps(to);
        }
     }
  },
  methods: {
     updateHeaderProps(route) {
        this.headerHeightMax = route.meta.headerHeightMax !== undefined ? route.meta.headerHeightMax : false;
        this.headline = route.meta.headline || 'MATJO';
        this.showSubHeader = route.meta.showSubHeader !== undefined ? route.meta.showSubHeader : false;
        this.showBackground = route.meta.showBackground !== undefined ? route.meta.showBackground : false;
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
     handleHeaderVisibility(currentScrollPos) {
        const navbar = document.querySelector(".header");
        let prevScrollPos = window.pageYOffset;

        if (currentScrollPos < 150) {
           navbar.classList.remove('header--inverted');
           this.isInverted = false;
           return;
        }

        if (prevScrollPos > currentScrollPos) {
           navbar.classList.remove('header--inverted');
           this.isInverted = false;
        } else {
           navbar.classList.add('header--inverted');
           this.isInverted = true;
        }

        prevScrollPos = currentScrollPos;
     },
  },
  mounted() {
     //loading page check size
     this.checkIsMobile();
     window.addEventListener("scroll", () => {
        this.throttledCheckIsMobile();
        if (!this.isMobile) {
           let currentScrollPos = window.pageYOffset;
           this.handleHeaderVisibility(currentScrollPos);
        }
     });
  },
   destroyed() {
      window.removeEventListener("resize", this.throttledCheckIsMobile);
   },
}
</script>

<style lang="scss" scoped>
.header {
   background-color: transparent;
   color: $color-white;
   inset-inline: 0;
   position: fixed;
   transition: background-color 0.25s ease-in-out, inset 0.25s ease-in-out, border-radius 0.25s;
   z-index: 101;

  @include for-tablet-portrait-down {
     color: $color-black;
     inset-block-start: 10px;
     inset-inline: 0px;
     
     .inner {
      padding: 0;
     }
  }

}

.header--inverted {
   @include for-tablet-portrait-up {
      background-color: rgba(255, 255, 255, 0.9);
      color: $color-header;
      // inset-inline: 50px;
      // inset-block-start: 10px;
  }
}
</style>
