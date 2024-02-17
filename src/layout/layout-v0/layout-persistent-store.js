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
        tabActive: { name: "New Tab" },

        // "split"
        // isVertical: false,
        // one_percent: 50,

    },
}

// Store
export const store = persistentStore("layout", {
    windowActiveId: 1,
    windowsDefault: JSON.parse(JSON.stringify(windowsDefault)),
    windows: [
        // JSON.parse(JSON.stringify(windowsDefault)),
        {
            id: 1,
            parentId: 0,
            childrenIds: [2, 3],
            type: "split",
            state: {
                isVertical: false,
            },
        },
        {
            id: 2,
            parentId: 1,
            childrenIds: [],
            type: "tabs",
            state: {
                tabs: [
                    {
                        name: "System",
                    },
                ],
                tabActive: "System",
            },
        },
        {
            id: 3,
            parentId: 1,
            childrenIds: [5, 4],
            type: "split",
            state: {
                isVertical: true,
            },
        },
        {
            id: 5,
            parentId: 3,
            childrenIds: [],
            type: "tabs",
            state: {
                tabs: [
                    {
                        name: "Logs",
                    },
                ],
                tabActive: "Logs",
            },
        },
        {
            id: 4,
            type: "tabs",
            parentId: 3,
            childrenIds: [],
            state: {
                tabs: [
                    {
                        name: "TCP Client",
                    },
                    {
                        name: "User",
                    },
                    {
                        name: "Database",
                    },
                ],
                tabActive: "Database",
            },
        },
    ],
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
