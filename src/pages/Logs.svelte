<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { logger_v0 } from "../js/api.js";
    import { state } from "../js/state.js";
    
    // Components
    import Logger from "../components/Logger.svelte";

    // Variables
    const data = {
        logs: [],
        filter: $state.logFilter,
        logsFiltered: [],
    };

    // Functions
    function parseLog(line) {
        const split = line.split(" >> ")
        let json
        try { json = JSON.stringify(JSON.parse(split[3]), true, 4) }
        catch (error) { json = split[3] }
        const lineObj = {
            timestampISO: split[0],
            level: split[1].trim(),
            message: split[2].trim(),
            data: json,
        }
        data.logs = [...data.logs, lineObj]
    }
    function parseHistory(res) {
        data.logs = []
        for (let i = 0; i < res.length; i++) {
            const line = res[i]
            setTimeout(() => {
                parseLog(line)
            }, i * 3);
        }
    }
    async function getHistory() {
        parseHistory(await logger_v0.history.get())
    }
    function filterLogs(logs, filter) {
        if (filter === "") return logs
        return logs.filter(log => log.message.includes(filter))
    }

    $: data.logsFiltered = filterLogs(data.logs, $state.logFilter)
    
    // Startup / Shutdown
    onMount(() => {
        logger_v0.log.sub((res) => parseLog(res))
        getHistory()
    });
    onDestroy(() => {
        logger_v0.log.unsub();
    });
</script>

<section class="flex column">
    <div class="top">
        <button on:click={getHistory}>Pull History</button>
        <input type="text" placeholder="filter..." bind:value={$state.logFilter}>
    </div>
    <div class="lines mono grow">
        <Logger lines={data.logsFiltered}/>
    </div>
</section>

<style>
    section {
        height: 100%;
    }
    .top {
        border-bottom: var(--border);
    }
    .lines {
        overflow: auto;
        width: 100%;
        height: 100%;
    }
    input,
    button {
        background-color: var(--color-bg);
        border-radius: 0;
        border: none;
    }
</style>