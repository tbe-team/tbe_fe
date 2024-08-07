<template>
  <div class="sticky top-0">
    <header class="sticky top-0 flex items-center h-12 gap-4 px-4 border-b bg-background md:px-6">
      <nav
        class="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
      >
        <!-- <span :class="getLinkClass('/overview')">Overview</span>
        <RouterLink :to="{ name: 'activity' }" :class="getLinkClass('/account/activity')">
          Activity
        </RouterLink>
        <RouterLink :to="{ name: 'settings' }" :class="getLinkClass('/account/settings')">
          Settings
        </RouterLink> -->
      </nav>
      <template v-for="section in sections">
        <router-link
          v-for="menu in section.menus"
          :key="menu.path"
          :to="menu.path"
          class="px-3 py-1 text-sm text-gray-400 duration-300 rounded-md hover:bg-gray-100 hover:text-gray-700"
          active-class="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md"
        >
          {{ menu.title }}
        </router-link>
      </template>
      <!-- <Sheet class="bg-red-400">
        <SheetTrigger as-child>
          <Button variant="outline" size="icon" class="shrink-0 md:hidden">
            <Menu class="w-5 h-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav class="grid gap-6 text-lg font-medium">
            <a href="#" class="flex items-center gap-2 text-lg font-semibold">
              <Package2 class="w-6 h-6" />
              <span class="sr-only">Acme Inc</span>
            </a>
            <a href="#" class="text-muted-foreground hover:text-foreground"> Dashboard </a>
            <a href="#" class="text-muted-foreground hover:text-foreground"> Orders </a>
            <a href="#" class="text-muted-foreground hover:text-foreground"> Products </a>
            <a href="#" class="text-muted-foreground hover:text-foreground"> Customers </a>
            <a href="#" class="hover:text-foreground"> Settings </a>
          </nav>
        </SheetContent>
      </Sheet> -->
    </header>
  </div>
</template>

<script setup lang="ts">
import { CircleUser, Menu, Package2, Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import useMenus from '@/hooks/useMenus'

const { sections } = useMenus()

const route = useRoute()

const getLinkClass = (path: string) => {
  return computed(() => {
    return route.path === path
      ? 'transition-colors text-foreground hover:text-foreground active'
      : 'transition-colors text-muted-foreground hover:text-foreground'
  })
}
</script>
