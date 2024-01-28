<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { volatile } from "../../js/global-volatile-store.js";
    import { persistent } from "../../js/global-persistent-store.js";

    // Components
    import Page from "../../layout/Page.svelte.js";
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
        HeartPulse,
    } from "lucide-svelte";

    // Functions
    function addTab(event, tabAdded) {
        if (event.button === 1) {
            setTimeout(() => {
                let windowActiveIndex = $persistent.windows.findIndex(
                    (window) => window.id === $persistent.windowActiveId
                );
                if (
                    $persistent.windows[windowActiveIndex].state.tabs.some(
                        (tab) => tab.name === tabAdded.name
                    )
                ) {
                } else {
                    $persistent.windows[windowActiveIndex].state.tabs = [
                        ...$persistent.windows[windowActiveIndex].state.tabs,
                        tabAdded,
                    ];
                }
            }, 1);
        }
    }
    function addTabActive(tabAdded) {
        setTimeout(() => {
            let windowActiveIndex = $persistent.windows.findIndex(
                (window) => window.id === $persistent.windowActiveId
            );
            if (
                $persistent.windows[windowActiveIndex].state.tabs.some(
                    (tab) => tab.name === tabAdded.name
                )
            ) {
                $persistent.windows[windowActiveIndex].state.tabActive = tabAdded;
            } else {
                $persistent.windows[windowActiveIndex].state.tabs = [
                    ...$persistent.windows[windowActiveIndex].state.tabs,
                    tabAdded,
                ];
                $persistent.windows[windowActiveIndex].state.tabActive = tabAdded;
            }
        }, 1);
    }
</script>

<Page>
    <h3 class="flex">
        <div>Welcome 
            <span
                class="purple"
                style="text-decoration: underline; text-underline-position: under;"
            >{$volatile.user.username}</span> !
        </div>
        <div class="margin-left-auto">{$volatile.user.isAdmin ? "ADMIN" : "USER"}</div>
    </h3>
    <h2 class:display-none={!$volatile.user.isAdmin}>Server</h2>
    <div
        class="grid auto-sm gap align-start"
        class:display-none={!$volatile.user.isAdmin}
    >
        <button
            class="flex gap-sm align-center orange"
            on:click={() => addTabActive({ name: "Users" })}
            on:pointerdown={(event) => addTab(event, { name: "Users" })}
        >
            <UserCog size="1.5rem" strokeWidth="2.5" />
            User Managment
        </button>
        <button
            class="flex gap-sm align-center orange"
            on:click={() => addTabActive({ name: "System" })}
            on:pointerdown={(event) => addTab(event, { name: "System" })}
        >
            <HeartPulse size="1.5rem" strokeWidth="2.5" />
            System
        </button>
        <button
            class="flex gap-sm align-center orange"
            on:click={() => addTabActive({ name: "Logs" })}
            on:pointerdown={(event) => addTab(event, { name: "Logs" })}
        >
            <Scroll size="1.5rem" strokeWidth="2.5" />
            Logs
        </button>
    </div>
    <h2 class:display-none={!$volatile.user.isAdmin}>Programs</h2>
    <div
        class="grid auto-sm gap align-start"
        class:display-none={!$volatile.user.isAdmin}
    >
        <button
            class="flex gap-sm align-center green"
            on:click={() => addTabActive({ name: "Programs" })}
            on:pointerdown={(event) => addTab(event, { name: "Programs" })}
        >
            <SquareCode size="1.5rem" strokeWidth="2.5" />
            Programs
        </button>
        <button
            class="flex gap-sm align-center dim"
            on:click={() => addTabActive({ name: "Code" })}
            on:pointerdown={(event) => addTab(event, { name: "Code" })}
        >
            <Code size="1.5rem" strokeWidth="2.5" />
            Code
        </button>
        <button
            class="flex gap-sm align-center green"
            on:click={() => addTabActive({ name: "Database" })}
            on:pointerdown={(event) => addTab(event, { name: "Database" })}
        >
            <Database size="1.5rem" strokeWidth="2.5" />
            Database
        </button>
    </div>
    <h2>Tools</h2>
    <div class="grid auto-sm gap align-start">
        <button
            class="flex gap-sm align-center dim"
            on:click={() => addTabActive({ name: "HTTP Client" })}
            on:pointerdown={(event) => addTab(event, { name: "HTTP Client" })}
        >
            <Network size="1.5rem" strokeWidth="2.5" />
            HTTP Client
        </button>
        <button
            class="flex gap-sm align-center dim"
            on:click={() => addTabActive({ name: "HTTP Server" })}
            on:pointerdown={(event) => addTab(event, { name: "HTTP Server" })}
        >
            <Server size="1.5rem" strokeWidth="2.5" />
            HTTP Server
        </button>
        <button
            class="flex gap-sm align-center purple"
            on:click={() => addTabActive({ name: "TCP Client" })}
            on:pointerdown={(event) => addTab(event, { name: "TCP Client" })}
        >
            <Network size="1.5rem" strokeWidth="2.5" />
            TCP Client
        </button>
        <button
            class="flex gap-sm align-center dim"
            on:click={() => addTabActive({ name: "TCP Server" })}
            on:pointerdown={(event) => addTab(event, { name: "TCP Server" })}
        >
            <Server size="1.5rem" strokeWidth="2.5" />
            TCP Server
        </button>
        <button
            class="flex gap-sm align-center dim"
            on:click={() => addTabActive({ name: "UDP Client" })}
            on:pointerdown={(event) => addTab(event, { name: "UDP Client" })}
        >
            <Network size="1.5rem" strokeWidth="2.5" />
            UDP Client
        </button>
        <button
            class="flex gap-sm align-center dim"
            on:click={() => addTabActive({ name: "UDP Server" })}
            on:pointerdown={(event) => addTab(event, { name: "UDP Server" })}
        >
            <Server size="1.5rem" strokeWidth="2.5" />
            UDP Server
        </button>
        <button
            class="flex gap-sm align-center dim"
            on:click={() => addTabActive({ name: "WebSocket Client" })}
            on:pointerdown={(event) => addTab(event, { name: "WebSocket Client" })}
        >
            <Network size="1.5rem" strokeWidth="2.5" />
            WebSocket Client
        </button>
        <button
            class="flex gap-sm align-center dim"
            on:click={() => addTabActive({ name: "WebSocket Server" })}
            on:pointerdown={(event) => addTab(event, { name: "WebSocket Server" })}
        >
            <Server size="1.5rem" strokeWidth="2.5" />
            WebSocket Server
        </button>
        <button
            class="flex gap-sm align-center purple"
            on:click={() => addTabActive({ name: "Serial Port" })}
            on:pointerdown={(event) => addTab(event, { name: "Serial Port" })}
        >
            <Usb size="1.5rem" strokeWidth="2.5" />
            Serial Port
        </button>
    </div>
    <br /><br />
    <div class="flex gap align-start">
        <button
            class="flex gap-sm align-center red"
            on:click={() => {
                $persistent.windows = JSON.parse(JSON.stringify([$persistent.windowsDefault]))
                localStorage.removeItem("token");
                location.reload();
            }}
        >
            Logout
        </button>
        <button
            class="flex gap-sm align-center"
            class:display-none={!$volatile.user.isAdmin}
            on:click={() => addTabActive({ name: "Site Map" })}
            on:pointerdown={(event) => addTab(event, { name: "Site Map" })}
        >
            Site Map
        </button>
        <button
            class="flex gap-sm align-center"
            on:click={() => addTabActive({ name: "Settings" })}
            on:pointerdown={(event) => addTab(event, { name: "Settings" })}
        >
            Site Settings
        </button>
    </div>
</Page>

<style>
</style>
