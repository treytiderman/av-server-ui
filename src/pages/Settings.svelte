<script>
    import { volatile } from "../js/global-volatile-store"
    import { persistent } from "../js/global-persistent-store.js"
    import Page from "../layout/Page.svelte";
</script>

<Page maxWidth="30rem">
    <h2>Settings</h2>
    <label>
        Theme <br />
        <select bind:value={$persistent.theme}>
            {#each $volatile.themes as theme}
                <option value={theme} selected={$persistent.theme === theme}>
                    {theme}
                </option>
            {/each}
        </select>
    </label>
    <label>
        Font Size (px) <br />
        <input type="number" placeholder="16" bind:value={$persistent.fontSize} />
    </label>
    <button
        class="red"
        on:click={() => { $persistent.reset() } }
    >
        Reset All Settings
    </button>
</Page>

<style>
    input,
    select,
    button {
        width: 100%;
    }
</style>
