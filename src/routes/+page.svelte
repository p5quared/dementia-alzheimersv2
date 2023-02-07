<script>
    import "./reset.css"
    import Header from "../components/Header.svelte";
    import ExpandingLink from "../components/ExpandingLink.svelte";
    import Footer from "../components/Footer.svelte";

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

<section>
    <Header {sizes} on:resize={resize_text}/>
    <nav style="--font-size: {size}">
        <ul>
            <li>
                <ExpandingLink link={"schedule"}>Schedule</ExpandingLink>
            </li>
            <li>
                <ExpandingLink link={"/reminders"}>Reminders</ExpandingLink>
            </li>
            <li>
                <ExpandingLink link={"/games"}>Games</ExpandingLink>
            </li>
        </ul>
    </nav>
    <a id="main-voice-link"
       href="/voice"
       style="--font-size: {size}">Click Me to Ask a Command</a>
    <Footer />
</section>

<style>
    section {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    #main-voice-link {
        text-decoration: none;
        color: var(--color-offwhite);
        align-self: center;
        margin: 1.5em;
        padding: 1em;
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
        padding: 0.5em;
    }


    a {
        text-decoration: none;
        color: var(--color-offblack);
        font-size: var(--font-size);
    }
</style>
