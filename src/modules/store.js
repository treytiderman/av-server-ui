import { writable } from 'svelte/store'

export const state = writable({})

export function volatileStore(key, data) {
    const obj = writable(data)
    obj.subscribe(o => {
        state.update(s => {
            s[key + "-volatile"] = o
            return s
        })
        return o
    })
    return obj
}

export function persistentStore(key, data) {

    // Create Store
    const store = writable(data)
    const { subscribe, set, update } = store

    // Get saved store and overwrite if valid
    if (localStorage[key]) {
        try {
            const json = JSON.parse(localStorage[key])
            set(json)
        } catch (error) {
            console.log(`persistentStore '${key}' has an invalid JSON in localStorage`)
        }
    }

    // Return the store
    const obj = {
        subscribe,
        set: newValue => {
            localStorage[key] = JSON.stringify(newValue)
            set(newValue)
        },
        update: cb => {
            const updatedValue = cb(get(store))
            localStorage[key] = JSON.stringify(updatedValue)
            set(updatedValue)
        },
        reset: () => {
            const resetValue = JSON.stringify(data)
            localStorage.setItem(key, resetValue)
            set(resetValue)
        },
    }
    obj.subscribe(o => {
        state.update(s => {
            s[key + "-persistent"] = o
            return s
        })
        return o
    })
    return obj
}
