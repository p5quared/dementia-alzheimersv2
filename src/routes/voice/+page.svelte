<script>
    let valid = true;
    try {
        let recognition = window.SpeechRecognition || webkitSpeechRecognition;
    } catch (e) {
        console.error(e);
        valid = false;
    }
    const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    const destinations = ['appointment', 'games', 'tic-tac-toe', 'matching', 'home', 'schedule', 'contact', 'beam me up scotty'];
    const grammar = `#JSGF V1.0; grammar destinations; public <destination> = ${destinations.join(' | ')};`

    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);

    // settings
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // logic
    let location = "";
    let visualize = false;

    recognition.onresult = (event) => {
        const dest = event.results[0][0].transcript;
        console.log(dest)
        location = dest;
        visualize = false;

        const words = location.split(" ");
        let match = "";
        for (const word of words) {
            if(destinations.includes(word)){
                match = word
                break
            }
        }


        switch (match) {
            case 'home' || 'beam me up scotty':
                window.location = '/'
                break
            case 'appointment':
                window.location = '/schedule'
                break
            case 'schedule':
                window.location = '/schedule'
                break
            case 'games':
                window.location = '/games'
                break
            case 'tic-tac-toe':
                window.location = '/games/tictactoe'
                break
            case 'matching':
                window.location = '/games/matching'
                break
            case 'contact':
                window.location = '/contact'
                break
        }
    }

    const startRecognition = () => {
        recognition.start();
        visualize = true;
        console.log('Ready to recieve voice command.')
    }

</script>

<div id="page-wrapper">
    <div id="visualizer">

    </div>
    <h1>Voice</h1>
    <button on:click={startRecognition}>Begin</button>
    {#if location}
        <h2>Location: {location}</h2>
    {/if}

</div>

<style>
    #page-wrapper {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
</style>




