<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { database_v1 } from "../api/api.js";

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

<div class="page">
    <div class="section flow">
        <h2>Database</h2>
        {#each data.databaseNames as name}
            <details>
                <summary>{name}</summary>
                <pre class="mono">{JSON.stringify(
                        data.databases[name],
                        true,
                        4,
                    )}</pre>
            </details>
        {/each}
    </div>
</div>

<style>
    .page {
        max-width: 60rem;
        margin-inline: auto;
    }
    details {
        width: 100%;
        /* height: 100%; */
        /* overflow: auto; */
    }
    summary {
        padding: var(--padding);
    }
    pre {
        width: 100%;
        padding: var(--gap);
        border-radius: var(--border-radius);
        background-color: var(--color-bg);
        max-height: 40vh;
        overflow: auto;
    }
</style>
