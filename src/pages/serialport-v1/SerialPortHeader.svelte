<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Variables
    const baudrates = [9600, 19200, 38400, 57600, 115200];
    let wrapperWidth;

    // State - Header
    export let select = "Functions";
    export let isOpen = false;
    export let encoding = "ascii";
    export let baudrate = 9600;
    export let showButtons = true;
    export let paths = ["COM3", "COM4"];
    export let response = "...";
</script>

<section class="wrapper" class:wrapper-wrap={wrapperWidth < 500} bind:clientWidth={wrapperWidth}>
    {#if showButtons}
        <!-- Open / Close Button -->
        {#if isOpen}
            <button
                class="open"
                class:close={!isOpen}
                title="Close port"
                on:click={(event) => dispatch("header-close")}
            >
                Open
            </button>
        {:else}
            <button class="close" title="Open port" on:click={(event) => dispatch("header-open")}> Closed </button>
        {/if}
    {/if}

    <!-- Address Selector -->
    <select
        class="path"
        title="Select a path"
        bind:value={select}
        on:input={(event) => {
            dispatch("header-changePage", event.target.value);
        }}
    >
        <optgroup label="Pages">
            <option value="Functions">Functions</option>
            <option value="Settings">Settings</option>
        </optgroup>
        <optgroup label={paths.length === 0 ? "No Serial Ports" : "Serial Ports"}>
            {#each paths as path}
                <option value={path}>{path}</option>
            {/each}
        </optgroup>
    </select>

    {#if showButtons}
        <!-- Baud Rate -->
        <select
            class="baudrate"
            title="Select baudrate"
            value={baudrate}
            on:input={(event) => {
                dispatch("header-changeBaudrate", event.target.value);
            }}
        >
            <optgroup label="Baud Rate">
                {#each baudrates as baud}
                    <option value={baud}>{baud}</option>
                {/each}
            </optgroup>
        </select>

        <!-- Ascii / Hex Button -->
        <button
            class="encoding"
            class:hide={wrapperWidth < 500}
            title="Toggle between 'ascii' and 'hex' encoding"
            on:click={(event) => dispatch("header-toggleEncoding")}
        >
            {encoding}
        </button>
    {/if}

    <!-- Api Response -->
    <div class="response" class:hide={wrapperWidth < 750} title="Response from the api">
        {response}
    </div>
</section>

<style>
    .wrapper {
        display: flex;
        gap: var(--gap);
    }

    /* Prevent wrapping until the response div is hidden */
    .wrapper-wrap {
        flex-wrap: wrap;
    }

    select {
        min-width: 14rem;
        max-width: 16rem;
        text-overflow: ellipsis;
        background-color: var(--color-bg-section);
    }

    /* Classes */
    .baudrate {
        min-width: 8rem;
    }
    .response {
        line-height: 1;
        flex-grow: 1;
        background-color: var(--color-bg-section);
        border: var(--border);
        border-radius: var(--border-radius);
        overflow: hidden;
        text-overflow: ellipsis;
        text-wrap: nowrap;
        padding: var(--padding);
    }
    .encoding {
        background-color: var(--color-bg-section);
    }
    .open {
        color: var(--color-text-green);
        border-color: var(--color-border-green);
        background-color: var(--color-bg-green);
    }
    .close {
        color: var(--color-text-red);
        border-color: var(--color-border-red);
        background-color: var(--color-bg-red);
    }
</style>
