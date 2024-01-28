<script>
    // State
    export let groups = ["admin", "user", "guest"];
</script>

<h2 class="border-bottom">Groups</h2>
<div class="groups">
    {#each groups as group}
        <div class="tag">{group}</div>
    {/each}
</div>

<style>
    .groups {
        display: flex;
        gap: var(--gap-sm);
        flex-wrap: wrap;
    }
    .tag {
        padding: var(--gap-xs) var(--gap-sm);
        color: var(--color-text-section);
        background-color: var(--color-bg-section);
        border: var(--border);
        border-radius: 99px;
    }
</style>
