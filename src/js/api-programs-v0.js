// Imports
import { ws } from "./ws.js";

// Exports
export const v0 = {

    // Functions
    create,
    start,
    send,
    kill,
    restart,
    remove,

    setDirectory,
    setCommand,
    setStartOnBoot,
    setEnviromentVariables,

    startAll,
    sendAll,
    killAll,
    restartAll,
    removeAll,

    // Topics
    getAvailable,
    subAvailable,
    unsubAvailable,

    getData,
    subData,
    unsubData,

    getHistory,
    subHistory,
    unsubHistory,

    getStatus,
    subStatus,
    unsubStatus,

    getStatusAll,
    subStatusAll,
    unsubStatusAll,
}

// Functions
function create(name, directory, command, env, startOnBoot, callback = () => { }) {
    ws.send.path("programs/v0/func/create", { name: name, directory: directory, command: command, env: env, startOnBoot: startOnBoot })
    ws.receiveOnce.path("programs/v0/func/create", (response) => callback(response))
}
function start(name, callback = () => { }) {
    ws.send.path("programs/v0/func/start", { name: name })
    ws.receiveOnce.path("programs/v0/func/start", (response) => callback(response))
}
function send(name, text, callback = () => { }) {
    ws.send.path("programs/v0/func/send", { name: name, text: text })
    ws.receiveOnce.path("programs/v0/func/send", (response) => callback(response))
}
function kill(name, callback = () => { }) {
    ws.send.path("programs/v0/func/kill", { name: name })
    ws.receiveOnce.path("programs/v0/func/kill", (response) => callback(response))
}
function restart(name, callback = () => { }) {
    ws.send.path("programs/v0/func/restart", { name: name })
    ws.receiveOnce.path("programs/v0/func/restart", (response) => callback(response))
}
function remove(name, callback = () => { }) {
    ws.send.path("programs/v0/func/remove", { name: name })
    ws.receiveOnce.path("programs/v0/func/remove", (response) => callback(response))
}

function setDirectory(name, directory, callback = () => { }) {
    ws.send.path("programs/v0/func/set-directory", { name: name, directory: directory })
    ws.receiveOnce.path("programs/v0/func/set-directory", (response) => callback(response))
}
function setCommand(name, command, callback = () => { }) {
    ws.send.path("programs/v0/func/set-command", { name: name, command: command })
    ws.receiveOnce.path("programs/v0/func/set-command", (response) => callback(response))
}
function setStartOnBoot(name, startOnBoot, callback = () => { }) {
    ws.send.path("programs/v0/func/set-start-on-boot", { name: name, startOnBoot: startOnBoot })
    ws.receiveOnce.path("programs/v0/func/set-start-on-boot", (response) => callback(response))
}
function setEnviromentVariables(name, env, callback = () => { }) {
    ws.send.path("programs/v0/func/set-enviroment-variables", { name: name, env: env })
    ws.receiveOnce.path("programs/v0/func/set-enviroment-variables", (response) => callback(response))
}

function startAll(callback = () => { }) {
    ws.send.path("programs/v0/func/start-all", { })
    ws.receiveOnce.path("programs/v0/func/start-all", (response) => callback(response))
}
function sendAll(text, callback = () => { }) {
    ws.send.path("programs/v0/func/send-all", { text: text })
    ws.receiveOnce.path("programs/v0/func/send-all", (response) => callback(response))
}
function killAll(callback = () => { }) {
    ws.send.path("programs/v0/func/kill-all", { })
    ws.receiveOnce.path("programs/v0/func/kill-all", (response) => callback(response))
}
function restartAll(callback = () => { }) {
    ws.send.path("programs/v0/func/restart-all", { })
    ws.receiveOnce.path("programs/v0/func/restart-all", (response) => callback(response))
}
function removeAll(callback = () => { }) {
    ws.send.path("programs/v0/func/remove-all", { })
    ws.receiveOnce.path("programs/v0/func/remove-all", (response) => callback(response))
}

// Topics
function getAvailable(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/available/${address}`, "get")
    ws.receiveOnce.path(`programs/v0/topic/available/${address}`, (response) => callback(response))
}
function subAvailable(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/available/${address}`, "sub")
    ws.receive.path(`programs/v0/topic/available/${address}`, (response) => callback(response))
}
function unsubAvailable(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/available/${address}`, "unsub")
    ws.receiveOnce.path(`programs/v0/topic/available/${address}`, (response) => callback(response))
}

function getData(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/data/${address}`, "get")
    ws.receiveOnce.path(`programs/v0/topic/data/${address}`, (response) => callback(response))
}
function subData(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/data/${address}`, "sub")
    ws.receive.path(`programs/v0/topic/data/${address}`, (response) => callback(response))
}
function unsubData(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/data/${address}`, "unsub")
    ws.receiveOnce.path(`programs/v0/topic/data/${address}`, (response) => callback(response))
}

function getHistory(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/history/${address}`, "get")
    ws.receiveOnce.path(`programs/v0/topic/history/${address}`, (response) => callback(response))
}
function subHistory(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/history/${address}`, "sub")
    ws.receive.path(`programs/v0/topic/history/${address}`, (response) => callback(response))
}
function unsubHistory(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/history/${address}`, "unsub")
    ws.receiveOnce.path(`programs/v0/topic/history/${address}`, (response) => callback(response))
}

function getStatus(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/status/${address}`, "get")
    ws.receiveOnce.path(`programs/v0/topic/status/${address}`, (response) => callback(response))
}
function subStatus(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/status/${address}`, "sub")
    ws.receive.path(`programs/v0/topic/status/${address}`, (response) => callback(response))
}
function unsubStatus(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/status/${address}`, "unsub")
    ws.receiveOnce.path(`programs/v0/topic/status/${address}`, (response) => callback(response))
}

function getStatusAll(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/status-all/${address}`, "get")
    ws.receiveOnce.path(`programs/v0/topic/status-all/${address}`, (response) => callback(response))
}
function subStatusAll(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/status-all/${address}`, "sub")
    ws.receive.path(`programs/v0/topic/status-all/${address}`, (response) => callback(response))
}
function unsubStatusAll(address, callback = () => { }) {
    ws.send.path(`programs/v0/topic/status-all/${address}`, "unsub")
    ws.receiveOnce.path(`programs/v0/topic/status-all/${address}`, (response) => callback(response))
}