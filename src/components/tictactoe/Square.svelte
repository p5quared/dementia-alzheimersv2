<script>
    import {boardStore_global} from '$stores';

    export let index;

    $: current = $boardStore_global.history[$boardStore_global.stepNumber]
    $: value = current.board[index];

    const handleMove = async () => {
        // first, update from server
        const response = await fetch('/api/tictactoe', {
                method: 'GET'
            }
        )
        const data = await response.json()

        $boardStore_global.history = data.history
        $boardStore_global.xIsNext = data.xIsNext
        $boardStore_global.stepNumber = data.stepNumber

        // move on client
        boardStore_global.move(index)

        // finally, move on server
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

    button:hover {
        background: #eee;
        cursor: pointer;
    }

</style>

<button on:click={handleMove}>{ value }</button>