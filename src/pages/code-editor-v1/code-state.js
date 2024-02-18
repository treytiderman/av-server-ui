import { persistentStore } from "../../js/store.js";

export { state, def }

const def = {
    value: "",
};

const state = persistentStore("code", def);
// state.reset()
