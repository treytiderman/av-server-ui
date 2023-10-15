<script>
    // Imports
    import { onMount } from "svelte";
    import { api } from "./js/api";
    import { state } from "./js/state.js";

    // Components
    import Login from "./pages/Login.svelte";
    import Tabs from "./pages/WindowTabs.svelte";
    import Split from "./pages/WindowSplit.svelte";

    // Variables
    let url = "ws://192.168.1.1:4622";
    let status = "startup";
    let datetime = new Date().toLocaleString();

    // Functions
    function wsOpen() {
        const token = localStorage.getItem("token");
        api.ws.onClose((event) => (status = "closed"));
        api.user.v0.loginWithToken(token, (res) => {
            if (res === "ok") status = "authorized";
            else status = "open";
        });
        api.user.v0.subToken((res) => {
            if (res === "ok") status = "authorized";
        });
    }

    // Startup
    onMount(async () => {
        api.ws.debug(true);
        api.connect(url, (newStatus) => {
            if (newStatus === "open") wsOpen();
            else status = "error";
        });
    });

    // Dynamic Variables
    $: mainWindow = $state.windows.find((window) => window.parentId === 0);
    $: console.log(status);
</script>

{#if status === "startup"}
    <article />
{:else if status === "error"}
    <article>
        <p>Error connecting to {url}</p>
        <button on:click={() => location.reload()}>Reload</button>
    </article>
{:else if status === "open"}
    <Login />
{:else if status === "closed"}
    <article>
        <h1>Lost Connection</h1>
        <p>The connection was lost {datetime}</p>
        <button on:click={() => location.reload()}>Reload</button>
    </article>
{:else if status === "authorized" && mainWindow?.type === "tabs"}
    <Tabs id={mainWindow.id} />
{:else if status === "authorized" && mainWindow?.type === "split"}
    <Split
        childrenIds={mainWindow?.childrenIds}
        isVertical={mainWindow?.state.isVertical}
    />
{/if}
