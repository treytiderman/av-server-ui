import { persistentStore } from "../../js/store.js";

export { store, def }

const def = {
    settings: {
        showBorders: true,
        escapeCRLF: true,
        prettyJSON: false,
        freezeCol1Col2: false,
    },
};

const store = persistentStore("tcp-client", def);
// store.reset()
