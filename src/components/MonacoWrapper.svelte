<script>
    import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
    import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
    import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
    import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
    import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
    import { onMount } from "svelte";
    import { persistent as state } from "../js/global-persistent-store.js";
    
    // Changed to dynamic import in onMount
    // import * as monaco from "monaco-editor";
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
            monaco.editor.setTheme(theme || "dark")
        },
        setFontSize: (number) => {
            if (number >= 8 && number <= 36) {
                data.editor.updateOptions({ fontSize: number })
            }
        }
    }
    const themeBlack = {
        base: "vs-dark",
        inherit: true,
        rules: [
            {
                background: "24292e",
                token: "",
            },
            {
                foreground: "6e7687",
                token: "comment",
            },
            {
                foreground: "6e7687",
                token: "punctuation.definition.comment",
            },
            {
                foreground: "6e7687",
                token: "string.comment",
            },
            {
                foreground: "c8e1ff",
                token: "constant",
            },
            {
                foreground: "c8e1ff",
                token: "entity.name.constant",
            },
            {
                foreground: "c8e1ff",
                token: "variable.other.constant",
            },
            {
                foreground: "c8e1ff",
                token: "variable.language",
            },
            {
                foreground: "b392f0",
                token: "entity",
            },
            {
                foreground: "b392f0",
                token: "entity.name",
            },
            {
                foreground: "b392f0",
                token: "variable.parameter.function",
            },
            {
                foreground: "7bcc72",
                token: "entity.name.tag",
            },
            {
                foreground: "f97583",
                token: "keyword",
            },
            {
                foreground: "f97583",
                token: "storage",
            },
            {
                foreground: "f97583",
                token: "storage.type",
            },
            {
                foreground: "b392f0",
                token: "storage.modifier.package",
            },
            {
                foreground: "b392f0",
                token: "storage.modifier.import",
            },
            {
                foreground: "b392f0",
                token: "storage.type.java",
            },
            {
                foreground: "9ecbff",
                token: "string",
            },
            {
                foreground: "9ecbff",
                token: "punctuation.definition.string",
            },
            {
                foreground: "9ecbff",
                token: "string punctuation.section.embedded source",
            },
            {
                foreground: "c8e1ff",
                token: "support",
            },
            {
                foreground: "c8e1ff",
                token: "meta.property-name",
            },
            {
                foreground: "fb8532",
                token: "variable",
            },
            {
                foreground: "b392f0",
                token: "variable.other",
            },
            {
                foreground: "d73a49",
                fontStyle: "bold italic underline",
                token: "invalid.broken",
            },
            {
                foreground: "d73a49",
                fontStyle: "bold italic underline",
                token: "invalid.deprecated",
            },
            {
                foreground: "fafbfc",
                background: "d73a49",
                fontStyle: "italic underline",
                token: "invalid.illegal",
            },
            {
                foreground: "fafbfc",
                background: "d73a49",
                fontStyle: "italic underline",
                token: "carriage-return",
            },
            {
                foreground: "d73a49",
                fontStyle: "bold italic underline",
                token: "invalid.unimplemented",
            },
            {
                foreground: "d73a49",
                token: "message.error",
            },
            {
                foreground: "b392f0",
                token: "string source",
            },
            {
                foreground: "c8e1ff",
                token: "string variable",
            },
            {
                foreground: "9ecbff",
                token: "source.regexp",
            },
            {
                foreground: "9ecbff",
                token: "string.regexp",
            },
            {
                foreground: "9ecbff",
                token: "string.regexp.character-class",
            },
            {
                foreground: "9ecbff",
                token: "string.regexp constant.character.escape",
            },
            {
                foreground: "9ecbff",
                token: "string.regexp source.ruby.embedded",
            },
            {
                foreground: "9ecbff",
                token: "string.regexp string.regexp.arbitrary-repitition",
            },
            {
                foreground: "7bcc72",
                fontStyle: "bold",
                token: "string.regexp constant.character.escape",
            },
            {
                foreground: "c8e1ff",
                token: "support.constant",
            },
            {
                foreground: "c8e1ff",
                token: "support.variable",
            },
            {
                foreground: "c8e1ff",
                token: "meta.module-reference",
            },
            {
                foreground: "fb8532",
                token: "markup.list",
            },
            {
                foreground: "0366d6",
                fontStyle: "bold",
                token: "markup.heading",
            },
            {
                foreground: "0366d6",
                fontStyle: "bold",
                token: "markup.heading entity.name",
            },
            {
                foreground: "c8e1ff",
                token: "markup.quote",
            },
            {
                foreground: "b392f0",
                fontStyle: "italic",
                token: "markup.italic",
            },
            {
                foreground: "b392f0",
                fontStyle: "bold",
                token: "markup.bold",
            },
            {
                foreground: "c8e1ff",
                token: "markup.raw",
            },
            {
                foreground: "b31d28",
                background: "ffeef0",
                token: "markup.deleted",
            },
            {
                foreground: "b31d28",
                background: "ffeef0",
                token: "meta.diff.header.from-file",
            },
            {
                foreground: "b31d28",
                background: "ffeef0",
                token: "punctuation.definition.deleted",
            },
            {
                foreground: "176f2c",
                background: "f0fff4",
                token: "markup.inserted",
            },
            {
                foreground: "176f2c",
                background: "f0fff4",
                token: "meta.diff.header.to-file",
            },
            {
                foreground: "176f2c",
                background: "f0fff4",
                token: "punctuation.definition.inserted",
            },
            {
                foreground: "b08800",
                background: "fffdef",
                token: "markup.changed",
            },
            {
                foreground: "b08800",
                background: "fffdef",
                token: "punctuation.definition.changed",
            },
            {
                foreground: "2f363d",
                background: "6e7687",
                token: "markup.ignored",
            },
            {
                foreground: "2f363d",
                background: "6e7687",
                token: "markup.untracked",
            },
            {
                foreground: "b392f0",
                fontStyle: "bold",
                token: "meta.diff.range",
            },
            {
                foreground: "c8e1ff",
                token: "meta.diff.header",
            },
            {
                foreground: "0366d6",
                fontStyle: "bold",
                token: "meta.separator",
            },
            {
                foreground: "0366d6",
                token: "meta.output",
            },
            {
                foreground: "ffeef0",
                token: "brackethighlighter.tag",
            },
            {
                foreground: "ffeef0",
                token: "brackethighlighter.curly",
            },
            {
                foreground: "ffeef0",
                token: "brackethighlighter.round",
            },
            {
                foreground: "ffeef0",
                token: "brackethighlighter.square",
            },
            {
                foreground: "ffeef0",
                token: "brackethighlighter.angle",
            },
            {
                foreground: "ffeef0",
                token: "brackethighlighter.quote",
            },
            {
                foreground: "d73a49",
                token: "brackethighlighter.unmatched",
            },
            {
                foreground: "d73a49",
                token: "sublimelinter.mark.error",
            },
            {
                foreground: "fb8532",
                token: "sublimelinter.mark.warning",
            },
            {
                foreground: "6a737d",
                token: "sublimelinter.gutter-mark",
            },
            {
                foreground: "9ecbff",
                fontStyle: "underline",
                token: "constant.other.reference.link",
            },
            {
                foreground: "9ecbff",
                fontStyle: "underline",
                token: "string.other.link",
            },
        ],
        colors: {
            "editor.foreground": "#b392f0",
            "editor.background": "#000000",
            "editor.selectionBackground": "#30343b",
            "editor.inactiveSelectionBackground": "#30343b",
            "editor.lineHighlightBackground": "#17191c",
            "editorCursor.foreground": "#ffffff",
            "editorWhitespace.foreground": "#6a737d",
            "editorIndentGuide.background": "#6a737d",
            "editorIndentGuide.activeBackground": "#b392f0",
            "editor.selectionHighlightBorder": "#30343b",
        },
    };
    const themeDark = {
        base: "vs-dark",
        inherit: true,
        rules: [
            {
                background: "24292e",
                token: "",
            },
            {
                foreground: "6e7687",
                token: "comment",
            },
            {
                foreground: "6e7687",
                token: "punctuation.definition.comment",
            },
            {
                foreground: "6e7687",
                token: "string.comment",
            },
            {
                foreground: "c8e1ff",
                token: "constant",
            },
            {
                foreground: "c8e1ff",
                token: "entity.name.constant",
            },
            {
                foreground: "c8e1ff",
                token: "variable.other.constant",
            },
            {
                foreground: "c8e1ff",
                token: "variable.language",
            },
            {
                foreground: "b392f0",
                token: "entity",
            },
            {
                foreground: "b392f0",
                token: "entity.name",
            },
            {
                foreground: "b392f0",
                token: "variable.parameter.function",
            },
            {
                foreground: "7bcc72",
                token: "entity.name.tag",
            },
            {
                foreground: "f97583",
                token: "keyword",
            },
            {
                foreground: "f97583",
                token: "storage",
            },
            {
                foreground: "f97583",
                token: "storage.type",
            },
            {
                foreground: "b392f0",
                token: "storage.modifier.package",
            },
            {
                foreground: "b392f0",
                token: "storage.modifier.import",
            },
            {
                foreground: "b392f0",
                token: "storage.type.java",
            },
            {
                foreground: "9ecbff",
                token: "string",
            },
            {
                foreground: "9ecbff",
                token: "punctuation.definition.string",
            },
            {
                foreground: "9ecbff",
                token: "string punctuation.section.embedded source",
            },
            {
                foreground: "c8e1ff",
                token: "support",
            },
            {
                foreground: "c8e1ff",
                token: "meta.property-name",
            },
            {
                foreground: "fb8532",
                token: "variable",
            },
            {
                foreground: "b392f0",
                token: "variable.other",
            },
            {
                foreground: "d73a49",
                fontStyle: "bold italic underline",
                token: "invalid.broken",
            },
            {
                foreground: "d73a49",
                fontStyle: "bold italic underline",
                token: "invalid.deprecated",
            },
            {
                foreground: "fafbfc",
                background: "d73a49",
                fontStyle: "italic underline",
                token: "invalid.illegal",
            },
            {
                foreground: "fafbfc",
                background: "d73a49",
                fontStyle: "italic underline",
                token: "carriage-return",
            },
            {
                foreground: "d73a49",
                fontStyle: "bold italic underline",
                token: "invalid.unimplemented",
            },
            {
                foreground: "d73a49",
                token: "message.error",
            },
            {
                foreground: "b392f0",
                token: "string source",
            },
            {
                foreground: "c8e1ff",
                token: "string variable",
            },
            {
                foreground: "9ecbff",
                token: "source.regexp",
            },
            {
                foreground: "9ecbff",
                token: "string.regexp",
            },
            {
                foreground: "9ecbff",
                token: "string.regexp.character-class",
            },
            {
                foreground: "9ecbff",
                token: "string.regexp constant.character.escape",
            },
            {
                foreground: "9ecbff",
                token: "string.regexp source.ruby.embedded",
            },
            {
                foreground: "9ecbff",
                token: "string.regexp string.regexp.arbitrary-repitition",
            },
            {
                foreground: "7bcc72",
                fontStyle: "bold",
                token: "string.regexp constant.character.escape",
            },
            {
                foreground: "c8e1ff",
                token: "support.constant",
            },
            {
                foreground: "c8e1ff",
                token: "support.variable",
            },
            {
                foreground: "c8e1ff",
                token: "meta.module-reference",
            },
            {
                foreground: "fb8532",
                token: "markup.list",
            },
            {
                foreground: "0366d6",
                fontStyle: "bold",
                token: "markup.heading",
            },
            {
                foreground: "0366d6",
                fontStyle: "bold",
                token: "markup.heading entity.name",
            },
            {
                foreground: "c8e1ff",
                token: "markup.quote",
            },
            {
                foreground: "b392f0",
                fontStyle: "italic",
                token: "markup.italic",
            },
            {
                foreground: "b392f0",
                fontStyle: "bold",
                token: "markup.bold",
            },
            {
                foreground: "c8e1ff",
                token: "markup.raw",
            },
            {
                foreground: "b31d28",
                background: "ffeef0",
                token: "markup.deleted",
            },
            {
                foreground: "b31d28",
                background: "ffeef0",
                token: "meta.diff.header.from-file",
            },
            {
                foreground: "b31d28",
                background: "ffeef0",
                token: "punctuation.definition.deleted",
            },
            {
                foreground: "176f2c",
                background: "f0fff4",
                token: "markup.inserted",
            },
            {
                foreground: "176f2c",
                background: "f0fff4",
                token: "meta.diff.header.to-file",
            },
            {
                foreground: "176f2c",
                background: "f0fff4",
                token: "punctuation.definition.inserted",
            },
            {
                foreground: "b08800",
                background: "fffdef",
                token: "markup.changed",
            },
            {
                foreground: "b08800",
                background: "fffdef",
                token: "punctuation.definition.changed",
            },
            {
                foreground: "2f363d",
                background: "6e7687",
                token: "markup.ignored",
            },
            {
                foreground: "2f363d",
                background: "6e7687",
                token: "markup.untracked",
            },
            {
                foreground: "b392f0",
                fontStyle: "bold",
                token: "meta.diff.range",
            },
            {
                foreground: "c8e1ff",
                token: "meta.diff.header",
            },
            {
                foreground: "0366d6",
                fontStyle: "bold",
                token: "meta.separator",
            },
            {
                foreground: "0366d6",
                token: "meta.output",
            },
            {
                foreground: "ffeef0",
                token: "brackethighlighter.tag",
            },
            {
                foreground: "ffeef0",
                token: "brackethighlighter.curly",
            },
            {
                foreground: "ffeef0",
                token: "brackethighlighter.round",
            },
            {
                foreground: "ffeef0",
                token: "brackethighlighter.square",
            },
            {
                foreground: "ffeef0",
                token: "brackethighlighter.angle",
            },
            {
                foreground: "ffeef0",
                token: "brackethighlighter.quote",
            },
            {
                foreground: "d73a49",
                token: "brackethighlighter.unmatched",
            },
            {
                foreground: "d73a49",
                token: "sublimelinter.mark.error",
            },
            {
                foreground: "fb8532",
                token: "sublimelinter.mark.warning",
            },
            {
                foreground: "6a737d",
                token: "sublimelinter.gutter-mark",
            },
            {
                foreground: "9ecbff",
                fontStyle: "underline",
                token: "constant.other.reference.link",
            },
            {
                foreground: "9ecbff",
                fontStyle: "underline",
                token: "string.other.link",
            },
        ],
        colors: {
            "editor.foreground": "#b392f0",
            "editor.background": "#1c1e22",
            "editor.selectionBackground": "#30343b",
            "editor.inactiveSelectionBackground": "#30343b",
            "editor.lineHighlightBackground": "#25272d",
            "editorCursor.foreground": "#ffffff",
            "editorWhitespace.foreground": "#6a737d",
            "editorIndentGuide.background": "#6a737d",
            "editorIndentGuide.activeBackground": "#b392f0",
            "editor.selectionHighlightBorder": "#30343b",
        },
    };
    // f9fafa
    // f4f4f6
    // dddfe3
    // 2e3138
    const themeWhite = {
        base: "vs",
        inherit: true,
        rules: [
            {
                background: "24292e",
                token: "",
            },
        ],
        colors: {
            "editor.background": "#f9fafa", // #25272d
            "editor.selectionBackground": "#edeff4",
            "editor.inactiveSelectionBackground": "#edeff4",
            "editor.lineHighlightBackground": "#edeff4",
            "editorCursor.foreground": "#000000",
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
        let fontSize = document.documentElement.style.getPropertyValue("--font-size")
        fontSize = fontSize.replace("px", "") - 0
        data.editor = monaco.editor.create(data.element, {
            value: initValue,
            language: initLanguage,
            theme: $state.theme,
            fontSize: fontSize + "px",
            automaticLayout: true,
            minimap: {
                enabled: false,
            },
        });
        if (screenWidth < 600) {data.editor.getModel().updateOptions({ tabSize: 2 })}
        else {data.editor.getModel().updateOptions({ tabSize: 4 });}
        
        // Update theme
        state.subscribe(stateUpdate => {
            data.setTheme(stateUpdate.theme)
            data.setFontSize(stateUpdate.fontSize)
        })

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
