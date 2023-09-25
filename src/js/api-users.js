// Imports
import { ws } from "../js/ws.js";

// Functions
function login(username, password) {
    ws.send.event("user/token", "login", {
        username: username,
        password: password,
    })
}
function subToken(callback) {
    ws.receive.event("user/token", "pub", (token) => {
        callback(token)
    })
}

// Exports
export const users = {
    "login": login,
    "subToken": subToken,
}
