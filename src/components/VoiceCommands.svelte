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

    const destinations = ['appointment', 'games', 'Tic-tac-toe', 'matching', 'home', 'schedule', 'contact', 'sandwich', 'back'];
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
            case 'back':
                window.history.back();
                break
            case 'sandwich':
                window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                break
        }
    }


    let notify = false;
    recognition.onaudiostart = () => {
        notify = true;
        console.log("NOTIFYING")
    }
    recognition.onaudioend = () => {
        notify = false;
        console.log("NO LONGER NOTIFYING")
    }

    const startRecognition = () => {
        recognition.start();
        visualize = true;
    }

</script>

{#if valid}
    {#key notify}
        <button on:click={() => startRecognition()} class:notify>
            <img src="/images/voice_commands_icon.svg" alt="Voice Commands">
        </button>
    {/key}
{/if}

<style>
    button {
        position: fixed;
        bottom: 0;
        right: 0;
        color: red;

        height: 75px;
        width: 75px;
        border-radius: 50%;

        margin-right: 3em;
        margin-bottom: 8em;

       /* Animations */
        transform: rotate(125deg);
        transition: 1s;
        background: linear-gradient(30deg, #3c6e71, #3c6e71) no-repeat white;
        background-size: 100% 0;
        background-position-x: 50%;
    }

    button:hover {
        background-size: 100% 100%;
        cursor: pointer;
    }

    button:hover img {
        fill: white;
    }

    img {
        transform: rotate(-125deg);
        width: 80%;
        height: 80%;
    }

    .notify {
        background-color: orangered;
        box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
        }
        70% {
            box-shadow: 0 0 0 50px rgba(255, 0, 0, 0.3);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
        }
    }
</style>




