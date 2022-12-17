<script>
    import {boardStore} from './stores.ts';

    export let index;

    $: current = $boardStore.history[$boardStore.stepNumber]
    $: value = current.board[index];
</script>

<style>
    button {
        background: #fff;
        border: 1px solid #999;
        float: left;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 34px;
        margin: -1px;
        padding: 0;
        text-align: center;
        width: 34px;
    }

    button:focus {
        outline: none;
    }
</style>

<button on:click={ () => boardStore.move(index) }>{ value }</button>