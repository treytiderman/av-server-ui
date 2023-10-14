// Imports
import { ws } from "../js/ws.js";

// Exports
export const v1 = {
    getToken,
    getGroups,
    getUsers,
    getWhoAmI,

    subToken,
    subGroups,
    subUsers,
    subWhoAmI,

    unsubToken,
    unsubGroups,
    unsubUsers,
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

// user/v1/topic/token
function getToken(callback = () => { }) {
    ws.send.path("user/v1/topic/token", "get")
    ws.receiveOnce.path("user/v1/topic/token", (response) => callback(response))
}
function subToken(callback = () => { }) {
    ws.send.path("user/v1/topic/token", "sub")
    ws.receive.path("user/v1/topic/token", (response) => callback(response))
}
function unsubToken(callback = () => { }) {
    ws.send.path("user/v1/topic/token", "unsub")
    ws.receiveOnce.path("user/v1/topic/token", (response) => callback(response))
}

// user/v1/topic/who-am-i
function getWhoAmI(callback = () => { }) {
    ws.send.path("user/v1/topic/who-am-i", "get")
    ws.receiveOnce.path("user/v1/topic/who-am-i", (response) => callback(response))
}
function subWhoAmI(callback = () => { }) {
    ws.send.path("user/v1/topic/who-am-i", "sub")
    ws.receive.path("user/v1/topic/who-am-i", (response) => callback(response))
}
function unsubWhoAmI(callback = () => { }) {
    ws.send.path("user/v1/topic/who-am-i", "unsub")
    ws.receiveOnce.path("user/v1/topic/who-am-i", (response) => callback(response))
}

// user/v1/topic/groups
function getGroups(callback = () => { }) {
    ws.send.path("user/v1/topic/groups", "get")
    ws.receiveOnce.path("user/v1/topic/groups", (response) => callback(response))
}
function subGroups(callback = () => { }) {
    ws.send.path("user/v1/topic/groups", "sub")
    ws.receive.path("user/v1/topic/groups", (response) => callback(response))
}
function unsubGroups(callback = () => { }) {
    ws.send.path("user/v1/topic/groups", "unsub")
    ws.receiveOnce.path("user/v1/topic/groups", (response) => callback(response))
}

// user/v1/topic/users
function getUsers(callback = () => { }) {
    ws.send.path("user/v1/topic/users", "get")
    ws.receiveOnce.path("user/v1/topic/users", (response) => callback(response))
}
function subUsers(callback = () => { }) {
    ws.send.path("user/v1/topic/users", "sub")
    ws.receive.path("user/v1/topic/users", (response) => callback(response))
}
function unsubUsers(callback = () => { }) {
    ws.send.path("user/v1/topic/users", "unsub")
    ws.receiveOnce.path("user/v1/topic/users", (response) => callback(response))
}

// user/v1/func/login-
function login(username, password, callback = () => { }) {
    ws.send.path("user/v1/func/login", { username: username, password: password })
    ws.receiveOnce.path("user/v1/func/login", (response) => callback(response))
}
function loginWithToken(token, callback = () => { }) {
    ws.send.path("user/v1/func/login-with-token", token)
    ws.receiveOnce.path("user/v1/func/login-with-token", (response) => callback(response))
}
function logout(callback = () => { }) {
    ws.send.path("user/v1/func/logout")
    ws.receiveOnce.path("user/v1/func/logout", (response) => callback(response))
}

// user/v1/func/group-
function groupCreate(group, callback = () => { }) {
    ws.send.path("user/v1/func/group-create", group)
    ws.receiveOnce.path("user/v1/func/group-create", (response) => callback(response))
}
function groupDelete(group, callback = () => { }) {
    ws.send.path("user/v1/func/group-delete", group)
    ws.receiveOnce.path("user/v1/func/group-delete", (response) => callback(response))
}

// user/v1/func/user-
function userCreate(username, password, passwordConfirm, groups, callback = () => { }) {
    ws.send.path("user/v1/func/user-create", {
        username: username,
        password: password,
        passwordConfirm: passwordConfirm,
        groups: groups,
    })
    ws.receiveOnce.path("user/v1/func/user-create", (response) => callback(response))
}
function userDelete(username, callback = () => { }) {
    ws.send.path("user/v1/func/user-delete", username)
    ws.receiveOnce.path("user/v1/func/user-delete", (response) => callback(response))
}
function userAddGroup(username, group, callback = () => { }) {
    ws.send.path("user/v1/func/user-add-group", {
        username: username,
        group: group,
    })
    ws.receiveOnce.path("user/v1/func/user-add-group", (response) => callback(response))
}
function userRemoveGroup(username, group, callback = () => { }) {
    ws.send.path("user/v1/func/user-remove-group", {
        username: username,
        group: group,
    })
    ws.receiveOnce.path("user/v1/func/user-remove-group", (response) => callback(response))
}
function userChangePassword(username, password, passwordConfirm, callback = () => { }) {
    ws.send.path("user/v1/func/user-change-password", {
        username: username,
        password: password,
        passwordConfirm: passwordConfirm,
    })
    ws.receiveOnce.path("user/v1/func/user-change-password", (response) => callback(response))
}

// user/v1/func/reset-
function resetToDefault(callback = () => { }) {
    ws.send.path("user/v1/func/reset-to-default")
    ws.receiveOnce.path("user/v1/func/reset-to-default", (response) => callback(response))
}
