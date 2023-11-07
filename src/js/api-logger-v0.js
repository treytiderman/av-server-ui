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

    debug,
    info,
    error,
}

// logger/v0/topic/data
function getLogs(callback = () => { }) {
    ws.send.path("logger/v0/topic/data", "get")
    ws.receiveOnce.path("logger/v0/topic/data", (response) => callback(response))
}
function subLogs(callback = () => { }) {
    ws.send.path("logger/v0/topic/data", "sub")
    ws.receive.path("logger/v0/topic/data", (response) => callback(response))
}
function unsubLogs(callback = () => { }) {
    ws.send.path("logger/v0/topic/data", "unsub")
    ws.receiveOnce.path("logger/v0/topic/data", (response) => callback(response))
}

// logger/v0/topic/history
function getLogsHistory(callback = () => { }) {
    ws.send.path("logger/v0/topic/history", "get")
    ws.receiveOnce.path("logger/v0/topic/history", (response) => callback(response))
}
function subLogsHistory(callback = () => { }) {
    ws.send.path("logger/v0/topic/history", "sub")
    ws.receive.path("logger/v0/topic/history", (response) => callback(response))
}
function unsubLogsHistory(callback = () => { }) {
    ws.send.path("logger/v0/topic/history", "unsub")
    ws.receiveOnce.path("logger/v0/topic/history", (response) => callback(response))
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
