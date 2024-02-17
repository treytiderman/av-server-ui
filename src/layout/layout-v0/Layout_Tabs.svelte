<script>
    // Imports
    import { onMount } from "svelte";
    import { store as app_volatile_store } from "../../app-volatile-store.js";
    import { store as layout_persistent_store } from "./layout-persistent-store";

    // Components
    import { X, Columns, Rows, RotateCcw } from "lucide-svelte";
    import Tabs from "../../components/Tabs.svelte";
    import NewTab from "../new-tab-v1/NewTab.svelte";

    // State
    export let id = 0;

    // Dynamic
    $: windows = $layout_persistent_store.windows;
    $: window = windows.find((w) => w.id === id);
    $: windowIndex = windows.findIndex((w) => w.id === id);
    $: windowActive = $layout_persistent_store.windowActiveId === id;
    $: tabActive = window.state.tabActive;
    $: tabs = window.state.tabs ? window.state.tabs.map((t) => {
        t.component = $app_volatile_store.pages[t.name];
        if (!t.component) t.component = NewTab
        return t;
    }) : []

    // Local
    let newTab = { name: "New Tab", component: NewTab };
    let contextMenuItems = [
        {
            button: "Split Horizontal",
            iconComponent: Columns,
            onClick: splitHorizontal,
        },
        {
            button: "Split Vertical",
            iconComponent: Rows,
            onClick: splitVertical,
        },
        {
            button: "Unsplit",
            iconComponent: X,
            onClick: unsplit,
        },
        {
            hr: true,
        },
        {
            button: "Clear All Windows",
            iconComponent: RotateCcw,
            onClick: clearAllWindows,
        },
    ];

    // Functions
    function tabSelect(event) {
        const name = event.detail.name;
        $layout_persistent_store.windows[windowIndex].state.tabActive = name;
        console.log(`Layout: window '${id}' select tab '${name}'`);
    }
    function tabClose(event) {
        const name = event.detail.name;
        const newTabs = tabs.filter((tab) => tab.name !== name);
        $layout_persistent_store.windows[windowIndex].state.tabs = newTabs;
        console.log(`Layout: window '${id}' close tab '${name}'`, newTabs);

        if (newTabs.length === 0) {
            $layout_persistent_store.windows[windowIndex].state.tabActive = newTab.name;
            console.log(`Layout: window '${id}' switch to tab '${newTab.name}'`);
        }
        else if (tabActive === name) {
            $layout_persistent_store.windows[windowIndex].state.tabActive = tabs[0].name;
            console.log(`Layout: window '${id}' switch to tab '${tabs[0].name}'`);
        }
    }
    function componentActive() {
        if ($layout_persistent_store.windowActiveId !== id) {
            $layout_persistent_store.windowActiveId = id;
            console.log(`Layout: window '${id}' active`);
        }
    }
    function splitHorizontal() {
        console.log(`Layout: window '${id}' split horizontal`);
    }
    function splitVertical() {
        console.log(`Layout: window '${id}' split vertical`);
    }
    function unsplit() {
        console.log(`Layout: window '${id}' unsplit`);
    }
    function clearAllWindows() {
        console.log(`Layout: window '${id}' clear all windows`);
    }
</script>

<Tabs
    {tabs}
    {newTab}
    {tabActive}
    {windowActive}
    {contextMenuItems}
    on:tabSelect={tabSelect}
    on:tabClose={tabClose}
    on:componentActive={componentActive}
/>
