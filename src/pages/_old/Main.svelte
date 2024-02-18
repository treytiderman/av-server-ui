<script>
    import { persistent } from "./global-persistent-state.js";

    // Components
    import Tabs from "../WindowTabs.svelte.js";
    import Split from "../WindowSplit.svelte.js";

    // State
    export let isOffline = true

    // Dynamic Variables
    $: mainWindow = $persistent.windows.find((window) => window.parentId === 0);
</script>

{#if mainWindow?.type === "tabs"}
    <Tabs slot="one" {isOffline} id={mainWindow.id} />
{:else if mainWindow?.type === "split"}
    <Split
        slot="two"
        {isOffline}
        childrenIds={mainWindow?.childrenIds}
        isVertical={mainWindow?.state.isVertical}
    />
{/if}
