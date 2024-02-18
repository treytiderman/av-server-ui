<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { database_v1 } from "../../api/api.js";

    // Stores
    import { store as app_volatile_store } from "../../app-volatile-store.js";

    // State
    let isOffline = $app_volatile_store.url.query?.offline === "true";
    let dbNames = ["db-name"];
    let dbs = {
        "db-name": {
            key: "value",
        },
    };

    function namesUpdate(names) {
        // unsub
        dbNames.forEach((name) => {
            database_v1.db.unsub(name);
        });

        // new names
        dbNames = names;

        // sub
        names.forEach((name) => {
            database_v1.db.sub(name, (res) => {
                dbs[name] = res;
            });
        });
    }

    // Startup / Shutdown
    onMount(() => {
        database_v1.names.sub((names) => namesUpdate(names));
    });
    onDestroy(() => {
        dbNames.forEach((name) => database_v1.db.unsub(name));
        database_v1.names.unsub();
    });
</script>

<div class="page">
    <small class="dim" class:hide={isOffline === false}> Offline </small>
    <div class="section flow">
        <h2>Database</h2>
        {#each dbNames as name}
            <details>
                <summary>{name}</summary>
                <pre class="mono">{JSON.stringify(dbs[name], true, 4)}</pre>
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
