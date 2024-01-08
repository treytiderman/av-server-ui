<script>
    export let maxWidth = "var(--max-width, 75ch)"
</script>

<section style={`max-width: ${maxWidth};`}>
    <slot />
</section>

<style>
    section {
        padding: var(--gap);
        max-width: var(--max-width);
        margin-inline: auto;
        width: 100%;
    }
    section :global(> *:not(:first-child)) {
        margin-top: 1.2em;
    }
    section :global(h1),
    section :global(h2) {
        padding-bottom: var(--pad-y);
        border-bottom: var(--border);
        border-width: var(--border-width-2);
    }
</style>
