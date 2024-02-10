import { persistentStore } from "../../js/store.js";

export { state, def }

const def = {
    settings: {
        showBorders: true,
        escapeCRLF: true,
        prettyJSON: false,
        freezeCol1Col2: false,
    },
};

const state = persistentStore("serial-port", def);
// state.reset()
