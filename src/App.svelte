<script>
    // Imports
    import { onMount } from "svelte";
    import { api } from "./js/api";
    import { state } from "./js/state.js";

    // Components
    import Tabs from "./pages/WindowTabs.svelte"; 
    import Split from "./pages/WindowSplit.svelte";

    $: mainWindow = $state.windows.find(window => window.parentId === 0)

    onMount(async () => {
        // api.debug(true)
        await api.connect("ws://192.168.1.1:4620")
        api.users.login("admin", "admin")
        api.users.subToken(token => console.log("token", token))
    })

</script>

{#if mainWindow?.type === "tabs"}
    <Tabs id={mainWindow.id} />
{:else if mainWindow?.type === "split"}
    <Split childrenIds={mainWindow?.childrenIds} isVertical={mainWindow?.state.isVertical} />
{/if}
