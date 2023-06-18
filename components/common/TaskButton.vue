<script setup lang="ts">
interface Props {
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
});
</script>

<template>
  <button class="button" v-bind="$attrs" :type="props.type">
    <slot />
  </button>
</template>

<style scoped lang="css">
.button {
  height: 48px;
  background-color: rgb(9, 9, 9);
  border-radius: 12px;
  border: 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 0;
  line-height: 20px;
  color: rgb(255, 255, 255);

  &:active {
    transform: scale(0.98);
    transition: transform 0.2s ease-in-out;
  }
}
</style>
