// Imports
import { ws as api } from "../js/ws.js";

// Exports
export {
    log, // get, sub, unsub, clear, debug, info, warn, error
    history, // get, sub, unsub
    group, // get, sub, unsub
    level, // get, sub, unsub
}

// Functions
const log = {
    get: () => new Promise((resolve) => {
        api.send.path(`v0/log/get/`)
        api.receiveOnce.path(`v0/log/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v0/log/sub/`)
        api.receiveOnce.path(`v0/log/sub/`, (response) => callback(response))
        api.receive.path(`v0/log/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve) => {
        api.send.path(`v0/log/unsub/`)
        api.receiveOnce.path(`v0/log/unsub/`, (response) => resolve(response))
    }),
    clear: () => new Promise((resolve) => {
        api.send.path(`v0/log/clear/`)
        api.receiveOnce.path(`v0/log/clear/`, (response) => resolve(response))
    }),
    debug: (group, message, obj = {}) => new Promise((resolve) => {
        api.send.path(`v0/log/debug/`, { group: group, message: message, obj: obj })
        api.receiveOnce.path(`v0/log/debug/`, (response) => resolve(response))
    }),
    info: (group, message, obj = {}) => new Promise((resolve) => {
        api.send.path(`v0/log/info/`, { group: group, message: message, obj: obj })
        api.receiveOnce.path(`v0/log/info/`, (response) => resolve(response))
    }),
    warn: (group, message, obj = {}) => new Promise((resolve) => {
        api.send.path(`v0/log/warn/`, { group: group, message: message, obj: obj })
        api.receiveOnce.path(`v0/log/warn/`, (response) => resolve(response))
    }),
    error: (group, message, obj = {}) => new Promise((resolve) => {
        api.send.path(`v0/log/error/`, { group: group, message: message, obj: obj })
        api.receiveOnce.path(`v0/log/error/`, (response) => resolve(response))
    }),
}
const history = {
    get: () => new Promise((resolve) => {
        api.send.path(`v0/log/history/get/`)
        api.receiveOnce.path(`v0/log/history/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v0/log/history/sub/`)
        api.receiveOnce.path(`v0/log/history/sub/`, (response) => callback(response))
        api.receive.path(`v0/log/history/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve) => {
        api.send.path(`v0/log/history/unsub/`)
        api.receiveOnce.path(`v0/log/history/unsub/`, (response) => resolve(response))
    }),
}
const group = {
    sub: (group, callback) => {
        api.send.path(`v0/log/group/sub/${group}/`)
        api.receiveOnce.path(`v0/log/group/sub/${group}/`, (response) => callback(response))
        api.receive.path(`v0/log/group/pub/${group}/`, (response) => callback(response))
    },
    unsub: (group) => new Promise((resolve) => {
        api.send.path(`v0/log/group/unsub/${group}/`)
        api.receiveOnce.path(`v0/log/group/unsub/${group}/`, (response) => resolve(response))
    }),
}
const level = {
    sub: (level, callback) => {
        api.send.path(`v0/log/level/sub/${level}/`)
        api.receiveOnce.path(`v0/log/level/sub/${level}/`, (response) => callback(response))
        api.receive.path(`v0/log/level/pub/${level}/`, (response) => callback(response))
    },
    unsub: (level) => new Promise((resolve) => {
        api.send.path(`v0/log/level/unsub/${level}/`)
        api.receiveOnce.path(`v0/log/level/unsub/${level}/`, (response) => resolve(response))
    }),
}
