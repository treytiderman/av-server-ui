// Imports
import { ws } from "./ws.js";

// Exports
export const v0 = {
    getTime,
    subTime,
    unsubTime,

    getTimeAsIso,
    subTimeAsIso,
    unsubTimeAsIso,

    getUptime,
    subUptime,
    unsubUptime,

    getInfo,
    subInfo,
    unsubInfo,
}

// Topics
function getTime(callback = () => { }) {
    ws.send.path("/system/v0/topic/time/", "get")
    ws.receiveOnce.path("/system/v0/topic/time/", (response) => callback(response))
}
function subTime(callback = () => { }) {
    ws.send.path("/system/v0/topic/time/", "sub")
    ws.receive.path("/system/v0/topic/time/", (response) => callback(response))
}
function unsubTime(callback = () => { }) {
    ws.send.path("/system/v0/topic/time/", "unsub")
    ws.receiveOnce.path("/system/v0/topic/time/", (response) => callback(response))
}

function getTimeAsIso(callback = () => { }) {
    ws.send.path("/system/v0/topic/time-as-iso/", "get")
    ws.receiveOnce.path("/system/v0/topic/time-as-iso/", (response) => callback(response))
}
function subTimeAsIso(callback = () => { }) {
    ws.send.path("/system/v0/topic/time-as-iso/", "sub")
    ws.receive.path("/system/v0/topic/time-as-iso/", (response) => callback(response))
}
function unsubTimeAsIso(callback = () => { }) {
    ws.send.path("/system/v0/topic/time-as-iso/", "unsub")
    ws.receiveOnce.path("/system/v0/topic/time-as-iso/", (response) => callback(response))
}

function getUptime(callback = () => { }) {
    ws.send.path("/system/v0/topic/uptime/", "get")
    ws.receiveOnce.path("/system/v0/topic/uptime/", (response) => callback(response))
}
function subUptime(callback = () => { }) {
    ws.send.path("/system/v0/topic/uptime/", "sub")
    ws.receive.path("/system/v0/topic/uptime/", (response) => callback(response))
}
function unsubUptime(callback = () => { }) {
    ws.send.path("/system/v0/topic/uptime/", "unsub")
    ws.receiveOnce.path("/system/v0/topic/uptime/", (response) => callback(response))
}

function getInfo(callback = () => { }) {
    ws.send.path("/system/v0/topic/info/", "get")
    ws.receiveOnce.path("/system/v0/topic/info/", (response) => callback(response))
}
function subInfo(callback = () => { }) {
    ws.send.path("/system/v0/topic/info/", "sub")
    ws.receive.path("/system/v0/topic/info/", (response) => callback(response))
}
function unsubInfo(callback = () => { }) {
    ws.send.path("/system/v0/topic/info/", "unsub")
    ws.receiveOnce.path("/system/v0/topic/info/", (response) => callback(response))
}
