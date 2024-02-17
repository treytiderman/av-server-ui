<script>
    // Imports
    import { store as app_volatile_store } from "../../app-volatile-store.js";
    import { store as layout_persistent_store } from "../../layout/layout-v0/layout-persistent-store.js";

    // Functions
    function tabAdd(event, name) {
        const id = $layout_persistent_store.windowActiveId;
        const windows = $layout_persistent_store.windows;
        const index = windows.findIndex((w) => w.id === id);
        const tabs = $layout_persistent_store.windows[index].state.tabs;

        if (tabs.some((tab) => tab.name === name)) {
            console.log(`new-tab: cancel add tab '${name}' to window '${id}' since its already open`);
            return;
        }

        $layout_persistent_store.windows[index].state.tabs = [
            ...tabs,
            { name: name },
        ];

        if (event.button === 1) {
            console.log(`new-tab: add tab '${name}' to window '${id}'`);
        } else {
            console.log(`new-tab: add tab '${name}' to window '${id}' set active`);
            $layout_persistent_store.windows[index].state.tabActive = name;
        }
    }
</script>

<div class="page flow">
    <h2>Select a page</h2>
    <div class="flex column align-start">
        {#each Object.keys($app_volatile_store.pages) as pageName}
            <button on:pointerdown={(event) => tabAdd(event, pageName)}>
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
