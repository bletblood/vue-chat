<template>
  <div class="size-full min-h-[400px] shadow-inner rounded-lg shadow-slate-200 p-4 flex flex-col justify-between">
    <div class="size-full">
      <ul v-for="msg in message" :key="msg" class="my-1">
        <li class="w-full h-auto bg-blue-50 p-4 rounded-lg flex flex-row items-center">
          <span class="text-sm text-slate-500 bg-blue-100 hidden md:inline-block md:w-auto md:p-1 md:mr-2">{{ msg.date }}</span>
          <span class="font-mono font-semibold text-lg">{{ msg.user }}</span>
          <p>: {{ msg.text }}</p>
        </li>
      </ul>
    </div>

    <form @submit.prevent="sendMessage" class="mt-4">
      <input type="text" placeholder="Type here" name="message" class="input input-bordered w-full" @keydown.enter.shift.exact="sendMessage" required autocomplete="off"/>
      <button class="btn w-full mt-2">Send</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const message = ref([{
  text: "Welcome to the club buddy",
  user: "John",
  date: "23.05.2024, 10:15:47"
}]) as any

function sendMessage(event: Event) {
  const target = event.target as HTMLFormElement
  const formData = new FormData(target);

  message.value.push({
    text: formData.get('message') as string,
    user: localStorage.username as string,
    date: new Date().toLocaleString()
  })
  
  if(message.value.length > 0) {
    localStorage.setItem('message', JSON.stringify(message.value));

    target.reset();
  }
}

if(localStorage.message) {
  message.value = JSON.parse(localStorage.message);
}
</script>
