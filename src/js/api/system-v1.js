// Imports
import { ws } from "../ws.js";

// Exports
export {
    time, // get, sub, unsub
    uptime, // get, sub, unsub
    info, // get, sub, unsub
}

// Functions
const time = {
    get: () => new Promise((resolve, reject) => {
        ws.send.path(`v1/system/time/get/`)
        ws.receiveOnce.path(`v1/system/time/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        ws.send.path(`v1/system/time/sub/`)
        ws.receiveOnce.path(`v1/system/time/sub/`, (response) => callback(response))
        ws.receive.path(`v1/system/time/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        ws.send.path(`v1/system/time/unsub/`)
        ws.receiveOnce.path(`v1/system/time/unsub/`, (response) => resolve(response))
    }),
}
const uptime = {
    get: () => new Promise((resolve, reject) => {
        ws.send.path(`v1/system/uptime/get/`)
        ws.receiveOnce.path(`v1/system/uptime/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        ws.send.path(`v1/system/uptime/sub/`)
        ws.receiveOnce.path(`v1/system/uptime/sub/`, (response) => callback(response))
        ws.receive.path(`v1/system/uptime/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        ws.send.path(`v1/system/uptime/unsub/`)
        ws.receiveOnce.path(`v1/system/uptime/unsub/`, (response) => resolve(response))
    }),
}
const info = {
    get: () => new Promise((resolve, reject) => {
        ws.send.path(`v1/system/info/get/`)
        ws.receiveOnce.path(`v1/system/info/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        ws.send.path(`v1/system/info/sub/`)
        ws.receiveOnce.path(`v1/system/info/sub/`, (response) => callback(response))
        ws.receive.path(`v1/system/info/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        ws.send.path(`v1/system/info/unsub/`)
        ws.receiveOnce.path(`v1/system/info/unsub/`, (response) => resolve(response))
    }),
}
