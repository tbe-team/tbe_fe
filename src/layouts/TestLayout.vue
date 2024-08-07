<template>
  <div class="w-full min-h-screen">
    test layout
    <main class="flex flex-col items-center justify-center flex-1 gap-4 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/views/dashboard/components/HeaderComponent.vue'
import NavbarComponent from '@/views/dashboard/components/NavbarTeam.vue'
</script>
