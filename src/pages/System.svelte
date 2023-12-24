<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { system_v1 } from "../js/api.js";

    // Variables
    const data = {
        time: 0,
        uptime: 0,
        info: {},
    };

    // Startup / Shutdown
    onMount(() => {
        system_v1.time.sub((res) => (data.time = res));
        system_v1.uptime.sub((res) => (data.uptime = res));
        system_v1.info.sub((res) => (data.info = res));
    });
    onDestroy(() => {
        system_v1.time.unsub();
        system_v1.uptime.unsub();
        system_v1.info.unsub();
    });
</script>

<article>
    <h2>System</h2>
    <div>
        <b>Server Time (iso): </b>
        <span class="mono">{data.time}</span>
    </div>
    <div>
        <b>Server Uptime (sec): </b>
        <span class="mono">{Math.round(data.uptime / 1000)}</span>
    </div>
    <div>
        <b>Server Info: </b>
        <pre>{JSON.stringify(data.info, true, 4)}</pre>
    </div>
</article>

<style>
    article {
        max-width: 30rem;
    }
</style>
