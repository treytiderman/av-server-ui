<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { database_v0 as db } from "../js/api.js";

    // Variables
    const data = {
        action: "userCreate",
        databaseNames: ["name"],
        databases: {},
    };

    // Startup / Shutdown
    onMount(() => {
        db.subNames((res) => {
            // console.log(res)
            data.databaseNames.forEach((name) => {
                db.unsubData(name);
            });
            data.databaseNames = res;
            res.forEach((name) => {
                db.subData(name, (res) => {
                    data.databases[name] = res;
                });
            });
        });
    });
    onDestroy(() => {
        db.unsubNames();
        data.databaseNames.forEach((name) => {
            db.unsubData(name);
        });
    });
</script>

<article>
    <h2>Database</h2>
    {#each data.databaseNames as name}
        <details>
            <summary>{name}</summary>
            <pre>json-data: {JSON.stringify(
                    data.databases[name],
                    true,
                    4,
                )}</pre>
        </details>
    {/each}
</article>

<style>
    details[open] pre {
        max-height: 60vh;
        overflow: auto;
    }
</style>
