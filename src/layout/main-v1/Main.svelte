<script>
    // Store
    import { store as app_volatile_store } from "../../app-volatile-store.js";

    // Components
    import Split from "../../components/Split.svelte";
    import Api from "../api-v1/Api.svelte";
    import Debug from "../debug-v1/Debug.svelte";
</script>

{#if $app_volatile_store.url.query?.debug === "true"}
    <Split isResizable={true} isVertical={false} oneInit_percent={20}>
        <Debug slot="one"/>
        <Api slot="two"/>
    </Split>
{:else}
    <Api />
{/if}
