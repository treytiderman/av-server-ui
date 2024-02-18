<script>
    // Imports
    import { store as pages_volatile_store } from "../../pages/pages-volatile-store";
    import { store as layout_persistent_store } from "../../layout/layout-v0/layout-persistent-store.js";

    // Functions
    function tabAdd(event, name) {
        const id = $layout_persistent_store.windowActiveId;
        const windows = $layout_persistent_store.windows;
        const index = windows.findIndex((w) => w.id === id);
        const tabs = $layout_persistent_store.windows[index].state.tabs;

        if (tabs.some((tab) => tab.name === name)) {
            console.log(
                `site-map: cancel add tab '${name}' to window '${id}' since its already open`,
            );
            return;
        }

        $layout_persistent_store.windows[index].state.tabs = [
            ...tabs,
            { name: name },
        ];

        if (event.button === 1) {
            console.log(`site-map: add tab '${name}' to window '${id}'`);
        } else {
            console.log(
                `site-map: add tab '${name}' to window '${id}' set active`,
            );
            $layout_persistent_store.windows[index].state.tabActive = name;
        }
    }
</script>

<div class="page max-width">
    <div class="section flow">
        <h2>Select a page</h2>
        <div class="flex column align-start">
            {#each Object.keys($pages_volatile_store) as pageName}
                <button on:pointerdown={(event) => tabAdd(event, pageName)}>
                    {pageName}
                </button>
            {/each}
        </div>
    </div>
</div>

<style>
    button {
        text-align: left;
        border: none;
        background-color: var(--color-bg-section);
        padding: var(--padding);
    }
</style>
