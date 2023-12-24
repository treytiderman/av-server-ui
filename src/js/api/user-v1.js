// Imports
import { ws as api } from "../ws.js";

// Exports
export {
    login,
    loginWithToken,
    logout,
    whoAmI, // get, sub, unsub
    user, // get, sub, unsub, create, delete, addGroup, removeGroup, changePassword
    users, // get, sub, unsub, reset
    groups, // get, sub, unsub, reset, create, delete
}

// Functions
const login = (username, password) => new Promise((resolve, reject) => {
    api.send.path("v1/login/", { username: username, password: password })
    api.receiveOnce.path("v1/login/", (response) => resolve(response))
})
const loginWithToken = (token) => new Promise((resolve, reject) => {
    api.send.path("v1/login-with-token/", { token: token })
    api.receiveOnce.path("v1/login-with-token/", (response) => resolve(response))
})
const logout = () => new Promise((resolve, reject) => {
    api.send.path("v1/logout/")
    api.receiveOnce.path("v1/logout/", (response) => resolve(response))
})
const whoAmI = {
    get: () => new Promise((resolve, reject) => {
        api.send.path(`v1/whoami/get/`)
        api.receiveOnce.path(`v1/whoami/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v1/whoami/sub/`)
        api.receiveOnce.path(`v1/whoami/sub/`, (response) => callback(response))
        api.receive.path(`v1/whoami/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        api.send.path(`v1/whoami/unsub/`)
        api.receiveOnce.path(`v1/whoami/unsub/`, (response) => resolve(response))
    }),
}
const user = {
    get: (username) => new Promise((resolve, reject) => {
        api.send.path(`v1/user/get/${username}/`)
        api.receiveOnce.path(`v1/user/get/${username}/`, (response) => resolve(response))
    }),
    sub: (username, callback) => {
        api.send.path(`v1/user/sub/${username}/`)
        api.receiveOnce.path(`v1/user/sub/${username}/`, (response) => callback(response))
        api.receive.path(`v1/user/pub/${username}/`, (response) => callback(response))
    },
    unsub: (username) => new Promise((resolve, reject) => {
        api.send.path(`v1/user/unsub/${username}/`)
        api.receiveOnce.path(`v1/user/unsub/${username}/`, (response) => resolve(response))
    }),
    create: (username, password, passwordConfirm, groups) => new Promise((resolve, reject) => {
        api.send.path(`v1/user/create/${username}/`, { password: password, passwordConfirm: passwordConfirm, groups: groups })
        api.receiveOnce.path(`v1/user/create/${username}/`, (response) => resolve(response))
    }),
    delete: (username) => new Promise((resolve, reject) => {
        api.send.path(`v1/user/delete/${username}/`)
        api.receiveOnce.path(`v1/user/delete/${username}/`, (response) => resolve(response))
    }),
    addGroup: (username, group) => new Promise((resolve, reject) => {
        api.send.path(`v1/user/add-group/${username}/`, { group: group })
        api.receiveOnce.path(`v1/user/add-group/${username}/`, (response) => resolve(response))
    }),
    removeGroup: (username, group) => new Promise((resolve, reject) => {
        api.send.path(`v1/user/remove-group/${username}/`, { group: group })
        api.receiveOnce.path(`v1/user/remove-group/${username}/`, (response) => resolve(response))
    }),
    changePassword: (username, password, passwordConfirm) => new Promise((resolve, reject) => {
        api.send.path(`v1/user/change-password/${username}/`, { password: password, passwordConfirm: passwordConfirm })
        api.receiveOnce.path(`v1/user/change-password/${username}/`, (response) => resolve(response))
    }),
}
const users = {
    get: () => new Promise((resolve, reject) => {
        api.send.path(`v1/user/all/get/`)
        api.receiveOnce.path(`v1/user/all/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v1/user/all/sub/`)
        api.receiveOnce.path(`v1/user/all/sub/`, (response) => callback(response))
        api.receive.path(`v1/user/all/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        api.send.path(`v1/user/all/unsub/`)
        api.receiveOnce.path(`v1/user/all/unsub/`, (response) => resolve(response))
    }),
    reset: () => new Promise((resolve, reject) => {
        api.send.path(`v1/user/all/reset/`)
        api.receiveOnce.path(`v1/user/all/reset/`, (response) => resolve(response))
    }),
}
const groups = {
    get: () => new Promise((resolve, reject) => {
        api.send.path(`v1/user/groups/get/`)
        api.receiveOnce.path(`v1/user/groups/get/`, (response) => resolve(response))
    }),
    sub: (callback) => {
        api.send.path(`v1/user/groups/sub/`)
        api.receiveOnce.path(`v1/user/groups/sub/`, (response) => callback(response))
        api.receive.path(`v1/user/groups/pub/`, (response) => callback(response))
    },
    unsub: () => new Promise((resolve, reject) => {
        api.send.path(`v1/user/groups/unsub/`)
        api.receiveOnce.path(`v1/user/groups/unsub/`, (response) => resolve(response))
    }),
    reset: () => new Promise((resolve, reject) => {
        api.send.path(`v1/user/groups/reset/`)
        api.receiveOnce.path(`v1/user/groups/reset/`, (response) => resolve(response))
    }),
    create: (group) => new Promise((resolve, reject) => {
        api.send.path(`v1/user/groups/create/`, { group: group })
        api.receiveOnce.path(`v1/user/groups/create/`, (response) => resolve(response))
    }),
    delete: (group) => new Promise((resolve, reject) => {
        api.send.path(`v1/user/groups/delete/`, { group: group })
        api.receiveOnce.path(`v1/user/groups/delete/`, (response) => resolve(response))
    }),
}
