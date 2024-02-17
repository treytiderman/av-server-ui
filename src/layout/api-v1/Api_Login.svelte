<script>
    // Imports
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // State
    export let error = "";
    export let username = "admin";
    export let password = "admin";
    let rememberMe = false;

    async function login() {
        dispatch("login", { username, password, rememberMe });
        // const response = await user_v1.login(username, password);
        // if (response.startsWith("error")) return error = response;
        // if (rememberMe) localStorage.setItem("token", response);
        // location.reload();
    }
</script>

<div class="wrapper">
    <article class="page flow max-width">
        <form class="section flow" on:submit|preventDefault={() => {}}>
            <h2 class="border-bottom">AV-Server</h2>
            <h3>Login</h3>
            <label for="username"
                >Username <br />
                <input
                    type="text"
                    class="fill-width"
                    placeholder="username"
                    bind:value={username}
                />
            </label>
            <label>
                Password <br />
                <input
                    type="password"
                    class="fill-width"
                    placeholder="password"
                    bind:value={password}
                />
            </label>
            <div>
                <input
                    type="checkbox"
                    id="rememberMe"
                    bind:checked={rememberMe}
                    title=""
                />
                <label for="rememberMe"> Remember Me </label>
            </div>
            <button
                type="submit"
                class="fill-width purple"
                on:click={() => login()}>Login</button
            >
            <div class:hide={!error}>{error}</div>
        </form>
    </article>
</div>

<style>
    .wrapper {
        height: 100%;
        position: relative;
    }
    article.max-width {
        padding-top: 4rem;
        max-width: 25rem;
        z-index: 2;
    }

    /* Background + Shadow */
    .wrapper::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        filter: brightness(80%);

        background-color: var(--color-bg);
        background:
            radial-gradient(
                circle,
                transparent 20%,
                var(--color-bg) 20%,
                var(--color-bg) 80%,
                transparent 80%,
                transparent
            ),
            radial-gradient(
                    circle,
                    transparent 20%,
                    var(--color-bg) 20%,
                    var(--color-bg) 80%,
                    transparent 80%,
                    transparent
                )
                100px 100px,
            linear-gradient(var(--color-bg-1) 2px, transparent 2px) 0 -1px,
            linear-gradient(90deg, var(--color-bg-1) 2px, var(--color-bg) 2px) -1px 0;
        background-size:
            25px 25px,
            25px 25px,
            100px 100px,
            100px 100px;
    }
    .section {
        box-shadow: 0 4px 1rem black;
    }
</style>
