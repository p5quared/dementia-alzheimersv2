<script>
    import "../reset.css"
    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";
    import ExpandingLink from "$components/ExpandingLink.svelte";
    import VoiceCommands from "$components/VoiceCommands.svelte";

    let size = "54px";
    const sizes = {
        s: "32px",
        m: "54px",
        l: "72px"
    }
    const resize_text = (e)=>{
        size = e.detail.new_size;
        console.log(size)
    }

</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<VoiceCommands />
<section>
    <Header {sizes} on:resize={resize_text}/>
    <nav class="main-content" style="--font-size: {size}">
        <ul>
            <li>
                <ExpandingLink link={"/games/singleplayer"}>Single-player</ExpandingLink>
            </li>
            <li>
                <ExpandingLink link={"/games/multiplayer"}>Multiplayer</ExpandingLink>
            </li>
        </ul>
    </nav>
    <a id="return"
       href="/"
       style="--font-size: {size}">Return</a>
    <Footer/>
</section>

<style>
    section {
        height: 100vh;
        display: flex;
        flex-direction: column;

    }

    .main-content {
        display: flex;
        flex-direction: column;

        justify-content: space-around;
        height: 100%;
    }
    #return {
        text-decoration: none;
        color: var(--color-offwhite);
        align-self: center;
        margin: 1.5em;
        padding: 0.5em;
        background-color: #3C6E71;
        font-size: var(--font-size);
        outline: var(--color-offblack) 2px solid;
    }


    ul {
        display: flex;
        justify-content: space-around;
        padding-inline: 3em;
        padding-top: 1em;
    }

    li {
        font-size: var(--font-size);
        text-align: center;
    }
</style>