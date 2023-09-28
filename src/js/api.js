import { ws } from "../js/ws.js";

// Api
import { users } from "../js/api-users.js";

// Exports
export const api = {
    "connect": ws.connect,
    "ws": ws,
    "users": users,
}
