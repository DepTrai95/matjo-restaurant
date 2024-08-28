<template>
   <div class="social-media-container" :class="{'scrolled': pageIsScrolled}">
      <ul class="social-media-list">
         <li class="social-media-list__item">
            <a aria-label="Besuche uns auf Facebook" href="https://www.facebook.com/nguyenducanh95" class="facebook-icon"
               target="_blank" rel="noopener noreferrer">
               <Icon :icon="'facebook'"></Icon>
            </a>
         </li>
         <li class="social-media-list__item">
            <a aria-label="Besuche uns auf Instagram" href="https://www.instagram.com/ducvnh_nguyen/"
               class="instagram-icon" target="_blank" rel="noopener noreferrer">
               <Icon :icon="'instagram'"></Icon>
            </a>
         </li>
         <li class="social-media-list__item">
            <a aria-label="Besuche uns auf TikTok" href="https://www.tiktok.com/@anja_nguyen" class="tiktok-icon"
               target="_blank" rel="noopener noreferrer">
               <Icon :icon="'tiktok'"></Icon>
            </a>
         </li>
      </ul>
   </div>
</template>

<script>
import Icon from '../../assets/svg/Icon.vue'
import debounce from '../../utils';

export default {
   components: {
      Icon,
   },
   data() {
      return {
         pageIsScrolled: false,
      }
   },
   mounted() {
      const isHomepage = window.location.pathname === '/' || window.location.pathname === '';
      if (!isHomepage) this.pageIsScrolled = true;
      window.addEventListener('scroll', this.handleScroll);
   },
   methods: {
      handleScroll: debounce(function () {
         const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
         const isHomepage = window.location.pathname === '/' || window.location.pathname === '';
         if (!isHomepage) this.pageIsScrolled = true;
         if (isHomepage && scrollPosition > 100) this.pageIsScrolled = true;
         if (isHomepage && scrollPosition <= 100) this.pageIsScrolled = false;
      }, 100),
   },
}
</script>

<style lang="scss">
.social-media-container {
   display: none;

   @include for-tablet-portrait-up {
      display: block;
      position: fixed;
      right: 20px;
      top: 50%;
      z-index: 100;
   }
}

.social-media-list {
   display: flex;
   flex-direction: column;
   padding: 0;
}

.social-media-list__item {
   a {
      color: $color-white;
      transition: color 0.1s ease-in-out;

      &:before,
      &:after {
         content: none;
      }

      
      .scrolled & {
         color: $color-primary;
         
         &:hover {
            color: $color-primary-dark;
         }
      }
   }

   // .facebook-icon {
   //    &:hover {
   //       color: #4267B2;
   //    }
   // }

   // .instagram-icon {
   //    &:hover {
   //       color: #C13584;
   //    }
   // }

   // .tiktok-icon {
   //    &:hover {
   //       color: #009E60;
   //    }
   // }

   .icon-container {
      .icon {
         height: 30px;
         width: 30px;
      }
   }
}
</style>