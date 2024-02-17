<script>
    // Components
    import { X, Columns, Rows, RotateCcw } from "lucide-svelte";
    import Layout_Tabs from "./Layout_Tabs.svelte";
    import Layout_Split from "./Layout_Split.svelte";
    import TestPage from "../../components/TestPage.svelte";
    import NewTab from "../new-tab-v1/NewTab.svelte";

    // State
    export let id = 1;
    export let type = "split";
    export let parentId = 0;
    export let childrenIds = [];
    export let state = {};
    export let window1 = {};
    export let window2 = {};

</script>

{#if type === "tabs"}
    <Layout_Tabs
    />
{:else if type === "split"}
    <Layout_Split
        {id}
        {childrenIds}
        isVertical={state.isVertical}
        oneInit_percent={state.oneInit_percent}
    />
{/if}
