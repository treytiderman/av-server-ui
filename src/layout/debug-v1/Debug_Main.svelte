<script>
    export let stores = {};
    function clearAndReload() {
        localStorage.clear();
        location.reload(true);
    }
</script>

<div class="page flow">
    <button on:click={clearAndReload}> Clear localStorage and reload </button>
    {#each Object.entries(stores) as [key, val]}
        {#if key.endsWith("-volatile")}
            <details>
                <summary style="color: var(--color-text-purple);">
                    {key}
                </summary>
                <pre class="mono"> {JSON.stringify(val, true, 2)} </pre>
            </details>
        {:else if key.endsWith("-persistent")}
            <details>
                <summary style="color: var(--color-text-yellow);">
                    {key}
                </summary>
                <pre class="mono"> {JSON.stringify(val, true, 2)} </pre>
            </details>
        {/if}
    {/each}
</div>

<style>
    div {
        width: fit-content;
        overflow: auto;
        background: black;
        height: 100%;
        width: 100%;
    }
    button {
        border: none;
        background: black;
        color: var(--color-text-red);
        padding: 0;
    }
    details {
        background: black;
        border: none;
        padding: 0;
    }
    summary {
        font-size: 1.4rem;
        border-bottom: var(--border);
        padding-bottom: var(--pad-y);
        border-width: var(--border-width);
    }
    pre {
        font-size: 0.8rem;
    }
</style>
