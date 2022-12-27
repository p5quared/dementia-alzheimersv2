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

    const destinations = ['appointment', 'games', 'tictactoe', 'matching', 'home', 'schedule', 'contact'];
    const grammar = `#JSGF V1.0; grammar destinations; public <destination> = ${destinations.join(' | ')};`
</script>

<h1>{valid}</h1>