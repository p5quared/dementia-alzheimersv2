<script>
    import Board from './tictactoe/Board.svelte';
    import Header from "../../../components/Header.svelte";
    import Footer from "../../../components/Footer.svelte";
    import {boardStore_global, boardStore_private, calculateWinner} from './tictactoe/stores.ts';
    import { onMount, onDestroy } from "svelte";

    import GlobalBoard from "./Board2.svelte";


    // Tic-Tac-Toe Online State Logic
    let status;
    let winner;
    boardStore_global.subscribe(store => {
        winner = calculateWinner(store.history[store.history.length - 1].board);
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${store.xIsNext ? 'X' : 'O'}`;
        }
    });

    onMount(async () => {
        await getStore()
    })

    const resetGlobal = () => {
        boardStore_global.jumpTo(0);
        sendStore();
    }

    const resetPrivate = () => {
        boardStore_private.jumpTo(0);
        sendStore(room_id);
    }

    const getStore = async () => {
        console.log("Getting from server...")
        const response = await fetch('/api/tictactoe' + new URLSearchParams({
           id:room_id
        }), {
                method: 'GET'
            }
        )
        const data = await response.json()

        $boardStore_global.history = data.global.history
        $boardStore_global.xIsNext = data.global.xIsNext
        $boardStore_global.stepNumber = data.global.stepNumber

        if (data.private) {
            valid_room = true
            $boardStore_private.history = data.private.history
            $boardStore_private.xIsNext = data.private.xIsNext
            $boardStore_private.stepNumber = data.private.stepNumber
        }
    }

    const sendStore = async (_id=null) => {
        const toServer = {
        global: {
            history: $boardStore_global.history,
            xIsNext: $boardStore_global.xIsNext,
            stepNumber: $boardStore_global.stepNumber,
        },
           id: _id
    }
        await fetch('/api/tictactoe', {
            method: 'POST',
            body: JSON.stringify(toServer)
        })
    }


    const interval = setInterval(() => {
        getStore()
        if(room_id && valid_room) {
            return
        }
    }, 1000);

    onDestroy( () => {
        console.log("Destroying element...")
        clearInterval(interval)
    });

    // so begins the private game code
    let valid_room = false;
    let room_id = "";

    const handleCreateRoom = async () => {
        const response = await fetch('/api/tictactoe', {
            method: 'POST',
            body: null
        })
        room_id = data.room_id
        const data = await response.json()
        valid_room = true
    }
</script>

<section>
    <Header />
    <div class="games">
        <div class='global-game'>
            <h1>Global Tic-Tac-Toe</h1>
            <p>This board updates to moves <br> made by anyone, from anywhere!</p>
            <div class='game-board'>
                <Board/>
                <div>{status}</div>
            </div>
            <!--
            <ol>
                {#each $store.history as step, move}
                    <li on:click={ () => store.jumpTo(move) }  on:keypress={ () => store.jumpTo(move)}>
                        {#if move}
                            <button>Go to move # { move }</button>
                        {:else}
                            <button>Go to game start</button>
                        {/if}
                    </li>
                {/each}
            </ol>
            -->
            <div class="buttons">
                <button class="reset" on:click={resetGlobal}>Reset</button>
            </div>
        </div>

        <div class='private-game'>
            <h1>Private Tic-Tac-Toe</h1>
            <p>Enter a room ID to join another <br>player, or create a new room.</p>
            {#if valid_room}
            <div class='game-board'>
                <GlobalBoard/>
                <div>{status}</div>
            </div>
            <!--
            <ol>
                {#each $store.history as step, move}
                    <li on:click={ () => store.jumpTo(move) }  on:keypress={ () => store.jumpTo(move)}>
                        {#if move}
                            <button>Go to move # { move }</button>
                        {:else}
                            <button>Go to game start</button>
                        {/if}
                    </li>
                {/each}
            </ol>
            -->
            <div class="buttons">
                <button class="reset" on:click={resetGlobal}>Reset</button>
            </div>
                {:else}
                <div class="room-finder">
                    <form class="room-form">
                        <label for="room">Room ID:</label>
                        <input type="text" id="room" name="room" placeholder="Enter a room ID">
                        <input type="submit" value="Join" class="submit">
                    </form>
                    <p style="text-align: center">or</p>
                    <button class="create-room">Create Room</button>
                </div>
            {/if}

        </div>
    </div>
    <a class="return" href="/games">Return</a>
    <Footer />
</section>

<style>
    section {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .games {
        font: 14px "Century Gothic", Futura, sans-serif;
        display: flex;

        justify-content: space-around;
    }

    .game-board {
        padding-bottom: 2em;
        width: 300px;
    }

    button, .submit {
        background-color: #3C6E71;
        color: var(--color-offwhite);
        padding: 0.7em;
        font-size: 18px;
    }

    .room-finder {
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 1em;
    }

    .submit {
        padding: 0.1em;
    }

    .room-form {
        font-size: 20px;
        padding-top: 1em;
    }

    .room-form input{
        font-size: 1em;
    }

    .return {
        align-self: center;
        padding: 0.5em;
        background-color: #284B63;
        color: var(--color-offwhite);
        border: solid black;

        font-size: 32px;
        font-weight: bold;
        width: fit-content;
    }
    h1 {
        font-size: 2em;
    }
    p {
        font-size: 1.2em;
    }
</style>
