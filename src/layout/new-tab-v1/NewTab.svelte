<script>
    // Imports
    import { store as layout_persistent_store } from "../layout-v0/layout-persistent-store";
    import { store as api_volatile_store } from "../api-v1/api-volatile-store";

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
            console.log(`new-tab: cancel add tab '${name}' to window '${id}' since its already open`);
            return
        }

        $layout_persistent_store.windows[index].state.tabs = [
            ...tabs,
            { name: name },
        ];

        if (event.button === 1) {
            console.log(`new-tab: add tab '${name}' to window '${id}'`);
        } else {
            console.log(
                `new-tab: add tab '${name}' to window '${id}' set active`,
            );
            $layout_persistent_store.windows[index].state.tabActive = name;
        }
    }
    function logout() {
        console.log(`new-tab: logout`);
        localStorage.removeItem("token");
        clearAllWindows()
        $api_volatile_store.status = "login"
    }
    function clearAllWindows() {
        console.log(`new-tab clear all windows`);
        const clone = JSON.parse(
            JSON.stringify($layout_persistent_store.windowsDefault),
        );
        $layout_persistent_store.windows = [clone];
    }
</script>

<NewTab {username} {isAdmin} on:logout={logout} on:tabAdd={tabAdd} />
