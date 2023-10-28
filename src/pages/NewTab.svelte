<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { global } from "../js/global.js";
    import { state } from "../js/state.js";
    import { api } from "../js/api.js";
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

    // Variables
    const data = {
        me: {
            username: "fakeUser",
            groups: ["dragon"],
        },
        isNotAdmin: false,
    };

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
    function isNotAdmin(groups) {
        return !groups.some((group) => group === "admin");
    }

    // Startup / Shutdown
    onMount(() => {
        api.user.v0.subWhoAmI((res) => {
            if (res.username) {
                data.me = res;
                data.isNotAdmin = isNotAdmin(data.me.groups);
            }
        });
    });
    onDestroy(() => {
        api.user.v0.unsubWhoAmI();
    });
</script>

<article>
    <h2 class:display-none={data.isNotAdmin}>Server</h2>
    <div
        class="grid auto-sm gap align-start"
        class:display-none={data.isNotAdmin}
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
            <Server size="1.5rem" strokeWidth="2.5" />
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
    <h2 class:display-none={data.isNotAdmin}>Programs</h2>
    <div
        class="grid auto-sm gap align-start"
        class:display-none={data.isNotAdmin}
    >
        <button
            class="flex gap-sm align-center green"
            on:click={() => addTabActive({ name: "Program" })}
            on:pointerdown={(event) => addTab(event, { name: "Program" })}
        >
            <SquareCode size="1.5rem" strokeWidth="2.5" />
            Programs
        </button>
        <button
            class="flex gap-sm align-center green"
            on:click={() => addTabActive({ name: "Monaco" })}
            on:pointerdown={(event) => addTab(event, { name: "Monaco" })}
        >
            <Code size="1.5rem" strokeWidth="2.5" />
            Monaco
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
            class="flex gap-sm align-center purple"
            on:click={() => addTabActive({ name: "Tcp Client" })}
            on:pointerdown={(event) => addTab(event, { name: "Tcp Client" })}
        >
            <Network size="1.5rem" strokeWidth="2.5" />
            TCP Client
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
                $state.windows = JSON.parse(JSON.stringify([$state.windowsDefault]))
                localStorage.removeItem("token");
                location.reload();
            }}
        >
            Logout
        </button>
        <button
            class="flex gap-sm align-center grey"
            class:display-none={data.isNotAdmin}
            on:click={() => addTabActive({ name: "Pages" })}
            on:pointerdown={(event) => addTab(event, { name: "Pages" })}
        >
            Site Map
        </button>
        <button
            class="flex gap-sm align-center grey"
            on:click={() => addTabActive({ name: "Settings" })}
            on:pointerdown={(event) => addTab(event, { name: "Settings" })}
        >
            Site Settings
        </button>
    </div>
</article>

<style>
</style>
