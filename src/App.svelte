<script>
    import { volatile } from "./js/global-volatile-store.js";

    // Components
    import Debug from "./pages/Debug.svelte";
    import Main from "./pages/Main.svelte";
    import Split from "./components/Split.svelte";
</script>

{#if $volatile.url.query?.debug === "true"}
    <Split
        isResizable={true}
        isVertical={false}
        oneInit_percent={18}
    >
        <div slot="one">
            <Debug />
        </div>
        <div slot="two">
            <Main />
        </div>
    </Split>
{:else}
    <Main />
{/if}

<style>
    div {
        height: 100%;
    }
</style>
