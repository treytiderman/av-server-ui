<script>
    // Imports
    import { persistent as state } from "./layout-persistent-store.js";

    // Components
    import Split from "../../components/Split.svelte";
    import Layout_Tabs from "./Layout_Tabs.svelte";
    import Layout_Split from "./Layout_Split.svelte";

    // Variables
    export let isVertical;
    export let childrenIds;
    $: windowIndex1 = $state.windows.findIndex(window => window.id === childrenIds[0])
    $: window1 = $state.windows[windowIndex1];
    $: window2 = $state.windows.find((window) => window.id === childrenIds[1]);
</script>

<Split
    isResizable={true}
    isVertical={isVertical}
    oneInit_percent={window1.one_percent}
    on:resize={event => $state.windows[windowIndex1].one_percent = event.detail}>
    <div slot="one">
        {#if window1?.type === "tabs"}
            <Layout_Tabs id={window1?.id} />
        {:else if window1?.type === "split"}
            <Layout_Split
                childrenIds={window1?.childrenIds}
                isVertical={window1?.state.isVertical}
            />
        {/if}
    </div>
    <div slot="two">
        {#if window2?.type === "tabs"}
            <Layout_Tabs id={window2?.id} />
        {:else if window2?.type === "split"}
            <Layout_Split
                childrenIds={window2?.childrenIds}
                isVertical={window2?.state.isVertical}
            />
        {/if}
    </div>
</Split>

<style>
    div {
        height: 100%;
    }
</style>
