<script setup lang="ts"></script>

<template>
  <div class="app">
    <div class="app-header">
      <h1>Task Manager</h1>
    </div>
    <div class="app-content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="css">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #2b6cb0;
  color: #fff;
  padding: 2rem;
  text-align: center;
}

.app-content {
  flex: 1;
  padding: 2rem;
}
</style>
