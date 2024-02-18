<script>
    // Imports
    import { store as layout_persistent_store } from "./layout-persistent-store";

    // Components
    import Split from "../../components/Split.svelte";
    import Layout_Tabs from "./Layout_Tabs.svelte";
    import Layout_Split from "./Layout_Split.svelte";

    // State
    export let id = 0;

    // Dynamic
    $: windows = $layout_persistent_store.windows;
    $: window = windows.find((w) => w.id === id);
    $: windowIndex = windows.findIndex((w) => w.id === id);
    $: id1 = window?.childrenIds[0];
    $: id2 = window?.childrenIds[1];
    $: window1 = windows.find((w) => w.id === id1);
    $: window2 = windows.find((w) => w.id === id2);

    // Functions
    function onResize(event) {
        const one_percent = event.detail
        $layout_persistent_store.windows[windowIndex].state.one_percent = one_percent
    }
</script>

<Split
    isResizable
    isVertical={window?.state.isVertical}
    oneInit_percent={window?.state.one_percent}
    on:resize={onResize}
>
    <div slot="one">
        {#if window1.type === "tabs"}
            <Layout_Tabs id={id1} />
        {:else if window1.type === "split"}
            <Layout_Split id={id1} />
        {/if}
    </div>
    <div slot="two">
        {#if window2.type === "tabs"}
            <Layout_Tabs id={id2} />
        {:else if window2.type === "split"}
            <Layout_Split id={id2} />
        {/if}
    </div>
</Split>

<style>
    div {
        height: 100%;
    }
</style>
