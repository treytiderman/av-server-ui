// Imports
import { ws } from "../js/ws.js";

// Exports
export {
    available, // get, sub, unsub
    port, // get, sub, unsub, open, send, close, reconnect, remove, set, setBaudrate, setEncoding, setDelimiter
    data, // get, sub, unsub
    history, // get, sub, unsub
    ports, // get, sub, unsub, close, remove
}

// Functions
const available = {
    get: async () => await ws.api.send("v1/serialport/available/get/"),
    sub: (callback) => ws.api.sub("v1/serialport/available/sub/", callback),
    unsub: async () => await ws.api.send("v1/serialport/available/unsub/"),
}
const port = {
    get: async (path) => await ws.api.send(`v1/serialport/get/${path}/`),
    sub: (path, callback) => ws.api.sub(`v1/serialport/sub/${path}/`, callback),
    unsub: async (path) => await ws.api.send(`v1/serialport/unsub/${path}/`),
    open: async (path, baudrate, encoding, delimiter) => await ws.api.send(`v1/serialport/open/${path}/`, { baudrate, encoding, delimiter }),
    send: async (path, data, encoding) => await ws.api.send(`v1/serialport/send/${path}/`, { data, encoding }),
    close: async (path) => await ws.api.send(`v1/serialport/close/${path}/`),
    remove: async (path) => await ws.api.send(`v1/serialport/remove/${path}/`),
    setBaudrate: async (path, baudrate) => await ws.api.send(`v1/serialport/set-baudrate/${path}/`, { baudrate }),
    setEncoding: async (path, encoding) => await ws.api.send(`v1/serialport/set-encoding/${path}/`, { encoding }),
    setDelimiter: async (path, delimiter) => await ws.api.send(`v1/serialport/set-delimiter/${path}/`, { delimiter }),
}
const data = {
    get: async (path) => await ws.api.send(`v1/serialport/data/get/${path}/`),
    sub: (path, callback) => ws.api.sub(`v1/serialport/data/sub/${path}/`, callback),
    unsub: async (path) => await ws.api.send(`v1/serialport/data/unsub/${path}/`),
}
const history = {
    get: async (path) => await ws.api.send(`v1/serialport/history/get/${path}/`),
    sub: (path, callback) => ws.api.sub(`v1/serialport/history/sub/${path}/`, callback),
    unsub: async (path) => await ws.api.send(`v1/serialport/history/unsub/${path}/`),
}
const ports = {
    get: async () => await ws.api.send("v1/serialport/all/get/"),
    sub: (callback) => ws.api.sub("v1/serialport/all/sub/", callback),
    unsub: async () => await ws.api.send("v1/serialport/all/unsub/"),
    close: async () => await ws.api.send("v1/serialport/all/close/"),
    remove: async () => await ws.api.send("v1/serialport/all/remove/"),
}
