<script>
    import {boardStore} from './stores.ts';

    export let index;

    $: current = $boardStore.history[$boardStore.stepNumber]
    $: value = current.board[index];

    const handleMove = async () => {
        // update from server
        const response = await fetch('/api/tictactoe', {
                method: 'GET'
            }
        )
        const data = await response.json()

        $boardStore.history = data.gameState.history
        $boardStore.xIsNext = data.gameState.xIsNext
        $boardStore.stepNumber = data.gameState.stepNumber

        // move on client
        boardStore.move(index)

        // move on server
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
</script>

<style>
    button {
        background: #fff;
        border: 1px solid #999;
        float: left;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 5vw;
        margin: -1px;
        padding: 0;
        text-align: center;
        width: 5vw;
    }

    button:focus {
        outline: none;
    }
</style>

<button on:click={handleMove}>{ value }</button>