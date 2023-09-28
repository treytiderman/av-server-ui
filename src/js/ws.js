// Global variables
let debug = false
let websocket = { readyState: 3 }

// Functions
function log(...params) { if (debug) console.log(...params) }
function isJSON(text) {
    try { JSON.parse(text) }
    catch (error) { return false }
    return true
}
function setDebug(bool) {
    debug = bool
}
function connect(url, callback) {
    websocket = new WebSocket(url);

    // Events
    websocket.onopen = (event) => {
        log(`opened: ${url}`)
        callback("open");
    }
    websocket.onerror = (err) => {
        log(`error: ${url}`)
        callback("error")
    }
    websocket.addEventListener('message', (event) => {
        log("received:", event.data)
    })
}
function send(text) {
    if (websocket.readyState === 1) {
        log("sent:", text)
        websocket.send(text)
    } else {
        log("didn't send:", text)
    }
}
function sendJSON(obj) {
    send(JSON.stringify(obj))
}
function sendEvent(topic, event, body = {}) {
    sendJSON({
        "topic": topic,
        "event": event,
        "body": body,
    })
}
function receive(callback) {
    if (websocket.readyState === 1) {
        websocket.addEventListener('message', (event) => {
            callback(event.data)
        })
    }
}
function receiveJSON(callback) {
    receive(data => {
        if (isJSON(data)) callback(JSON.parse(data))
    })
}
function receiveTopic(topic, callback) {
    receiveJSON(obj => {
        if (obj.topic === topic) {
            callback(obj.event, obj.body)
        }
    })
}
function receiveEvent(topic, event, callback) {
    receiveJSON(obj => {
        if (obj.topic === topic && obj.event === event) {
            callback(obj.body)
        }
    })
}
function onClose(callback) {
    websocket.addEventListener('close', (event) => {
        callback(event)
    })
}

// Export
export const ws = {
    debug: setDebug,
    connect: connect,
    onClose: onClose,
    connection: websocket,
    receive: {
        text: receive,
        json: receiveJSON,
        topic: receiveTopic,
        event: receiveEvent,
    },
    send: {
        text: send,
        json: sendJSON,
        event: sendEvent,
    }
}