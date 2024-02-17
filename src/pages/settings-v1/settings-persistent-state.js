import { persistentStore } from "../../js/store.js"

// Store
export const store = persistentStore("settings", {
    theme: "dark",
    fontSize: 16,
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
