<script>
    import { user_v1 } from "../api/api.js";
    import Page from "../layout/Page.svelte";

    const data = {
        username: "admin",
        password: "admin",
        error: "",
    };

    async function login() {
        const response = await user_v1.login(data.username, data.password);
        if (response.startsWith("error")) data.error = response;
        else {
            localStorage.setItem("token", response);
            location.reload();
        }
    }
</script>

<Page maxWidth="25rem">
    <h1>Login</h1>
    <label for="username"
        >Username <br />
        <input
            type="text"
            class="fill-width"
            placeholder="username"
            bind:value={data.username}
        />
    </label>
    <label>
        Password <br />
        <input
            type="password"
            class="fill-width"
            placeholder="password"
            bind:value={data.password}
        />
    </label>
    <button class="fill-width purple" on:click={() => login()}>Login</button>
    <div>{data.error}</div>
</Page>

<style>
</style>
