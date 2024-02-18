<script>
    // Imports
    import { onMount } from "svelte";
    import { volatile as global } from "./global-volatile-state.js";
    import { persistent as state } from "./global-persistent-state.js";

    // Components
    import { X, Columns, Rows, RotateCcw } from 'lucide-svelte';
    import Tabs from "../components/Tabs.svelte";

    // Variables
    export let id
    const newTab = {
        name: "New Tab",
        component: $global.pages["NewTab"],
    };
    let contextMenuItems = []
    $: windowIndex = $state.windows.findIndex(window => window.id === id)
    $: windowActiveIndex = $state.windows.findIndex(window => window.id === $state.windowActiveId)
    $: parentIndex = $state.windows.findIndex(window => window.id === $state.windows[windowIndex].parentId)

    // Functions
    function splitClick(isVertical) {
        const childId = Date.now()
        const child1 = {
            id: childId,
            type: "tabs",
            state: $state.windows[windowIndex].state,
            parentId: $state.windows[windowIndex].id,
            childrenIds: [],
        }
        const child2 = {
            id: childId + 1,
            type: "tabs",
            state: {
                tabs: [],
                tabActive: {},
            },
            parentId: $state.windows[windowIndex].id,
            childrenIds: [],
        }

        // Split
        $state.windows[windowIndex].type = "split"
        $state.windows[windowIndex].state = { isVertical: isVertical }
        $state.windows[windowIndex].childrenIds = [childId, childId + 1]

        // Children
        $state.windows = [...$state.windows, child1, child2]

    }
    function unsplitClick() {
        const child1Index = $state.windows.findIndex(window => window.id === $state.windows[parentIndex].childrenIds[0])

        // Update Parent
        $state.windows[parentIndex].type = "tabs"
        $state.windows[parentIndex].childrenIds = []
        if ($state.windows[child1Index].state?.name) {
            $state.windows[parentIndex].state = $state.windows[child1Index].state
        } else {
            $state.windows[parentIndex].state = {
                tabs: [],
                tabActive: {},
            }
        }
        console.log($state.windows[parentIndex]);
        
        // Remove Children
        $state.windows = $state.windows.filter(window => window.id !== $state.windows[parentIndex].childrenIds[0])
        $state.windows = $state.windows.filter(window => window.id !== $state.windows[parentIndex].childrenIds[1])
    }
    function resetSplitsClick() {
        $state.windows = JSON.parse(JSON.stringify([$state.windowsDefault]))
    }

    // Startup
    onMount(async () => {
        windowIndex = $state.windows.findIndex(window => window.id === id)
        if (!$state.windows[windowIndex].state.tabActive.name) {
            $state.windows[windowIndex].state.tabActive = newTab
        }
    })

    $: contextMenuItems = [
        {
            hide: $global.window.width < 500,
            button: "Split Vertical",
            iconComponent: Rows,
            onClick: () => {splitClick(true)},
        },
        {
            hide: $global.window.width < 500,
            button: "Split Horizontal",
            iconComponent: Columns,
            onClick: () => {splitClick(false)},
        },
        {
            hide: $state.windows.length < 2,
            button: "Unsplit",
            iconComponent: X,
            onClick: () => {unsplitClick()},
        },
        {
            hide: $global.window.width < 500,
            hr: true,
        },
        {
            button: "Clear All Windows",
            iconComponent: RotateCcw,
            onClick: () => {resetSplitsClick()},
        },
    ]

</script>

<div bind:clientWidth={$global.window.width}>
    <Tabs 
        tabs={$state.windows[windowIndex]?.state?.tabs}
        newTab={newTab}
        tabActive={$state.windows[windowIndex]?.state?.tabActive}
        windowActive={windowIndex === windowActiveIndex}
        contextMenuItems={contextMenuItems}
        on:tabClick={event => {
            $state.windows[windowIndex].state.tabActive = event.detail
        }}
        on:newTabClick={event => {
            $state.windows[windowIndex].state.tabActive = event.detail
        }}
        on:tabActive={event => {
            $state.windowActiveId = id
        }}
        on:closeTabClick={event => {
            $state.windows[windowIndex].state.tabs = $state.windows[windowIndex].state.tabs.filter(tab => tab.name !== event.detail.name)
            if ($state.windows[windowIndex].state.tabs.length > 1) {
                $state.windows[windowIndex].state.tabActive = $state.windows[windowIndex].state.tabs[0]
            } else {
                $state.windows[windowIndex].state.tabActive = newTab
            }
        }}
    />
</div>

<style>
    div {
        height: 100%;
    }
</style>
