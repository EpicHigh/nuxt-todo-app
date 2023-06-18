<template>
  <router-view />
</template>
<script setup lang="ts">
useHead({
  title: 'Task Manager',
  meta: [
    {
      name: 'description',
      content: 'A simple task manager app built with Vue 3 and Vite',
    },
    {
      name: 'charset',
      content: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Poppins',
    },
    {
      rel: 'stylesheet',
      href: 'https://meyerweb.com/eric/tools/css/reset/reset.css',
    },
  ],
});
</script>
<style lang="css">
html {
  font-size: 10px;
}

body {
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  margin: 0;
  padding: 0;
}
</style>
