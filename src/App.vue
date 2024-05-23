<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="size-full min-h-screen">
  <!-- <header class="w-full h-8 pt-2">
    <nav class="w-full h-full flex flex-row items-center gap-4 p-4">
      <RouterLink to="/" class="bg-slate-200 hover:bg-slate-300 duration-300 p-2 rounded">Home</RouterLink>
    </nav>
  </header> -->

    <RouterView />
  </div>
</template>
