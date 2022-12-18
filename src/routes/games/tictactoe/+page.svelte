<script>
    import Board from './Board.svelte';
    import {boardStore, calculateWinner} from './stores';
    import { onMount, onDestroy } from "svelte";

    let status;
    let winner;
    boardStore.subscribe(store => {
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

    const handleReset = () => {
        boardStore.jumpTo(0);
        sendStore();
    }

    const getStore = async () => {
        console.log("Getting from server...")
        const response = await fetch('/api/tictactoe', {
                method: 'GET'
            }
        )
        const data = await response.json()

        $boardStore.history = data.gameState.history
        $boardStore.xIsNext = data.gameState.xIsNext
        $boardStore.stepNumber = data.gameState.stepNumber
    }

    const sendStore = async () => {
        const toServer = {
            history: $boardStore.history,
            xIsNext: $boardStore.xIsNext,
            stepNumber: $boardStore.stepNumber
        }
        await fetch('/api/tictactoe', {
            method: 'POST',
            body: JSON.stringify(toServer)
        })
    }


    const interval = setInterval(() => {
        getStore()
    }, 1000);

    onDestroy( () => {
        console.log("Destroying element...")
        clearInterval(interval)
    });

</script>

<div class='game'>
    <div class='game-board'>
        <Board/>
    </div>
    <div class='game-info'>
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
    <button on:click={handleReset}>Reset</button>
</div>

<style>
    .game {
        font: 14px "Century Gothic", Futura, sans-serif;
        margin: 20px;
        display: flex;
        flex-direction: row;
    }

    .game-info {
        margin-left: 20px;
    }
</style>
