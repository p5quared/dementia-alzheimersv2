<script>
   export let link;
   export let image = false;
</script>

<a href={link}>
    <slot/>
    {#if image}
        <img src={image} alt="image"/>
    {/if}
</a>

<style>


    a {
        text-decoration: none;
        color: var(--color-offblack);
        font-size: var(--font-size);

        padding: 0.5em;

        border-bottom: 3px solid var(--color-offblack);
        border-top: 3px solid var(--color-offblack);

        transition: 1s;
        background: linear-gradient(#3C6E71, #3C6E71) no-repeat, var(--color-offwhite);
        background-size: 100% 0;
        background-position: center;
    }

    a:hover {
        background-size: 100% 100%;
    }

    img {
        width: 3em;
        height: 3em;
        margin-left: 0.5em;
    }


</style>
