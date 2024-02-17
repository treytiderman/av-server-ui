<script>
    // Components
    import Layout from "../layout-v0/Layout.svelte";
    import Api_Login from "./Api_Login.svelte";

    // State - Main
    export let status = "startup";
    export let href = "href";
    export let lostConnectionAt = "lostConnectionAt";
</script>

<!-- API Offline / Demo / UI Dev Only -->
{#if status === "offline"}
    <Layout />

<!-- API Disconnected -->
{:else if status === "closed"}
    <div class="page flow">
        <h1>Lost Connection</h1>
        <p>Connection to {href} was lost {lostConnectionAt}</p>
        <button on:click={() => location.reload()}>Reload</button>
    </div>

<!-- API Connected & NOT Logged In -->
{:else if status === "login" || status === "connected"}
    <Api_Login on:login />

<!-- API Connected & Logged In -->
{:else if status === "authorized"}
    <Layout />
{/if}
