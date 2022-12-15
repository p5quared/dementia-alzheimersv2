<script>
    let product = {};

    async function getData() {
        const response = await fetch('/api/test');
        product = await response.json();

        console.log(product)
    }

</script>

<h1>Testing Page!</h1>
<button on:click={() => getData()}> GET DATA! </button>