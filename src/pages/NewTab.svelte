<script>
    // Imports
    import { global } from "../js/global.js";
    import { state } from "../js/state.js";
    import {
        Server,
        UserCog,
        Network,
        Usb,
        Scroll,
        Database,
        Settings,
        Code,
        SquareCode,
    } from "lucide-svelte";

    // Functions
    function addTab(event, tabAdded) {
        if (event.button === 1) {
            setTimeout(() => {
                let windowActiveIndex = $state.windows.findIndex(
                    (window) => window.id === $state.windowActiveId
                );
                if (
                    $state.windows[windowActiveIndex].state.tabs.some(
                        (tab) => tab.name === tabAdded.name
                    )
                ) {
                } else {
                    $state.windows[windowActiveIndex].state.tabs = [
                        ...$state.windows[windowActiveIndex].state.tabs,
                        tabAdded,
                    ];
                }
            }, 1);
        }
    }
    function addTabActive(tabAdded) {
        setTimeout(() => {
            let windowActiveIndex = $state.windows.findIndex(
                (window) => window.id === $state.windowActiveId
            );
            if (
                $state.windows[windowActiveIndex].state.tabs.some(
                    (tab) => tab.name === tabAdded.name
                )
            ) {
                $state.windows[windowActiveIndex].state.tabActive = tabAdded;
            } else {
                $state.windows[windowActiveIndex].state.tabs = [
                    ...$state.windows[windowActiveIndex].state.tabs,
                    tabAdded,
                ];
                $state.windows[windowActiveIndex].state.tabActive = tabAdded;
            }
        }, 1);
    }

    console.log($global.pages);
</script>

<article>
    <h2>Server</h2>
    <div class="flex gap align-start">
        <button
            class="flex gap-sm align-center grey"
            on:click={() => addTabActive({ name: "System" })}
            on:pointerdown={(event) => addTab(event, { name: "System" })}
        >
            <Server size="1.5rem" strokeWidth="2.5" />
            System
        </button>
        <button
            class="flex gap-sm align-center grey"
            on:click={() => addTabActive({ name: "Users" })}
            on:pointerdown={(event) => addTab(event, { name: "Users" })}
        >
            <UserCog size="1.5rem" strokeWidth="2.5" />
            User Managment
        </button>
        <button
            class="flex gap-sm align-center grey"
            on:click={() => addTabActive({ name: "Logs" })}
            on:pointerdown={(event) => addTab(event, { name: "Logs" })}
        >
            <Scroll size="1.5rem" strokeWidth="2.5" />
            Logs
        </button>
        <button
            class="flex gap-sm align-center grey"
            on:click={() => addTabActive({ name: "Settings" })}
            on:pointerdown={(event) => addTab(event, { name: "Settings" })}
        >
            <Settings size="1.5rem" strokeWidth="2.5" />
            Settings
        </button>
    </div>
    <h2>Programs</h2>
    <div class="flex gap align-start">
        <button
            class="flex gap-sm align-center grey"
            on:click={() => addTabActive({ name: "Program" })}
            on:pointerdown={(event) => addTab(event, { name: "Program" })}
        >
            <SquareCode size="1.5rem" strokeWidth="2.5" />
            Programs
        </button>
        <button
            class="flex gap-sm align-center grey"
            on:click={() => addTabActive({ name: "Monaco" })}
            on:pointerdown={(event) => addTab(event, { name: "Monaco" })}
        >
            <Code size="1.5rem" strokeWidth="2.5" />
            Monaco
        </button>
        <button
            class="flex gap-sm align-center grey"
            on:click={() => addTabActive({ name: "Database" })}
            on:pointerdown={(event) => addTab(event, { name: "Database" })}
        >
            <Database size="1.5rem" strokeWidth="2.5" />
            Database
        </button>
    </div>
    <h2>Tools</h2>
    <div class="flex gap align-start">
        <button
            class="flex gap-sm align-center grey"
            on:click={() => addTabActive({ name: "Tcp Client" })}
            on:pointerdown={(event) => addTab(event, { name: "Tcp Client" })}
        >
            <Network size="1.5rem" strokeWidth="2.5" />
            TCP Client
        </button>
        <button
            class="flex gap-sm align-center grey"
            on:click={() => addTabActive({ name: "Serial Port" })}
            on:pointerdown={(event) => addTab(event, { name: "Serial Port" })}
        >
            <Usb size="1.5rem" strokeWidth="2.5" />
            Serial Port
        </button>
    </div>
    <br><br>
    <button
        class=""
        on:click={() => addTabActive({ name: "Pages" })}
        on:pointerdown={(event) => addTab(event, { name: "Pages" })}
    >
        Site Map
    </button>
</article>

<style>
</style>
