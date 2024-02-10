import { volatileStore } from "./js/store.js";
import { pages } from "./pages/pages.js";

// Store
export const store = volatileStore("app", {

    // All Pages as an object { "name": component, ... }
    pages: pages,

    // Helpful
    hasFocus: true, // window / browser tab is in focus?
    window: getWindow(), // dpr, width, height, portrait
    url: getUrl(), // protocol, ip, port, path, querystring

})

// Events
window.addEventListener('resize', event => {
    store.update(val => {
        val.window = getWindow()
        return val
    })
})
window.addEventListener("focus", (event) => {
    store.update(val => {
        val.hasFocus = true
        return val
    })
})
window.addEventListener("blur", (event) => {
    store.update(val => {
        val.hasFocus = false
        return val
    })
})

// Helper Functions
function parseQuerystring(string) {
    let obj = {}
    const keyValuePairs = string.replace("?", "").split('&')
    keyValuePairs.forEach(keyValuePair => {
        const [key, value] = keyValuePair.split("=")
        obj[key] = value
    })
    return obj
}
function getWindow() {
    return {
        dpr: window.devicePixelRatio,
        width: document.documentElement.offsetWidth,
        height: document.documentElement.offsetHeight,
        portrait: document.documentElement.offsetWidth < document.documentElement.offsetHeight,
    }
}
function getUrl() {
    return {
        href: document.location.href,
        protocol: document.location.protocol.replace(":", ""),
        ip: document.location.hostname,
        port: document.location.port,
        path: document.location.pathname,
        query: parseQuerystring(document.location.search),
    }
}
