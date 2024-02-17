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
    export let theme = "dark";
    export let fontSize = 16;
    export let initValue = "";
    export let initLanguage = "json";
    export let data = {
        element: undefined,
        editor: undefined,
        width: undefined,
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
        setLineNumbers: (hide) => {
            data.editor.updateOptions({
                lineNumbers: hide ? "off" : "on",
                folding: !hide,
            });
        },
        setFontSize: (number) => {
            if (number >= 8 && number <= 36) {
                data.editor.updateOptions({ fontSize: number });
            }
        },
    };

    $: !data.loading && data.setTheme(theme);
    $: !data.loading && data.setFontSize(fontSize);
    $: !data.loading && data.setLineNumbers(data.width < 600);

    // Startup
    onMount(async () => {
        // Dynamically import Monaco so it isn't loaded unless needed
        monaco = await import("monaco-editor");

        monaco.editor.defineTheme("black", themeBlack);
        monaco.editor.defineTheme("dark", themeDark);
        monaco.editor.defineTheme("light", themeWhite);
        monaco.editor.defineTheme("white", themeWhite);
        let screenWidth = document.documentElement.offsetWidth;
        data.editor = monaco.editor.create(data.element, {
            value: initValue,
            language: initLanguage,
            theme: theme,
            // theme: "dark",
            // fontSize: "16px",
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

        data.loading = false;
    });
</script>

{#if data.loading}
    <section class="pad">loading editor...</section>
{/if}
<section class="editor" bind:this={data.element} bind:clientWidth={data.width} />

<style>
    .editor {
        height: 100%;
        min-height: 10rem;
    }
</style>
