<script>
    import VoiceCommands, {startRecognition} from '../../components/VoiceCommands.svelte';
   startRecognition();
</script>


<div id="page">
    <VoiceCommands />
</div>


<style>
    #page {
        height: 100vh;
        width: 100vw;
        color: darkgoldenrod;
    }
</style>