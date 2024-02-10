<script>
    // Components
    import { X, Columns, Rows, RotateCcw } from "lucide-svelte";
    import Split from "../../components/Split.svelte";
    import Tabs from "../../components/Tabs.svelte";

    // State
    export let isOffline = true;
    export let isVertical;
    export let window1 = {};
    export let window2 = {};
</script>

<Split isResizable {isVertical}>
    <Tabs slot="one" />
    <Tabs slot="two" />
</Split>

<style>
</style>
