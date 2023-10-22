<script>
    // Imports
    import { global } from "../js/global.js";
    import { state } from "../js/state.js";

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


<article>
    <h2>Select a page</h2>
    <div class="flex column align-start">
        {#each Object.entries($global.pages) as component}
            <button
                on:click={() => addTabActive( {name: component[0]} )}
                on:pointerdown={(event) =>  addTab( event, {name: component[0]} )}
            >
                {component[0]}
            </button>
        {/each}
    </div>
</article>

<style>
    button {
        text-align: left;
        border: none;
        background-color: var(--color-bg);
        padding: var(--gap-xs);
    }
</style>