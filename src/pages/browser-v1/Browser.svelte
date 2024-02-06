<script>
    let url = "https://trey.app";
    let scale = 0.8;
    let iframe;
    $: scaleSafe = clamp(scale, 0.35, 4) 
    function clamp(num, min, max) {
        if (num < min) num = min;
        else if (num > max) num = max;
        return num;
    }
    const clamp2 = (num, min, max) => num < min ? min : num > max ? max : num
    function reload(event) {
        try {
            iframe.contentWindow.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
</script>

<article class="page flex column gap">
    <section class="flex gap">
        <input type="text" class="grow" placeholder="https://trey.app" bind:value={url} />
        <input type="text" size="4" placeholder="scale" bind:value={scale} />
        <button on:click={reload}>Reload</button>
    </section>
    <section class="section full-width grow">
        <iframe bind:this={iframe} title={url} src={url} style="--scale: {scaleSafe}" loading="lazy" frameborder="0" allowfullscreen></iframe>
    </section>
</article>

<style>
    iframe {
        --scale: 1;
        width: calc(1/var(--scale) * 100%);
        height: calc(1/var(--scale) * 100%);
        transform-origin: top left;
        transform: scale(var(--scale));
    }
    .section {
        overflow: hidden;
        padding: 0;
    }
    input,
    button {
        background-color: var(--color-bg-section);
        min-width: none;
        width: min-content;
    }
</style>
