<template>
  <div class="size-full flex flex-col items-center">
    <h1>Welcome, {{ name ? name : 'please, enter your name' }}</h1>
    <h1>Connected state:
      <span :class="socket.connected ? 'text-green-500' : 'text-red-500'">{{ socket.connected ? 'connected' :
        'disconnected' }}</span>
      <!-- <button @click="socket.disconnect" class="btn ml-2">Disconnect</button>
      <button @click="socket.connect" class="btn ml-2">connect</button> -->
    </h1>
    <ModalView :isOpen="modal" @update:isOpen="$event => (modal = $event)"
      @update:name="$event => checkUsername($event)" v-if="!name" />

    <div class="size-full min-h-[95vh] flex flex-row p-2">
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
        <ChatView v-if="name" :listMessages="listMessages" @update:message="$event => (message = $event)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated, onMounted, watch } from 'vue';
import { socket } from "@/socket";

import ChatView from '@/components/ChatView.vue'
import ModalView from '@/components/ModalView.vue'

const modal = ref(true)
const name = ref(localStorage.username)
const users = ref(['Ivan', 'John'])

// socket instance
const listMessages = ref([]) as any
const message = ref({}) as any


function checkUsername(username: string) {
  if (username) {
    name.value = username
    localStorage.username = username
    users.value = [...users.value, username]
  }
}

watch(message, () => {
  if (message.value) {
    listMessages.value = [...listMessages.value, message.value]
  }
})

onMounted(() => {
  if (localStorage.username) {
    users.value = [...users.value, localStorage.username]
  }

  // if (name.value) {
  //   socket.connect()
  //   // socket.auth = { username: name.value }
  //   socket.on("connect", () => {
  //     console.log(socket.id)
  //   });
  //   socket.on("connect_error", (err) => {
  //     console.log(err.message);
  //   });
  //   socket.on('message', (data: any) => {
  //     message.value = data
  //   })
  // }
})
</script>