<script>
    // Imports
    import { onMount } from "svelte";
    import { store as app_volatile_store } from "../../app-volatile-store.js";

    // Components
    import { X, Columns, Rows, RotateCcw } from "lucide-svelte";
    import Tabs from "../../components/Tabs.svelte";
    import Split from "../../components/Split.svelte";
    import Layout_Icon_Window1 from "./Layout_Icon_Window1.svelte";
    import Layout_Icon_Window2H from "./Layout_Icon_Window2H.svelte";
    import Layout_Icon_Window2V from "./Layout_Icon_Window2V.svelte";
    import Layout_Icon_Window3HR from "./Layout_Icon_Window3HR.svelte";
    import Layout_Icon_Window3HL from "./Layout_Icon_Window3HL.svelte";
    import Layout_Icon_Window3VT from "./Layout_Icon_Window3VT.svelte";
    import Layout_Icon_Window3VB from "./Layout_Icon_Window3VB.svelte";
    import Layout_Icon_Window4 from "./Layout_Icon_Window4.svelte";

    import TestPage from "../../components/TestPage.svelte";
    import User from "../../pages/user-v1/User.svelte";
    import Logs from "../../pages/logs-v1/Logs.svelte";

    // State
    export let isOffline = true;
    export let tabActive = "Tab 1";
    export let tabs = [
        { name: "Tab 1", component: TestPage },
        { name: "Tab 2", component: TestPage },
    ];
    export let newTab = {
        name: "Blank",
        component: $app_volatile_store.pages["Blank"],
    };

    $: contextMenuItems = [
        {
            button: "Split Vertical",
            iconComponent: Rows,
            onClick: () => {
                splitClick(true);
            },
        },
        {
            button: "Split Horizontal",
            iconComponent: Columns,
            onClick: () => {
                splitClick(false);
            },
        },
        {
            button: "Unsplit",
            iconComponent: X,
            onClick: () => {
                unsplitClick();
            },
        },
        {
            hr: true,
        },
        {
            button: "Clear All Windows",
            iconComponent: RotateCcw,
            onClick: () => {
                resetSplitsClick();
            },
        },
    ];
</script>

<Tabs />
