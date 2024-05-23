<template>
  <div class="size-full flex flex-col items-center">
    <h1>Welcome, {{ name ? name : 'please, enter your name' }}</h1>
    <h1 >Connected state: <span :class="[connected ? 'text-green-500' : 'text-red-500', 'font-semibold']">{{ connected  }}</span></h1>
    <ModalView :isOpen="modal" @update:isOpen="$event => (modal = $event)" @update:name="$event => checkUsername($event)" v-if="!name"/>
    
    <div class="size-full min-h-[95.75vh] flex flex-row p-2">
      <div class="md:w-3/12 lg:w-2/12 2xl:w-1/12 md:inline-block hidden px-1">
        <div class="size-full shadow-inner rounded-lg shadow-slate-200 p-4">
          <div>Список пользователей</div>
          <hr />
          <ul v-for="user in users" :key="user">
            <li class="font-mono font-semibold">{{ user }}</li>
          </ul>
        </div>
      </div>
      <div class="md:w-9/12 lg:w-10/12 2xl:w-11/12 w-full px-1">
        <ChatView v-if="name"/>
      </div>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { ref, onUpdated, computed, onMounted } from 'vue';
import { state, socket } from "@/socket";

import ChatView from '@/components/ChatView.vue'
import ModalView from '@/components/ModalView.vue'

const modal = ref(true)
const name = ref(localStorage.username)
const users = ref([name.value, 'Ivan', 'John'])
const messages = ref([])

// console.log(users.value);

const connected = computed(() => {
  return state.connected
})

function checkUsername(username: string) {
  if(users.value.some((user: string) => user === username)) {
    name.value = `${username}_1`
    return  localStorage.setItem('username', `${username}_1`)
  }
  name.value = username
  localStorage.setItem('username', username)
}

onMounted(() => {
  // if(!connected.value) socket.connect()
  // messages.value = socket.listMessages()
})

onUpdated(() => { 
  users.value
  if(localStorage.username) name.value = localStorage.username
  localStorage.setItem('username', name.value)
})
</script>