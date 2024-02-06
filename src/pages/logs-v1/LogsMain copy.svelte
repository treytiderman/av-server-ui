<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { logger_v0 } from "../api/api.js";
    import { persistentStore, volatileStore } from "../modules/store.js"

    // Components
    import Logger from "../components/Logger.svelte";

    // Exports
    export let id = Date.now()

    // State
    const hdd = persistentStore("logs", {
        filter: "",
    })
    const ram = volatileStore("logs", {
        logs: [],
        logsFiltered: [],
    })

    // Functions
    function parseLog(line) {
        const split = line.split(" >> ")
        let json
        try { json = JSON.stringify(JSON.parse(split[3]), true, 4) }
        catch (error) { json = split[3] }
        const lineObj = {
            timestamp: split[0],
            level: split[1].trim(),
            message: split[2].trim(),
            data: json,
        }
        $ram.logs = [...$ram.logs, lineObj]
    }
    function parseHistory(res) {
        $ram.logs = []
        for (let i = 0; i < res.length; i++) {
            const line = res[i]
            setTimeout(() => {
                parseLog(line)
            }, i * 4);
        }
    }
    async function getHistory() {
        parseHistory(await logger_v0.history.get())
    }
    function filterLogs(logs, filter) {
        if (filter === "") return logs
        return logs.filter(log => log.message.includes(filter))
    }
    async function sendMark() {
        await logger_v0.log.warn("mark", "")
    }

    // Dynamic
    $: $ram.logsFiltered = filterLogs($ram.logs, $hdd.filter)

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
        <button on:click={sendMark}>Mark</button>
        <input type="text" placeholder="filter..." bind:value={$hdd.filter}>
    </div>
    <div class="lines mono grow">
        <Logger lines={$ram.logsFiltered}/>
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