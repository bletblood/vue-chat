import { Manager } from "socket.io-client";

const URL = "http://79.137.207.118:8090";
const manager = new Manager(URL, {path: '/chat', autoConnect: false});
export const socket = manager.socket('/');