<script>
    import Icon from "./Icon.svelte";

    function backdropClick(event) {
        const modalDimensions = modal.getBoundingClientRect();
        if (
            event.clientX < modalDimensions.left ||
            event.clientX > modalDimensions.right ||
            event.clientY < modalDimensions.top ||
            event.clientY > modalDimensions.bottom
        ) {
            modal.close();
        }
    }

    export let modal;
    export let title = "";
    export let widthWithUnits = null;
    export let heightWithUnits = null;
    export let closeIcon = true;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={modal} on:mousedown={backdropClick} style="width: {widthWithUnits}">
    <section>
        {#if title}
            <header>
                <h2>{title}</h2>
                {#if closeIcon}
                    <button class="modalExit" on:click={modal.close()}>
                        <Icon name="xmark" />
                    </button>
                {/if}
            </header>
        {/if}
        <div style="height: {heightWithUnits}">
            <slot />
        </div>
    </section>
</dialog>

<style>
    dialog {
        /* position: fixed; */
        /* left: 50%; */
        /* top: 50%; */
        /* transform: translate(-50%, -50%); */
        border-radius: var(--border-radius-lg);
        background-color: var(--color-bg);
        color: var(--color-text);
        border: var(--border);
        padding: 0;
        /* overflow: unset; */
        /* height: 70%; */
    }
    dialog::backdrop {
        background-color: #00000055;
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
    }
    header {
        display: flex;
        align-items: center;
        border-bottom: var(--border);
    }
    div {
        display: grid;
        overflow: auto;
    }
    h2 {
        display: block;
        overflow-x: auto;
        overflow-y: hidden;
        padding: var(--gap);
        width: 100%;
        background-color: var(--color-bg-header);
        color: var(--color-text-bright);
        border: none;
    }
    button.modalExit {
        background-color: var(--color-bg);
        border: none;
        line-height: 1;
        margin: 0;
        border-radius: 0;
        border-radius: 0 calc(var(--border-radius-lg) / 1.24) 0 0;

        cursor: pointer;
        font-size: 1.6rem;
        height: 4rem;
        width: 4rem;
        padding: var(--gap);
    }
</style>
