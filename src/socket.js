import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_SERVER_URL

export const socket = io(URL);

socket.on("connect", () => {
    console.log('connected');
    state.connected = true;
});

socket.on("disconnect", (reason) => {
    state.connected = false;
    console.log(reason)
});

socket.on("foo", (...args) => {
    state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
    state.barEvents.push(args);
});