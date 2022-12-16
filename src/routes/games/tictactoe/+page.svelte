<script>
    import Board from './Board.svelte';
    import {store, calculateWinner} from './stores';

    let status;
    let winner;
    store.subscribe(store => {
        winner = calculateWinner(store.history[store.history.length - 1].board);
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${store.xIsNext ? 'X' : 'O'}`;
        }
    });

    const handleReset = () => {
        store.jumpTo(0)
    }

    const sendStore = async () => {
        const response = await fetch('/api/tictactoe', {
            method: 'POST',
            body: JSON.stringify(store)
        })

        console.log(response.json)
    }
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
    <button on:click={sendStore}>SEND DATA STORE TO SERVER</button>
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
