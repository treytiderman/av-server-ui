<script>
    // Imports
    import { store as layout_persistent_store } from "../layout-v0/layout-persistent-store";

    // Components
    import NewTab from "./NewTab_Main.svelte";

    // State - Main
    let username = "admin";
    let isAdmin = true;

    // Functions
    function tabAdd(ev) {
        const event = ev.detail.event;
        const name = ev.detail.tabName;
        const id = $layout_persistent_store.windowActiveId;
        const windows = $layout_persistent_store.windows;
        const index = windows.findIndex((w) => w.id === id);
        const tabs = $layout_persistent_store.windows[index].state.tabs;

        if (tabs.some(tab => tab.name === name)) {
            console.log(`New Tab: cancel add tab '${name}' to window '${id}' since its already open`);
            return
        }

        $layout_persistent_store.windows[index].state.tabs = [
            ...tabs,
            { name: name },
        ];

        if (event.button === 1) {
            console.log(`New Tab: add tab '${name}' to window '${id}'`);
        } else {
            console.log(
                `New Tab: add tab '${name}' to window '${id}' set active`,
            );
            $layout_persistent_store.windows[index].state.tabActive = name;
        }
    }
    function logout() {
        console.log(`New Tab: logout`);
    }
</script>

<NewTab {username} {isAdmin} on:logout={logout} on:tabAdd={tabAdd} />
