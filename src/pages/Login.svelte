<script>
    import { api } from "../js/api.js";
    let error = ""
    let showError = false
    let username = "admin"
    let password = "admin"
    function login() {
        api.users.login(username, password)
    }
    api.users.onLogin(res => {
        if (error === "") error = res
        else error = error + "\n" + res
        showError = true
    })
    api.users.onToken(res => {
        localStorage.setItem("token", res)
        localStorage.setItem("username", username)
    })
</script>

<article>
    <h1>Login</h1>
    <label for="username"
        >Username <br />
        <input
            type="text"
            class="fill-width"
            id="username"
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
    <button class="fill-width purple" on:click={() => login()}>Login</button>
    <pre class="error" class:display-none={!showError}>{error}</pre>
</article>

<style>
    article {
        width: 25rem;
    }
    .error {
        padding: var(--gap-xs) var(--gap-sm);
        background-color: var(--color-bg-red);
        color: var(--color-text-red);
        border: var(--border);
        border-color: var(--color-border-red);
    }
</style>
