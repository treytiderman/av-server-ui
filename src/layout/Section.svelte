<script>
</script>

<section>
    <slot />
</section>

<style>
    section {
        width: 100%;
        /* height: 100%; */
        padding: var(--gap);
        background-color: var(--color-bg);
        border-radius: var(--border-radius);
        border: var(--border);

        display: grid;
        align-content: flex-start;
        gap: var(--gap);
        min-width: 14rem;

        overflow: auto;
    }
    section :global(h2) {
        padding-bottom: var(--pad-y);
        border-bottom: var(--border);
        border-width: var(--border-width);
    }
</style>
