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
function getWebsocketUrl() {
    let protocal = "ws://"
    if (location.protocol === "https:") protocal = "wss://"
    let host = location.host
    return protocal + host
}
function connect(url = "", callback = () => {}) {
    url = url || getWebsocketUrl()
    console.log(url);
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
function onClose(callback) {
    websocket.addEventListener('close', (event) => {
        callback(event)
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
function receive(callback) {
    if (websocket.readyState === 1) {
        websocket.addEventListener('message', (event) => {
            callback(event.data)
        })
    }
}
function receiveJson(callback) {
    receive(data => {
        if (isJSON(data)) callback(JSON.parse(data))
    })
}
function receiveOnce(callback) {
    let eventListenerFunction = (event) => {
        websocket.removeEventListener('message', eventListenerFunction)
        callback(event.data)
    }
    if (websocket.readyState === 1) {
        websocket.addEventListener('message', eventListenerFunction)
    }
}
function receiveJsonOnce(callback) {
    receiveOnce(data => {
        if (isJSON(data)) callback(JSON.parse(data))
    })
}

// API
function sendPath(path, body = {}) {
    sendJSON({
        "path": path,
        "body": body,
    })
}
function receivePath(path, callback) {
    receiveJson(obj => {
        if (obj.path === path) {
            callback(obj.body)
        }
    })
}
function receivePathOnce(path, callback) {
    receiveJsonOnce(obj => {
        if (obj.path === path) {
            callback(obj.body)
        }
    })
}

// Old API
function sendEvent(topic, event, body = {}) {
    sendJSON({
        "topic": topic,
        "event": event,
        "body": body,
    })
}
function receiveTopic(topic, callback) {
    receiveJson(obj => {
        if (obj.topic === topic) {
            callback(obj.event, obj.body)
        }
    })
}
function receiveEvent(topic, event, callback) {
    receiveJson(obj => {
        if (obj.topic === topic && obj.event === event) {
            callback(obj.body)
        }
    })
}
function receiveTopicOnce(topic, callback) {
    receiveJsonOnce(obj => {
        if (obj.topic === topic) {
            callback(obj.event, obj.body)
        }
    })
}
function receiveEventOnce(topic, event, callback) {
    receiveJsonOnce(obj => {
        if (obj.topic === topic && obj.event === event) {
            callback(obj.body)
        }
    })
}

// Export
export const ws = {
    url: getWebsocketUrl,
    debug: setDebug,
    connect: connect,
    onClose: onClose,
    connection: websocket,
    receive: {
        text: receive,
        json: receiveJson,
        topic: receiveTopic,
        event: receiveEvent,
        path: receivePath,
    },
    receiveOnce: {
        text: receiveOnce,
        json: receiveJsonOnce,
        topic: receiveTopicOnce,
        event: receiveEventOnce,
        path: receivePathOnce,
    },
    send: {
        text: send,
        json: sendJSON,
        event: sendEvent,
        path: sendPath,
    }
}