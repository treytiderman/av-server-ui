import { persistentStore } from "../../modules/store.js";

export { state, def }

const def = {
    settings: {
        showBorders: false,
        escapeCRLF: true,
        prettyJSON: false,
        freezeCol1Col2: false,
    },
};

const state = persistentStore("tcp-client", def);
// state.reset()