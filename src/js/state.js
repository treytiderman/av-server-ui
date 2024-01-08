// import { writable } from 'svelte/store'

// let windowsDefault = {
//     id: 1,
//     type: "tabs",
//     state: {
//         tabs: [],
//         tabActive: {
//             name: "New Tab",
//         }
//     },
//     parentId: 0,
//     childrenIds: [],
// }

// // Initial State of Store
// export let initialState = {
//     theme: "dark",
//     themes: ["black", "dark", "white"],
//     fontSize: 16,
//     windowActiveId: 1,
//     windowsDefault: JSON.parse(JSON.stringify(windowsDefault)),
//     windows: [
//         JSON.parse(JSON.stringify(windowsDefault)),
//         // {
//         //     id: 1,
//         //     type: "split",
//         //     state: {
//         //         isVertical: false,
//         //         one_percent: 50,
//         //     },
//         //     parentId: 0,
//         //     childrenIds: [2, 3],
//         // },
//         // {
//         //     id: 2,
//         //     type: "tabs",
//         //     state: {
//         //         tabs: [],
//         //         tabActive: {},
//         //     },
//         //     parentId: 1,
//         //     childrenIds: [],
//         // },
//         // {
//         //     id: 3,
//         //     type: "tabs",
//         //     state: {
//         //         tabs: [],
//         //         tabActive: {},
//         //     },
//         //     parentId: 1,
//         //     childrenIds: [],
//         // },
//     ],
// }

// // Get State from localStorage
// const localStorageKey = "state"
// let currentState = initialState;
// let currentStateJson = localStorage.getItem(localStorageKey);
// if (currentStateJson == null || currentStateJson === "") {
//     localStorage.setItem(localStorageKey, JSON.stringify(currentState));
//     console.log(localStorageKey, "initalized", currentState);
// }
// else {
//     currentState = JSON.parse(currentStateJson);
//     currentState.windowsDefault = JSON.parse(JSON.stringify(windowsDefault)),
//         currentState.themes = initialState.themes,
//         console.log(localStorageKey, "from localStorage", currentState);
// }

// // Export State Store
// export const state = writable(currentState)

// // Save State every settings change
// state.subscribe(async state => {
//     if (state !== undefined && state != initialState) {
//         localStorage.setItem(localStorageKey, JSON.stringify(state));
//     }

//     // Theme
//     document.documentElement.classList = state.theme;

//     // Font Size
//     if (state.fontSize >= 8 && state.fontSize <= 36) {
//         // document.documentElement.style.fontSize = state.fontSize + "px";
//         document.documentElement.style.setProperty('--font-size', state.fontSize + "px");
//     }
// })