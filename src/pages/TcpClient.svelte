<script>
    import { api } from "../js/api";

    // Components
    import { X, Settings } from "lucide-svelte";
    import Terminal from "../components/Terminal.svelte";

    // Variables
    let data = {
        state: {
            showSettings: false,
            encodingMode: "ascii",
            pullHistory: "false",
            selectedAddressValue: "Add Connection",
            address: {
                value: "192.168.1.32:23",
                placeholder: "192.168.1.32:23",
            },
            encoding: {
                value: "ascii",
                placeholder: "ascii or hex",
            },
        },
        activeConnection: {
            isOpen: false,
            isReconnect: false,
            address: "192.168.1.32:23",
            encoding: "ascii",
        },
        connections: [
            {
                isOpen: false,
                address: "192.168.1.99:8080",
            },
            {
                isOpen: false,
                address: "192.168.1.32:23",
            },
            {
                isOpen: true,
                address: "192.168.1.37:10001",
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
                placeholder:
                    "\\x01\\x30\\x41\\x30\\x41\\x30\\x43\\x02\\x43\\x32\\x30\\x33\\x44\\x36\\x30\\x30\\x30\\x31\\x03\\x73\\x0D",
            },
        ],
    };

    // Functions
    function updateActiveConnection() {
        if (data.state.selectedAddressValue === "Add Connection") return;
        const address = data.state.selectedAddressValue;
        const selectedConnection = data.connections.find(
            (connection) => address === connection.address
        );
        console.log(
            "data.state.selectedAddressValue",
            data.state.selectedAddressValue
        );
        console.log("selectedConnection", selectedConnection);
        if (selectedConnection === undefined) {
            data.state.selectedAddressValue = "Add Connection";
        } else {
            data.activeConnection = selectedConnection;
        }
    }
    function connectionChange() {
        if (data.state.selectedAddressValue === "Add Connection") return;

        // Unsub from the previous active connections
        api.tcpClient.v0.unsubData(data.activeConnection.address);

        // Sub to new active connection
        updateActiveConnection();
        api.tcpClient.v0.subData(data.activeConnection.address, (res) => {
            if (res) data.lines = [...data.lines, res];
        });
        if (data.state.pullHistory) {
            api.tcpClient.v0.getHistory(
                data.activeConnection.address,
                (res) => {
                    if (res) data.lines = res;
                }
            );
        }
    }
    async function openConnection(address, encoding) {
        console.log(`open(${address}, ${encoding})`);
        // data.state.selectedAddressValue = address
        api.tcpClient.v0.open(address, encoding, (res) => {
            if (res === "ok") return;
            data.lines = [
                {
                    wasReceived: true,
                    timestampISO: new Date().toISOString(),
                    data: res,
                },
            ];
        });
    }
    async function closeConnection(address) {
        console.log(`close(${address})`);
        api.tcpClient.v0.close(address, (res) => {
            if (res === "ok") return;
            data.lines = [
                {
                    wasReceived: true,
                    timestampISO: new Date().toISOString(),
                    data: res,
                },
            ];
        });
    }
    async function removeConnection(address) {
        console.log(`remove(${address})`);
        api.tcpClient.v0.remove(address);
    }
    async function sendClick(text) {
        console.log(
            `send(${data.activeConnection.address}, ${text}. ${data.activeConnection.encoding})`
        );
        api.tcpClient.v0.send(
            data.activeConnection.address,
            text,
            data.activeConnection.encoding,
            (res) => {
                if (res === "ok") return;
                data.lines = [
                    {
                        wasReceived: true,
                        timestampISO: new Date().toISOString(),
                        data: res,
                    },
                ];
            }
        );
    }

    // Api
    api.tcpClient.v0.subClients((res) => {
        data.connections = res;
        if (res) updateActiveConnection();
    });

    // Debug
    // $: console.log("data", data)
    $: console.log("activeConnection", data.activeConnection);

    // setInterval(() => {
    //     data.lines = [...data.lines, {
    //         wasReceived: true,
    //         timestampISO: (new Date).toISOString(),
    //         data: Date.now(),
    //     }]
    // }, 1000);
</script>

<section class="wrapper flex column nowrap mono">
    <div class="header flex gap align-center nowrap fill-width">
        <div class="address" class:display-none={data.state.showSettings}>
            <select
                bind:value={data.state.selectedAddressValue}
                on:change={() => connectionChange()}
            >
                <optgroup label="TCP Servers">
                    <option value="Add Connection">Add Connection</option>
                    {#each data.connections as connection}
                        <option
                            value={connection.address}
                            selected={data.activeConnection.address ===
                                connection.address}
                        >
                            {connection.address}
                        </option>
                    {/each}
                </optgroup>
            </select>
        </div>
        {#if data.activeConnection.isOpen}
            <button
                class="connection-state open"
                class:display-none={data.state.selectedAddressValue ===
                    "Add Connection" || data.state.showSettings}
                on:click={() =>
                    openConnection(
                        data.activeConnection.address,
                        data.activeConnection.encoding
                    )}
            >
                Open
            </button>
            <button
                class="connection-state"
                class:display-none={data.state.selectedAddressValue ===
                    "Add Connection" || data.state.showSettings}
                on:click={() => closeConnection(data.activeConnection.address)}
            >
                Close
            </button>
        {:else}
            <button
                class="connection-state"
                class:display-none={data.state.selectedAddressValue ===
                    "Add Connection" || data.state.showSettings}
                on:click={() =>
                    openConnection(
                        data.activeConnection.address,
                        data.activeConnection.encoding
                    )}
            >
                Open
            </button>
            <button
                class="connection-state close"
                class:display-none={data.state.selectedAddressValue ===
                    "Add Connection" || data.state.showSettings}
                on:click={() => closeConnection(data.activeConnection.address)}
            >
                Close
            </button>
        {/if}
        <button
            class="connection-state flex align-center"
            class:display-none={data.state.selectedAddressValue ===
                "Add Connection" || data.state.showSettings}
            on:click={() => removeConnection(data.activeConnection.address)}
        >
            Remove
        </button>

        <div
            class:display-none={!data.state.showSettings}
            style="padding-left: var(--gap-sm)"
        >
            TCP Client Settings
        </div>
        <button
            class="settings"
            on:click={() =>
                (data.state.showSettings = !data.state.showSettings)}
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
            <select bind:value={data.state.pullHistory}>
                <option value="true">true</option>
                <option value="false">false</option>
            </select>
        </label>
    </div>

    <!-- Add Connection -->
    <div
        class="new-connection grow grid overflow pad"
        class:display-none={data.state.selectedAddressValue !==
            "Add Connection" || data.state.showSettings}
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
            Encoding <br />
            <input
                type="text"
                bind:value={data.state.encoding.value}
                placeholder={data.state.encoding.placeholder}
            />
        </label>
        <button
            class="green"
            on:click={() =>
                openConnection(
                    data.state.address.value,
                    data.state.encoding.value
                )}
        >
            Open
        </button>
    </div>

    <!-- Terminal + Sends -->
    <div
        class="overflow grow"
        class:display-none={data.state.selectedAddressValue ===
            "Add Connection" || data.state.showSettings}
    >
        <Terminal lines={data.lines} />
    </div>
    <div
        class="sends"
        class:display-none={data.state.selectedAddressValue ===
            "Add Connection" || data.state.showSettings}
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
    .header .close {
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
