<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { logger_v0 } from "../../api/api.js";

    // Components
    import LogsMain from "./LogsMain.svelte";

    // State
    let filter = "";
    let lines = [];

    // Startup / Shutdown
    onMount(() => {
        logger_v0.log.sub((res) => parseLog(res));
        getHistory();
    });
    onDestroy(() => {
        logger_v0.log.unsub();
    });

    // Functions
    function parseLog(line) {
        const split = line.split(" >> ");
        let json;
        try {
            json = JSON.stringify(JSON.parse(split[3]), true, 4);
        } catch (error) {
            json = split[3];
        }
        const lineObj = {
            timestampISO: split[0],
            level: split[1].trim(),
            message: split[2].trim(),
            data: json,
        };
        lines = [...lines, lineObj];
    }
    function parseHistory(res) {
        lines = [];
        for (let i = 0; i < res.length; i++) {
            const line = res[i];
            setTimeout(() => {
                parseLog(line);
            }, i * 4);
        }
    }
    async function getHistory() {
        parseHistory(await logger_v0.history.get());
    }
    function filterLogs(logs, filter) {
        if (filter === "") return logs;
        return logs.filter((log) => log.message.includes(filter));
    }
    async function sendMark() {
        await logger_v0.log.warn("mark", "");
    }
</script>

<div class="page flex column gap">
    <LogsMain {filter} {lines} />
</div>

<style>
</style>
