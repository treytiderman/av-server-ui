// Export
export const ws = {
    url: getWebsocketUrl,
    debug: setDebug,
    connect: connect,
    onClose: onClose,
    receive: {
        text: receive,
        json: receiveJson,
        path: receivePath,
    },
    receiveOnce: {
        text: receiveOnce,
        json: receiveJsonOnce,
        path: receivePathOnce,
    },
    send: {
        text: send,
        json: sendJSON,
        path: sendPath,
    },
    api: {
        send: sendApi,
        sub: subApi,
    }
}

// Constants
const RECONNECT_TIMER = 1_000

// Variables
let debug = false
let websocket = { readyState: 3 }
let timeout

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
    let protocol = "ws://"
    if (location.protocol === "https:") protocol = "wss://"
    let host = location.host
    return protocol + host
}
function connect(url = "", callback = () => { }) {
    url = url || getWebsocketUrl()
    log(url);
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
    websocket.addEventListener('close', (event) => {
        log(`reconnect: ${url} in ${RECONNECT_TIMER}ms`)
        timeout = setTimeout(() => {
            connect(url, (status) => {
                if (status === "open") location.reload()
            })
        }, RECONNECT_TIMER);
    })
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
    function eventListenerFunction(event) {
        websocket.removeEventListener('message', eventListenerFunction)
        callback(event.data)
    }
    if (websocket.readyState === 1) {
        websocket.addEventListener('message', eventListenerFunction)
    }
}
function receiveJsonOnce(callback) {
    function eventListenerFunction(event) {
        if (isJSON(event.data)) {
            const obj = JSON.parse(event.data)
            websocket.removeEventListener('message', eventListenerFunction)
            callback(obj)
        }
    }
    if (websocket.readyState === 1) {
        websocket.addEventListener('message', eventListenerFunction)
    }
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
    function eventListenerFunction(event) {
        if (isJSON(event.data)) {
            const obj = JSON.parse(event.data)
            if (obj.path === path) {
                websocket.removeEventListener('message', eventListenerFunction)
                callback(obj.body)
            }
        }
    }
    if (websocket.readyState === 1) {
        websocket.addEventListener('message', eventListenerFunction)
    }
}
function sendApi(path, body = {}) {
    return new Promise((resolve, reject) => {

        // Send
        sendPath(path, body)

        // Receive Once
        receivePathOnce(path, (data) => resolve(data))

    })
}
function subApi(path, callback) {

    // Subscribe
    sendPath(path)
    if (websocket.readyState === 1) {
        websocket.addEventListener('message', onMessage)
    }
    function onMessage(event) {
        if (isJSON(event.data)) {
            const obj = JSON.parse(event.data)
            if (obj.path === path) callback(obj.body)
            if (obj.path === path.replace("/sub/", "/pub/")) callback(obj.body)
        }
    }

    // Unsubscribe
    function unsub() {
        sendPath(path.replace("/sub/", "/unsub/"))
        websocket.removeEventListener('message', onMessage)
    }

    return unsub = () => websocket.removeEventListener('message', onMessage)
}
