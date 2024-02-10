<script>
    // Components
    import Layout_Tabs from "./Layout_Tabs.svelte";
    import Layout_Split from "./Layout_Split.svelte";

    // State
    export let isOffline = true
    export let id = 1
    export let type = "tabs"
    export let parentId = 0
    export let childrenIds = []
    export let state = {}
</script>

{#if type === "tabs"}
    <Layout_Tabs {isOffline} />
{:else if type === "split"}
    <Layout_Split {isOffline} />
{/if}
