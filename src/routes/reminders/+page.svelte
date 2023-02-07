<script>
    import VoiceCommands, {startRecognition} from '../../components/VoiceCommands.svelte';
   startRecognition();

   import Header from "../../components/Header.svelte";
</script>


<div id="page">
    <Header />
    <VoiceCommands />
</div>


<style>
    #page {
        height: 100vh;
        width: 100vw;
        color: darkgoldenrod;
    }
</style>