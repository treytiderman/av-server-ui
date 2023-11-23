// Imports
import { ws } from "./ws.js";

// Exports
export const v0 = {
    getToken,
    subToken,
    unsubToken,

    getUsers,
    subUsers,
    unsubUsers,

    getGroups,
    subGroups,
    unsubGroups,

    getWhoAmI,
    subWhoAmI,
    unsubWhoAmI,

    login,
    loginWithToken,
    logout,

    groupCreate,
    groupDelete,

    userCreate,
    userDelete,
    userAddGroup,
    userRemoveGroup,
    userChangePassword,

    resetToDefault,
}

// Functions
function login(username, password, callback = () => { }) {
    ws.send.path("/users/v0/func/login/", { username: username, password: password })
    ws.receiveOnce.path("/users/v0/func/login/", (response) => callback(response))
}
function loginWithToken(token, callback = () => { }) {
    ws.send.path("/users/v0/func/login-with-token/", token)
    ws.receiveOnce.path("/users/v0/func/login-with-token/", (response) => callback(response))
}
function logout(callback = () => { }) {
    ws.send.path("/users/v0/func/logout/")
    ws.receiveOnce.path("/users/v0/func/logout/", (response) => callback(response))
}

function groupCreate(group, callback = () => { }) {
    ws.send.path("/users/v0/func/group-create/", group)
    ws.receiveOnce.path("/users/v0/func/group-create/", (response) => callback(response))
}
function groupDelete(group, callback = () => { }) {
    ws.send.path("/users/v0/func/group-delete/", group)
    ws.receiveOnce.path("/users/v0/func/group-delete/", (response) => callback(response))
}

function userCreate(username, password, passwordConfirm, groups, callback = () => { }) {
    ws.send.path("/users/v0/func/user-create/", {
        username: username,
        password: password,
        passwordConfirm: passwordConfirm,
        groups: groups,
    })
    ws.receiveOnce.path("/users/v0/func/user-create/", (response) => callback(response))
}
function userDelete(username, callback = () => { }) {
    ws.send.path("/users/v0/func/user-delete/", username)
    ws.receiveOnce.path("/users/v0/func/user-delete/", (response) => callback(response))
}
function userAddGroup(username, group, callback = () => { }) {
    ws.send.path("/users/v0/func/user-add-group/", {
        username: username,
        group: group,
    })
    ws.receiveOnce.path("/users/v0/func/user-add-group/", (response) => callback(response))
}
function userRemoveGroup(username, group, callback = () => { }) {
    ws.send.path("/users/v0/func/user-remove-group/", {
        username: username,
        group: group,
    })
    ws.receiveOnce.path("/users/v0/func/user-remove-group/", (response) => callback(response))
}
function userChangePassword(username, password, passwordConfirm, callback = () => { }) {
    ws.send.path("/users/v0/func/user-change-password/", {
        username: username,
        password: password,
        passwordConfirm: passwordConfirm,
    })
    ws.receiveOnce.path("/users/v0/func/user-change-password/", (response) => callback(response))
}

function resetToDefault(callback = () => { }) {
    ws.send.path("/users/v0/func/reset-to-default/")
    ws.receiveOnce.path("/users/v0/func/reset-to-default/", (response) => callback(response))
}

// Topics
function getToken(callback = () => { }) {
    ws.send.path("/users/v0/topic/token/", "get")
    ws.receiveOnce.path("/users/v0/topic/token/", (response) => callback(response))
}
function subToken(callback = () => { }) {
    ws.send.path("/users/v0/topic/token/", "sub")
    ws.receive.path("/users/v0/topic/token/", (response) => callback(response))
}
function unsubToken(callback = () => { }) {
    ws.send.path("/users/v0/topic/token/", "unsub")
    ws.receiveOnce.path("/users/v0/topic/token/", (response) => callback(response))
}

function getWhoAmI(callback = () => { }) {
    ws.send.path("/users/v0/topic/who-am-i/", "get")
    ws.receiveOnce.path("/users/v0/topic/who-am-i/", (response) => callback(response))
}
function subWhoAmI(callback = () => { }) {
    ws.send.path("/users/v0/topic/who-am-i/", "sub")
    ws.receive.path("/users/v0/topic/who-am-i/", (response) => callback(response))
}
function unsubWhoAmI(callback = () => { }) {
    ws.send.path("/users/v0/topic/who-am-i/", "unsub")
    ws.receiveOnce.path("/users/v0/topic/who-am-i/", (response) => callback(response))
}

function getGroups(callback = () => { }) {
    ws.send.path("/users/v0/topic/groups/", "get")
    ws.receiveOnce.path("/users/v0/topic/groups/", (response) => callback(response))
}
function subGroups(callback = () => { }) {
    ws.send.path("/users/v0/topic/groups/", "sub")
    ws.receive.path("/users/v0/topic/groups/", (response) => callback(response))
}
function unsubGroups(callback = () => { }) {
    ws.send.path("/users/v0/topic/groups/", "unsub")
    ws.receiveOnce.path("/users/v0/topic/groups/", (response) => callback(response))
}

function getUsers(callback = () => { }) {
    ws.send.path("/users/v0/topic/users/", "get")
    ws.receiveOnce.path("/users/v0/topic/users/", (response) => callback(response))
}
function subUsers(callback = () => { }) {
    ws.send.path("/users/v0/topic/users/", "sub")
    ws.receive.path("/users/v0/topic/users/", (response) => callback(response))
}
function unsubUsers(callback = () => { }) {
    ws.send.path("/users/v0/topic/users/", "unsub")
    ws.receiveOnce.path("/users/v0/topic/users/", (response) => callback(response))
}
