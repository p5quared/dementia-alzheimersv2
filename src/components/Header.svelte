<script>
    import { createEventDispatcher} from "svelte";
    import { logged_in, user } from "./stores.js";
    import Modal from "./Modal.svelte";

    export let sizes = {s:0, m:0, l:0};

    const dispatch = createEventDispatcher();
    function resize(size) {
        dispatch('resize', {
            new_size: size
        });
    }

    let loginVisibile = false;

    let username_interim, password_interim;

    const attemptLogin = () => {
        const username_exists = accounts.some((account) => account.username === username_interim);
        const valid_login = accounts.some((account) => account.username === username_interim && account.password === password_interim);

        if (username_exists && valid_login) {
            console.log("Login successful");
            setTimeout(() => {
                loginVisibile = false;
                logged_in.set(true);
                user.set(username_interim)
            }, 3000);
        } else {
            console.log("Login failed");
        }
        return 0;
    }

    const attemptRegister = () => {
        const username_taken = accounts.some((account) => account.username === username_interim);

        if (username_taken) {
            console.log("Username taken");
        } else {
            accounts.push({
                username: username_interim,
                password: password_interim
            });
            console.log("Account created");
            setTimeout(() => {
                loginVisibile = false;
                logged_in.set(true);
                user.set(username_interim)
            }, 3000);
        }
        return 0;
    }

    let accounts = [
        {
            username: "user",
            password: "user",
            "note": "Obviously, this login system is not secure. It is just a proof of concept.",
        },
        {
            username: "admin",
            password: "admin"
        },
        {
            username: "user",
            password: "user"
        },
        {
            username: "peterv",
            password: "password123"
        }
    ]

    const closeModal = () => {
        username_interim = "";
        password_interim = "";
        loginVisibile = false;
    }
</script>

{#if loginVisibile}
    <Modal on:close="{closeModal}">
        <h1 slot="header">
            Login
        </h1>
        <div id="login-form">
            <label for="username" autofocus>Username</label>
            <input type="text" id="username" bind:value={username_interim}>
            <label for="password">Password</label>
            <input type="password" id="password" bind:value={password_interim}>
            <div id="login-buttons">
                <button on:click={attemptLogin}>Login</button>
                <button on:click={attemptRegister}>Register</button>
            </div>
        </div>
    </Modal>
{/if}

<header>
    <div class="title-box">
        <a href="https://github.com/p5quared/dementia-alzheimersv2">
            <img src="/images/careAD.png" alt="GitHub"/>
            <h1>Care AD</h1>
        </a>
    </div>

    <div class="accessibility-features">
        <div class="reader">
            <h2>Reader</h2>
            <img id="reader-icon" src="/images/speaker_icon.svg" alt="Microphone"/>
        </div>
        <div class="text-resize">
            <button id="small"
            on:click={() => resize(sizes.s)}>a
            </button>
            <button id="medium"
                    on:click={() => resize(sizes.m)}>A
            </button>
            <button id="large"
                    on:click={() => resize(sizes.l)}>A
            </button>
        </div>
        {#if !$logged_in}
        <button id="login" on:click={() => loginVisibile = true}>
                Login
        </button>
            {:else}
            <h2>peterv</h2>
            <svg height="40px" width="50px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60.671 60.671" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <ellipse style="fill:#E7ECEFFF;" cx="30.336" cy="12.097" rx="11.997" ry="12.097"></ellipse> <path style="fill:#E7ECEFFF;" d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9 C48.354,35.818,42.661,30.079,35.64,30.079z"></path> </g> </g> </g></svg>
            {/if}
    </div>
</header>


<style>

    svg {
        margin-left: -30px;
    }
    header {
        padding-inline: 15em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #3C6E71;
        color: var(--color-offwhite);
        height: 7em;

        box-shadow: #0A090C 1px 1px 10px 1px;
    }

    header a {
        display: flex;
        gap: 1em;
        height: 5em;
        color: var(--color-offwhite);
        text-decoration: none;
    }

    h1 {
        align-self: center;
        font-size: 40px;
        text-wrap: none;
    }

    .text-resize {
        display: flex;
        gap: 1.5em;
        align-items: baseline;

    }
    .accessibility-features {
        display: flex;
        align-items: center;
        gap: 2em;
    }

    h2 {
        font-size: 24px;
    }

    .reader {
        gap: 1em;
        background-color: #284B63;
        padding: 0.75em;

        display: flex;
        align-items: center;
        box-shadow: #0A090C 1px 2px 4px 1px;
    }

    #reader-icon {
        height: 2em;
    }

    #login {
        background-color: #284B63;
        padding: 0.5em;
        border: none;
        color: var(--color-offwhite);
        font-size: 24px;

        box-shadow: #0A090C 1px 2px 4px 1px;
    }

    #small {
        font-size: 24px;
    }

    #medium {
        font-size: 32px;
    }

    #large {
        font-size: 42px;
    }

    #login-form {
        font-size: 24px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    #login-form label {
        margin-top: 1em;
    }

    #login-form input {
        padding: 0.5em;
        border-radius: 5px;
        font-size: 24px;
    }

    #login-buttons {
        display: flex;
        gap: 1em;
        justify-content: center;
    }

    #login-buttons button {
        font-size: 24px;

        box-shadow: #0A090C 1px 2px 4px 1px;
    }
</style>
