<script>
    // Imports
    import { state } from "./serialport-state.js";
    import { serial_v1 as api } from "../../api/api.js";
    import { onMount, onDestroy } from "svelte";

    // Stores
    import { store as app_volatile_store } from "../../app-volatile-store.js";

    // Components
    import SerialPortMain from "./SerialPortMain.svelte";

    // State
    let isOffline = $app_volatile_store.url.query?.offline === "true";
    let selectedPort;

    // State - Main
    let subpage = "Functions";

    // State - Header
    let select = "Functions";
    let isOpen = false;
    let encoding = "ascii";
    let baudrate = 9600;
    let delimiter = "none";
    let paths = isOffline === false ? [] : ["COM4"];

    // State - Ports
    let ports = isOffline === false ? [] : [
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
    let formPath = "";
    let formEncoding = "";
    let formBaudrate = 9600;
    let formDelimiter = "";
    let formData = "";
    let response = "";

    // State - Settings
    $: showBorders = $state.settings.showBorders;
    $: escapeCRLF = $state.settings.escapeCRLF;
    $: prettyJSON = $state.settings.prettyJSON;
    $: freezeCol1Col2 = $state.settings.freezeCol1Col2;

    // State - Log
    let lines = [];

    // Startup / Shutdown
    onMount(async () => {
        if (isOffline) return;
        api.available.sub(async (res) => {
            ports = await getPorts();
        });
        api.ports.sub(async (res) => {
            ports = await getPorts();

            paths = Object.keys(res);
            paths.filter((p) => p.isOpen === undefined);

            if (selectedPort?.path) {
                const port = ports.find((c) => c.path === selectedPort.path);
                if (!port) return (subpage = "Functions");
                selectedPort = port;
                isOpen = selectedPort.isOpen;
                baudrate = selectedPort.baudrate;
                encoding = selectedPort.encoding;
                delimiter = selectedPort.delimiter;
            }
        });
    });
    onDestroy(async () => {
        if (isOffline) return;
        await api.ports.unsub();
    });

    // Functions
    async function getPorts() {
        const available = await api.available.get();
        if (available.startsWith("error")) return []
        console.log("available", available);
        const statuses = await api.ports.get();

        Object.values(statuses).forEach((status) => {
            const index = available.findIndex((p) => p.path === status.path);
            if (index) {
                available[index].isOpen = status.isOpen;
                available[index].baudrate = status.baudrate;
                available[index].encoding = status.encoding;
                available[index].delimiter = status.delimiter;
            }
        });

        return available;
    }
    async function changePage(event) {
        const detail = event.detail; // "Functions" || "Settings" || "COM3"
        console.log("serial-port-changePage", detail);

        // Change pages
        if (detail === "Functions" || detail === "Settings") {
            subpage = detail;
            return;
        }

        // Unsubscribe last history
        if (!isOffline && selectedPort?.path) {
            api.data.unsub(selectedPort.path);
        }

        // Update state
        subpage = "Log";
        selectedPort = ports.find((c) => c.path === detail);
        if (!selectedPort) return (subpage = "Functions");

        isOpen = selectedPort.isOpen;
        encoding = selectedPort.encoding;
        baudrate = selectedPort.baudrate;
        delimiter = selectedPort.delimiter;

        // Subscribe new history
        if (isOffline) return;
        lines = await api.history.get(selectedPort.path);
        let lastData = "";
        api.data.sub(selectedPort.path, (res) => {
            console.log("data.sub", res);

            // Backend issue. Delete once fixed
            if (lastData === JSON.stringify(res) || !res) return;
            lastData = JSON.stringify(res);
            console.log("new data.sub", res);

            lines.push(res);
            lines = lines;
        });
    }
    async function toggleEncoding(event) {
        const detail = event.detail;
        console.log("serial-port-toggleEncoding", selectedPort);
        const encoding = selectedPort.encoding === "ascii" ? "hex" : "ascii";
        if (isOffline) return;
        response = await api.port.setEncoding(selectedPort.path, encoding);
    }
    async function headerOpen(event) {
        const detail = event.detail;
        console.log("serial-port-headerOpen", selectedPort);
        if (isOffline) return;
        response = await api.port.open(
            selectedPort.path,
            selectedPort.baudrate,
            selectedPort.encoding,
            selectedPort.delimiter,
        );
    }
    async function headerClose(event) {
        const detail = event.detail;
        console.log("serial-port-headerClose", selectedPort);
        if (isOffline) return;
        response = await api.port.close(selectedPort.path);
    }
    async function portCopy(event) {
        const detail = event.detail;
        console.log("serial-port-portCopy", detail);
        formPath = detail.path;
        formEncoding = detail.encoding;
        formBaudrate = detail.baudrate;
        formDelimiter = detail.delimiter;
    }
    async function portOpen(event) {
        const detail = event.detail;
        console.log("serial-port-portOpen", detail);
        subpage = "Log";
        select = detail;
        changePage({ detail: select });
    }
    async function open(event) {
        const detail = event.detail;
        console.log("serial-port-open", detail);
        if (isOffline) return;
        response = await api.port.open(detail.path, detail.baudrate, detail.encoding, detail.delimiter);
    }
    async function send(event) {
        const detail = event.detail;
        console.log("serial-port-send", detail);
        if (isOffline) return;
        response = await api.port.send(detail.path, detail.data, detail.encoding);
    }
    async function close(event) {
        const detail = event.detail;
        console.log("serial-port-close", detail);
        if (isOffline) return;
        response = await api.port.close(detail.path);
    }
    async function remove(event) {
        const detail = event.detail;
        console.log("serial-port-remove", detail);
        if (isOffline) return;
        response = await api.port.remove(detail.path);
    }
    async function setEncoding(event) {
        const detail = event.detail;
        console.log("serial-port-setEncoding", detail);
        if (isOffline) return;
        response = await api.port.setEncoding(detail.path, detail.encoding);
    }
    async function setBaudrate(event) {
        const detail = event.detail;
        console.log("serial-port-setBaudrate", detail);
        if (isOffline) return;
        response = await api.port.setBaudrate(detail.path, detail.baudrate);
    }
    async function setDelimiter(event) {
        const detail = event.detail;
        console.log("serial-port-setDelimiter", detail);
        if (isOffline) return;
        response = await api.port.setDelimiter(detail.path, detail.delimiter);
    }
    async function closeAll(event) {
        const detail = event.detail;
        console.log("serial-port-closeAll", detail);
        if (isOffline) return;
        response = await api.ports.close();
    }
    async function removeAll(event) {
        const detail = event.detail;
        console.log("serial-port-removeAll", detail);
        if (isOffline) return;
        response = await api.ports.remove();
    }
    async function escapeCRLFClick(event) {
        const detail = event.detail;
        console.log("serial-port-escapeCRLFClick", detail);
        $state.settings.escapeCRLF = !$state.settings.escapeCRLF;
    }
    async function freezeCol1Col2Click(event) {
        const detail = event.detail;
        console.log("serial-port-freezeCol1Col2Click", detail);
        $state.settings.freezeCol1Col2 = !$state.settings.freezeCol1Col2;
    }
    async function prettyJSONClick(event) {
        const detail = event.detail;
        console.log("serial-port-prettyJSONClick", detail);
        $state.settings.prettyJSON = !$state.settings.prettyJSON;
    }
    async function showBordersClick(event) {
        const detail = event.detail;
        console.log("serial-port-showBordersClick", detail);
        $state.settings.showBorders = !$state.settings.showBorders;
    }
    async function lineClick(event) {
        const detail = event.detail;
        console.log("serial-port-lineClick", detail);
        const lineIndex = lines.findIndex((line) => line.timestamp === detail.timestamp);
        lines[lineIndex].mark = lines[lineIndex]?.mark ? false : true;
    }
    async function sendsSend(event) {
        const detail = event.detail;
        console.log("serial-port-sendsSend", selectedPort, detail);
        if (isOffline) return;
        response = await api.port.send(selectedPort.path, detail, selectedPort.encoding);
    }
</script>

<div class="page flex column max-width" class:max-width={subpage !== "Log"}>
    <small class="dim" class:hide={isOffline === false}> Offline </small>
    <SerialPortMain
        bind:select
        {subpage}
        {isOpen}
        {encoding}
        {baudrate}
        {paths}
        {ports}
        {formPath}
        {formEncoding}
        {formBaudrate}
        {formDelimiter}
        {formData}
        {response}
        {showBorders}
        {escapeCRLF}
        {prettyJSON}
        {freezeCol1Col2}
        {lines}
        on:header-open={headerOpen}
        on:header-close={headerClose}
        on:header-changePage={changePage}
        on:header-toggleEncoding={toggleEncoding}
        on:ports-copy={portCopy}
        on:ports-open={portOpen}
        on:functions-open={open}
        on:functions-send={send}
        on:functions-close={close}
        on:functions-remove={remove}
        on:functions-setEncoding={setEncoding}
        on:functions-setBaudrate={setBaudrate}
        on:functions-setDelimiter={setDelimiter}
        on:functions-closeAll={closeAll}
        on:functions-removeAll={removeAll}
        on:settings-escapeCRLF={escapeCRLFClick}
        on:settings-freezeCol1Col2={freezeCol1Col2Click}
        on:settings-prettyJSON={prettyJSONClick}
        on:settings-showBorders={showBordersClick}
        on:lineClick={lineClick}
        on:send={sendsSend}
    />
</div>
