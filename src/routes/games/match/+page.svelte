<script>
    import Grid from "../../../components/Grid.svelte"
</script>

<div class="wrapper">
    <div class="sub_wrapper">
        <div id="game">
            <Grid/>
        </div>
        <div id="buttons">
            <button>Reset</button>
            <a href="/games">Return to Games</a>
        </div>
    </div>
</div>


<style>
    #game {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }

    #buttons {
    }

    a {
        padding: 0.5em 0.5em;
        background-color: #284B63;
        color: var(--color-offwhite);
        border: solid black;

        font-size: 20pt;
        font-weight: bold;
    }

    button {
        background-color: #3C6E71;
        color: var(--color-offwhite);
        padding: 0.7em;
        font-size: 18px;
    }

    .sub_wrapper {
        display: flex;
        flex-direction: column;
        align-self: center;
        align-items: center;

        width: fit-content;
        margin: 0;
        padding-bottom: 1em;

        gap: 2em;
        background-color: #5603AD;
    }

    .wrapper {
        background-color: #3C6E71;
        width: 100vw;
        height: 100vh;

        display: flex;
        justify-content: center;
    }
</style>