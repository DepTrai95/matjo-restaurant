<template>
   <section class="content-area">
      <div class="inner">
         <h2 class="text-center">{{ heading }}</h2>
         <div class="grid--default icon-list grid-2--tablet-portrait-down" :class="`grid-${iconList.length}--tablet-portrait-up`">
            <div class="grid-item" v-for="iconListItem in iconList" :key="iconListItem.id">
               <Icon :icon="iconListItem.icon"></Icon>
               <h3>{{ iconListItem.heading }}</h3>
               <p>{{ iconListItem.description }}</p>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
import Icon from '../../assets/svg/Icon.vue'

export default {
   components: {
      Icon,
   },
   props: {
      heading: {
         type: String,
         required: true,
      },
      iconList: {
         type: Array,
         required: true
      }
   },
}
</script>

<style lang="scss" scoped>
.icon-list {
  h3 {
    margin-block: 1rem;
  }

  p {
    margin-block: 0.5rem;
    text-align: center;
  }
}
</style>

<style lang="scss">
.icon-list {
   .grid-item {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: start;

      .icon {
         height: 40px;
         width: 40px;
      }
   }
}
</style>