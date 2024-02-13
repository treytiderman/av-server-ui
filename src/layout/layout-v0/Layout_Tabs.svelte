<script>
    // Imports
    import { onMount } from "svelte";
    import { store as app_volatile_store } from "../../app-volatile-store.js";

    // Components
    import { X, Columns, Rows, RotateCcw } from "lucide-svelte";
    import Tabs from "../../components/Tabs.svelte";
    import TestPage from "../../components/TestPage.svelte";

    import NewTab from "../new-tab-v1/NewTab.svelte";

    // State
    export let windowId = 0;
    export let windowActive = false;
    export let tabActive = "Tab 2";
    export let tabs = [
        { name: "Tab 1", component: TestPage },
        { name: "Tab 2", component: TestPage },
    ];
    export let newTab = {
        name: "New Tab",
        component: NewTab,
    };

    export let contextMenuItems = [
        {
            button: "Split Horizontal",
            iconComponent: Columns,
            onClick: () => {
                console.log(`Layout: window '${windowId}' split horizontal`);
            },
        },
        {
            button: "Split Vertical",
            iconComponent: Rows,
            onClick: () => {
                console.log(`Layout: window '${windowId}' split vertical`);
            },
        },
        {
            button: "Unsplit",
            iconComponent: X,
            onClick: () => {
                console.log(`Layout: window '${windowId}' unsplit`);
            },
        },
        {
            hr: true,
        },
        {
            button: "Clear All Windows",
            iconComponent: RotateCcw,
            onClick: () => {
                console.log(`Layout: window '${windowId}' clear all windows`);
            },
        },
    ];
</script>

<Tabs
    {tabs}
    {newTab}
    {tabActive}
    {windowActive}
    {contextMenuItems}
    on:tabSelect={event => {
        const name = event.detail.name
        tabActive = name
        console.log(`Layout: window '${windowId}' select tab '${tabActive}'`);
    }}
    on:tabClose={event => {
        const name = event.detail.name
        tabs = tabs.filter(tab => tab.name !== name)
        console.log(`Layout: window '${windowId}' close tab '${name}'`, tabs);
        if (tabs.length === 0) tabActive = newTab.name
        else if (tabActive === name) tabActive = tabs[0].name
        console.log(`Layout: window '${windowId}' switch to tab '${tabActive}'`);
    }}
    on:componentActive={() => {
        if (windowActive === false) {
            windowActive = true
            console.log(`Layout: window '${windowId}' active`);
        }
    }}
/>
