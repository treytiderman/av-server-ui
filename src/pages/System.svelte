<script>
    import { onMount, onDestroy } from "svelte";
    import { api } from "../js/api.js";
    const data = {
        time: 0,
        timeAsIso: 0,
        uptime: 0,
        info: {},
    }
    onMount(() => {
        api.system.v0.subTime(res => data.time = res)
        api.system.v0.subTimeAsIso(res => data.timeAsIso = res)
        api.system.v0.subUptime(res => data.uptime = res)
        api.system.v0.subInfo(res => data.info = res)
    })
    onDestroy(() => {
        api.system.v0.unsubTime(res => data.time = res)
        api.system.v0.unsubTimeAsIso(res => data.timeAsIso = res)
        api.system.v0.unsubUptime(res => data.uptime = res)
        api.system.v0.unsubInfo(res => data.info = res)
    })
</script>

<article>
    <h1>System</h1>
    <div>
        <b>Server Time (ms): </b>
        <span class="mono">{data.time}</span>
    </div>
    <div>
        <b>Server Time (iso): </b>
        <span class="mono">{data.timeAsIso}</span>
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
