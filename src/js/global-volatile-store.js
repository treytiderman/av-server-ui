import { volatileStore } from "../modules/store.js";
import { pages } from "../pages/pages.js";

// Store
export const volatile = volatileStore("global", {

    // State
    apiStatus: "startup", // "connected", "authorized", "closed"
    lostConnectionAt: "",
    user: {
        username: undefined,
        groups: [],
        isAdmin: false,
    },

    // All Pages as an object { "name": component, ... }
    pages: pages,

    // Info
    themes: ["black", "dark", "light"],

    // Helpful
    hasFocus: true, // window / browser tab is in focus?
    window: getWindow(), // dpr, width, height, portrait
    url: getUrl(), // protocol, ip, port, path, querystring

})

// Events
window.addEventListener('resize', event => {
    volatile.update(val => {
        val.window = getWindow()
        return val
    })
})
window.addEventListener("focus", (event) => {
    volatile.update(val => {
        val.hasFocus = true
        return val
    })
})
window.addEventListener("blur", (event) => {
    volatile.update(val => {
        val.hasFocus = false
        return val
    })
})

// Helper Functions
function parseQuerystring(string) {
    let obj = {}
    const urlSearchs = string.replace("?", "").split('&')
    urlSearchs.forEach(urlSearch => {
        let pair = urlSearch.split("=")
        let key = pair[0]
        let value = pair[1]
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
