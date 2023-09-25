<script>
    let showError = false
    let username = "admin"
    let password = "okayokay"
    function login() {
        showError = true
    }
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
    <div class="error" class:display-none={!showError}>error...</div>
</article>

<style>
    article {
        width: 20rem;
    }
    .error {
        padding: var(--gap-xs) var(--gap-sm);
        background-color: var(--color-bg-red);
        color: var(--color-text-red);
        border: var(--border);
        border-color: var(--color-border-red);
    }
</style>
