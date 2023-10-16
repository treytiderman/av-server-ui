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

    // Startup / Shutdown
    onMount(() => {
        api.logger.v0.subLogsHistory((res) => {
            data.logs = []
            console.log("log update")
            res.forEach(line => {
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
            })
        });
    });
    onDestroy(() => {
        api.logger.v0.unsubLogsHistory();
    });
</script>

<section class="flex column">
    <h2 class="pad">Logs</h2>
    <div class="lines mono grow">

        <Logger lines={data.logs}/>
    </div>
</section>

<style>
    section {
        height: 100%;
    }
    .lines {
        overflow: auto;
        width: 100%;
        height: 100%;
    }
</style>