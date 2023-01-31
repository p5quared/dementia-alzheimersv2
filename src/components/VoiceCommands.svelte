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
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || jebkitSpeechRecognitionEvent;

    const destinations = ['appointment', 'games', 'Tic-tac-toe', 'matching', 'home', 'schedule', 'contact', 'sandwich'];
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
            case 'Tic-tac-toe':
                window.location = '/games/tictactoe'
                break
            case 'matching':
                window.location = '/games/matching'
                break
            case 'contact':
                window.location = '/contact'
                break
            case 'sandwich':
                window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        }
    }

    const startRecognition = () => {
        recognition.start();
        visualize = true;
        console.log('Ready to receive voice command.')
    }

</script>

{#if valid}
    <button on:click={startRecognition} id="recognition-button">
        <img src="/images/voice_commands_icon.svg" alt="Voice Commands">
    </button>
{/if}

<style>
    #recognition-button {
        position: fixed;
        bottom: 0;
        right: 0;
        color: red;

        height: 75px;
        width: 75px;
        border-radius: 50%;

        margin-right: 3em;
        margin-bottom: 5em;
    }

    img {
        width: 80%;
        height: 80%;
    }
</style>




