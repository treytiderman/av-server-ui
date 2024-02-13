<script>
    // Components
    import Layout_Tabs from "./Layout_Tabs.svelte";
    import Layout_Split from "./Layout_Split.svelte";

    // State
    export let id = 1;
    export let window = {
        id: 1,
        parentId: 0,
        childrenIds: [],
        type: "tabs",
        state: {
            tabs: [],
            tabActive: {
                name: "Blank",
            },
        },
    };
    export let type = "split";
    export let parentId = 0;
    export let childrenIds = [];
    export let state = {};
</script>

{#if type === "tabs"}
    <Layout_Tabs />
{:else if type === "split"}
    <Layout_Split />
{/if}
