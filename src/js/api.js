import { ws } from "../js/ws.js";

// Api
import { v0 as logger_v0 } from "../js/api-logger-v0.js";
import { v0 as system_v0 } from "../js/api-system-v0.js";
import { v0 as user_v0 } from "../js/api-user-v0.js";

// Exports
export const api = {
    "ws": ws,
    "connect": ws.connect,
    "logger": { v0: logger_v0 },
    "system": { v0: system_v0 },
    "user": { v0: user_v0 },
}
