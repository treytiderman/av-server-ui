<script>
    // Imports
    import { onMount } from "svelte";
    import { store as app_volatile_store } from "../../app-volatile-store.js";
    import { store as layout_persistent_store } from "./layout-persistent-store";

    // Components
    import { X, Columns, Rows, RotateCcw } from "lucide-svelte";
    import Tabs from "../../components/Tabs.svelte";
    import NewTab from "../new-tab-v1/NewTab.svelte";
    import { log } from "../../api/logger-v0.js";

    // State
    export let id = 0;

    // Dynamic
    $: window = $layout_persistent_store.windows.find((w) => w.id === id);
    $: windowIndex = $layout_persistent_store.windows.findIndex((w) => w.id === id);
    $: windowActive = $layout_persistent_store.windowActiveId === id;
    $: tabActive = window?.state.tabActive;
    $: tabs = updateTabs(window?.state.tabs)

    // Local
    let newTab = { name: "New Tab", component: NewTab };
    let contextMenuItems = [
        {
            button: "Split Horizontal",
            iconComponent: Columns,
            onClick: () => splitWindow(false),
        },
        {
            button: "Split Vertical",
            iconComponent: Rows,
            onClick: () => splitWindow(true),
        },
        {
            hide: id === 1,
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
    function updateTabs(tabs) {
        if (tabs) {
            return tabs.map((t) => {
              t.component = $app_volatile_store.pages[t.name];
              if (!t.component) t.component = NewTab;
              return t;
          })
        } else {
            return []
        }
    }
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
            $layout_persistent_store.windows[windowIndex].state.tabActive =
                newTab.name;
            console.log(
                `Layout: window '${id}' switch to tab '${newTab.name}'`,
            );
        } else if (tabActive === name) {
            $layout_persistent_store.windows[windowIndex].state.tabActive =
                tabs[0].name;
            console.log(
                `Layout: window '${id}' switch to tab '${tabs[0].name}'`,
            );
        }
    }
    function componentActive() {
        if ($layout_persistent_store.windowActiveId !== id) {
            $layout_persistent_store.windowActiveId = id;
            console.log(`Layout: window '${id}' active`);
        }
    }
    function splitWindow(isVertical) {
        console.log(`Layout: window '${id}' split horizontal`);
        const childId = Date.now();

        const child1 = {
            id: childId,
            type: "tabs",
            state: $layout_persistent_store.windows[windowIndex].state,
            parentId: id,
            childrenIds: [],
        };

        const child2 = {
            id: childId + 1,
            type: "tabs",
            state: {
                tabs: [],
                tabActive: "New Tab",
            },
            parentId: id,
            childrenIds: [],
        };

        // Split
        $layout_persistent_store.windows[windowIndex].type = "split";
        $layout_persistent_store.windows[windowIndex].state = {
            isVertical: isVertical,
        };
        $layout_persistent_store.windows[windowIndex].childrenIds = [
            childId,
            childId + 1,
        ];

        // Add Children
        $layout_persistent_store.windows = [
            ...$layout_persistent_store.windows,
            child1,
            child2,
        ];
    }
    function unsplit() {
        console.log(`Layout: window '${id}' unsplit`);
        
        const windows = $layout_persistent_store.windows
        const parent = windows.find((w) => w.id === window.parentId);
        console.log("windows", windows, parent);
        const child1 = windows.find((w) => w.id === parent?.childrenIds[0]);
        const child2 = windows.find((w) => w.id === parent?.childrenIds[1]);
        console.log("p c1 c2", parent, child1, child2);

        // Recursively get child2's children
        const badChildren = getChildrenOf(windows, child2.id, [
            parent.id,
            child1.id,
            child2.id,
        ]);

        // Remove child2's Children
        const woBadChildren = windows.filter((w) => {
            const isIdOfBadChild = badChildren.some((badChild) => {
                return badChild === w.id;
            });
            if (isIdOfBadChild) {
                console.log(`Layout: window '${w.id}' removed`, w);
            }
            return isIdOfBadChild === false;
        });

        // Create and update new Parent
        const newParent = {
            id: child1.type === "split" ? child1.id : parent.id,
            parentId: parent.parentId,

            type: child1.type,
            state: child1.state,
            childrenIds: child1.childrenIds,
        };
        woBadChildren.push(newParent);
        console.log("newParent", newParent);
        console.log("woBadChildren", woBadChildren);
        $layout_persistent_store.windows = woBadChildren
    }
    function clearAllWindows() {
        console.log(`Layout: window '${id}' clear all windows`);
        const clone = JSON.parse(
            JSON.stringify($layout_persistent_store.windowsDefault),
        );
        $layout_persistent_store.windows = [clone];
    }
    function getChildrenOf(windows, id, children = []) {
        const parent = windows.find((w) => w.id === id);
        if (parent.type === "split") {
            children.push(parent.childrenIds[0]);
            children.push(parent.childrenIds[1]);
            const child1 = windows.find((w) => w.id === parent.childrenIds[0]);
            const child2 = windows.find((w) => w.id === parent.childrenIds[1]);
            children = getChildrenOf(windows, child1.id, children);
            children = getChildrenOf(windows, child2.id, children);
            return children;
        }
        return children;
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
