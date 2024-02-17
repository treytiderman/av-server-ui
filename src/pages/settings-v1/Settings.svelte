<script>
    // Imports
    import { store as settings_persistent_state } from "./settings-persistent-state.js";

    // Local
    const themes = ["black", "dark", "light"];
</script>

<div class="page">
    <div class="section flow">
        <h2>Settings</h2>
        <label>
            Theme
            <small class="dim"> default = "dark" </small>
            <br />
            <select bind:value={$settings_persistent_state.theme}>
                {#each themes as theme}
                    <option
                        value={theme}
                        selected={$settings_persistent_state.theme === theme}
                    >
                        {theme}
                    </option>
                {/each}
            </select>
        </label>
        <label>
            Font Size (px) 
            <small class="dim"> min 8, max 36 </small>
            <br />
            <input
                type="number"
                placeholder="16"
                bind:value={$settings_persistent_state.fontSize}
            />
        </label>
        <button
            class="red"
            on:click={() => {
                settings_persistent_state.reset();
            }}
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
