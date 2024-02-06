<script>
    // Components
    import SerialPortHeader from "./SerialPortHeader.svelte";
    import SerialPortFunctions from "./SerialPortFunctions.svelte";
    import SerialPortPorts from "./SerialPortPorts.svelte";
    import SerialPortSettings from "./SerialPortSettings.svelte";
    import SerialPortLog from "./SerialPortLog.svelte";
    import SerialPortSends from "./SerialPortSends.svelte";

    // State
    export let subpage = "Functions";

    // State - Header
    export let select = "Functions";
    export let isOpen = false;
    export let encoding = "ascii";
    export let baudrate = 9600;
    export let paths = ["COM3", "COM4"];

    // State - Ports
    export let ports = [
        {
            path: "COM1",
            manufacturer: "(Standard port types)",
            pnpId: "ACPI\\PNP0501\\0",
            friendlyName: "Communications Port (COM1)",
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

    // State - Functions
    export let formPath = "";
    export let formEncoding = "";
    export let formBaudrate = "";
    export let formDelimiter = "";
    export let formData = "";
    export let response = "...";

    // State - Settings
    export let showBorders = false;
    export let escapeCRLF = true;
    export let prettyJSON = false;
    export let freezeCol1Col2 = false;

    // State - Log
    export let lines = [
        {
            wasReceived: false,
            timestamp: "2022-10-16T21:05:38.425Z",
            data: "OFF\r",
            mark: true,
        },
        {
            wasReceived: true,
            timestamp: "2022-10-16T21:05:38.543Z",
            data: "OFF OK\r",
        },
    ];
    // export let showBorders = true;
    // export let escapeCRLF = true;
    // export let prettyJSON = true;
    // export let freezeCol1Col2 = false;
</script>

<div class="wrapper">
    <div class="header">
        <SerialPortHeader
            bind:select
            {paths}
            {isOpen}
            {encoding}
            {baudrate}
            {response}
            showButtons={subpage === "Log"}
            on:header-open
            on:header-close
            on:header-toggleEncoding
            on:header-changePage
        />
    </div>

    <div class="functions" class:hide={subpage !== "Functions"}>
        <div class="section flow grow">
            <SerialPortPorts {ports} on:ports-copy on:ports-open />
        </div>

        <!-- Functions -->
        <div class="section flow grow">
            <SerialPortFunctions
                path={formPath}
                encoding={formEncoding}
                baudrate={formBaudrate}
                delimiter={formDelimiter}
                data={formData}
                on:functions-open
                on:functions-send
                on:functions-close
                on:functions-remove
                on:functions-setEncoding
                on:functions-setBaudrate
                on:functions-setDelimiter
                on:functions-closeAll
                on:functions-removeAll
            />
            <div>{response}</div>
        </div>
    </div>

    <div class:hide={subpage !== "Settings"} class="settings section flow">
        <SerialPortSettings
            {showBorders}
            {escapeCRLF}
            {prettyJSON}
            {freezeCol1Col2}
            on:settings-escapeCRLF
            on:settings-freezeCol1Col2
            on:settings-prettyJSON
            on:settings-showBorders
        />
    </div>

    <div class:hide={subpage !== "Log"} class="log">
        <SerialPortLog {lines} {showBorders} {escapeCRLF} {prettyJSON} {freezeCol1Col2} on:lineClick />
    </div>

    <div class:hide={subpage !== "Log"} class="sends">
        <SerialPortSends on:send />
    </div>
</div>

<style>
    .wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--gap);
    }
    .functions {
        display: flex;
        flex-wrap: wrap;
        align-items: start;
        align-content: flex-start;
        gap: var(--gap);
        flex-grow: 1;
        /* overflow: auto; */
    }
    .functions.hide {
        display: none;
    }
    .log {
        flex-grow: 1;
        overflow: auto;
        background-color: var(--color-bg-section);
        border-radius: var(--border-radius);
        border: var(--border);
    }
</style>
