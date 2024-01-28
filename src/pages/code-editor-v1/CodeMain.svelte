<script>
    // Imports
    import { state } from "./code-state.js";

    // Components
    import MonacoWrapper from "../../components/MonacoWrapper.svelte";

    // Variables
    let monaco;

    // Functions
    function save() {
        $state.value = monaco.getValue();
    }
</script>

<div class="wrapper">
    <div class="header">
        <button on:click={() => monaco.setValue("", "json")}> Clear </button>
        <button on:click={() => console.log(monaco.getValue())}> Log </button>
        <button on:click={() => save(1)}> Save </button>
    </div>
    <div class="editor">
        <MonacoWrapper
            initValue={$state.value}
            initLanguage="javascript"
            bind:data={monaco}
        />
    </div>
</div>

<style>
    .wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--gap);
    }
    .header {
        display: flex;
        gap: var(--gap);
    }
    .header button {
        background-color: var(--color-bg-section);
    }
    .header button:last-child {
        margin-left: auto;
    }
    .editor {
        flex-grow: 1;
        border: var(--border);
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    /* .box {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .header {
        display: flex;
        border-bottom: var(--border);
    }
    .header button {
        border: none;
        border-radius: 0;
        padding: var(--gap-sm) var(--gap);
        background-color: var(--color-bg);
    }
    .header button:last-child {
        margin-left: auto;
    }
    .editor {
        flex-grow: 1;
    } */
</style>
