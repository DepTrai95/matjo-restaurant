<!-- Accordion.vue -->
<template>
   <div class="accordion">
      <div v-for="(item, index) in items" :key="index" class="accordion-item">
         <h3 class="accordion__header">
            <button :id="`accordion__header__${index}`" class="accordion__header__button" @click="toggleItem(index)"
               :aria-expanded="activeIndex === index" :aria-controls="`accordion__content__${index}`">
               {{ item.title }}
               <Icon :icon="'arrow-down'" :iconClass="'accordion-icon'"></Icon>
            </button>
         </h3>
         <div :id="`accordion__content__${index}`" class="accordion__content"
            :style="{ maxHeight: activeIndex === index ? contentHeight[index] : '0px' }" role="region"
            :aria-labelledby="`accordion-header-${index}`" :aria-hidden="activeIndex !== index">
            <div class="accordion__content-inner" ref="content">
               {{ item.content }}
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import Icon from '../../assets/svg/Icon.vue'

export default {
   name: 'Accordion',
   components: {
      Icon,
   },
   props: {
      items: {
         type: Array,
         required: true
      }
   },
   data() {
      return {
         activeIndex: null,
         contentHeight: {}
      }
   },
   methods: {
      toggleItem(index) {
         this.activeIndex = this.activeIndex === index ? null : index
         this.$nextTick(() => {
            this.updateContentHeight()
         })
      },
      updateContentHeight() {
         this.$refs.content.forEach((el, index) => {
            this.contentHeight[index] = this.activeIndex === index ? `${el.scrollHeight}px` : '0px'
         })
      },
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
            return 0.7; // Tablets
         } else {
            return 0.9; // Desktops
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

         const contentBlocks = this.$el.querySelectorAll('.accordion-item');
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
      this.updateContentHeight()
      window.addEventListener('resize', this.updateContentHeight)

      this.createObserver();
      window.addEventListener('resize', this.handleResize);
   },
   beforeUnmount() {
      if (this.observer) {
         this.observer.disconnect();
      }
      window.removeEventListener('resize', this.handleResize);
   },
   beforeDestroy() {
      window.removeEventListener('resize', this.updateContentHeight)
   }
}
</script>

<style lang="scss">
.accordion-item {
   border: 1px solid transparent;
   margin-bottom: 1rem;
   opacity: 0;
   transform: translateY(30px);
   transition: opacity 0.3s ease-in, transform 0.3s ease-in;

   &.fade-in {
      opacity: 1;
      transform: translateY(0);
   }
}

.accordion__header {
   margin: 0;
   position: relative;
}

.accordion__header__button {
   @include responsive-font-size(2rem, 2.4rem);
   align-items: center;
   background-color: $color-white;
   border: 1px solid $color-white;
   border-radius: 30px;
   border-end-end-radius: 0;
   border-end-start-radius: 0;
   cursor: pointer;
   display: flex;
   justify-content: space-between;
   padding-block: 30px 10px;
   padding-inline: 20px;
   text-align: left;
   transition:  padding 0.3s ease-in-out; 
   width: 100%;

   .accordion-icon {
      height: 28px;
      transform: rotate(0);
      transition: transform 0.25s ease-in-out;
      width: 28px;
   }
   
   &[aria-expanded="true"] {
      border-end-end-radius: 0;
      border-end-start-radius: 0;
      padding-block: 30px 0;

      .accordion-icon {
         transform: rotate(180deg);
      }
   }
}

.accordion__content {
   @include responsive-font-size(1.8rem, 2rem);
   background-color: $color-white;
   border-end-end-radius: 30px;
   border-end-start-radius: 30px;
   min-height: 20px;
   overflow: hidden;
   transition: max-height 0.3s ease-in-out;

   &[aria-hidden="false"] {
      .accordion__content-inner {
         padding-block: 20px 30px;
      }
   }
}

.accordion__content-inner {
   padding-block: 30px;
   padding-inline: 20px;
   transition: padding 0.3s ease-in-out;
}

.accordion-icon {
   font-weight: bold;
   margin-left: 10px;
}
</style>