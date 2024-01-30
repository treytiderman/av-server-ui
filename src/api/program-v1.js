// Imports
import { ws as api } from "../js/ws.js";

// Exports
export {
    available, // get, sub, unsub
    program, // get, sub, unsub, create, start, send, kill, restart, remove, 
             // set, setDirectory, setCommand, setStartOnBoot, setEnv,
    data, // get, sub, unsub
    history, // get, sub, unsub
    programs, // get, sub, unsub, start, send, kill, restart, remove
}

// Functions
const available = {
    get: () => new Promise((resolve, reject) => {
        api.send.path(`v1/program/available/get/`)
        api.receiveOnce.path(`v1/program/available/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v1/program/available/sub/`)
        api.receiveOnce.path(`v1/program/available/sub/`, (response) => callback(response))
        api.receive.path(`v1/program/available/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        api.send.path(`v1/program/available/unsub/`)
        api.receiveOnce.path(`v1/program/available/unsub/`, (response) => resolve(response))
    }),
}
const program = {
    get: (name) => new Promise((resolve, reject) => {
        api.send.path(`v1/program/get/${name}/`)
        api.receiveOnce.path(`v1/program/get/${name}/`, (response) => resolve(response))
    }),
    sub: (name, callback) => {
        api.send.path(`v1/program/sub/${name}/`)
        api.receiveOnce.path(`v1/program/sub/${name}/`, (response) => callback(response))
        api.receive.path(`v1/program/pub/${name}/`, (response) => callback(response))
    },
    unsub: (name) => new Promise((resolve, reject) => {
        api.send.path(`v1/program/unsub/${name}/`)
        api.receiveOnce.path(`v1/program/unsub/${name}/`, (response) => resolve(response))
    }),
    create: (name, directory, command, startOnBoot, env) => new Promise((resolve, reject) => {
        api.send.path(`v1/program/create/${name}/`, { directory: directory, command: command, startOnBoot: startOnBoot, env: env })
        api.receiveOnce.path(`v1/program/create/${name}/`, (response) => resolve(response))
    }),
    setDirectory: (name, directory) => new Promise((resolve, reject) => {
        api.send.path(`v1/program/set-directory/${name}/`, { directory: directory })
        api.receiveOnce.path(`v1/program/set-directory/${name}/`, (response) => resolve(response))
    }),
    setCommand: (name, command) => new Promise((resolve, reject) => {
        api.send.path(`v1/program/set-command/${name}/`, { command: command })
        api.receiveOnce.path(`v1/program/set-command/${name}/`, (response) => resolve(response))
    }),
    setStartOnBoot: (name, startOnBoot) => new Promise((resolve, reject) => {
        api.send.path(`v1/program/set-start-on-boot/${name}/`, { startOnBoot: startOnBoot })
        api.receiveOnce.path(`v1/program/set-start-on-boot/${name}/`, (response) => resolve(response))
    }),
    setEnv: (name, env) => new Promise((resolve, reject) => {
        api.send.path(`v1/program/set-env/${name}/`, { env: env })
        api.receiveOnce.path(`v1/program/set-env/${name}/`, (response) => resolve(response))
    }),
}
const data = {
    get: () => new Promise((resolve, reject) => {
        api.send.path(`v1/program/data/get/`)
        api.receiveOnce.path(`v1/program/data/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v1/program/data/sub/`)
        api.receiveOnce.path(`v1/program/data/sub/`, (response) => callback(response))
        api.receive.path(`v1/program/data/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        api.send.path(`v1/program/data/unsub/`)
        api.receiveOnce.path(`v1/program/data/unsub/`, (response) => resolve(response))
    }),
}
const history = {
    get: () => new Promise((resolve, reject) => {
        api.send.path(`v1/program/history/get/`)
        api.receiveOnce.path(`v1/program/history/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v1/program/history/sub/`)
        api.receiveOnce.path(`v1/program/history/sub/`, (response) => callback(response))
        api.receive.path(`v1/program/history/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        api.send.path(`v1/program/history/unsub/`)
        api.receiveOnce.path(`v1/program/history/unsub/`, (response) => resolve(response))
    }),
}
const programs = {
    get: () => new Promise((resolve, reject) => {
        api.send.path(`v1/program/all/get/`)
        api.receiveOnce.path(`v1/program/all/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v1/program/all/sub/`)
        api.receiveOnce.path(`v1/program/all/sub/`, (response) => callback(response))
        api.receive.path(`v1/program/all/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        api.send.path(`v1/program/all/unsub/`)
        api.receiveOnce.path(`v1/program/all/unsub/`, (response) => resolve(response))
    }),

    // TODO
    start: () => new Promise((resolve, reject) => {
        api.send.path(`v1/program/all/start/`)
        api.receiveOnce.path(`v1/program/all/start/`, (response) => resolve(response))
    }),
    send: (data) => new Promise((resolve, reject) => {
        api.send.path(`v1/program/all/send/`)
        api.receiveOnce.path(`v1/program/all/send/`, (response) => resolve(response))
    }),
    kill: () => new Promise((resolve, reject) => {
        api.send.path(`v1/program/all/kill/`)
        api.receiveOnce.path(`v1/program/all/kill/`, (response) => resolve(response))
    }),
    restart: () => new Promise((resolve, reject) => {
        api.send.path(`v1/program/all/restart/`)
        api.receiveOnce.path(`v1/program/all/restart/`, (response) => resolve(response))
    }),
    remove: () => new Promise((resolve, reject) => {
        api.send.path(`v1/program/all/remove/`)
        api.receiveOnce.path(`v1/program/all/remove/`, (response) => resolve(response))
    }),
}
