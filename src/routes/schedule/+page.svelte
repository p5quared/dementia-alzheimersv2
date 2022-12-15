<script>
    import { GoogleMap, GoogleMapMarker } from "@beyonk/svelte-googlemaps";
    import { PUBLIC_GOOGLE_MAPS_KEY } from "$env/static/public";

    let appointments = [
        {
            date: "Tomorrow, Feb 29, 2023 @10AM",
            desc: "Annual Checkup",
            doctor : "Dr. Van Nostrand",
            hospital : "Bellevue Medical Center",
            address : "462 1st Ave, NY, NY 10016",
            center: {lat: 40.765126, lng: -73.964901}
        },
        {
            date: "October 31st",
            desc: "Pray for Life",
            doctor : "Dr. Doofenshmirrtz",
            hospital : "NY Prrresbyterian",
            address : "520 E 70th St",
            center: {lat: 40.71796056595768, lng:-73.98801934421422}
        },
        {
            date: "Friday 13th",
            desc: "This is Grim",
            doctor : "Chuky",
            hospital : "Muhaahhahahahha",
            address : "462 1st Ave, NY, NY 10016",
            center: {lat: -80.06138606671266, lng: 22.38834869840997}
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
        prev_length_proxy
    }
</script>


<div class="wrapper">
    <h1>Here is your next appointment:</h1>
    <div id="body">
        <div class="map-wrapper">
            {#key selectedAppointment}
                <GoogleMap apiKey={PUBLIC_GOOGLE_MAPS_KEY} zoom={16} center={appointments[selectedAppointment].center}>
                    <GoogleMapMarker lat={appointments[selectedAppointment].center.lat} lng={appointments[selectedAppointment].center.lng} />
                </GoogleMap>
            {/key}
        </div>
        <div >
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
                    <button on:click={previousHandler} >Previous Appointment</button>
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
        padding: 3em;
    }
    #body {
        display: flex;
        gap: 2em;
        height: 100vh;
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
        height: 700px;
    }
    h1 {
        font-size: 54px;
    }
</style>

