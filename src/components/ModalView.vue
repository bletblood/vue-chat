<template>
  <dialog id="my_modal_1" className="modal" :open="props.isOpen">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Enter your name</h3>
      <div className="modal-action">
        <form method="dialog" class="w-full flex flex-col" @submit.prevent="onInput">
          <input type="text" placeholder="Type here" name="username" className="input input-bordered mb-2" required/>
          <button class="btn" type="submit">Continue</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['update:isOpen', 'update:name'])
const props = defineProps<{
  isOpen: boolean
}>()

function onInput(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement);

  emit('update:name', formData.get('username'))
  emit('update:isOpen', false)
}
</script>