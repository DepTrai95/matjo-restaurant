<template>
   <div class="social-media-container">
      <ul class="social-media-list">
         <li class="social-media-list__item">
            <a href="" class="facebook-icon">
               <Icon :icon="'facebook'"></Icon>
            </a>
         </li>
         <li class="social-media-list__item">
            <a href="" class="instagram-icon">
               <Icon :icon="'instagram'"></Icon>
            </a>
         </li>
         <li class="social-media-list__item">
            <a href="" class="tiktok-icon">
               <Icon :icon="'tiktok'"></Icon>
            </a>
         </li>
      </ul>
   </div>
</template>

<script>
import Icon from '../../assets/svg/Icon.vue'

export default {
   components: {
      Icon,
   }
}
</script>

<style lang="scss">
.social-media-container {
   display: none;

   @include for-tablet-portrait-up {
      display: block;
      position: fixed;
      right: 30px;
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
      color: $color-primary;

      &:before,
      &:after {
         content: none;
      }
   }

   .facebook-icon {

   }

   .instagram-icon {

   }

   .tiktok-icon {

   }

   .icon-container {
      .icon {
         height: 30px;
         width: 30px;
      }
   }
}
</style>