<script>
    // Imports
    import { state } from "./tcp-client-state.js";
    import { tcpClient_v1 } from "../../api/api.js";
    import { onMount, onDestroy } from "svelte";

    // Components
    import TcpClientMain from "./TcpClientMain.svelte";

    // State
    let onlineWithApi = false;
    let selectedClient;

    // State - Main
    let subpage = "Functions";

    // State - Header
    let select = "Functions";
    let isOpen = false;
    let encoding = "ascii";
    let addresses = onlineWithApi ? [] : ["192.168.1.9:23", "192.168.1.42:8080"];

    // State - Clients
    let clients = onlineWithApi ? [] : [
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
    // let formAddress = "";
    // let formEncoding = "";
    // let formReconnect = "";
    // let formData = "";
    let formAddress = "192.168.1.9:23";
    let formEncoding = "ascii";
    let formReconnect = "false";
    let formData = "data";
    let response = "...";

    // State - Settings
    $: showBorders = $state.settings.showBorders;
    $: escapeCRLF = $state.settings.escapeCRLF;
    $: prettyJSON = $state.settings.prettyJSON;
    $: freezeCol1Col2 = $state.settings.freezeCol1Col2;

    // State - Log
    let lines = [];
    $: console.log("lines", lines);

    // Startup / Shutdown
    onMount(async () => {
        if (!onlineWithApi) return;
        tcpClient_v1.clients.sub((res) => {
            clients = Object.values(res);
            addresses = Object.keys(res);
            if (selectedClient?.address) {
                const client = clients.find((c) => c.address === selectedClient.address);
                if (!client) return (subpage = "Functions");
                selectedClient = client;
                isOpen = selectedClient.isOpen;
                encoding = selectedClient.encoding;
            }
        });
    });
    onDestroy(async () => {
        if (!onlineWithApi) return;
        await tcpClient_v1.clients.unsub();
    });

    // Functions
    async function changeConnection(event) {
        const detail = event.detail; // "Functions" || "Settings" || "192.168.1.9:23"
        console.log("tcp-client-changeConnection", detail);

        // Change pages
        if (detail === "Functions") {
            subpage = "Functions";
            return;
        } else if (detail === "Settings") {
            subpage = "Settings";
            return;
        }

        // Unsubscribe to another address history
        if (onlineWithApi && selectedClient?.address) {
            tcpClient_v1.data.unsub(selectedClient.address);
        }

        // Update state
        subpage = "Log";
        selectedClient = clients.find((c) => c.address === detail);
        if (!selectedClient) return (subpage = "Functions");
        console.log("tcp-client-changeConnection new selectedClient", selectedClient);

        isOpen = selectedClient.isOpen;
        encoding = selectedClient.encoding;

        // Subscribe to another address history
        if (onlineWithApi) {
            lines = await tcpClient_v1.history.get(selectedClient.address);
            let lastData = "";
            tcpClient_v1.data.sub(selectedClient.address, (res) => {
                console.log("data.sub", res);
    
                // Backend issue. Delete once fixed
                if (lastData === JSON.stringify(res) || !res) return;
                lastData = JSON.stringify(res);
                console.log("new data.sub", res);
    
                lines.push(res);
                lines = lines;
            });
        }
    }
    async function toggleEncoding(event) {
        const detail = event.detail;
        console.log("tcp-client-toggleEncoding", selectedClient);
        const encoding = selectedClient.encoding === "ascii" ? "hex" : "ascii";
        response = await tcpClient_v1.client.setEncoding(selectedClient.address, encoding);
    }
    async function headerOpen(event) {
        const detail = event.detail;
        console.log("tcp-client-headerOpen", selectedClient);
        response = await tcpClient_v1.client.open(
            selectedClient.address,
            selectedClient.encoding,
            selectedClient.reconnect,
        );
    }
    async function headerClose(event) {
        const detail = event.detail;
        console.log("tcp-client-headerClose", selectedClient);
        response = await tcpClient_v1.client.close(selectedClient.address);
    }
    async function clientCopy(event) {
        const detail = event.detail;
        console.log("tcp-client-clientCopy", detail);
        formAddress = detail.address;
        formEncoding = detail.encoding;
        formReconnect = detail.reconnect;
    }
    async function clientOpen(event) {
        const detail = event.detail;
        console.log("tcp-client-clientOpen", detail);
        subpage = "Log";
        select = detail;
        changeConnection({ detail: select });
    }
    async function open(event) {
        const detail = event.detail;
        console.log("tcp-client-open", detail);
        response = await tcpClient_v1.client.open(detail.address, detail.encoding, detail.reconnect);
    }
    async function reconnect(event) {
        const detail = event.detail;
        console.log("tcp-client-reconnect", detail);
        response = await tcpClient_v1.client.reconnect(detail.address, detail.encoding, detail.reconnect);
    }
    async function send(event) {
        const detail = event.detail;
        console.log("tcp-client-send", detail);
        response = await tcpClient_v1.client.send(detail.address, detail.data, detail.encoding);
    }
    async function close(event) {
        const detail = event.detail;
        console.log("tcp-client-close", detail);
        response = await tcpClient_v1.client.close(detail.address);
    }
    async function remove(event) {
        const detail = event.detail;
        console.log("tcp-client-remove", detail);
        response = await tcpClient_v1.client.remove(detail.address);
    }
    async function setEncoding(event) {
        const detail = event.detail;
        console.log("tcp-client-setEncoding", detail);
        response = await tcpClient_v1.client.setEncoding(detail.address, detail.encoding);
    }
    async function closeAll(event) {
        const detail = event.detail;
        console.log("tcp-client-closeAll", detail);
        response = await tcpClient_v1.clients.close();
    }
    async function removeAll(event) {
        const detail = event.detail;
        console.log("tcp-client-removeAll", detail);
        response = await tcpClient_v1.clients.remove();
    }
    async function escapeCRLFClick(event) {
        const detail = event.detail;
        console.log("tcp-client-escapeCRLFClick", detail);
        $state.settings.escapeCRLF = !$state.settings.escapeCRLF;
    }
    async function freezeCol1Col2Click(event) {
        const detail = event.detail;
        console.log("tcp-client-freezeCol1Col2Click", detail);
        $state.settings.freezeCol1Col2 = !$state.settings.freezeCol1Col2;
    }
    async function prettyJSONClick(event) {
        const detail = event.detail;
        console.log("tcp-client-prettyJSONClick", detail);
        $state.settings.prettyJSON = !$state.settings.prettyJSON;
    }
    async function showBordersClick(event) {
        const detail = event.detail;
        console.log("tcp-client-showBordersClick", detail);
        $state.settings.showBorders = !$state.settings.showBorders;
    }
    async function lineClick(event) {
        const detail = event.detail;
        console.log("tcp-client-lineClick", detail);
        const lineIndex = lines.findIndex((line) => line.timestamp === detail.timestamp);
        lines[lineIndex].mark = lines[lineIndex]?.mark ? false : true;
    }
    async function sendsSend(event) {
        const detail = event.detail;
        console.log("tcp-client-sendsSend", selectedClient, detail);
        response = await tcpClient_v1.client.send(selectedClient.address, detail, selectedClient.encoding);
    }
</script>

<div class="page flex column max-width" class:max-width={subpage !== "Log"}>
    {#if onlineWithApi}
        <TcpClientMain
            bind:select
            {subpage}
            {isOpen}
            {encoding}
            {addresses}
            {clients}
            {formAddress}
            {formEncoding}
            {formReconnect}
            {formData}
            {response}
            {showBorders}
            {escapeCRLF}
            {prettyJSON}
            {freezeCol1Col2}
            {lines}
            on:header-open={headerOpen}
            on:header-close={headerClose}
            on:header-changeConnection={changeConnection}
            on:header-toggleEncoding={toggleEncoding}
            on:clients-copy={clientCopy}
            on:clients-open={clientOpen}
            on:functions-open={open}
            on:functions-reconnect={reconnect}
            on:functions-send={send}
            on:functions-close={close}
            on:functions-remove={remove}
            on:functions-setEncoding={setEncoding}
            on:functions-closeAll={closeAll}
            on:functions-removeAll={removeAll}
            on:settings-escapeCRLF={escapeCRLFClick}
            on:settings-freezeCol1Col2={freezeCol1Col2Click}
            on:settings-prettyJSON={prettyJSONClick}
            on:settings-showBorders={showBordersClick}
            on:lineClick={lineClick}
            on:send={sendsSend}
        />
    {:else}
        <div>Offline</div>
        <TcpClientMain
            bind:select
            {subpage}
            {isOpen}
            {encoding}
            {addresses}
            {clients}
            {formAddress}
            {formEncoding}
            {formReconnect}
            {formData}
            {response}
            {showBorders}
            {escapeCRLF}
            {prettyJSON}
            {freezeCol1Col2}
            {lines}
            on:header-changeConnection={changeConnection}
            on:clients-copy={clientCopy}
            on:clients-open={clientOpen}
            on:settings-escapeCRLF={escapeCRLFClick}
            on:settings-freezeCol1Col2={freezeCol1Col2Click}
            on:settings-prettyJSON={prettyJSONClick}
            on:settings-showBorders={showBordersClick}
        />
    {/if}
</div>
