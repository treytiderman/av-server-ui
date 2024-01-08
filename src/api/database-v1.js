// Imports
import { ws as api } from "../js/ws.js";

// Exports
export {
    db, // get, sub, unsub, create, remove, set, write, reset
    key, // get, sub, unsub, set, remove
    names, // get, sub, unsub
}

// Functions
const db = {
    get: (name) => new Promise((resolve) => {
        api.send.path(`v1/database/get/${name}/`)
        api.receiveOnce.path(`v1/database/get/${name}/`, (response) => resolve(response))
    }),
    sub: (name, callback) => {
        api.send.path(`v1/database/sub/${name}/`)
        api.receiveOnce.path(`v1/database/sub/${name}/`, (response) => callback(response))
        api.receive.path(`v1/database/pub/${name}/`, (response) => callback(response))
    },
    unsub: (name) => new Promise((resolve) => {
        api.send.path(`v1/database/unsub/${name}/`)
        api.receiveOnce.path(`v1/database/unsub/${name}/`, (response) => resolve(response))
    }),
    create: (name, data = {}) => new Promise((resolve) => {
        api.send.path(`v1/database/create/${name}/`, { data: data })
        api.receiveOnce.path(`v1/database/create/${name}/`, (response) => resolve(response))
    }),
    remove: (name) => new Promise((resolve) => {
        api.send.path(`v1/database/remove/${name}/`)
        api.receiveOnce.path(`v1/database/remove/${name}/`, (response) => resolve(response))
    }),
    set: (name, data = {}) => new Promise((resolve) => {
        api.send.path(`v1/database/set/${name}/`, { data: data })
        api.receiveOnce.path(`v1/database/set/${name}/`, (response) => resolve(response))
    }),
    write: (name) => new Promise((resolve) => {
        api.send.path(`v1/database/write/${name}/`)
        api.receiveOnce.path(`v1/database/write/${name}/`, (response) => resolve(response))
    }),
    reset: (name) => new Promise((resolve) => {
        api.send.path(`v1/database/reset/${name}/`)
        api.receiveOnce.path(`v1/database/reset/${name}/`, (response) => resolve(response))
    }),
}
const key = {
    get: (name, key) => new Promise((resolve) => {
        api.send.path(`v1/database/key/get/${name}/${key}/`)
        api.receiveOnce.path(`v1/database/key/get/${name}/${key}/`, (response) => resolve(response))
    }),
    sub: (name, key, callback) => {
        api.send.path(`v1/database/key/sub/${name}/${key}/`)
        api.receiveOnce.path(`v1/database/key/sub/${name}/${key}/`, (response) => callback(response))
        api.receive.path(`v1/database/key/pub/${name}/${key}/`, (response) => callback(response))
    },
    unsub: (name, key) => new Promise((resolve) => {
        api.send.path(`v1/database/key/unsub/${name}/${key}/`)
        api.receiveOnce.path(`v1/database/key/unsub/${name}/${key}/`, (response) => resolve(response))
    }),
}
const names = {
    get: () => new Promise((resolve) => {
        api.send.path(`v1/database/names/get/`)
        api.receiveOnce.path(`v1/database/names/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v1/database/names/sub/`)
        api.receiveOnce.path(`v1/database/names/sub/`, (response) => callback(response))
        api.receive.path(`v1/database/names/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve) => {
        api.send.path(`v1/database/names/unsub/`)
        api.receiveOnce.path(`v1/database/names/unsub/`, (response) => resolve(response))
    }),
}
