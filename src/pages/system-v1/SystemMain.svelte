<script>
    // State
    export let time = "";
    export let uptime = "";
    export let info = { data: "not available" };
</script>

<h2 class="border-bottom">System</h2>
<div>
    <b>Server Time (iso): </b>
    <span class="mono">{time}</span>
</div>
<div>
    <b>Server Uptime (sec): </b>
    <span class="mono">{Math.round(uptime / 1000)}</span>
</div>
<div>
    <pre class="mono"><b class="not-mono">Server Info: </b>{JSON.stringify(
            info,
            true,
            4,
        )}</pre>
</div>

<style>
</style>
