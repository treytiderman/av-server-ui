<script>
    // Components
    import Layout from "../layout-v0/Layout.svelte";
    import Api_Login from "./Api_Login.svelte";

    // State - Main
    export let status = "startup";
    export let serverAddress = "serverAddress";
    export let lostConnectionAt = "";
    export let error = "";
</script>

<!-- API Offline / Demo / UI Dev Only -->
{#if status === "offline"}
    <Layout />

<!-- API Disconnected -->
{:else if status === "closed"}
    <div class="page flow">
        {#if lostConnectionAt}
            <h1>Lost Connection</h1>
            <p>Connection to {serverAddress} was lost {lostConnectionAt}</p>
            <button on:click={() => location.reload()}>Reload</button>
        {:else}
            <h1>Could Not Connect</h1>
            <p>Connection to {serverAddress} failed</p>
            <button on:click={() => location.reload()}>Reload</button>
        {/if}
    </div>

<!-- API Connected & NOT Logged In -->
{:else if status === "login" || status === "connected"}
    <Api_Login on:login {error} />

<!-- API Connected & Logged In -->
{:else if status === "authorized"}
    <Layout />
{/if}
