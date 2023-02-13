<script>
    import Board  from "$components/tictactoe/Board.svelte";
    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";
    import PrivateBoard from "$components/tictactoe_private/Board2.svelte";
    import {boardStore_global, boardStore_private, calculateWinner, game_id} from '$stores';
    import { onMount, onDestroy } from "svelte";

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

    let statusPrivate;
    let winnerPrivate;
    boardStore_private.subscribe(store => {
        winnerPrivate = calculateWinner(store.history[store.history.length - 1].board);
        if (winner) {
            statusPrivate = `Winner: ${winnerPrivate}`;
        } else {
            statusPrivate = `Next player: ${store.xIsNext ? 'X' : 'O'}`;
        }
    });

    onMount(async () => {
        await getServer_pub()
    })

    const resetPublic = () => {
        boardStore_global.jumpTo(0);
        sendStore_pub();
    }

    const getServer_pub = async () => {
        const response = await fetch('/api/tictactoe', {
                method: 'GET'
        })
        const data = await response.json()


        $boardStore_global.history = data.history
        $boardStore_global.xIsNext = data.xIsNext
        $boardStore_global.stepNumber = data.stepNumber
    }

    const sendStore_pub = async () => {
        const toServer = {
            history: $boardStore_global.history,
            xIsNext: $boardStore_global.xIsNext,
            stepNumber: $boardStore_global.stepNumber
        }
        await fetch('/api/tictactoe', {
            method: 'POST',
            body: JSON.stringify(toServer)
        })
    }
    const sendStore_priv = async () => {
        const url = "/api/tictactoe-private?id=" + $game_id;
        const toServer = {
            id: $game_id,
            game_state: {
                history: $boardStore_private.history,
                xIsNext: $boardStore_private.xIsNext,
                stepNumber: $boardStore_private.stepNumber
            }
        }
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(toServer)
        })
    }

    const resetPrivate = () => {
        boardStore_private.jumpTo(0);
        sendStore_priv();
    }
    const newRoom = async () => {
        await fetch('/api/tictactoe-private', {
            method: 'POST',
            body: JSON.stringify({
                id: room_id,
                game_state: null
            })
        })

        valid_room = true;
        game_id.set(room_id)
    }

    const getServer_priv = async () => {
        const url = "/api/tictactoe-private?id=" + $game_id;
        const response = await fetch(url, {
                method: 'GET'
        })
        const data = await response.json()

        $boardStore_private.history = data.history
        $boardStore_private.xIsNext = data.xIsNext
        $boardStore_private.stepNumber = data.stepNumber

        return data
    }

    const interval = setInterval(() => {
        getServer_pub()
        if(valid_room) {
            getServer_priv()
        }
    }, 1000);

    onDestroy( () => {
        console.log("Destroying element...")
        clearInterval(interval)
    });

    // so begins the private game code
    let valid_room = false;
    let room_id = "";
    let handleJoin = () => {
        game_id.set(room_id)
        if (getServer_priv()) {
            valid_room = true;
        }
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
                <button class="reset" on:click={resetPublic}>Reset</button>
            </div>
        </div>

        <div class='private-game'>
            <h1>Private Tic-Tac-Toe</h1>
            <p>Enter a room ID to join another <br>player, or create a new room.</p>
            {#if valid_room}
            <div class='game-board'>
                <PrivateBoard/>
                <div>{statusPrivate}</div>
                <div>Room ID: {room_id}</div>
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
                <button class="reset" on:click={resetPrivate}>Reset</button>
            </div>
            {:else}
            <div class="room-finder">
                <form class="room-form" on:submit={handleJoin}>
                    <label for="room">Room ID:</label>
                    <input type="text" id="room" name="room" placeholder="Enter a room ID" bind:value={room_id}>
                    <input type="submit" value="Join" class="submit">
                </form>
                <p style="text-align: center">or</p>
                <button class="create-room" on:click={newRoom(room_id)}>Create Room</button>
            </div>
            {/if}

        </div>
    </div>
    <a id="return" href="/games">Return</a>
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

    #return {
        text-decoration: none;
        color: var(--color-offwhite);
        align-self: center;
        margin: 1.5em;
        padding: 0.5em;
        background-color: #3C6E71;
        font-size: 1.5em;
        outline: var(--color-offblack) 2px solid;
    }
    h1 {
        font-size: 2em;
    }
    p {
        font-size: 1.2em;
    }
</style>
