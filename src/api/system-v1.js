// Imports
import { ws as api } from "../js/ws.js";

// Exports
export {
    time, // get, sub, unsub
    uptime, // get, sub, unsub
    info, // get, sub, unsub
}

// Functions
const time = {
    get: () => new Promise((resolve, reject) => {
        api.send.path(`v1/system/time/get/`)
        api.receiveOnce.path(`v1/system/time/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v1/system/time/sub/`)
        api.receiveOnce.path(`v1/system/time/sub/`, (response) => callback(response))
        api.receive.path(`v1/system/time/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        api.send.path(`v1/system/time/unsub/`)
        api.receiveOnce.path(`v1/system/time/unsub/`, (response) => resolve(response))
    }),
}
const uptime = {
    get: () => new Promise((resolve, reject) => {
        api.send.path(`v1/system/uptime/get/`)
        api.receiveOnce.path(`v1/system/uptime/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v1/system/uptime/sub/`)
        api.receiveOnce.path(`v1/system/uptime/sub/`, (response) => callback(response))
        api.receive.path(`v1/system/uptime/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        api.send.path(`v1/system/uptime/unsub/`)
        api.receiveOnce.path(`v1/system/uptime/unsub/`, (response) => resolve(response))
    }),
}
const info = {
    get: () => new Promise((resolve, reject) => {
        api.send.path(`v1/system/info/get/`)
        api.receiveOnce.path(`v1/system/info/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v1/system/info/sub/`)
        api.receiveOnce.path(`v1/system/info/sub/`, (response) => callback(response))
        api.receive.path(`v1/system/info/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        api.send.path(`v1/system/info/unsub/`)
        api.receiveOnce.path(`v1/system/info/unsub/`, (response) => resolve(response))
    }),
}
