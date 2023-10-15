import { ws } from "../js/ws.js";

// Api
import { v0 as user_v0 } from "../js/api-user-v0.js";
import { v0 as system_v0 } from "../js/api-system-v0.js";

// Exports
// import { api } from "../js/api.js";
export const api = {
    "ws": ws,
    "connect": ws.connect,
    "user": { v0: user_v0 },
    "system": { v0: system_v0 },
}
