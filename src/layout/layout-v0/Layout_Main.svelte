<script>
    // Imports
    import { store as layout_persistent_store } from "./layout-persistent-store";

    // Components
    import Layout_Tabs from "./Layout_Tabs.svelte";
    import Layout_Split from "./Layout_Split.svelte";

    // Dynamic
    $: windows = $layout_persistent_store.windows;
    $: window = windows.find((w) => w.parentId === 0);

</script>

{#if window.type === "tabs"}
    <Layout_Tabs id={window.id} />
{:else if window.type === "split"}
    <Layout_Split id={window.id} />
{/if}
