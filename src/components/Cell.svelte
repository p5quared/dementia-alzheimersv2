<script>
    export let peekTwo
    export let cell
    export let onHandleClick
</script>

<div
        class="cell {peekTwo.includes(cell.key) ? 'peek' : ''} {cell.solved ? 'solved' : ''}"
        data-cell-val="{cell.val}"
        style="--img: {cell.img}"
        on:click={() => onHandleClick(cell.key)}
        on:keypress={() => onHandleClick(cell.key)}>
</div>



<style scoped>
    .cell {
        position: relative;
        width: var(--cell-size);
        height: var(--cell-size);
        border-radius: 3px;
        margin: calc(var(--padd) * 0.5);
        transform-style: preserve-3d;
        transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .cell:after,
    .cell:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 3px;
    }

    .cell:before {
        content: attr(data-cell-val);
        transform: rotateY(180deg);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 48px;
        font-weight: 800;
        /* background-image: var(--img); */
        background-image: var(--img);
        color: #fff;
        transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .cell:after {
        backface-visibility: hidden;
        background: #444;
        z-index: 1;
    }

    /* .cell:hover, */
    .cell.peek,
    .cell.solved {
        transform: rotateY(180deg);
    }

    .cell.solved:before {
        background: lightblue;
    }
</style>