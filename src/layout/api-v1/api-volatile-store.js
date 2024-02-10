import { volatileStore } from "../../js/store.js";

// Store
export const store = volatileStore("api", {
    status: "startup", // "startup", "connected", "authorized", "closed"
    lostConnectionAt: "",
    user: {
        username: undefined,
        groups: [],
        isAdmin: false,
    },
})
