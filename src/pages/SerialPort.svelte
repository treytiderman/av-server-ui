<script>
    // Components
    import { X, Settings } from "lucide-svelte";
    import Terminal from "../components/Terminal.svelte";

    // Variables
    let data = {
        state: {
            showSettings: false,
            encodingMode: "ascii",
            selectedPortValue: "COM1",
            selectedBaudrateValue: 9600,
            historyLength: {
                value: 100,
                placeholder: 100,
            },
            port: {
                value: "COM1",
                placeholder: "COM1",
            },
            expectedDelimiter: {
                value: "\\r\\n",
                placeholder: "\\r\\n",
            },
        },
        activeConnection: {
            isOpen: false,
            port: "COM1",
            expectedDelimiter: "\r",
        },
        connections: [
            {
                isOpen: false,
                port: "COM1",
                expectedDelimiter: "\r",
            },
            {
                isOpen: true,
                port: "COM2",
                expectedDelimiter: "",
            },
            {
                isOpen: false,
                port: "COM3",
                expectedDelimiter: "\r\n",
            },
        ],
        baudrates: [9600, 19200, 28800, 38400, 57600, 76800],
        lines: [
            {
                wasReceived: true,
                timestamp: "2022-10-16T21:05:38.257Z",
                data: "No data yet...",
            },
        ],
        sends: [
            {
                value: "ka 01 01\\r",
                placeholder: "ka 01 01\\r",
            },
            {
                value: "\\xAA\\x11\\xFE\\x01\\x01\\x11",
                placeholder: "\\xAA\\x11\\xFE\\x01\\x01\\x11",
            },
            {
                value: "\\x01\\x30\\x41\\x30\\x41\\x30\\x43\\x02\\x43\\x32\\x30\\x33\\x44\\x36\\x30\\x30\\x30\\x31\\x03\\x73\\x0D",
                placeholder:
                    "\\x01\\x30\\x41\\x30\\x41\\x30\\x43\\x02\\x43\\x32\\x30\\x33\\x44\\x36\\x30\\x30\\x30\\x31\\x03\\x73\\x0D",
            },
        ],
    };

    // Functions
    function connectionChange() {
        const port = data.state.selectedPortValue;
        const selectedConnection = data.connections.find(
            (connection) => port === connection.port
        );
        data.activeConnection = selectedConnection;
        // console.log(port);
        // console.log(selectedConnection);
    }
    async function openConnection(port, expectedDelimiter) {
        data.activeConnection.isOpen = true;
    }
    async function closeConnection(path) {
        data.activeConnection.isOpen = false;
    }
    async function toggleConnectionClick() {
        if (data.activeConnection.isOpen)
            closeConnection(data.activeConnection.port);
        else
            openConnection(
                data.activeConnection.port,
                data.activeConnection.expectedDelimiter
            );
    }
    async function sendClick(text) {
        data.lines = [
            ...data.lines,
            {
                wasReceived: false,
                timestamp: new Date().toISOString(),
                data: text,
            },
        ];
        // const body = {
        //   "path": data.settings.devicePath,
        //   "message": text,
        //   "messageType": data.settings.encodingMode,
        //   "cr": false,
        //   "lf": false
        // }
        // // const sendResponse = await post("/api/serial/v1/send", body)
        // console.log("Send", body)
    }
    function updateLineData(port, encodingMode) {
        // if (port?.data) {
        //   let linesFromServer = []
        //   // Add sends to the array
        //   if (encodingMode === "hex") {
        //     port.data.forEach(data => {
        //       if (data.error !== "") data.hex += " <- " + data.error
        //       linesFromServer.push({
        //         wasReceived: data.wasReceived,
        //         timestamp: data.timestamp,
        //         data: data.hex,
        //       })
        //     })
        //   }
        //   else {
        //     port.data.forEach(data => {
        //       if (data.error !== "") data.ascii += " <- " + data.error
        //       linesFromServer.push({
        //         wasReceived: data.wasReceived,
        //         timestamp: data.timestamp,
        //         data: data.ascii,
        //       })
        //     })
        //   }
        //   // Set lines equal to the info from the server
        //   lines = linesFromServer
        // }
    }
    function lineClick(line) {
        let line2 = data.lines.find(lineIter => line.timestamp === lineIter.timestamp)
        line2.mark = true
        console.log(line2);
        console.log(data.lines);
    }

    // Terminal lines
    // $: updateLineData(data.settings.devicePath, data.settings.encodingMode)

    // Debug
    // $: console.log("data", data)
    // $: console.log("activeConnection", data.activeConnection)

    // setInterval(() => {
    //     data.lines = [
    //         ...data.lines,
    //         {
    //             wasReceived: true,
    //             timestamp: new Date().toISOString(),
    //             data: Date.now(),
    //         },
    //     ];
    // }, 1000);
    // setInterval(() => {
    //     const mark = Date.now()%4 === 0
    //     data.lines = [
    //         ...data.lines,
    //         {
    //             wasReceived: false,
    //             timestamp: new Date().toISOString(),
    //             data: mark ? "yes" : "no",
    //             mark: mark,
    //         },
    //     ];
    // }, 4000);
</script>

<section class="wrapper flex column nowrap mono">
    <div class="header flex gap align-center nowrap fill-width">
        <div class="port" class:display-none={data.state.showSettings}>
            <select
                bind:value={data.state.selectedPortValue}
                on:change={() => connectionChange()}
            >
                <optgroup label="Serial Port">
                    {#each data.connections as connection}
                        <option
                            value={connection.port}
                            selected={data.activeConnection.port === connection.port}
                        >
                            {connection.port}
                        </option>
                    {/each}
                </optgroup>
            </select>
            <select
                bind:value={data.state.selectedBaudrateValue}
                on:change={() => connectionChange()}
            >
                <optgroup label="Baud Rate">
                    {#each data.baudrates as baudrate}
                        <option
                            value={baudrate}
                            selected={data.state.baudrate === baudrate}
                        >
                            {baudrate}
                        </option>
                    {/each}
                </optgroup>
            </select>
        </div>
        <button
            class="connection-state"
            class:open={data.activeConnection.isOpen}
            class:closed={!data.activeConnection.isOpen}
            class:display-none={data.state.showSettings}
            on:click={() => toggleConnectionClick()}
        >
            {data.activeConnection.isOpen ? "Open" : "Closed"}
        </button>
        <div
            class:display-none={!data.state.showSettings}
            style="padding-left: var(--gap-sm)"
        >
            Serial Port Settings
        </div>
        <button
            class="settings"
            on:click={() => (data.state.showSettings = !data.state.showSettings)}
        >
            {#if data.state.showSettings === true}
                <X size="1.25rem" strokeWidth="2.5" />
            {:else}
                <Settings size="1.25rem" strokeWidth="2.5" />
            {/if}
        </button>
    </div>

    <!-- Settings -->
    <div
        class="settings grow grid overflow pad"
        class:display-none={!data.state.showSettings}
    >
        <label>
            Encoding Mode <br>
            <select bind:value={data.state.encodingMode}>
                <option value="ascii">ascii</option>
                <option value="hex">hex</option>
            </select>
        </label>
        <label>
            <label>
                History Length <br>
                <input
                    type="text"
                    bind:value={data.state.historyLength.value}
                    placeholder={data.state.historyLength.placeholder}
                />
            </label>
        </label>
    </div>

    <!-- New Connection -->
    <div
        class="new-connection grow grid overflow pad"
        class:display-none={data.state.selectedPortValue !== "New Connection" || data.state.showSettings}
    >
        <label>
            port <br>
            <input
                type="text"
                bind:value={data.state.port.value}
                placeholder={data.state.port.placeholder}
            />
        </label>
        <label>
            Expected Delimiter
            <small>(optional)</small> <br>
            <input
                type="text"
                bind:value={data.state.expectedDelimiter.value}
                placeholder={data.state.expectedDelimiter.placeholder}
            />
        </label>
        <button class="green" on:click={() => openConnection()}> Open </button>
    </div>

    <!-- Terminal + Sends -->
    <div
        class="overflow grow"
        class:display-none={data.state.selectedPortValue === "New Connection" ||
            data.state.showSettings}
    >
        <Terminal lines={data.lines} on:lineClick={line => lineClick(line)} />
    </div>
    <div
        class="sends"
        class:display-none={data.state.selectedPortValue === "New Connection" || data.state.showSettings}
    >
        {#each data.sends as send}
            <div class="sendWrapper flex nowrap">
                <input
                    type="text"
                    placeholder={send.placeholder}
                    bind:value={send.value}
                />
                <button class="orange" on:click={() => sendClick(send.value)}>
                    Send
                </button>
            </div>
        {/each}
    </div>
</section>

<style>
    .wrapper {
        height: 100%;
    }

    .header {
        padding: var(--gap-sm);
        border-bottom: var(--border);
    }
    .header .connection-state {
        padding: var(--gap-xs) var(--gap-sm);
        height: var(--gap-lg);
    }
    .header .closed {
        background-color: var(--color-bg-red);
        border-color: var(--color-border-red);
        color: var(--color-text-red);
    }
    .header .open {
        background-color: var(--color-bg-green);
        border-color: var(--color-border-green);
        color: var(--color-text-green);
    }
    .header .port select {
        padding-top: var(--gap-xs);
        padding-bottom: var(--gap-xs);
        padding-left: var(--gap-sm);
        height: var(--gap-lg);
    }
    .header .settings {
        display: grid;
        place-items: center;
        border-color: transparent;
        background-color: var(--color-bg);
        margin-left: auto;
        padding: var(--gap-xs);
        width: var(--gap-lg);
        height: var(--gap-lg);
    }

    .settings {
        max-width: 25rem;
    }
    .settings select,
    .settings input {
        width: 100%;
    }

    .new-connection {
        max-width: 25rem;
    }
    .new-connection input {
        width: 100%;
    }

    .sends .sendWrapper input {
        width: 100%;
        border-left: none;
        border-right: none;
        border-bottom: none;
        border-radius: 0;
    }
    .sends .sendWrapper button {
        border-right: none;
        border-bottom: none;
        border-radius: 0;
    }
</style>
