<template>
   <section class="content-area">
      <article class="content" :class="{ reverse: content.reverse }" :id="content.id">
         <div class="inner">
            <h2 class="text-center">{{ content.title }}</h2>
            <div class="grid-2--tablet-landscape-up">
               <div class="grid-item">
                  <div class="content__heading">
                     <h3>{{ content.subTitle }}</h3>
                  </div>
                  <div class="content__text">
                     <p v-for="text in content.textContent" :key="text.id">{{ text }}</p>
                     <router-link class="btn--primary" :to="content.callToAction.to">{{ content.callToAction.text
                        }}</router-link>
                  </div>
               </div>
               <div class="grid-item">
                  <div class="grid-2--tablet-landscape-up content__images">
                     <Img v-for="img in content.images" :key="img.id" :img="img"></Img>
                  </div>
               </div>
            </div>
         </div>
      </article>
   </section>
</template>
 
<script>
import LinkRouter from '../link/LinkRouter.vue';
import StageSeparator from '../stage/StageSeparator.vue';
import Img from '../../components/img/Img.vue';

export default {
   components: {
      LinkRouter,
      StageSeparator,
      Img,
   },
   props: {
      content: {
         type: Object,
         required: true
      },
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
         } else if (width < 1024) {
            return 0.5; // Tablets
         } else {
            return 0.5; // Desktops
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

         const contentBlocks = this.$el.querySelectorAll('.content .grid-item');
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
   }
};
</script>
 
<style lang="scss" scoped>
.content {
   &.reverse {
      .grid-2--tablet-landscape-up {
         display: flex;
         flex-direction: column-reverse;

         @include for-tablet-landscape-up {
            flex-direction: row-reverse;
         }

         &>.grid-item {
   
            &:first-child::after {
               inset-inline-start: 0;
            }
            
            &:last-child::before {
               inset-inline-end: 0;
               inset-inline-start: 100%;
               width: 3px;
            }
         }
      }

   }

   > .inner > h2 {
      // border-bottom: 4px solid $color-primary;
      margin-bottom: 0;
      padding-bottom: 3rem;
      position: relative;

      @include for-tablet-landscape-up {
         padding-bottom: 5rem;
      }

      &.fade-in {
         &::after {
            width: 100%;
         }
      }

      &::after {
         background-color: $color-primary;
         content: "";
         height: 3px;
         inset-block-end: 0;
         inset-inline-start: 50%;
         transform: translateX(-50%);
         position: absolute;
         transition: width 0.3s ease-in;
         width: 0;
      }
   }
   

   .grid-2--tablet-landscape-up > .grid-item {
      opacity: 0;
      padding-block: 3rem;
      position: relative;
      transform: translateY(30px);
      transition: opacity 0.3s ease-in, transform 0.3s ease-in;

      &.fade-in {
         opacity: 1;
         transform: translateY(0);
      }

      @include for-tablet-portrait-up {
         padding: 4rem;
      }

      @include for-tablet-landscape-up {
         padding: 5rem;

         &.fade-in {      
            &:first-child::after {
               height: 100%;
            }
      
            &:last-child::before {
               height: 100%;
            }
         }

         &:first-child::after {
            background-color: $color-primary;
            content: "";
            height: 0;
            inset-block: 0;
            inset-inline-end: 0;
            position: absolute;
            transition: height 0.3s ease-in;
            width: 2px;
         }
   
         &:last-child::before {
            background-color: $color-primary;
            content: "";
            height: 0;
            inset-block: 0;
            inset-inline-start: 0;
            position: absolute;
            transition: height 0.3s ease-in;
            width: 1px;
         }
      }

   }
}


.content__heading {
   h3 {
      @include responsive-font-size(3rem, 4rem);
      margin-block-start: 0;
   }
}

.content__text {

}

</style>

<style lang="scss">
.content__images {
   height: 300px;
   padding: 1rem;
   position: relative;

   @include for-tablet-portrait-up {
      height: 450px;
   }

   @include for-tablet-landscape-up {
      height: 500px;
   }

   .img:first-child {
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(0, 0%);

      @include for-tablet-landscape-up {
         transform: translate(25px, 25px)
      }

      @include for-desktop-up {
         transform: translate(75px, 0%);
      }

      img {
         max-width: 400px;
      }
   }

   .img:last-child {
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translate(-25px, 0%);
      
      @include for-tablet-landscape-up {
         transform: translate(-25px, -50px);
      }

      @include for-desktop-up {
         transform: translate(-50px, 0%);
      }

      img {
         max-width: 400px;
      }
   }
}
</style>