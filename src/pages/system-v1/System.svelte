<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { system_v1 } from "../../api/api.js";
    import SystemMain from "./SystemMain.svelte";

    // State
    let time = "";
    let uptime = "";
    let info = { data: "not available" };

    // Startup / Shutdown
    onMount(() => {
        system_v1.time.sub((res) => (time = res));
        system_v1.uptime.sub((res) => (uptime = res));
        system_v1.info.sub((res) => (info = res));
    });
    onDestroy(() => {
        system_v1.time.unsub();
        system_v1.uptime.unsub();
        system_v1.info.unsub();
    });
</script>

<div class="page max-width">
    <div class="section flow overflow">
        <SystemMain {time} {uptime} {info} />
    </div>
</div>

<style>
</style>
