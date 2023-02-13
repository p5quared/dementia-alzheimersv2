<script>
    import {boardStore_private, game_id} from "$stores";

    export let index;

    $: current = $boardStore_private.history[$boardStore_private.stepNumber]
    $: value = current.board[index];

    const handleMove = async () => {
        // update from server
        const url = "/api/tictactoe-private?id=" + $game_id;
        const response = await fetch(url, {
            method: 'GET'
        })
        const data = await response.json()

        $boardStore_private.history = data.history
        $boardStore_private.xIsNext = data.xIsNext
        $boardStore_private.stepNumber = data.stepNumber

        // move on client
        boardStore_private.move(index)

        // move on server
        const toServer = {
            id: $game_id,
            game_state: {
                history: $boardStore_private.history,
                xIsNext: $boardStore_private.xIsNext,
                stepNumber: $boardStore_private.stepNumber
            }
        }
        console.log("Sending to server: ", toServer)
        await fetch(url, {
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