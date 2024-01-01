import { ws } from "../js/ws.js";

// Api
import * as user_v1 from "./api/user-v1.js";
import * as logger_v0 from "./api/logger-v0.js";
import * as system_v1 from "./api/system-v1.js";
import * as database_v1 from "./api/database-v1.js";
import * as program_v1 from "./api/program-v1.js";

import * as database_v0 from "../js/api-database-v0.js";
import { v0 as programs_v0 } from "../js/api-programs-v0.js";
import { v0 as system_v0 } from "../js/api-system-v0.js";
import { v0 as tcpClient_v0 } from "../js/api-tcp-client-v0.js";
import { v0 as users_v0 } from "../js/api-users-v0.js";

// Exports
export {
    api,
    database_v0,
    database_v1,
    logger_v0,
    system_v1,
    user_v1,
    program_v1,
}
const api = {
    "ws": ws,
    "connect": ws.connect,
    "logger": { v0: logger_v0 },
    "programs": { v0: programs_v0 },
    "system": { v0: system_v0 },
    "tcpClient": { v0: tcpClient_v0 },
    "user": { v0: users_v0 },
}
