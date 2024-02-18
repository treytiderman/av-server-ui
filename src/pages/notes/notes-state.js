import { persistentStore } from "../../js/store.js";

export { state, def }

const def = {
    notes: ""
};

const state = persistentStore("notes", def);
// state.reset()
