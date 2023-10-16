<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { api } from "../js/api.js";

    // Variables
    const data = {
        // action: "userCreate",
    };

    // Startup / Shutdown
    onMount(() => {
        // api.user.v0.subUsers((res) => (data.users = res));
    });
    onDestroy(() => {
        // api.user.v0.unsubUsers();
    });
</script>

<article>
    <h2>File System</h2>
</article>

<style>
</style>
