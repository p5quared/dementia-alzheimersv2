<script>
    import {GoogleMap, GoogleMapMarker} from "@beyonk/svelte-googlemaps";
    import {PUBLIC_GOOGLE_MAPS_KEY} from "$env/static/public";
    import VoiceCommands, {startRecognition} from "../../components/VoiceCommands.svelte";

    let appointments = [
        {
            date: "Tomorrow, Feb 29, 2023 @10AM",
            desc: "Annual Checkup",
            doctor: "Dr. Van Nostrand",
            hospital: "Mount Sinai West",
            address: "1000 10th Ave, New York, NY 10019",
            center: {lat: 40.769760, lng: -73.986950},
            mapLink: "https://maps.apple.com/?daddr=461+1st+Ave,+NY+NY"
        },
        {
            date: "October 31st",
            desc: "An important appointment",
            doctor: "Dr. Clyde Borowitz",
            hospital: "Rockefeller University Hospital",
            address: "1230 York Ave, New York, NY 10065",
            center: {lat: 40.761940, lng: -73.955430},
            mapLink: "https://maps.apple.com/?daddr=Rockefeller+University+Hospital"
        },
        {
            date: "December 23rd",
            desc: "Colonoscopy",
            doctor: "Dr. Dolittle",
            hospital: "NY Presbyterian",
            address: "170 William St, New York, NY 10038",
            center: {lat: 40.710499, lng: -74.005653},
            mapLink: "https://maps.apple.com/?daddr=NY+Presbyterian+Lower+Manhattan"
        },
    ]
    let selectedAppointment = 0;
    let prev_length_proxy = 0
    let previousAppointments = [];
    let nextHandler = () => {
        previousAppointments.push(selectedAppointment)
        selectedAppointment += 1;
        prev_length_proxy += 1;
        selectedAppointment %= appointments.length;
    }

    let previousHandler = () => {
        selectedAppointment = previousAppointments.pop()
        prev_length_proxy -= 1
    }
    startRecognition();
</script>

<VoiceCommands />
<div class="wrapper">
    <h1>Here are your upcoming appointments:</h1>
    <div id="body">
        <div class="map-wrapper">
            {#key selectedAppointment}
                <GoogleMap apiKey={PUBLIC_GOOGLE_MAPS_KEY} zoom={16} center={appointments[selectedAppointment].center}>
                    <GoogleMapMarker lat={appointments[selectedAppointment].center.lat}
                                     lng={appointments[selectedAppointment].center.lng}/>
                </GoogleMap>
                <br><br>
                <a id="mapLink" target="_blank" rel="noreferrer" href="{appointments[selectedAppointment].mapLink}">Directions</a>
            {/key}
        </div>
        <div>
            <div id="information">
                <ul>
                    <li>
                        -{appointments[selectedAppointment].date}
                    </li>
                    <li>
                        -{appointments[selectedAppointment].doctor}
                    </li>
                    <li>
                        -{appointments[selectedAppointment].hospital}
                    </li>
                    <li>
                        -{appointments[selectedAppointment].address}
                    </li>
                </ul>
                <button on:click={nextHandler} on:keypress={nextHandler}>Next Appointment</button>
                {#if prev_length_proxy > 0}
                    <button on:click={previousHandler}>Previous Appointment</button>
                {/if}
            </div>
            <a href="/">Return to Home Menu</a>
        </div>
    </div>
</div>

<style>
    .wrapper {
        background-color: #3C6E71;
        color: var(--color-offwhite);
        padding: 4em;
        height: 100vh;
    }

    #body {
        display: flex;
        gap: 2em;
        padding-top: 3em;
    }

    #information {
        background-color: #284b63;
        padding: 1em;
        margin-bottom: 1em;
        font-size: 32px;
        width: 500px;
    }

    button {
        background-color: #3C6E71;
        color: var(--color-offwhite);
        padding: 0.7em;
        font-size: 18px;
    }

    a {
        padding: 0.5em 0.5em;
        background-color: #284B63;
        color: var(--color-offwhite);
        border: solid black;

        font-size: 20pt;
        font-weight: bold;
    }

    li {
        padding-top: 1em;
    }

    ul {
        padding-bottom: 0.75em;
    }

    .map-wrapper {
        width: 800px;
        height: 600px;
    }

    h1 {
        font-size: 54px;
    }
</style>
