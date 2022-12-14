<script>
    import {onMount} from "svelte";
    import { browser} from "$app/environment";

    let socket;
    if (browser) {
        socket = new WebSocket("ws://localhost:8000/chat")
        socket.addEventListener("open", ()=> {
            console.log("Opened")
        })
    }

</script>