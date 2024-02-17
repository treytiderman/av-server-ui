<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { global } from "../../app-volatile-store.js";
    import { persistent } from "../global-persistent-state.js";

    // Components
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
        LogOut,
        Map,
        StickyNote,
    } from "lucide-svelte";

    let headerWidth;

    // Functions
    function addTab(event, tabAdded) {
        if (event.button === 1) {
            setTimeout(() => {
                let windowActiveIndex = $persistent.windows.findIndex(
                    (window) => window.id === $persistent.windowActiveId,
                );
                if (
                    $persistent.windows[windowActiveIndex].state.tabs.some(
                        (tab) => tab.name === tabAdded.name,
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
                (window) => window.id === $persistent.windowActiveId,
            );
            if (
                $persistent.windows[windowActiveIndex].state.tabs.some(
                    (tab) => tab.name === tabAdded.name,
                )
            ) {
                $persistent.windows[windowActiveIndex].state.tabActive =
                    tabAdded;
            } else {
                $persistent.windows[windowActiveIndex].state.tabs = [
                    ...$persistent.windows[windowActiveIndex].state.tabs,
                    tabAdded,
                ];
                $persistent.windows[windowActiveIndex].state.tabActive =
                    tabAdded;
            }
        }, 1);
    }
    function logout() {
        $persistent.windows = JSON.parse(
            JSON.stringify([$persistent.windowsDefault]),
        );
        localStorage.removeItem("token");
        location.reload();
    }
</script>

<div class="page max-width flow">
    <!-- Header -->
    <div class="flex nowrap gap-0 y-center" bind:clientWidth={headerWidth}>
        <h3 class="long-name" class:hide={headerWidth < 800}>
            Welcome
            <span class="purple">
                <u>{$global.user.username}</u>
            </span>
            !
        </h3>
        <h3 class="long-name-sm" class:hide={headerWidth > 800}>
            <span class="purple">
                <u>{$global.user.username}</u>
            </span>
        </h3>
        <div class="margin-left-auto" class:hide={headerWidth < 800}>
            {$global.user.isAdmin ? "ADMIN" : "USER"}
        </div>
        <button
            title="Logout"
            class="border-none margin-left-auto"
            on:click={logout}
        >
            <LogOut size="1.25rem" strokeWidth="2" />
        </button>
        <button
            title="Notes"
            class="border-none"
            class:hide={headerWidth < 800}
            on:click={() => addTabActive({ name: "Notes" })}
            on:pointerdown={(event) => addTab(event, { name: "Notes" })}
        >
            <StickyNote size="1.25rem" strokeWidth="2" />
        </button>
        <button
            title="Site Map"
            class="border-none"
            class:hide={headerWidth < 800}
            on:click={() => addTabActive({ name: "Site Map" })}
            on:pointerdown={(event) => addTab(event, { name: "Site Map" })}
        >
            <Map size="1.25rem" strokeWidth="2" />
        </button>
        <button
            title="Settings"
            class="border-none"
            on:click={() => addTabActive({ name: "Settings" })}
            on:pointerdown={(event) => addTab(event, { name: "Settings" })}
        >
            <Settings size="1.25rem" strokeWidth="2" />
        </button>
    </div>

    <!-- System Links -->
    <div class="section flow" class:display-none={!$global.user.isAdmin}>
        <h2 class="border-bottom">Server</h2>
        <div
            class="grid auto-sm gap align-start"
            class:display-none={!$global.user.isAdmin}
        >
            <button
                title="Open the User Management Page"
                class="flex gap-sm align-center orange"
                on:click={() => addTabActive({ name: "User" })}
                on:pointerdown={(event) => addTab(event, { name: "User" })}
            >
                <UserCog size="1.5rem" strokeWidth="2" />
                User Management
            </button>
            <button
                title="Open this System's Page"
                class="flex gap-sm align-center orange"
                on:click={() => addTabActive({ name: "System" })}
                on:pointerdown={(event) => addTab(event, { name: "System" })}
            >
                <HeartPulse size="1.5rem" strokeWidth="2" />
                System
            </button>
            <button
                title="Open the Logs Page"
                class="flex gap-sm align-center orange"
                on:click={() => addTabActive({ name: "Logs" })}
                on:pointerdown={(event) => addTab(event, { name: "Logs" })}
            >
                <Scroll size="1.5rem" strokeWidth="2" />
                Logs
            </button>
        </div>
    </div>

    <!-- Program Links -->
    <div class="section flow" class:display-none={!$global.user.isAdmin}>
        <h2 class="border-bottom">Programs</h2>
        <div class="grid auto-sm gap align-start">
            <button
                title="Open the Programs / Scripts Page"
                class="flex gap-sm align-center green"
                on:click={() => addTabActive({ name: "Programs" })}
                on:pointerdown={(event) => addTab(event, { name: "Programs" })}
            >
                <SquareCode size="1.5rem" strokeWidth="2" />
                Programs
            </button>
            <button
                title="Open the Code Editor Page"
                class="flex gap-sm align-center dim"
                on:click={() => addTabActive({ name: "Code" })}
                on:pointerdown={(event) => addTab(event, { name: "Code" })}
            >
                <Code size="1.5rem" strokeWidth="2" />
                Code
            </button>
            <button
                title="Open the Database Viewer Page"
                class="flex gap-sm align-center green"
                on:click={() => addTabActive({ name: "Database" })}
                on:pointerdown={(event) => addTab(event, { name: "Database" })}
            >
                <Database size="1.5rem" strokeWidth="2" />
                Database
            </button>
        </div>
    </div>
    <div class="section flow">
        <h2 class="border-bottom">Tools</h2>
        <div class="grid auto-sm gap align-start">
            <button
                title="Open the HTTP Client Page"
                class="flex gap-sm align-center dim"
                on:click={() => addTabActive({ name: "HTTP Client" })}
                on:pointerdown={(event) =>
                    addTab(event, { name: "HTTP Client" })}
            >
                <Network size="1.5rem" strokeWidth="2" />
                HTTP Client
            </button>
            <button
                title="Open the HTTP Server Page"
                class="flex gap-sm align-center dim"
                on:click={() => addTabActive({ name: "HTTP Server" })}
                on:pointerdown={(event) =>
                    addTab(event, { name: "HTTP Server" })}
            >
                <Server size="1.5rem" strokeWidth="2" />
                HTTP Server
            </button>
            <button
                title="Open the TCP Client Page"
                class="flex gap-sm align-center purple"
                on:click={() => addTabActive({ name: "TCP Client" })}
                on:pointerdown={(event) =>
                    addTab(event, { name: "TCP Client" })}
            >
                <Network size="1.5rem" strokeWidth="2" />
                TCP Client
            </button>
            <button
                title="Open the TCP Server Page"
                class="flex gap-sm align-center dim"
                on:click={() => addTabActive({ name: "TCP Server" })}
                on:pointerdown={(event) =>
                    addTab(event, { name: "TCP Server" })}
            >
                <Server size="1.5rem" strokeWidth="2" />
                TCP Server
            </button>
            <button
                title="Open the UDP Client Page"
                class="flex gap-sm align-center dim"
                on:click={() => addTabActive({ name: "UDP Client" })}
                on:pointerdown={(event) =>
                    addTab(event, { name: "UDP Client" })}
            >
                <Network size="1.5rem" strokeWidth="2" />
                UDP Client
            </button>
            <button
                title="Open the UDP Server Page"
                class="flex gap-sm align-center dim"
                on:click={() => addTabActive({ name: "UDP Server" })}
                on:pointerdown={(event) =>
                    addTab(event, { name: "UDP Server" })}
            >
                <Server size="1.5rem" strokeWidth="2" />
                UDP Server
            </button>
            <button
                title="Open the WebSocket Client Page"
                class="flex gap-sm align-center dim"
                on:click={() => addTabActive({ name: "WebSocket Client" })}
                on:pointerdown={(event) =>
                    addTab(event, { name: "WebSocket Client" })}
            >
                <Network size="1.5rem" strokeWidth="2" />
                WebSocket Client
            </button>
            <button
                title="Open the WebSocket Server Page"
                class="flex gap-sm align-center dim"
                on:click={() => addTabActive({ name: "WebSocket Server" })}
                on:pointerdown={(event) =>
                    addTab(event, { name: "WebSocket Server" })}
            >
                <Server size="1.5rem" strokeWidth="2" />
                WebSocket Server
            </button>
            <button
                title="Open the Serial Port Page"
                class="flex gap-sm align-center purple"
                on:click={() => addTabActive({ name: "Serial Port" })}
                on:pointerdown={(event) =>
                    addTab(event, { name: "Serial Port" })}
            >
                <Usb size="1.5rem" strokeWidth="2" />
                Serial Port
            </button>
        </div>
    </div>
    <div class="dim">
        Hint: Hover over buttons to see what they do.
    </div>
</div>

<style>
    div.page {
        max-width: 90ch;
    }
    button {
        min-width: 2.8rem;
    }
    .long-name,
    .long-name-sm {
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        text-wrap: nowrap;
        white-space: nowrap;
    }
</style>
