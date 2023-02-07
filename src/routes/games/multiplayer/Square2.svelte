<script>
    import {boardStore2} from './stores2.ts';

    export let index;

    $: current = $boardStore2.history[$boardStore2.stepNumber]
    $: value = current.board[index];

    const handleMove = async () => {
        // update from server
        const response = await fetch('/api/tictactoe', {
                method: 'GET'
            }
        )
        const data = await response.json()

        $boardStore2.history = data.gameState.history
        $boardStore2.xIsNext = data.gameState.xIsNext
        $boardStore2.stepNumber = data.gameState.stepNumber

        // move on client
        $boardStore2.move(index)

        // move on server
        const toServer = {
            history: $boardStore2.history,
            xIsNext: $boardStore2.xIsNext,
            stepNumber: $boardStore2.stepNumber
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