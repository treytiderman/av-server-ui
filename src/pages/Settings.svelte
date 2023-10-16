<script>
    import { state, initialState } from "../js/state";
</script>

<article>
    <h2>Settings</h2>
    <label>
        Theme <br />
        <select bind:value={$state.theme}>
            {#each $state.themes as theme}
                <option value={theme} selected={$state.theme === theme}>
                    {theme}
                </option>
            {/each}
        </select>
    </label>
    <label>
        Font Size (px) <br />
        <input type="number" placeholder="16" bind:value={$state.fontSize} />
    </label>
    <button
        class="red"
        on:click={() => ($state = JSON.parse(JSON.stringify(initialState)))}
    >
        Reset All Settings
    </button>
</article>

<style>
    article {
        max-width: 30rem;
    }
    input,
    select,
    button {
        width: 100%;
    }
</style>
