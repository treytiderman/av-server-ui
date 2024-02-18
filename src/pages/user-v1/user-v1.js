// Imports
import { ws } from "../../js/ws.js";

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
const login = async (username, password) => await ws.api.send("v1/login/", { username, password })
const loginWithToken = async (token) => await ws.api.send("v1/login-with-token/", { token })
const logout = async () => await ws.api.send("v1/logout/")
const whoAmI = {
    get: async () => await ws.api.send("v1/whoami/get/"),
    sub: (callback) => ws.api.sub("v1/whoami/sub/", callback),
    unsub: async () => await ws.api.send("v1/whoami/unsub/"),
}
const user = {
    get: async (username) => await ws.api.send(`v1/user/get/${username}/`),
    sub: (username, callback) => ws.api.sub(`v1/user/sub/${username}/`, callback),
    unsub: async (username) => await ws.api.send(`v1/user/unsub/${username}/`),
    create: async (username, password, passwordConfirm, groups) => await ws.api.send(`v1/user/create/${username}/`, { password, passwordConfirm, groups }),
    delete: async (username) => await ws.api.send(`v1/user/delete/${username}/`),
    addGroup: async (username, group) => await ws.api.send(`v1/user/add-group/${username}/`, { group }),
    removeGroup: async (username, group) => await ws.api.send(`v1/user/remove-group/${username}/`, { group }),
    changePassword: async (username, password, passwordConfirm) => await ws.api.send(`v1/user/change-password/${username}/`, { password, passwordConfirm }),
}
const users = {
    get: async () => await ws.api.send("v1/user/all/get/"),
    sub: (callback) => ws.api.sub("v1/user/all/sub/", callback),
    unsub: async () => await ws.api.send("v1/user/all/unsub/"),
    reset: async () => await ws.api.send("v1/user/all/reset/"),
}
const groups = {
    get: async () => await ws.api.send("v1/user/groups/get/"),
    sub: (callback) => ws.api.sub("v1/user/groups/sub/", callback),
    unsub: async () => await ws.api.send("v1/user/groups/unsub/"),
    reset: async () => await ws.api.send("v1/user/groups/reset/"),
    create: async (group) => await ws.api.send("v1/user/groups/create/", { group }),
    delete: async (group) => await ws.api.send("v1/user/groups/delete/", { group }),
}
