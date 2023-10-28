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
    let status =
        localStorage.getItem("status") === "error" ? "error" : "startup";
    let lostConnection = localStorage.getItem("lost-connection");

    // Functions
    function wsOpen() {
        lostConnection = "";
        localStorage.setItem("lost-connection", lostConnection);
        const token = localStorage.getItem("token");
        api.ws.onClose((event) => {
            status = "error";
            lostConnection = new Date().toLocaleString();
            localStorage.setItem("lost-connection", lostConnection);
        });
        api.user.v0.loginWithToken(token, (res) => {
            if (res === "ok") status = "authorized";
            else status = "open";
        });
        api.user.v0.subToken((res) => {
            if (!res.startsWith("error")) {
                localStorage.setItem("token", res);
                status = "authorized";
            }
        });
    }

    $: localStorage.setItem("status", status);

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
    $: console.log("status:", status);
</script>

{#if status === "startup"}
    <article />
{:else if status === "error"}
    <article>
        <h1>Lost Connection</h1>
        <p>The connection to {url} was lost {lostConnection}</p>
        <button on:click={() => location.reload()}>Reload</button>
    </article>
{:else if status === "open"}
    <Login />
{:else if status === "authorized" && mainWindow?.type === "tabs"}
    <Tabs id={mainWindow.id} />
{:else if status === "authorized" && mainWindow?.type === "split"}
    <Split
        childrenIds={mainWindow?.childrenIds}
        isVertical={mainWindow?.state.isVertical}
    />
{/if}
