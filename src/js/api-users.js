// Imports
import { ws } from "../js/ws.js";

// Functions
function login(username, password) {
    ws.send.event("user/token", "login", {
        username: username,
        password: password,
    })
}
function onLogin(callback = () => {}) {
    ws.receive.event("user/token", "login", (res) => {
        callback(res)
    })
}
function loginWithToken(username, token) {
    ws.send.event(`user/${username}`, "login-with-token", token)
}
function onToken(callback) {
    ws.receive.event("user/token", "pub", (res) => {
        callback(res)
    })
}
function onLoginWithToken(username, callback = () => {}) {
    ws.receive.event(`user/${username}`, "login-with-token", (res) => {
        callback(res)
    })
}


// user/groups
function onGroups(callback = () => {}) {
    ws.receive.event(`user/groups`, "pub", (res) => {
        callback(res)
    })
}
function getGroups() {
    ws.send.event("user/groups", "get")
}
function createGroup(group, callback = () => {}) {
    ws.send.event("user/groups", "create", group)
    ws.receive.event("user/groups", "create", (res) => {
        callback(res)
    })
}
function deleteGroup(group, callback = () => {}) {
    ws.send.event("user/groups", "delete", group)
    ws.receive.event("user/groups", "delete", (res) => {
        callback(res)
    })
}

// Exports
export const users = {
    login,
    onLogin,
    loginWithToken,
    onLoginWithToken,
    onToken,

    onGroups,
    getGroups,
    createGroup,
    deleteGroup,

}
