<script setup lang="ts"></script>

<template>
  <div class="common-dialog" v-bind="$attrs">
    <div class="dialog-content">
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

.dialog-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 80%;

  @media (min-width: 768px) {
    max-width: 500px;
  }
}
</style>
