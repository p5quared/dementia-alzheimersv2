<script>
    let count = 0;
    let raisebyValue = 0;

    async function getData() {
        const response = await fetch('/api/testing');
        let product = await response.json();

        console.log(product)
        count = product.count
    }

    async function raiseCount(n) {
        const response = await fetch('/api/testing', {
            method: 'POST',
            body: JSON.stringify({
                quantity: n
            })
        })

        let data = await response.json();

        count = data.count
    }

    async function resetCount() {
        const response = await fetch('/api/testing', {
            method: 'POST',
            body: JSON.stringify({
                reset: true
            })
        })
        let data = await response.json()

        count = data.count
    }
</script>

<h1>Testing Page!</h1>
<h1>Count: {count}</h1>
<button on:click={() => resetCount()}>Reset Count</button>
<button on:click={() => getData()}>Check Count!</button>
<button on:click={() => raiseCount(1)}>Raise Count!</button>
<button on:click={() => raiseCount(5)}>Raise Count by 5!</button>
<label>
    <input type="number" bind:value={raisebyValue} min="0" max="10">
    <input type="range" bind:value={raisebyValue} min="0" max="10">
    <button on:click={() => raiseCount(raisebyValue)}>Raise Count by {raisebyValue}!</button>
</label>
