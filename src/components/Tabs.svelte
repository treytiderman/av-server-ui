<script>
    // Imports
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Components
    import { X, Plus, MoreVertical } from "lucide-svelte";
    import ContextMenu from "../components/ContextMenu.svelte";
    import TestPage from "../components/TestPage.svelte";

    // Variables
    let contextMenuElement;

    // State
    export let tabs = [
        { name: "Tab 1", component: TestPage },
        { name: "Tab 2", component: TestPage },
    ];
    export let newTab = { name: "New Tab", component: TestPage };
    export let tabActive = "New Tab";
    export let windowActive = true;
    export let contextMenuItems = [
        {
            hide: false,
            button: "Context Menu Button",
            iconComponent: Plus,
            onClick: () => console.log( "Context Menu Button" ),
        },
        {
            hr: true,
        },
        {
            hide: false,
            button: "Context Menu Button 2",
            iconComponent: Plus,
            onClick: () => console.log( "Context Menu Button 2" ),
        },
    ];
</script>

<ContextMenu
    bind:menu={contextMenuElement}
    on:any_click={() => contextMenuElement.hide()}
    on:any_contextmenu={() => contextMenuElement.hide()}
    items={contextMenuItems}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="wrapper flex column"
    class:active={windowActive}
    on:click={() => dispatch("componentActive")}
>
    <!-- Header -->
    <div class="header flex">
        <!-- Tabs -->
        {#each tabs as tab}
            <div class="tab">
                <button
                    class="tab-button flex nowrap"
                    class:tab-active={tabActive === tab.name}
                    on:pointerdown={(event) => {
                        if (event.button === 1) dispatch("tabClose", tab);
                    }}
                    on:click={() => dispatch("tabSelect", tab)}
                >
                    {tab.name}
                    <button
                        class="tab-close"
                        class:tab-active={tabActive === tab.name}
                        on:pointerup={() => dispatch("tabClose", tab)}
                    >
                        <X size="1rem" strokeWidth="2.5" />
                    </button>
                </button>
            </div>
        {/each}

        <!-- New Tab -->
        <button
            class="tab-add center"
            class:tab-active={tabActive === newTab.name}
            on:click={() => dispatch("tabSelect", newTab)}
            title="Create a New Tab"
        >
            <Plus size="1.25rem" strokeWidth="2.5" />
        </button>

        <!-- Context Menu -->
        <button
            class="context-menu center"
            on:click={(e) => contextMenuElement.showAtEvent(e)}
        >
            <MoreVertical size="1.25rem" strokeWidth="2.5" />
        </button>
    </div>

    <!-- Content -->
    <!-- Load all tabs so scroll position and any input remain how they were -->
    {#each tabs as tab}
        <div class="content grow" class:hide={tabActive !== tab.name}>
            <svelte:component this={tab.component} />
        </div>
    {/each}
    <div class="content grow" class:hide={tabActive !== newTab.name}>
        <svelte:component this={newTab.component} />
    </div>
</div>

<style>
    .wrapper {
        height: 100%;
    }
    .content {
        height: 100%;
        overflow: auto;
    }
    .hide {
        display: none;
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
        padding: 0px;
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
