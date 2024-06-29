<template>
  <button v-if="!link" :class="mode">
     <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
     <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
     mode: {
        type: String,
        required: false,
        default: "",
     },
     link: {
        type: Boolean,
        required: false,
        default: false,
     },
     to: {
        type: String,
        required: false,
        default: "/",
     },
  },
};
</script>

<style lang="scss" scoped>
button,
a {
  align-items: center;
  display: inline-flex;
  text-decoration: none;
}

.btn--primary {
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 4px;
  box-shadow: 0px 5px 20px 5px rgba(80, 80, 80, 0.2);
  color: inherit;
  cursor: pointer;
  font-size: inherit;
  height: unset !important;
  justify-content: center;
  line-height: 1.5;
  margin-block: 1rem;
  min-height: 3rem;
  min-width: 170px;
  outline: 1px solid transparent;
  padding: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease-in, border-color 0.2s ease-in, box-shadow 0.3s ease-in, color 0.3s ease-in-out, outline 0.3s ease-in-out;

  +.btn--primary {
     margin-inline: 2rem;
  }
}

.btn--primary {
  background-color: $color-header;
  color: $color-white;

  &:hover {
     box-shadow: 0px 5px 15px 3px rgba(80, 80, 80, 0.3)
  }
}
</style>
