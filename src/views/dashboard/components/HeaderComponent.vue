<script setup lang="ts">
import { Bell, BellRing, CirclePlus, CircleUser, LogOut } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { useToast } from '@/components/ui/toast'
import { useMutation } from '@tanstack/vue-query'
import { logout } from '@/api/auth'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'

import { getCurrentUser } from '@/api/user'
import { getNotification } from '@/api/notification'
import TeamSwitcher from './TeamSwitcher.vue'

interface Notification {
  id: number
  time: string
  content: string
}

const { setUserInfo } = useUserStore()
const { userInfo } = storeToRefs(useUserStore())
const notifications = ref<Notification[]>([])
const { toast } = useToast()
const router = useRouter()

const { isSuccess, mutate } = useMutation({
  mutationFn: () => getCurrentUser(),
  onSuccess: (data: any) => {
    console.log(data.data)
    const userInfo = {
      id: data.data.id,
      first_name: data.data.first_name,
      last_name: data.data.last_name,
      email: data.data.email,
      role: data.data.role,
      created_at: new Date(data.data.created_at), // Chuyển đổi thành đối tượng Date
      updated_at: data.data.updated_at ? new Date(data.data.updated_at) : null // Xử lý trường hợp có thể là null
    }
    setUserInfo(userInfo)
  },
  onError: () => {
    toast({
      title: 'Failed to fetch user info',
      variant: 'destructive'
    })
  }
})

const { mutate: handleLogout } = useMutation({
  mutationFn: () => logout(),
  onSuccess: () => {
    router.push({ name: 'Login' })
    toast({
      title: 'Logout successful',
      description: 'You have successfully logged out.'
    })
  }
})

const { mutate: handleNotification } = useMutation({
  mutationFn: () => getNotification(),
  onSuccess: (data: any) => {
    notifications.value = data.data
  }
})

const formatDate = (date: string | Date) => {
  const dateObj = new Date(date)
  return format(dateObj, 'dd/MM/yyyy HH:mm')
}

onMounted(() => {
  mutate()
  handleNotification()
})
</script>

<template>
  <header
    class="border-b border-b-gray-200 flex h-14 items-center justify-between gap-4 px-4 lg:h-[60px] lg:px-6"
  >
    <TeamSwitcher />
    <a href="/" class="flex items-center justify-start gap-2 font-semibold lg:hidden">
      <Logo class="object-contain w-12 h-8" />
      <span class="text-lg font-bold">ProjectEnergyAdmin</span>
    </a>
    <div class="relative flex-1 ml-auto grow-0">
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" size="icon" class="w-8 h-8 ml-auto">
            <Bell class="w-4 h-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent class="p-4 w-[25rem] mr-[2rem] mt-[0.5rem]">
          <div class="flex flex-col gap-4">
            <h4 class="font-medium leading-none">Notifications</h4>
            <ScrollArea class="overflow-y-auto max-h-[23rem]">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="flex flex-col items-start mb-4"
              >
                <div class="flex flex-row items-start">
                  <Label class="flex-shrink-0 w-12">
                    <div
                      class="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full"
                    >
                      <BellRing class="w-3.5 h-3.5" />
                    </div>
                  </Label>
                  <div class="flex flex-col flex-grow">
                    <span class="text-sm leading-5 line-clamp-3">{{ notification.content }}</span>
                    <span class="text-xs text-gray-500">{{ formatDate(notification.time) }}</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="secondary" size="icon" class="rounded-full">
          <CircleUser class="w-5 h-5" />
          <span class="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel v-if="isSuccess">{{ userInfo?.first_name }}</DropdownMenuLabel>
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
        <DropdownMenuItem class="text-red-500 duration-300 hover:bg-red-100 bg-red-50">
          <div class="flex items-center gap-1" @click="handleLogout()">
            <LogOut class="w-3.5 h-3.5 text-red-500" />
            Logout
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>
