import { writable } from 'svelte/store'
import { pages } from "../js/pages.js";

// Initial State of Store
let initialState = {
    pages: pages,
    window: getWindow(),
    url: getUrl(),
}

// Functions
export function parseQuerystring(string) {
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
export function getWindow() {
    return {
        dpr: window.devicePixelRatio,
        width: document.documentElement.offsetWidth,
        height: document.documentElement.offsetHeight,
        portrait: document.documentElement.offsetWidth < document.documentElement.offsetHeight,
    }
}
export function getUrl() {
    return {
        protocal: document.location.protocol,
        ip: document.location.hostname,
        port: document.location.port,
        path: document.location.pathname,
        querystring: parseQuerystring(document.location.search),
    }
}

// Export State Store
export const global = writable(initialState)

// Resize Event
window.addEventListener('resize', event => {
    global.update(global => {
        global.window = getWindow()
        return global
    })
})

// Every change
global.subscribe(async global => {
    // console.log(global)
})