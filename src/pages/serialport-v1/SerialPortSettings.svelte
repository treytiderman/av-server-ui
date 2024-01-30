<script>
    // Event Emitter
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // State - Settings
    export let showBorders = false
    export let escapeCRLF = true
    export let prettyJSON = false
    export let freezeCol1Col2 = false
</script>

<h2>UI Settings</h2>
<div>
    <input
        type="checkbox"
        id="showBorders"
        checked={showBorders}
        on:click={() => dispatch("settings-showBorders", showBorders)}
    />
    <label for="showBorders">
        showBorders
        <span class="dim">(default: false)</span>
    </label>
</div>
<div>
    <input
        type="checkbox"
        id="escapeCRLF"
        checked={escapeCRLF}
        on:click={() => dispatch("settings-escapeCRLF", escapeCRLF)}
    />
    <label for="escapeCRLF">
        escapeCRLF
        <span class="dim">(default: true)</span>
    </label>
</div>
<div>
    <input
        type="checkbox"
        id="prettyJSON"
        checked={prettyJSON}
        on:click={() => dispatch("settings-prettyJSON", prettyJSON)}
    />
    <label for="prettyJSON">
        prettyJSON
        <span class="dim">(default: false)</span>
    </label>
</div>
<div>
    <input
        type="checkbox"
        id="freezeCol1Col2"
        checked={freezeCol1Col2}
        on:click={() => dispatch("settings-freezeCol1Col2", freezeCol1Col2)}
    />
    <label for="freezeCol1Col2">
        freezeCol1Col2
        <span class="dim">(default: false)</span>
    </label>
</div>

<style>

</style>
