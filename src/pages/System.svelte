<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { system_v1 } from "../api/api.js";
    import Page from "../layout/Page.svelte";

    // Variables
    const state = {
        time: undefined,
        uptime: undefined,
        info: {
            data: "not available"
        },
    };

    // Startup / Shutdown
    onMount(() => {
        system_v1.time.sub((res) => (state.time = res));
        system_v1.uptime.sub((res) => (state.uptime = res));
        system_v1.info.sub((res) => (state.info = res));
    });
    onDestroy(() => {
        system_v1.time.unsub();
        system_v1.uptime.unsub();
        system_v1.info.unsub();
    });
</script>

<Page>
    <h2>System</h2>
    <div>
        <b>Server Time (iso): </b>
        <span class="mono">{state.time}</span>
    </div>
    <div>
        <b>Server Uptime (sec): </b>
        <span class="mono">{Math.round(state.uptime / 1000)}</span>
    </div>
    <div>
        <pre class="mono"><b class="not-mono">Server Info: </b> {JSON.stringify(state.info, true, 4)}</pre>
    </div>
</Page>

<style>
</style>
