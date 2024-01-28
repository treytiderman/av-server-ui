<script>
    export let maxWidth = "var(--max-width, 75ch)"
</script>

<article style={`max-width: ${maxWidth};`}>
    <slot />
</article>

<style>
    article {
        width: 100%;
        /* height: 100%; */
        padding: var(--gap);
        max-width: var(--max-width);
        margin-inline: auto;
    }
    article :global(> *:not(:first-child)) {
        margin-top: 1.2em;
    }
    article :global(h1),
    article :global(h2) {
        padding-bottom: var(--pad-y);
        border-bottom: var(--border);
        border-width: var(--border-width);
    }
</style>
