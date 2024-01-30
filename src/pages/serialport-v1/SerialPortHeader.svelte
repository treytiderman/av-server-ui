<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // State
    export let select = "Functions";
    export let isOpen = false;
    export let encoding = "ascii";
    export let showButtons = true;
    export let addresses = ["192.168.1.9:23", "172.100.100.100:58080"];
    export let response = "...";
    let wrapperWidth;
</script>

<section
    class="wrapper"
    class:wrapper-wrap={wrapperWidth < 500}
    bind:clientWidth={wrapperWidth}
>
    {#if showButtons}
        <!-- Open / Close Button -->
        {#if isOpen}
            <button
                class="open"
                class:close={!isOpen}
                title="Close the tcp client connection"
                on:click={(event) => dispatch("header-close")}
            >
                Open
            </button>
        {:else}
            <button
                class="close"
                title="Open a tcp client connection"
                on:click={(event) => dispatch("header-open")}
            >
                Closed
            </button>
        {/if}
    {/if}

    <!-- Address Selector -->
    <select
        class="address"
        title="Select an address"
        bind:value={select}
        on:input={(event) => {
            dispatch("header-changeConnection", event.target.value);
        }}
    >
        <option value="Functions">Functions</option>
        <option value="Settings">Settings</option>
        <optgroup label={addresses.length === 0 ? "No Clients" : "Clients"}>
            {#each addresses as address}
                <option value={address}>{address}</option>
            {/each}
        </optgroup>
    </select>

    {#if showButtons}
        <!-- Ascii / Hex Button -->
        <button
            class="encoding"
            class:hide={wrapperWidth < 500}
            title="Toggle between 'ascii' and 'hex' encoding"
            on:click={(event) => dispatch("header-toggleEncoding")}
        >
            {encoding}
        </button>

        <!-- Api Response -->
        <div
            class="response"
            class:hide={wrapperWidth < 750}
            title="Response from the api"
        >
            {response}
        </div>
    {/if}
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
