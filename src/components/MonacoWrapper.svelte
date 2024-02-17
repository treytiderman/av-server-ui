<script>
    import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
    import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
    import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
    import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
    import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
    import { onMount } from "svelte";
    // import { persistent as state } from "../pages/global-persistent-state.js";
    
    // Changed to dynamic import in onMount
    // import * as monaco from "monaco-editor";
    import { themeBlack } from "./theme-black.js";
    import { themeDark } from "./theme-dark.js";
    import { themeWhite } from "./theme-white.js";
    let monaco;

    // Monaco Stuff
    self.MonacoEnvironment = {
        getWorker(_, label) {
            if (label === "json") {
                return new jsonWorker();
            }
            if (label === "css" || label === "scss" || label === "less") {
                return new cssWorker();
            }
            if (
                label === "html" ||
                label === "handlebars" ||
                label === "razor"
            ) {
                return new htmlWorker();
            }
            if (label === "typescript" || label === "javascript") {
                return new tsWorker();
            }
            return new editorWorker();
        },
    };

    // Variables
     let theme = "dark";
     let fontSize = "16px";
    export let initValue = "";
    export let initLanguage = "json";
    export let data = {
        element: undefined,
        editor: undefined,
        loading: true,
        setValue: (value, language = "json") => {
            monaco.editor.setModelLanguage(data.editor.getModel(), language);
            return data.editor.setValue(value);
        },
        getValue: () => {
            return data.editor.getValue();
        },
        setTheme: (theme) => {
            monaco.editor.setTheme(theme || "dark");
        },
        hideLineNumbers: (theme) => {
            data.editor.updateOptions({ lineNumbers: "off", folding: false });
        },
        setFontSize: (number) => {
            if (number >= 8 && number <= 36) {
                data.editor.updateOptions({ fontSize: number });
            }
        },
    };
    
    
    // Startup
    onMount(async () => {
        // Dynamically import Monaco so it isn't loaded unless needed
        monaco = await import("monaco-editor");

        monaco.editor.defineTheme("black", themeBlack);
        monaco.editor.defineTheme("dark", themeDark);
        monaco.editor.defineTheme("light", themeWhite);
        monaco.editor.defineTheme("white", themeWhite);
        let screenWidth = document.documentElement.offsetWidth;
        // let fontSize = document.documentElement.style.getPropertyValue("--font-size");
        fontSize = fontSize.replace("px", "") - 2;
        data.editor = monaco.editor.create(data.element, {
            value: initValue,
            language: initLanguage,
            theme: theme,
            // theme: "dark",
            // fontSize: fontSize,
            // lineNumbers: "off",
            // folding: false,
            automaticLayout: true,
            minimap: { enabled: false },
        });
        if (screenWidth < 600) {
            data.editor.getModel().updateOptions({ tabSize: 2 });
        } else {
            data.editor.getModel().updateOptions({ tabSize: 4 });
        }

        // Update theme
        // state.subscribe((stateUpdate) => {
        //     if (screenWidth < 600) data.hideLineNumbers();
        //     data.setTheme(theme);

        //     let size = JSON.stringify(fontSize);
        //     size = size.replace("px", "") - 2;
        //     data.setFontSize(size);
        // });

        data.loading = false;
    });
</script>

{#if data.loading}
    <section class="pad">loading editor...</section>
{/if}
<section class="editor" bind:this={data.element} />

<style>
    .editor {
        height: 100%;
        min-height: 10rem;
    }
</style>
