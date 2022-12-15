<script>
    let count = 0;

    async function getData() {
        const response = await fetch('/api/testing');
        let product = await response.json();

        console.log(product)
        count = product.count
    }

    async function raiseCount() {
        const response = await fetch('/api/testing', {
            method: 'POST'
        })

        let data = await response.json();

        count = data.count
    }
</script>

<h1>Testing Page!</h1>
<h1>Count: {count}</h1>
<button on:click={() => getData()}>Check Count!</button>
<button on:click={() => raiseCount()}>Raise Count!</button>
