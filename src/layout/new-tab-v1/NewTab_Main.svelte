<script>
    // Imports
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

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

    // Variables
    let headerWidth;

    // State - Main
    export let username = "admin";
    export let isAdmin = true;

    // Functions
    function addTab(event, name) {
        setTimeout(() => {
            dispatch("tabAdd", {
                event: event,
                tabName: name,
            });
        }, 200);
    }
</script>

<div class="page max-width flow">
    <!-- Header -->
    <div class="flex nowrap gap-0 y-center" bind:clientWidth={headerWidth}>
        <h3 class="long-name" class:hide={headerWidth < 700}>
            Welcome
            <span class="purple">
                <u>{username}</u>
            </span>
            !
        </h3>
        <h3 class="long-name-sm" class:hide={headerWidth > 700}>
            <span class="purple">
                <u>{username}</u>
            </span>
        </h3>
        <div class="margin-left-auto" class:hide={headerWidth < 700} title="User '{username}'' {isAdmin ? "has ADMIN level privileges" : "has USER level privileges"}">
            {isAdmin ? "ADMIN" : "USER"}
        </div>
        <button
            title="Logout"
            class="border-none margin-left-auto"
            on:pointerdown={() => dispatch("logout")}
        >
            <LogOut size="1.25rem" />
        </button>
        <button
            title="Notes"
            class="border-none"
            class:hide={headerWidth < 700}
            on:pointerdown={(event) => addTab(event, "Notes")}
        >
            <StickyNote size="1.25rem" />
        </button>
        <button
            title="Site Map"
            class="border-none"
            class:hide={headerWidth < 700}
            on:pointerdown={(event) => addTab(event, "Site Map")}
        >
            <Map size="1.25rem" />
        </button>
        <button
            title="Settings"
            class="border-none"
            on:pointerdown={(event) => addTab(event, "Settings")}
        >
            <Settings size="1.25rem" />
        </button>
    </div>

    <!-- System Links -->
    <div class="section flow" class:display-none={!isAdmin}>
        <h2 class="border-bottom">Server</h2>
        <div class="grid auto-sm gap align-start" class:display-none={!isAdmin}>
            <button
                title="Open the User Management Page"
                class="flex gap-sm align-center orange"
                on:pointerdown={(event) => addTab(event, "User")}
            >
                <UserCog size="1.25rem" />
                User Management
            </button>
            <button
                title="Open this System's Page"
                class="flex gap-sm align-center orange"
                on:pointerdown={(event) => addTab(event, "System")}
            >
                <HeartPulse size="1.25rem" />
                System
            </button>
            <button
                title="Open the Logs Page"
                class="flex gap-sm align-center orange"
                on:pointerdown={(event) => addTab(event, "Logs")}
            >
                <Scroll size="1.25rem" />
                Logs
            </button>
        </div>
    </div>

    <!-- Program Links -->
    <div class="section flow" class:display-none={!isAdmin}>
        <h2 class="border-bottom">Programs</h2>
        <div class="grid auto-sm gap align-start">
            <button
                title="Open the Programs / Scripts Page"
                class="flex gap-sm align-center green"
                on:pointerdown={(event) => addTab(event, "Programs")}
            >
                <SquareCode size="1.25rem" />
                Programs
            </button>
            <button
                title="Open the Code Editor Page"
                class="flex gap-sm align-center dim"
                on:pointerdown={(event) => addTab(event, "Code")}
            >
                <Code size="1.25rem" />
                Code
            </button>
            <button
                title="Open the Database Viewer Page"
                class="flex gap-sm align-center green"
                on:pointerdown={(event) => addTab(event, "Database")}
            >
                <Database size="1.25rem" />
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
                on:pointerdown={(event) => addTab(event, "HTTP Client")}
            >
                <Network size="1.25rem" />
                HTTP Client
            </button>
            <button
                title="Open the HTTP Server Page"
                class="flex gap-sm align-center dim"
                on:pointerdown={(event) => addTab(event, "HTTP Server")}
            >
                <Server size="1.25rem" />
                HTTP Server
            </button>
            <button
                title="Open the TCP Client Page"
                class="flex gap-sm align-center purple"
                on:pointerdown={(event) => addTab(event, "TCP Client")}
            >
                <Network size="1.25rem" />
                TCP Client
            </button>
            <button
                title="Open the TCP Server Page"
                class="flex gap-sm align-center dim"
                on:pointerdown={(event) => addTab(event, "TCP Server")}
            >
                <Server size="1.25rem" />
                TCP Server
            </button>
            <button
                title="Open the UDP Client Page"
                class="flex gap-sm align-center dim"
                on:pointerdown={(event) => addTab(event, "UDP Client")}
            >
                <Network size="1.25rem" />
                UDP Client
            </button>
            <button
                title="Open the UDP Server Page"
                class="flex gap-sm align-center dim"
                on:pointerdown={(event) => addTab(event, "UDP Server")}
            >
                <Server size="1.25rem" />
                UDP Server
            </button>
            <button
                title="Open the WebSocket Client Page"
                class="flex gap-sm align-center dim"
                on:pointerdown={(event) => addTab(event, "WebSocket Client")}
            >
                <Network size="1.25rem" />
                WebSocket Client
            </button>
            <button
                title="Open the WebSocket Server Page"
                class="flex gap-sm align-center dim"
                on:pointerdown={(event) => addTab(event, "WebSocket Server")}
            >
                <Server size="1.25rem" />
                WebSocket Server
            </button>
            <button
                title="Open the Serial Port Page"
                class="flex gap-sm align-center purple"
                on:pointerdown={(event) => addTab(event, "Serial Port")}
            >
                <Usb size="1.25rem" />
                Serial Port
            </button>
        </div>
    </div>
    <div class="dim">Hint: Hover over buttons to see what they do.</div>
</div>

<style>
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
    .grid.auto-sm {
        grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr));
    }
</style>
