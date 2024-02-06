<script>
    // Event Emitter
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Components
    import { Circle, X, History, Copy, ExternalLink } from "lucide-svelte";

    // State
    export let clients = [
        {
            isOpen: true,
            reconnect: true,
            address: "192.168.1.9:23",
            encoding: "ascii",
        },
        {
            isOpen: false,
            reconnect: false,
            address: "192.168.1.32:23",
            encoding: "hex",
        },
        {
            isOpen: false,
            reconnect: true,
            address: "10.10.1.199:65001",
            encoding: "utf8",
        },
    ];
</script>

<h2 class="border-bottom">Clients</h2>
<div class="clients flow">
    <!-- If No Clients -->
    {#if clients.length === 0}
        no clients yet...
    {/if}

    <!-- Each Client -->
    {#each clients as client}
        <div
            class="flex gap y-center client"
            title="
TCP Client with the address '{client.address}' is {client.isOpen ? 'open' : 'closed'}
{client.reconnect ? 'and will try to reconnect on close' : ''}"
        >
            {#if client.isOpen}
                <Circle
                    size="1.2rem"
                    strokeWidth="2"
                    color="var(--color-text-green)"
                />
            {:else}
                <X
                    size="1.2rem"
                    strokeWidth="2"
                    color="var(--color-text-red)"
                />
            {/if}
            <!-- <h4 class="mono-family">
                {client.address}
            </h4> -->
            <h4 class="flex gap-xs y-center mono-family">
                {client.address.split(":")[0]}
                <span class="dim">:</span>
                {client.address.split(":")[1]}
            </h4>
            <small class="">{client.encoding}</small>
            <div class:hide={!client.reconnect}>
                <History size="1.2rem" strokeWidth="2" />
            </div>
            <button
                class="margin-left-auto"
                title="Copy info into the Form"
                on:click={() => dispatch("clients-copy", client)}
            >
                <Copy size="1.2rem" strokeWidth="2" />
            </button>
            <button
                title="Open '{client.address}' in the Terminal"
                on:click={() => dispatch("clients-open", client.address)}
            >
                <ExternalLink size="1.2rem" strokeWidth="2" />
            </button>
        </div>
    {/each}
</div>

<style>
    button {
        border: none;
        color: var(--color-bg-3);
        background-color: var(--color-bg-1);
        padding: var(--gap-xs);
    }
    button:focus,
    .client:hover > button {
        color: var(--color-text-1);
    }
</style>
