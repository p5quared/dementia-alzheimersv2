<script>
    import {boardStore_private} from "../../../stores.ts";

    export let index;
    export let game_id;

    $: current = $boardStore_private.history[$boardStore_private.stepNumber]
    $: value = current.board[index];

    const handleMove = async () => {
        // update from server
        const response = await fetch('/api/tictactoe', {
                method: 'GET'
            }
        )
        const data = await response.json()

        $boardStore_private.history = data.gameState.history
        $boardStore_private.xIsNext = data.gameState.xIsNext
        $boardStore_private.stepNumber = data.gameState.stepNumber

        // move on client
        $boardStore_private.move(index)

        // move on server
        const toServer = {
            history: $boardStore_private.history,
            xIsNext: $boardStore_private.xIsNext,
            stepNumber: $boardStore_private.stepNumber
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