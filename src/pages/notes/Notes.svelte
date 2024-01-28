<script>
    import { state } from "./notes-state.js"
</script>

<div class="page overflow mono">
    <textarea bind:value={$state.notes} />
</div>

<style>
    div {
        display: grid;
    }
    textarea {
        background-color: var(--color-bg-section);
    }
</style>
