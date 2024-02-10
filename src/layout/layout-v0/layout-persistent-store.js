import { persistentStore } from "../../js/store.js"

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
        tabActive: { name: "Blank" }

        // "split"
        // isVertical: false,
        // one_percent: 50,

    },
}

// Store
export const store = persistentStore("layout", {
    windowActiveId: 1,
    windowsDefault: JSON.parse(JSON.stringify(windowsDefault)),
    windows: [JSON.parse(JSON.stringify(windowsDefault))],
})

// Watch changes
store.subscribe(val => {

    // Theme
    document.documentElement.classList = val.theme

    // Font Size
    if (val.fontSize >= 8 && val.fontSize <= 36) {
        // document.documentElement.style.fontSize = val.fontSize + "px"
        document.documentElement.style.setProperty('--font-size', val.fontSize + "px")
    }

})
