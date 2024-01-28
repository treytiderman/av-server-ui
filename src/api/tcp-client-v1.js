// Imports
import { ws } from "../js/ws.js";

// Exports
export {
    client, // get, sub, unsub, open, send, close, reconnect, remove, set, setEncoding,
    data, // get, sub, unsub
    history, // get, sub, unsub
    clients, // get, sub, unsub, close, remove
}

// Functions
const client = {
    get: async (address) => await ws.api.send(`v1/tcp/client/get/${address}/`),
    sub: (address, callback) => ws.api.sub(`v1/tcp/client/sub/${address}/`, callback),
    unsub: async (address) => await ws.api.send(`v1/tcp/client/unsub/${address}/`),
    open: async (address, encoding, reconnect) => await ws.api.send(`v1/tcp/client/open/${address}/`, { encoding, reconnect }),
    reconnect: async (address, encoding, reconnect) => await ws.api.send(`v1/tcp/client/reconnect/${address}/`, { encoding, reconnect }),
    send: async (address, data, encoding) => await ws.api.send(`v1/tcp/client/send/${address}/`, { data, encoding }),
    close: async (address) => await ws.api.send(`v1/tcp/client/close/${address}/`),
    remove: async (address) => await ws.api.send(`v1/tcp/client/remove/${address}/`),
    setEncoding: async (address, encoding) => await ws.api.send(`v1/tcp/client/set-encoding/${address}/`, { encoding }),
}
const data = {
    get: async (address) => await ws.api.send(`v1/tcp/client/data/get/${address}/`),
    sub: (address, callback) => ws.api.sub(`v1/tcp/client/data/sub/${address}/`, callback),
    unsub: async (address) => await ws.api.send(`v1/tcp/client/data/unsub/${address}/`),
}
const history = {
    get: async (address) => await ws.api.send(`v1/tcp/client/history/get/${address}/`),
    sub: (address, callback) => ws.api.sub(`v1/tcp/client/history/sub/${address}/`, callback),
    unsub: async (address) => await ws.api.send(`v1/tcp/client/history/unsub/${address}/`),
}
const clients = {
    get: async () => await ws.api.send("v1/tcp/client/all/get/"),
    sub: (callback) => ws.api.sub("v1/tcp/client/all/sub/", callback),
    unsub: async () => await ws.api.send("v1/tcp/client/all/unsub/"),
    close: async () => await ws.api.send("v1/tcp/client/all/close/"),
    remove: async () => await ws.api.send("v1/tcp/client/all/remove/"),
}
