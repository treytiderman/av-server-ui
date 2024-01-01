<script>
    // Imports
    import { onMount } from "svelte";
    import { api, user_v1, logger_v0 } from "./js/api";
    import { state } from "./js/state.js";

    // Components
    import Login from "./pages/Login.svelte";
    import Tabs from "./pages/WindowTabs.svelte";
    import Split from "./pages/WindowSplit.svelte";
    import Modal from "./components/Modal.svelte";

    // Variables
    // let url = "wss://2.trey.app";
    let url = "ws://192.168.1.1:4620";
    let status =
        localStorage.getItem("status") === "close" ? "close" : "startup";
    let lostConnection = localStorage.getItem("lost-connection");

    // Startup
    onMount(async () => {
        // api.ws.debug(true);
        api.connect(url, (newStatus) => {
            if (newStatus === "open") wsOpen();
            else status = "boom";
        });
    });

    // Functions
    async function wsOpen() {
        lostConnection = "";
        localStorage.setItem("lost-connection", lostConnection);

        // On Websocket close
        api.ws.onClose((event) => {
            status = "close";
            lostConnection = new Date().toLocaleString();
            localStorage.setItem("lost-connection", lostConnection);
        });

        // Login
        const token = localStorage.getItem("token");
        const loginResponse = await user_v1.loginWithToken(token);
        if (loginResponse === "ok") status = "authorized";
        else status = "open";

        // Errors
        setTimeout(() => {
            logger_v0.level.sub("error", rxError);
            logger_v0.level.sub("warn", rxError);
        }, 3000);
    }
    
    function rxError(line) {
        addTabActive({ name: "Logs" })
        location.reload(true)
    }

    function addTabActive(tabAdded) {
        setTimeout(() => {
            let windowActiveIndex = $state.windows.findIndex(
                (window) => window.id === $state.windowActiveId
            );
            if (
                $state.windows[windowActiveIndex].state.tabs.some(
                    (tab) => tab.name === tabAdded.name
                )
            ) {
                $state.windows[windowActiveIndex].state.tabActive = tabAdded;
            } else {
                $state.windows[windowActiveIndex].state.tabs = [
                    ...$state.windows[windowActiveIndex].state.tabs,
                    tabAdded,
                ];
                $state.windows[windowActiveIndex].state.tabActive = tabAdded;
            }
        }, 1);
    }

    // Dynamic Variables
    $: localStorage.setItem("status", status);
    $: mainWindow = $state.windows.find((window) => window.parentId === 0);
    $: console.log("status:", status);
</script>


{#if status === "startup"}
    <article />
{:else if status === "close"}
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
