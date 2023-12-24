<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { logger_v0 } from "../js/api.js";

    // Components
    import Logger from "../components/Logger.svelte";

    // Variables
    const data = {
        logs: [],
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
    
    // Startup / Shutdown
    onMount(() => {
        logger_v0.log.sub((res) => parseLog(res))
    });
    onDestroy(() => {
        logger_v0.log.unsub();
    });
</script>

<section class="flex column">
    <div class="top">
        <button on:click={getHistory}>Pull History</button>
    </div>
    <div class="lines mono grow">
        <Logger lines={data.logs}/>
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
    button {
        background-color: var(--color-bg);
        border-radius: 0;
        border: none;
    }
</style>