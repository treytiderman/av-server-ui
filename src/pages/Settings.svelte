<script>
    import { global } from "../app-volatile-store"
    import { persistent } from "./global-persistent-state.js"
</script>

<div class="page">
<div class="section flow">
    <h2>Settings</h2>
    <label>
        Theme <br />
        <select bind:value={$persistent.theme}>
            {#each $global.themes as theme}
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
</div>
</div>

<style>
    div {
        max-width: 30ch;
        margin-inline: auto;
    }
    input,
    select,
    button {
        width: 100%;
    }
</style>
