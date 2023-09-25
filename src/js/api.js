import { ws } from "../js/ws.js";
import { users } from "../js/api-users.js";

// Exports
export const api = {
    "debug": ws.debug,
    "connect": ws.connect,
    "users": users,
}
