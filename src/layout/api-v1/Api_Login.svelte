<script>
    import * as user_v1 from "../../pages/user-v1/user-v1";

    // State
    let username = "admin";
    let password = "admin";
    let rememberMe = true;
    let error = "";

    async function login() {
        const response = await user_v1.login(username, password);
        if (response.startsWith("error")) return error = response;
        if (rememberMe) localStorage.setItem("token", response);
        location.reload();
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
            <!-- <div>
                <input
                    type="checkbox"
                    id="rememberMe"
                    bind:checked={rememberMe}
                />
                <label for="rememberMe"> Remember Me </label>
            </div> -->
            <button
                type="submit"
                class="fill-width purple"
                on:click={() => login()}>Login</button
            >
            <div>{error}</div>
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
        background: linear-gradient(
                45deg,
                var(--color-bg-3) 10%,
                transparent 10%,
                transparent 90%,
                var(--color-bg-3) 90%
            ),
            linear-gradient(
                135deg,
                transparent 40%,
                var(--color-bg-2) 40%,
                var(--color-bg-2) 60%,
                transparent 0
            ),
            linear-gradient(
                45deg,
                transparent 40%,
                var(--color-bg-3) 40%,
                var(--color-bg-3) 60%,
                transparent 0
            );
        background-size: 8rem 8rem;
        background-color: var(--color-bg);
        filter: brightness(30%);
    }
    .section {
        box-shadow: 0 4px 1rem black;
    }
</style>
