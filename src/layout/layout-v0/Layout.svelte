<script>
    // Store
    // import { global } from "../../pages/global-volatile-store.js";
    import { store as layout_persistent_store } from "./layout-persistent-store.js";

    // Components
    import Layout_Main from "./Layout_Main.svelte";

    // State
    export let isOffline = true

</script>

<Layout_Main {isOffline} />
