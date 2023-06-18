<script setup lang="ts">
defineEmits(['close']);
</script>

<template>
  <div class="common-dialog" v-bind="$attrs">
    <div class="dialog-content">
      <div class="close-button-container">
        <button class="close-button" type="button" @click="$emit('close')">
          X
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="css">
.common-dialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.close-button-container {
  position: relative;
}

.dialog-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 80%;

  @media (min-width: 768px) {
    max-width: 500px;
    padding: 4rem;
  }
}

.close-button {
  position: absolute;
  top: -1.6rem;
  right: -1.6rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;

  @media (min-width: 768px) {
    top: -2.4rem;
    right: -2.4rem;
  }
}
</style>
