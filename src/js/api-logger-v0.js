// Imports
import { ws } from "./ws.js";

// Exports
export const v0 = {
    getLogs,
    subLogs,
    unsubLogs,

    getLogsHistory,
    subLogsHistory,
    unsubLogsHistory,

    getGroup,
    subGroup,
    unsubGroup,

    getGroupHistory,
    subGroupHistory,
    unsubGroupHistory,

    debug,
    info,
    error,
}

// logger/v0/topic/logs
function getLogs(callback = () => { }) {
    ws.send.path("logger/v0/topic/logs", "get")
    ws.receiveOnce.path("logger/v0/topic/logs", (response) => callback(response))
}
function subLogs(callback = () => { }) {
    ws.send.path("logger/v0/topic/logs", "sub")
    ws.receive.path("logger/v0/topic/logs", (response) => callback(response))
}
function unsubLogs(callback = () => { }) {
    ws.send.path("logger/v0/topic/logs", "unsub")
    ws.receiveOnce.path("logger/v0/topic/logs", (response) => callback(response))
}

// logger/v0/topic/logs/history
function getLogsHistory(callback = () => { }) {
    ws.send.path("logger/v0/topic/logs/history", "get")
    ws.receiveOnce.path("logger/v0/topic/logs/history", (response) => callback(response))
}
function subLogsHistory(callback = () => { }) {
    ws.send.path("logger/v0/topic/logs/history", "sub")
    ws.receive.path("logger/v0/topic/logs/history", (response) => callback(response))
}
function unsubLogsHistory(callback = () => { }) {
    ws.send.path("logger/v0/topic/logs/history", "unsub")
    ws.receiveOnce.path("logger/v0/topic/logs/history", (response) => callback(response))
}

// logger/v0/topic/{group}
function getGroup(group, callback = () => { }) {
    ws.send.path(`logger/v0/topic/${group}`, "get")
    ws.receiveOnce.path(`logger/v0/topic/${group}`, (response) => callback(response))
}
function subGroup(group, callback = () => { }) {
    ws.send.path(`logger/v0/topic/${group}`, "sub")
    ws.receive.path(`logger/v0/topic/${group}`, (response) => callback(response))
}
function unsubGroup(group, callback = () => { }) {
    ws.send.path(`logger/v0/topic/${group}`, "unsub")
    ws.receiveOnce.path(`logger/v0/topic/${group}`, (response) => callback(response))
}

// logger/v0/topic/{group}/history
function getGroupHistory(group, callback = () => { }) {
    ws.send.path(`logger/v0/topic/${group}/history`, "get")
    ws.receiveOnce.path(`logger/v0/topic/${group}/history`, (response) => callback(response))
}
function subGroupHistory(group, callback = () => { }) {
    ws.send.path(`logger/v0/topic/${group}/history`, "sub")
    ws.receive.path(`logger/v0/topic/${group}/history`, (response) => callback(response))
}
function unsubGroupHistory(group, callback = () => { }) {
    ws.send.path(`logger/v0/topic/${group}/history`, "unsub")
    ws.receiveOnce.path(`logger/v0/topic/${group}/history`, (response) => callback(response))
}

// logger/v0/func/debug
function debug(group, message, obj, callback = () => { }) {
    ws.send.path("logger/v0/func/debug", {
        group: group,
        level: "debug",
        message: message,
        obj: obj,
    })
    ws.receiveOnce.path("logger/v0/func/debug", (response) => callback(response))
}

// logger/v0/func/info
function info(group, message, obj, callback = () => { }) {
    ws.send.path("logger/v0/func/info", {
        group: group,
        level: "info",
        message: message,
        obj: obj,
    })
    ws.receiveOnce.path("logger/v0/func/info", (response) => callback(response))
}    

// logger/v0/func/error
function error(group, message, obj, callback = () => { }) {
    ws.send.path("logger/v0/func/error", {
        group: group,
        level: "error",
        message: message,
        obj: obj,
    })
    ws.receiveOnce.path("logger/v0/func/error", (response) => callback(response))
}    
