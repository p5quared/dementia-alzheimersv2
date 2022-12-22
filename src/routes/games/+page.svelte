<script>
    import "../reset.css"

    let size = "54px";
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<section>
    <header>
        <h1>Games</h1>
        <div class="accessibility-features">
            <div class="reader">
                <h2>Reader</h2>
                <img id="reader-icon" src="/images/speaker_icon.svg" alt="Microphone"/>
            </div>
            <div class="text-resize">
                <button id="small"
                        on:click="{()=> size = '36px'}">a
                </button>
                <button id="medium"
                        on:click="{()=> size = '54px'}">A
                </button>
                <button id="large"
                        on:click={()=> size = '72px'}>A
                </button>
            </div>
        </div>
    </header>
    <div class="main-content">
        <nav style="--font-size: {size}">
            <ul>
                <li>
                    <a href="/games/match">
                        Matching
                        <img class="game-thumb" src="/images/matching.jpeg" alt="matching game" />
                    </a>
                </li>
                <li>
                    <a href="/games/tictactoe">
                        TicTacToe
                        <img class="game-thumb" src="/images/tictactoe.png" alt="tictactoegame" />
                    </a>
                </li>
                <li>
                    <a href="/games/testing">
                        Testing
                        <img class="game-thumb" src="/images/testing.png" alt="testing-game" />
                    </a>
                </li>
            </ul>
        </nav>
        <a id="return" href="/">Return</a>
    </div>
</section>

<style>
    section {
        height: 100vh;
        display: flex;
        flex-direction: column;

    }
    header {
        padding-inline: 15em;

        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #3C6E71;
        color: var(--color-offwhite);
        height: 7em;
    }

    .main-content {
        display: flex;
        flex-direction: column;

    }

    h1 {
        align-self: center;
        font-size: 54px;
        text-wrap: none;
    }

    .accessibility-features {
        display: flex;
        align-items: center;
        gap: 2em;
    }

    h2 {
        font-size: 32px;
    }

    .reader {
        display: flex;
        gap: 1em;
        background-color: #284B63;
        padding: 1em;
    }

    #reader-icon {
        height: 2em;
    }

    .text-resize {
        display: flex;
        gap: 1.5em;
        align-items: baseline;
    }

    #small {
        font-size: 24px;
    }

    #medium {
        font-size: 32px;
    }

    #large {
        font-size: 42px;
    }

    ul {
        display: flex;
        justify-content: space-around;
        padding-inline: 3em;
        padding-top: 1em;

    }

    li {
        font-size: var(--font-size);
        border-bottom: 3px solid var(--color-offblack);
        border-top: 3px solid var(--color-offblack);
        padding: 0.5em;

        transition: 1s;
        background: linear-gradient(#3C6E71, #3C6E71) no-repeat, var(--color-offwhite);
        background-size: 100% 0;
        background-position: center;
    }

    li:hover {
        background-size: 100% 100%
    }

    a {
        text-decoration: none;
        color: var(--color-offblack);
        font-size: var(--font-size);

    }

    .game-thumb {
        width: 200px;
    }

    #return {
        align-self: center;
        padding: 0.5em;
        background-color: #284B63;
        color: var(--color-offwhite);
        border: solid black;

        font-size: 24pt;
        font-weight: bold;
        width: fit-content;
    }
</style>
