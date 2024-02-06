<script>
    // Components
    import TcpClientHeader from "./TcpClientHeader.svelte";
    import TcpClientFunctions from "./TcpClientFunctions.svelte";
    import TcpClientClients from "./TcpClientClients.svelte";
    import TcpClientSettings from "./TcpClientSettings.svelte";
    import TcpClientLog from "./TcpClientLog.svelte";
    import TcpClientSends from "./TcpClientSends.svelte";

    // State
    export let subpage = "Functions";

    // State - Header
    export let select = "Functions";
    export let isOpen = false;
    export let encoding = "ascii";
    export let addresses = ["192.168.1.9:23", "192.168.1.42:8080"];

    // State - Clients
    export let clients = [
        {
            isOpen: false,
            reconnect: false,
            address: "192.168.1.9:23",
            encoding: "ascii",
        },
        {
            isOpen: true,
            reconnect: true,
            address: "192.168.1.42:8080",
            encoding: "hex",
        },
    ];

    // State - Functions
    export let formAddress = "";
    export let formEncoding = "";
    export let formReconnect = "";
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
        <TcpClientHeader
            bind:select
            {addresses}
            {isOpen}
            {encoding}
            {response}
            showButtons={subpage === "Log"}
            on:header-open
            on:header-close
            on:header-toggleEncoding
            on:header-changeConnection
        />
    </div>

    <div class="functions" class:hide={subpage !== "Functions"}>
        <div class="section flow grow">
            <TcpClientClients {clients} on:clients-copy on:clients-open />
        </div>

        <!-- Functions -->
        <div class="section flow grow">
            <TcpClientFunctions
                address={formAddress}
                encoding={formEncoding}
                reconnect={formReconnect}
                data={formData}
                on:functions-open
                on:functions-reconnect
                on:functions-send
                on:functions-close
                on:functions-remove
                on:functions-setEncoding
                on:functions-closeAll
                on:functions-removeAll
            />
            <div>{response}</div>
        </div>
    </div>

    <div class:hide={subpage !== "Settings"} class="settings section flow">
        <TcpClientSettings
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
        <TcpClientLog
            {lines}
            {showBorders}
            {escapeCRLF}
            {prettyJSON}
            {freezeCol1Col2}
            on:lineClick
        />
    </div>
    <div class:hide={subpage !== "Log"} class="sends">
        <TcpClientSends on:send />
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
