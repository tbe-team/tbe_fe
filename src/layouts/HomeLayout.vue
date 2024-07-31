<template>
  <div class="flex flex-col w-full min-h-screen bg-muted">
    <!-- <Sidebar /> -->
    <div class="flex flex-col flex-1 sm:gap-2 sm:py-2 lg:pl-80">
      <header class="flex h-14 items-center justify-between gap-4 px-4 lg:h-[60px] lg:px-6">
        <!-- <SidebarMobile /> -->
        <a href="/" class="flex items-center justify-start gap-2 font-semibold lg:hidden">
          <Logo class="object-contain w-12 h-8" />
          <span class="text-lg font-bold">ProjectEnergyAdmin</span>
        </a>
        <div class="relative flex-1 ml-auto grow-0">
          <Button variant="outline" size="icon" class="w-8 h-8 ml-auto">
            <Bell class="w-4 h-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="w-5 h-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel
              >{{ userInfo?.last_name }} {{ userInfo?.first_name }}</DropdownMenuLabel
            >
            <!-- <DropdownMenuLabel>Settings</DropdownMenuLabel> -->
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="() => $router.push({ name: 'OrganizationSettings' })">
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem @click="() => $router.push({ name: 'OrganizationSettings' })">
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              class="flex justify-between gap-1"
              @click="() => $router.push({ name: 'OrganizationSettings' })"
            >
              Create Team
              <CirclePlus class="w-3.5 h-3.5 justify-end" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <!-- <DropdownMenuItem @click="toLogin()">Logout</DropdownMenuItem> -->
            <DropdownMenuItem class="text-red-500 duration-300 hover:bg-red-100 bg-red-50">
              <div class="flex items-center gap-1">
                <LogOut class="w-3.5 h-3.5 text-red-500" />
                Logout
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main class="flex flex-col flex-1 gap-4 p-4 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// import Logo from '@/assets/logo.vue'
import { Bell, CirclePlus, CircleUser, LogOut } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import Sidebar from '@/components/SidebarComponent.vue'
// import SidebarMobile from '@/components/SidbarMobile.vue'

import { onMounted } from 'vue'

import { storeToRefs } from 'pinia'
import { getCurrentUser } from '@/api/user'
import { useUserStore } from '@/stores/userStore'
import { useToast } from '@/components/ui/toast'

const { setUserInfo } = useUserStore()
const { toast } = useToast()
const { userInfo } = storeToRefs(useUserStore())

onMounted(async () => {
  try {
    const response = await getCurrentUser()
    const data = response.data

    const userInfo = {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      role: data.role,
      created_at: new Date(data.created_at), // Chuyển đổi thành đối tượng Date
      updated_at: data.updated_at ? new Date(data.updated_at) : null // Xử lý trường hợp có thể là null
    }
    setUserInfo(userInfo)
  } catch (error) {
    console.error('Failed to fetch user info', error)
    toast({
      title: 'Failed to fetch user info',
      // description: error.message,
      variant: 'destructive'
    })
  }
})
</script>
