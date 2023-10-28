// Imports
import { ws } from "./ws.js";

// Exports
export const v0 = {
    getClient,
    subClient,
    unsubClient,

    getClients,
    subClients,
    unsubClients,

    getData,
    subData,
    unsubData,

    getHistory,
    subHistory,
    unsubHistory,

    open,
    send,
    setEncoding,
    close,
    remove,

    openAll,
    closeAll,
    removeAll,
}

// tcp-client/v0/topic/client/${address}
function getClient(address, callback = () => { }) {
    ws.send.path(`tcp-client/v0/topic/client/${address}`, "get")
    ws.receiveOnce.path(`tcp-client/v0/topic/client/${address}`, (response) => callback(response))
}
function subClient(address, callback = () => { }) {
    ws.send.path(`tcp-client/v0/topic/client/${address}`, "sub")
    ws.receive.path(`tcp-client/v0/topic/client/${address}`, (response) => callback(response))
}
function unsubClient(address, callback = () => { }) {
    ws.send.path(`tcp-client/v0/topic/client/${address}`, "unsub")
    ws.receiveOnce.path(`tcp-client/v0/topic/client/${address}`, (response) => callback(response))
}

// tcp-client/v0/topic/clients
function getClients(callback = () => { }) {
    ws.send.path(`tcp-client/v0/topic/clients`, "get")
    ws.receiveOnce.path(`tcp-client/v0/topic/clients`, (response) => callback(response))
}
function subClients(callback = () => { }) {
    ws.send.path(`tcp-client/v0/topic/clients`, "sub")
    ws.receive.path(`tcp-client/v0/topic/clients`, (response) => callback(response))
}
function unsubClients(callback = () => { }) {
    ws.send.path(`tcp-client/v0/topic/clients`, "unsub")
    ws.receiveOnce.path(`tcp-client/v0/topic/clients`, (response) => callback(response))
}

// tcp-client/v0/topic/data/${address}
function getData(address, callback = () => { }) {
    ws.send.path(`tcp-client/v0/topic/data/${address}`, "get")
    ws.receiveOnce.path(`tcp-client/v0/topic/data/${address}`, (response) => callback(response))
}
function subData(address, callback = () => { }) {
    ws.send.path(`tcp-client/v0/topic/data/${address}`, "sub")
    ws.receive.path(`tcp-client/v0/topic/data/${address}`, (response) => callback(response))
}
function unsubData(address, callback = () => { }) {
    ws.send.path(`tcp-client/v0/topic/data/${address}`, "unsub")
    ws.receiveOnce.path(`tcp-client/v0/topic/data/${address}`, (response) => callback(response))
}

// tcp-client/v0/topic/history/${address}
function getHistory(address, callback = () => { }) {
    ws.send.path(`tcp-client/v0/topic/history/${address}`, "get")
    ws.receiveOnce.path(`tcp-client/v0/topic/history/${address}`, (response) => callback(response))
}
function subHistory(address, callback = () => { }) {
    ws.send.path(`tcp-client/v0/topic/history/${address}`, "sub")
    ws.receive.path(`tcp-client/v0/topic/history/${address}`, (response) => callback(response))
}
function unsubHistory(address, callback = () => { }) {
    ws.send.path(`tcp-client/v0/topic/history/${address}`, "unsub")
    ws.receiveOnce.path(`tcp-client/v0/topic/history/${address}`, (response) => callback(response))
}

// logger/v0/func/open
function open(address, encoding, callback = () => { }) {
    ws.send.path("tcp-client/v0/func/open", {
        address: address,
        encoding: encoding,
    })
    ws.receiveOnce.path("tcp-client/v0/func/open", (response) => callback(response))
}

// logger/v0/func/send
function send(address, data, encoding, callback = () => { }) {
    ws.send.path("tcp-client/v0/func/send", {
        address: address,
        data: data,
        encoding: encoding,
    })
    ws.receiveOnce.path("tcp-client/v0/func/send", (response) => callback(response))
}

// logger/v0/func/set-encoding
function setEncoding(address, encoding, callback = () => { }) {
    ws.send.path("tcp-client/v0/func/set-encoding", {
        address: address,
        encoding: encoding,
    })
    ws.receiveOnce.path("tcp-client/v0/func/set-encoding", (response) => callback(response))
}

// logger/v0/func/close
function close(address, callback = () => { }) {
    ws.send.path("tcp-client/v0/func/close", {
        address: address,
    })
    ws.receiveOnce.path("tcp-client/v0/func/close", (response) => callback(response))
}

// logger/v0/func/remove
function remove(address, callback = () => { }) {
    ws.send.path("tcp-client/v0/func/remove", {
        address: address,
    })
    ws.receiveOnce.path("tcp-client/v0/func/remove", (response) => callback(response))
}

// logger/v0/func/open-all
function openAll(callback = () => { }) {
    ws.send.path("tcp-client/v0/func/open-all")
    ws.receiveOnce.path("tcp-client/v0/func/open-all", (response) => callback(response))
}

// logger/v0/func/close-all
function closeAll(callback = () => { }) {
    ws.send.path("tcp-client/v0/func/close-all")
    ws.receiveOnce.path("tcp-client/v0/func/close-all", (response) => callback(response))
}

// logger/v0/func/remove-all
function removeAll(callback = () => { }) {
    ws.send.path("tcp-client/v0/func/remove-all")
    ws.receiveOnce.path("tcp-client/v0/func/remove-all", (response) => callback(response))
}
