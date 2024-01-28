<script>
    import { state } from "../modules/store.js";
    import { volatile } from "../js/global-volatile-store.js";
    import { persistent } from "../js/global-persistent-store.js";
    import Page from "../layout/Page.svelte";

    let data = {
        state
    }
</script>

<div>
    <Page>
        <button on:click={() => {
            localStorage.clear()
            location.reload(true)
        }}>
            Clear localStorage and reload
        </button>
        {#each Object.entries($state) as val}
            {#if val[0].endsWith("-volatile")}
                <details>
                    <summary style="color: var(--color-text-purple);">{val[0]}</summary>
                    <pre class="mono">{JSON.stringify(val[1], true, 2)}</pre>
                </details>
            {:else if val[0].endsWith("-persistent")}
                <details>
                    <summary style="color: var(--color-text-yellow);">{val[0]}</summary>
                    <!-- <button
                        on:click={() => {
                            val[1].reset();
                            location.reload(true);
                        }}
                    >
                        reset to default
                    </button> <br> -->
                    <pre class="mono">{JSON.stringify(val[1], true, 2)}</pre>
                </details>
            {/if}
        {/each}
    </Page>
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
