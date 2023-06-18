<script setup lang="ts"></script>

<template>
  <button class="empty-state" v-bind="$attrs" type="button">
    <slot />
  </button>
</template>

<style scoped lang="css">
.empty-state {
  background-color: transparent;
  padding: 3rem;
  font-size: inherit;
  color: inherit;
  cursor: pointer;
  border-color: rgba(209, 213, 219, 0.4);
  border-style: dashed;
  border-radius: 0.5rem;
  text-align: center;
}
</style>
