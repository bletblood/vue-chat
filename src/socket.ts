import {reactive} from 'vue'
import{Manager} from 'socket.io-client'

interface ChatAdapterMessage {
  id: string;
  userId: string;
  text: string;
  username: string;
  createdAt: string;
  status: "none" | "receivedByServer";
}

export const state = reactive({
  connected: false,
  message: [] as ChatAdapterMessage[],
  listMessages: [] as ChatAdapterMessage[]
})

const manager = new Manager("http://79.137.207.118:8090", {
  autoConnect: false,
  path: '/chat'
})

export const socket = manager.socket('/')

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('message', (args: ChatAdapterMessage) => {
  state.message.push(args)
})

socket.on('listMessages', (args: ChatAdapterMessage) => {
  state.listMessages.push(args)
})