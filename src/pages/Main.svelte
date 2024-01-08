<script>
    import { volatile } from "../js/global-volatile-store.js";
    import { persistent } from "../js/global-persistent-store.js";
    import {} from "../startup.js";

    // Components
    import Login from "../pages/Login.svelte";
    import Tabs from "../pages/WindowTabs.svelte";
    import Split from "../pages/WindowSplit.svelte";
    import Page from "../layout/Page.svelte";

    // Dynamic Variables
    $: mainWindow = $persistent.windows.find((window) => window.parentId === 0);
</script>

{#if $volatile.apiStatus === "startup"}
    <Page />
{:else if $volatile.apiStatus === "closed"}
    <Page>
        <h1>Lost Connection</h1>
        <p>
            The connection to {$volatile.url.href} was lost {$volatile.lostConnectionAt}
        </p>
        <button on:click={() => location.reload()}>Reload</button>
    </Page>
{:else if $volatile.apiStatus === "connected"}
    <Login />
{:else if $volatile.apiStatus === "authorized"}
    {#if mainWindow?.type === "tabs"}
        <Tabs id={mainWindow.id} />
    {:else if mainWindow?.type === "split"}
        <Split
            childrenIds={mainWindow?.childrenIds}
            isVertical={mainWindow?.state.isVertical}
        />
    {/if}
{/if}

