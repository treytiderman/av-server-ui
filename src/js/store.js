import { writable } from 'svelte/store'

export {
    stores,
    volatileStore,
    persistentStore,
}

const stores = writable({})

function volatileStore(key, data) {

    // Create Store
    const store = writable(data)

    // Subscribe to this store's updates (Double Data)
    store.subscribe(o => {
        stores.update(s => {
            s[key + "-volatile"] = o
            return s
        })
        return o
    })

    // Return the store
    return store
}

function persistentStore(key, data) {

    // Create Store and deconstruct
    const clone = JSON.parse(JSON.stringify(data))
    const store = writable(clone)
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

    // Subscribe to this store's updates (Double Data)
    subscribe(value => {
        stores.update(storesValue => {
            storesValue[key + "-persistent"] = value
            return storesValue
        })
        return value
    })

    // Return the store
    return {
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
            const clone = JSON.parse(JSON.stringify(data))
            set(clone)
            const resetValue = JSON.stringify(data)
            localStorage.setItem(key, resetValue)
        },
    }
}
