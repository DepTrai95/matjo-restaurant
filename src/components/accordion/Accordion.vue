<!-- Accordion.vue -->
<template>
   <div class="accordion">
      <div v-for="(item, index) in items" :key="index" class="accordion-item">
         <h3 class="accordion__header">
            <button 
               :id="`accordion__header__${index}`"
               class="accordion__header__button" 
               @click="toggleItem(index)" 
               :aria-expanded="activeIndex === index"
               :aria-controls="`accordion__content__${index}`"
            >
               {{ item.title }}
               <span class="accordion-icon" aria-hidden="true">
                  {{ activeIndex === index ? '−' : '+' }}
               </span>
            </button>
         </h3>
         <div 
            :id="`accordion__content__${index}`" 
            class="accordion__content"
            :style="{ maxHeight: activeIndex === index ? contentHeight[index] : '0px' }" 
            role="region"
            :aria-labelledby="`accordion-header-${index}`"
            :aria-hidden="activeIndex !== index"
         >
            <div class="accordion__content-inner" ref="content">
               {{ item.content }}
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'Accordion',
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
      }
   },
   mounted() {
      this.updateContentHeight()
      window.addEventListener('resize', this.updateContentHeight)
   },
   beforeDestroy() {
      window.removeEventListener('resize', this.updateContentHeight)
   }
}
</script>

<style lang="scss" scoped>
.accordion-item {
   border: 1px solid transparent;
   margin-bottom: 1rem;
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
   
   &[aria-expanded="true"] {
      border-end-end-radius: 0;
      border-end-start-radius: 0;
      padding-block: 30px 0;
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