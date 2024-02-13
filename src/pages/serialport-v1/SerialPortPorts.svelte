<script>
    // Event Emitter
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Components
    import { Circle, X, Copy, ExternalLink, Minus } from "lucide-svelte";

    // State - Ports
    export let ports = [
        {
            path: "COM1",
            manufacturer: "(Standard port types)",
            pnpId: "ACPI\\PNP0501\\0",
            friendlyName: "Communications Port (COM1)",
        },
        {
            path: "COM3",
            manufacturer: "FTDI",
            serialNumber: "AB0OJ5M6",
            pnpId: "FTDIBUS\\VID_0403+PID_6001+AB0OJ5M6A\\0000",
            friendlyName: "USB Serial Port (COM3)",
            vendorId: "0403",
            productId: "6001",

            isOpen: false,
            baudrate: 115200,
            encoding: "hex",
            delimiter: "0D0A",
        },
        {
            path: "COM4",
            manufacturer: "FTDI",
            serialNumber: "A10NQRTP",
            pnpId: "FTDIBUS\\VID_0403+PID_6001+A10NQRTPA\\0000",
            friendlyName: "USB Serial Port (COM4)",
            vendorId: "0403",
            productId: "6001",

            isOpen: true,
            baudrate: 9600,
            encoding: "ascii",
            delimiter: "none",
        },
    ];
</script>

<h2 class="border-bottom">Ports</h2>
<div class="flow">
    <!-- If No Ports -->
    {#if ports.length === 0}
        no ports available...
    {/if}

    <!-- Each Port -->
    {#each ports as port}
        <div class="grid gap-sm row">
            <div
                class="flex gap y-center"
                title="Serial Port with the path '{port.path}' is {port.isOpen ? 'open' : 'closed'}"
            >
                {#if port.isOpen === undefined}
                    <X size="1.25rem" strokeWidth="2" color="var(--color-text)" />
                {:else if port.isOpen === true}
                    <Circle size="1.25rem" strokeWidth="2" color="var(--color-text-green)" />
                {:else if port.isOpen === false}
                    <X size="1.25rem" strokeWidth="2" color="var(--color-text-red)" />
                {/if}
                <h4 class="mono-family">{port.path}</h4>
                {#if port?.isOpen !== undefined}
                    <button
                        class="margin-left-auto"
                        title="Copy info into the Form"
                        on:click={() => dispatch("ports-copy", port)}
                    >
                        <Copy size="1.25rem" strokeWidth="2" />
                    </button>
                    <button
                        title="Open '{port.path}' in the Terminal"
                        on:click={() => dispatch("ports-open", port.path)}
                    >
                        <ExternalLink size="1.25rem" strokeWidth="2" />
                    </button>
                {/if}
            </div>

            {#if port?.encoding}
                <div class="indent flex nowrap gap y-center">
                    <Minus size="1.25rem" strokeWidth="2" color="var(--color-bg-1)" />
                    <small class="dim">Baud Rate:</small>
                    <small class="">{port.baudrate}</small>
                </div>
            {/if}

            {#if port?.encoding}
                <div class="indent flex nowrap gap y-center">
                    <Minus size="1.25rem" strokeWidth="2" color="var(--color-bg-1)" />
                    <small class="dim">Encoding:</small>
                    <small class="">{port.encoding}</small>
                </div>
            {/if}

            {#if port?.delimiter}
                <div class="indent flex nowrap gap y-center">
                    <Minus size="1.25rem" strokeWidth="2" color="var(--color-bg-1)" />
                    <small class="dim">Delimiter:</small>
                    <small class="">{port.delimiter}</small>
                </div>
            {/if}

            {#if port?.manufacturer}
                <div class="indent flex nowrap gap y-center">
                    <Minus size="1.25rem" strokeWidth="2" color="var(--color-bg-1)" />
                    <small class="dim">Manufacturer:</small>
                    <small class="">{port.manufacturer}</small>
                </div>
            {/if}

            {#if port?.serialNumber}
                <div class="indent flex nowrap gap y-center">
                    <Minus size="1.25rem" strokeWidth="2" color="var(--color-bg-1)" />
                    <small class="dim">Serial Number:</small>
                    <small class="">{port.serialNumber}</small>
                </div>
            {/if}

            {#if port?.friendlyName}
                <div class="indent flex nowrap gap y-center">
                    <Minus size="1.25rem" strokeWidth="2" color="var(--color-bg-1)" />
                    <small class="dim">Friendly Name:</small>
                    <small class="">{port.friendlyName}</small>
                </div>
            {/if}
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
    .row:hover button {
        color: var(--color-text-1);
    }
    .indent {
        /* padding-left: var(--gap-lg); */
    }
</style>
