<script>
    // Components
    import { X, Settings } from 'lucide-svelte';
    import Terminal from "../components/Terminal.svelte";

    // Variables
    let data = {
        state: {
            showSettings: false,
            encodingMode: "ascii",
            selectedAddressValue: "192.168.1.246:23",
            address: {
                value: "192.168.1.246:23",
                placeholder: "192.168.1.246:23",
            },
            expectedDelimiter: {
                value: "\\r\\n",
                placeholder: "\\r\\n",
            },
        },
        activeConnection: {
            isOpen: false,
            address: "192.168.1.246:23",
            expectedDelimiter: "\r"
        },
        connections: [
            {
                isOpen: false,
                address: "192.168.1.99:8080",
                expectedDelimiter: "\r\n"
            },
            {
                isOpen: false,
                address: "192.168.1.246:23",
                expectedDelimiter: "\r"
            },
            {
                isOpen: true,
                address: "192.168.1.37:10001",
                expectedDelimiter: ""
            },
        ],
        lines: [
            {
                wasReceived: true,
                timestampISO: "2022-10-16T21:05:38.257Z",
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
                placeholder: "\\x01\\x30\\x41\\x30\\x41\\x30\\x43\\x02\\x43\\x32\\x30\\x33\\x44\\x36\\x30\\x30\\x30\\x31\\x03\\x73\\x0D",
            },
        ],
    };

    // Functions
    function connectionChange() {
        if (data.state.selectedAddressValue === "New Connection") return
        const address = data.state.selectedAddressValue
        const selectedConnection = data.connections.find(connection => address === connection.address)
        data.activeConnection = selectedConnection
        // console.log(address);
        // console.log(selectedConnection);
    }
    async function openConnection(address, expectedDelimiter) {
        data.activeConnection.isOpen = true
    }
    async function closeConnection(path) {
        data.activeConnection.isOpen = false
    }
    async function toggleConnectionClick() {
        if (data.activeConnection.isOpen) closeConnection(data.activeConnection.address)
        else openConnection(data.activeConnection.address, data.activeConnection.expectedDelimiter)
    }
    async function sendClick(text) {
        data.lines = [...data.lines, {
            wasReceived: false,
            timestampISO: (new Date).toISOString(),
            data: text,
        }]
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
        //         timestampISO: data.timestampISO,
        //         data: data.hex,
        //       })
        //     })
        //   }
        //   else {
        //     port.data.forEach(data => {
        //       if (data.error !== "") data.ascii += " <- " + data.error
        //       linesFromServer.push({
        //         wasReceived: data.wasReceived,
        //         timestampISO: data.timestampISO,
        //         data: data.ascii,
        //       })
        //     })
        //   }
        //   // Set lines equal to the info from the server
        //   lines = linesFromServer
        // }
    }

    // Terminal lines
    // $: updateLineData(data.settings.devicePath, data.settings.encodingMode)

    // Debug
    // $: console.log("data", data)
    // $: console.log("activeConnection", data.activeConnection)

    setInterval(() => {
        data.lines = [...data.lines, {
            wasReceived: true,
            timestampISO: (new Date).toISOString(),
            data: Date.now(),
        }]
    }, 1000);
</script>

<section class="wrapper flex column nowrap mono">
    <div class="header flex gap align-center nowrap fill-width">
        <div
            class="address"
            class:display-none={data.state.showSettings}
        >
            <select 
                bind:value={data.state.selectedAddressValue}
                on:change={() => connectionChange()}
            >
                <option value="New Connection">New Connection</option>
                {#each data.connections as connection}
                    <option
                        value="{connection.address}"
                        selected={data.activeConnection.address === connection.address}
                    >
                        {connection.address}
                    </option>
                {/each}
            </select>
        </div>
        <button class="connection-state"
            class:open={data.activeConnection.isOpen}
            class:closed={!data.activeConnection.isOpen}
            class:display-none={data.state.showSettings}
            on:click={() => toggleConnectionClick()}
        >
            {data.activeConnection.isOpen ? "Open" : "Closed"}
        </button>
        <div class:display-none={!data.state.showSettings} style="padding-left: var(--gap-sm)">TCP Client Settings</div>
        <button
            class="settings"
            on:click={() => data.state.showSettings = !data.state.showSettings}
        >
            {#if data.state.showSettings === true}
                <X size="1.2rem" strokeWidth="2.5" />
            {:else}
                <Settings size="1.2rem" strokeWidth="2.5" />
            {/if}
        </button>
    </div>

    <!-- Settings -->
    <div
        class="grow grid overflow pad"
        class:display-none={!data.state.showSettings}
    >
        <label>
            Encoding Mode <br />
            <select bind:value={data.state.encodingMode}>
                <option value="ascii">ascii</option>
                <option value="hex">hex</option>
            </select>
        </label>
        <label>
            Pull History <br />
            <select>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        </label>
    </div>

    <!-- New Connection -->
    <div
        class="new-connection grow grid overflow pad"
        class:display-none={data.state.selectedAddressValue !== "New Connection" || data.state.showSettings}
    >
        <label>
            Address <br />
            <input
                type="text"
                bind:value={data.state.address.value}
                placeholder={data.state.address.placeholder}
            />
        </label>
        <label>
            Expected Delimiter 
            <small>(optional)</small> <br />
            <input
                type="text"
                bind:value={data.state.expectedDelimiter.value}
                placeholder={data.state.expectedDelimiter.placeholder}
            />
        </label>
        <button class="green" on:click={() => openConnection()}>
            Open
        </button>
    </div>

    <!-- Terminal + Sends -->
    <div 
        class="overflow grow"
        class:display-none={data.state.selectedAddressValue === "New Connection" || data.state.showSettings}
    >
        <Terminal lines={data.lines} />
    </div>
    <div
        class="sends"
        class:display-none={data.state.selectedAddressValue === "New Connection" || data.state.showSettings}
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
    .header .address select {
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
