<script>
    // Imports
    import { volatile as global } from "../js/global-volatile-store.js";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Components
    import { X, Plus, MoreVertical } from 'lucide-svelte';
    import ContextMenu from "../components/ContextMenu.svelte";

    // Variables
    let contextMenuElement;
    export let tabs = [];
    export let newTab = { name: "New Tab", component: "" };
    export let tabActive = newTab;
    export let windowActive = false;
    export let contextMenuItems = [];
</script>

<ContextMenu
    bind:menu={contextMenuElement}
    on:any_click={() => contextMenuElement.hide()}
    on:any_contextmenu={() => contextMenuElement.hide()}
    items={contextMenuItems}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="container flex column"
    class:active={windowActive}
    on:click={() => dispatch("tabActive")}
>
    <!-- Header -->
    <div class="header flex">
        <!-- Tabs -->
        {#each tabs as tab}
            <div class="tab">
                <button
                    class="tab-button flex nowrap"
                    class:tab-active={tabActive.name === tab.name}
                    on:pointerdown={(event) => {
                        if (event.button === 1) dispatch("closeTabClick", tab);
                    }}
                    on:click={() => dispatch("tabClick", tab)}
                >
                    {tab.name}
                    <button
                        class="tab-close"
                        class:tab-active={tabActive.name === tab.name}
                        on:click={() => dispatch("closeTabClick", tab)}
                    >
                        <X size=1rem strokeWidth=2.5 />
                    </button>
                </button>
            </div>
        {/each}

        <!-- New Tab -->
        <button
            class="tab-add center"
            class:tab-active={tabActive.name === newTab.name}
            on:click={() => dispatch("newTabClick", newTab)}
            title="Create a New Tab"
        >
            <Plus size=1.2rem strokeWidth=2.5 />
        </button>

        <!-- Context Menu -->
        <button
            class="context-menu center"
            on:click={(e) => contextMenuElement.showAtEvent(e)}
        >
            <MoreVertical size=1.2rem strokeWidth=2.5 />
        </button>
    </div>

    <!-- Content -->
    <!-- Always show tabs so scroll position and any input remain how they were -->
    {#each tabs as tab}
        <div class="content" class:display-none={tabActive.name !== tab.name}>
            <!-- await breaks everything and flashes everytime something is clicked -->
            <!-- {#await import(tab.componentFilePath) then component}
                <svelte:component this={component.default}/>
            {/await} -->
            <svelte:component this={$global.pages[tab.name]} />
        </div>
    {/each}
    <div class="content" class:display-none={tabActive.name !== newTab.name}>
        <svelte:component this={newTab.component} />
    </div>
</div>

<style>
    .container {
        height: 100%;
    }
    .content {
        height: 100%;
        overflow: auto;
    }

    .header {
        background-color: var(--color-bg-section);
        border-bottom: var(--border);
        border-width: var(--border-width);
        padding: var(--gap-sm);
        gap: var(--gap-sm);
    }

    /* Active Window State */
    .active .tab-active {
        background-color: var(--color-bg-button);
        color: var(--color-text-button);
        background-color: var(--color-bg-purple);
        color: var(--color-text-purple);
    }
    .active .tab > .tab-active,
    .active .tab-add.tab-active {
        border: var(--border);
        border-color: var(--color-border-purple);
    }

    .tab > .tab-active,
    .tab-add.tab-active {
        border: var(--border);
    }

    /* Buttons */
    .tab-button {
        background-color: var(--color-bg-section);
        color: var(--color-text);
        padding: 0 var(--gap-xs) 0 var(--gap-sm);
        height: var(--gap-lg);
        border-color: transparent;
    }

    .tab-close {
        display: grid;
        place-items: center;

        border-color: transparent;

        background-color: var(--color-bg-section);

        margin-left: var(--gap-sm);
        padding: var(--gap-xs);
        padding: 2px;
    }
    .tab-close:hover {
        background-color: var(--color-bg-red);
        color: var(--color-text-red);
        border-color: var(--color-border-red);
    }

    .tab-add {
        background-color: var(--color-bg-section);
        color: var(--color-text);
        padding: var(--gap-xs);
        width: var(--gap-lg);
        height: var(--gap-lg);
        border-color: transparent;
    }
    .context-menu {
        margin-left: auto;
        background-color: var(--color-bg-section);
        color: var(--color-text);
        padding: var(--gap-xs);
        width: var(--gap-lg);
        height: var(--gap-lg);
        border-color: transparent;
    }
    .center {
        display: grid;
        place-items: center;
    }
</style>
