<template>
  <header class="header">
     <the-navbar></the-navbar>
  </header>
  <the-stage 
     :headerHeightMax="headerHeightMax"
     :headline="headline" 
     :showSubHeader="showSubHeader" 
     :showBackground="showBackground"
  >
  </the-stage>
</template>

<script>
import TheNavbar from '../navbar/Navbar.vue';
import TheStage from '../stage/Stage.vue';

export default {
  components: {
     TheNavbar,
     TheStage,
  },
  data() {
     return {
        isMobile: "",
        headerHeightMax: false,
        headline: 'Korean-BBQ and HotPot',
        showSubHeader: false,
        showBackground: false,
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
        this.headline = route.meta.headline || 'Matjo';
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

        if (currentScrollPos < 100) {
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
        this.checkIsMobile();
        if (!this.isMobile) {
           let currentScrollPos = window.pageYOffset;
           this.handleHeaderVisibility(currentScrollPos);
           navbar.classList.remove('header--inverted');
        }
     });
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
  z-index: 100;

  @include for-phone-only {
     color: $color-black;
     inset-block-start: 10px;
     inset-inline: 0px;
  }
}

.header--inverted {
   @include for-tablet-portrait-up {
      color: $color-header;
      inset-inline: 50px;
      inset-block-start: 10px;
  }
}
</style>
