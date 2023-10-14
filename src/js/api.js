import { ws } from "../js/ws.js";

// Api
import { v1 as user_v1 } from "../js/api-user-v1.js";

// Exports
export const api = {
    "ws": ws,
    "connect": ws.connect,
    "user": { v1: user_v1 }
}
