<script>
    // Imports
    import { global } from "../app-volatile-store.js";
    import { persistent as state } from "./global-persistent-state.js";

    // Functions
    function addTab(event, tabAdded) {
        if (event.button === 1) {
            setTimeout(() => {
                let windowActiveIndex = $state.windows.findIndex(window => window.id === $state.windowActiveId)
                if ($state.windows[windowActiveIndex].state.tabs.some(tab => tab.name === tabAdded.name)) {
                } else {
                    $state.windows[windowActiveIndex].state.tabs = [...$state.windows[windowActiveIndex].state.tabs, tabAdded]
                }
            }, 1);
        }
    }
    function addTabActive(tabAdded) {
        setTimeout(() => {
            let windowActiveIndex = $state.windows.findIndex(window => window.id === $state.windowActiveId)
            if ($state.windows[windowActiveIndex].state.tabs.some(tab => tab.name === tabAdded.name)) {
                $state.windows[windowActiveIndex].state.tabActive = tabAdded
            } else {
                $state.windows[windowActiveIndex].state.tabs = [...$state.windows[windowActiveIndex].state.tabs, tabAdded]
                $state.windows[windowActiveIndex].state.tabActive = tabAdded
            }
        }, 1);
    }
</script>

<div class="page flow">
    <h2>Select a page</h2>
    <div class="flex column align-start">
        {#each Object.keys($global.pages) as pageName}
            <button
                on:click={() => addTabActive( {name: pageName} )}
                on:pointerdown={(event) =>  addTab( event, {name: pageName} )}
            >
                {pageName}
            </button>
        {/each}
    </div>
</div>

<style>
    button {
        text-align: left;
        border: none;
        background-color: var(--color-bg);
        padding: var(--gap-xs);
    }
</style>