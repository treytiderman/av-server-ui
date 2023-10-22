<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { api } from "../js/api.js";

    // Components
    import Logger from "../components/Logger.svelte";

    // Variables
    const data = {
        logs: [],
    };

    // Functions
    function parseLog(line) {
        line = line.split(" >> ")
        let obj = line[4]
        try { obj = JSON.parse(line[4]) }
        catch (error) {}
        const lineObj = {
            timestampISO: line[0],
            level: line[1],
            group: line[2],
            message: line[3],
            obj: obj,
        }
        data.logs = [...data.logs, lineObj]
    }
    function parseHistory(res) {
        data.logs = []
        for (let i = 0; i < res.length; i++) {
            const line = res[i]
            setTimeout(() => {
                parseLog(line)
            }, i * 5);
        }
    }
    function getHistory() {
        api.logger.v0.getLogsHistory((res) => {
            parseHistory(res)
        });
    }

    // Startup / Shutdown
    onMount(() => {
        api.logger.v0.subLogs((res) => {
            parseLog(res)
        });
        
    });
    onDestroy(() => {
        api.logger.v0.unsubLogs();
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