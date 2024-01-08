import { persistentStore } from "../modules/store.js"

const windowsDefault = {
    id: 1,
    parentId: 0,
    childrenIds: [],
    type: "tabs", // "tabs", "split"
    state: {

        // "tabs"
        tabs: [
            // { name: "Users" },
        ],
        tabActive: { name: "New Tab" }
        
        // "split"
        // isVertical: false,
        // one_percent: 50,

    },
}

// Store
export const persistent = persistentStore("global", {
    theme: "dark",
    logFilter: "",
    fontSize: 16,
    windowActiveId: 1,
    windowsDefault: JSON.parse(JSON.stringify(windowsDefault)),
    windows: [
        JSON.parse(JSON.stringify(windowsDefault)),
        // {
        //     id: 1,
        //     type: "split",
        //     state: {
        //         isVertical: false,
        //         one_percent: 50,
        //     },
        //     parentId: 0,
        //     childrenIds: [2, 3],
        // },
        // {
        //     id: 2,
        //     type: "tabs",
        //     state: {
        //         tabs: [],
        //         tabActive: {},
        //     },
        //     parentId: 1,
        //     childrenIds: [],
        // },
        // {
        //     id: 3,
        //     type: "tabs",
        //     state: {
        //         tabs: [],
        //         tabActive: {},
        //     },
        //     parentId: 1,
        //     childrenIds: [],
        // },
    ],
})

// Watch changes
persistent.subscribe(val => {

    // Theme
    document.documentElement.classList = val.theme

    // Font Size
    if (val.fontSize >= 8 && val.fontSize <= 36) {
        // document.documentElement.style.fontSize = val.fontSize + "px"
        document.documentElement.style.setProperty('--font-size', val.fontSize + "px")
    }

})

window.addEventListener("error", () => {
    console.log("error")
    persistent.reset()
    return true
})
