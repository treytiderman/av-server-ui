<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { database_v1 } from "../js/api.js";

    // Variables
    const data = {
        action: "userCreate",
        databaseNames: ["name"],
        databases: {},
    };

    function namesUpdate(names) {
        
        // unsub
        data.databaseNames.forEach((name) => {
            database_v1.db.unsub(name);
        });
        
        // new names
        data.databaseNames = names;
        
        // sub
        names.forEach((name) => {
            database_v1.db.sub(name, (res) => {
                data.databases[name] = res;
            });
        });
    }

    // Startup / Shutdown
    onMount(() => {
        database_v1.names.sub((names) => namesUpdate(names));
    });
    onDestroy(() => {
        data.databaseNames.forEach((name) => database_v1.db.unsub(name));
        database_v1.names.unsub();
    });
</script>

<article>
    <h2>Database</h2>
    {#each data.databaseNames as name}
        <details>
            <summary>{name}</summary>
            <pre>{JSON.stringify(
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
