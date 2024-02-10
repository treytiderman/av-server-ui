import { ws, user_v1 } from "./api/api.js"
import { volatile } from "./pages/store-global-volatile.js"

// State
const url = ws.url().replace("4621", "4620")
// const url = "ws://192.168.1.1:4620" // if developing av-server-ui on a different pc than av-server is running

// Startup
// onStartup()

// Functions
async function onStartup() {
    volatile.update(val => {

        // Offline Dev
        if (val.apiStatus === "offline") {
            val.user.username = "admin"
            val.user.groups = ["admin"]
            val.user.isAdmin = true
        }

        // Online with WebSocket connection to api
        else {
            ws.connect(url, (status) => {
                if (status === "open") onConnect()
                else onFailedToConnect()
            })
        }

        return val
    })
}

async function onConnect() {
    volatile.update(val => {
        val.apiStatus = "connected"
        val.lostConnectionAt = ""
        return val
    })

    // On Websocket close
    ws.onClose(onClosed)

    // Login
    const token = localStorage.getItem("token")
    const loginResponse = await user_v1.loginWithToken(token)
    if (loginResponse === "ok") onLogin()
    else onFailedToLogin()
}

function onClosed() {
    volatile.update(val => {
        val.apiStatus = "closed"
        val.lostConnectionAt = new Date().toLocaleString()
        return val
    })
}

function onLogin() {
    volatile.update(val => {
        val.apiStatus = "authorized"
        val.lostConnectionAt = ""
        return val
    })

    user_v1.whoAmI.sub((user) => {
        if (user.username) onWhoAmI(user)
    })

}

function onWhoAmI(user) {
    user.isAdmin = user.groups.some((group) => group === "admin")

    volatile.update(val => {
        val.user = user
        return val
    })
}

async function onFailedToConnect() {

}

async function onFailedToLogin() {

}
