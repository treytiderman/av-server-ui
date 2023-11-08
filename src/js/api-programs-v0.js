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
function getAvailable(callback = () => { }) {
    ws.send.path(`programs/v0/topic/available`, "get")
    ws.receiveOnce.path(`programs/v0/topic/available`, (response) => callback(response))
}
function subAvailable(callback = () => { }) {
    ws.send.path(`programs/v0/topic/available`, "sub")
    ws.receive.path(`programs/v0/topic/available`, (response) => callback(response))
}
function unsubAvailable(callback = () => { }) {
    ws.send.path(`programs/v0/topic/available`, "unsub")
    ws.receiveOnce.path(`programs/v0/topic/available`, (response) => callback(response))
}

function getData(name, callback = () => { }) {
    ws.send.path(`programs/v0/topic/data/${name}`, "get")
    ws.receiveOnce.path(`programs/v0/topic/data/${name}`, (response) => callback(response))
}
function subData(name, callback = () => { }) {
    ws.send.path(`programs/v0/topic/data/${name}`, "sub")
    ws.receive.path(`programs/v0/topic/data/${name}`, (response) => callback(response))
}
function unsubData(name, callback = () => { }) {
    ws.send.path(`programs/v0/topic/data/${name}`, "unsub")
    ws.receiveOnce.path(`programs/v0/topic/data/${name}`, (response) => callback(response))
}

function getHistory(name, callback = () => { }) {
    ws.send.path(`programs/v0/topic/history/${name}`, "get")
    ws.receiveOnce.path(`programs/v0/topic/history/${name}`, (response) => callback(response))
}
function subHistory(name, callback = () => { }) {
    ws.send.path(`programs/v0/topic/history/${name}`, "sub")
    ws.receive.path(`programs/v0/topic/history/${name}`, (response) => callback(response))
}
function unsubHistory(name, callback = () => { }) {
    ws.send.path(`programs/v0/topic/history/${name}`, "unsub")
    ws.receiveOnce.path(`programs/v0/topic/history/${name}`, (response) => callback(response))
}

function getStatus(name, callback = () => { }) {
    ws.send.path(`programs/v0/topic/status/${name}`, "get")
    ws.receiveOnce.path(`programs/v0/topic/status/${name}`, (response) => callback(response))
}
function subStatus(name, callback = () => { }) {
    ws.send.path(`programs/v0/topic/status/${name}`, "sub")
    ws.receive.path(`programs/v0/topic/status/${name}`, (response) => callback(response))
}
function unsubStatus(name, callback = () => { }) {
    ws.send.path(`programs/v0/topic/status/${name}`, "unsub")
    ws.receiveOnce.path(`programs/v0/topic/status/${name}`, (response) => callback(response))
}

function getStatusAll(callback = () => { }) {
    ws.send.path(`programs/v0/topic/status-all`, "get")
    ws.receiveOnce.path(`programs/v0/topic/status-all`, (response) => callback(response))
}
function subStatusAll(callback = () => { }) {
    ws.send.path(`programs/v0/topic/status-all`, "sub")
    ws.receive.path(`programs/v0/topic/status-all`, (response) => callback(response))
}
function unsubStatusAll(callback = () => { }) {
    ws.send.path(`programs/v0/topic/status-all`, "unsub")
    ws.receiveOnce.path(`programs/v0/topic/status-all`, (response) => callback(response))
}
