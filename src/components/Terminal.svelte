<!-- Javascript -->
<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Components
    import { Circle, X } from "lucide-svelte";

    // Exports
    export let showBorders = false;
    export let escapeCRLF = false;
    export let prettyJSON = false;
    export let freezeCol1Col2 = false;
    export let lines = [
        {
            wasReceived: false,
            timestamp: "2022-10-16T21:05:38.425Z",
            data: JSON.stringify({ boolean: true, string: "Yes", number: 200 }, true, 4),
        },
        {
            wasReceived: false,
            timestamp: "2022-10-16T21:05:38.425Z",
            data: JSON.stringify(
                {
                    available: [
                        {
                            directory: "../private/programs/examples",
                            command: "node template.mjs",
                            env: {},
                            files: ["quick-start.mjs", "template.mjs"],
                        },
                        {
                            directory: "../private/programs/other",
                            command: "",
                            env: {},
                            files: [],
                        },
                        {
                            directory: "../private/programs/tests",
                            command: "node test.mjs",
                            env: {
                                key: "value",
                                name: "arlo",
                                port: "23",
                                id: "9",
                            },
                            files: [
                                ".env",
                                "api.mjs",
                                "api2.mjs",
                                "echo.mjs",
                                "env.js",
                                "interval.js",
                                "log.js",
                                "log.py",
                                "tcp.mjs",
                                "test.mjs",
                            ],
                        },
                    ],
                },
                true,
                0,
            ),
        },
        {
            wasReceived: true,
            timestamp: "2022-10-16T21:05:38.447Z",
            data: "OFF\n\r",
        },
        {
            wasReceived: false,
            timestamp: "2022-10-16T21:05:38.425Z",
            data: "\x4f\x46\x46",
            mark: true,
        },
        {
            wasReceived: true,
            timestamp: "2022-10-16T21:05:38.536Z",
            data: "Weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\nWeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!!!",
        },
        {
            wasReceived: true,
            timestamp: "2022-10-16T21:05:38.543Z",
            data: "OK",
        },
    ];

    // Variables
    let sectionElement;
    let sectionElementWidth;

    // Time Column
    $: timeColFormat = sectionElementWidth > 600 ? "time" : "timeShort";
    $: timeColWidth = sectionElementWidth > 600 ? "9rem" : "5rem";
    function timePress() {
        if (timeColFormat === "datetime") {
            timeColFormat = "time";
            timeColWidth = "9rem";
        } else if (timeColFormat === "time") {
            timeColFormat = "timeShort";
            timeColWidth = "5rem";
        } else {
            timeColFormat = "datetime";
            timeColWidth = "16rem";
        }
    }

    // Scroll to the bottom of the Terminal if the scroll bar is at the bottom everytime "lines" updates
    function scrollToBottomOfElement(element) {
        const manualOffset = 100;
        const currentScrollHeight = element?.scrollTop + element?.offsetHeight + manualOffset;
        const totalScrollHeight = element?.scrollHeight;

        // If the scroll bar is near the bottom
        // console.log(currentScrollHeight >= totalScrollHeight, currentScrollHeight, totalScrollHeight);
        if (currentScrollHeight >= totalScrollHeight) {
            setTimeout(() => (element.scrollTop += 100), 2);
        }
    }
    $: if (lines) scrollToBottomOfElement(sectionElement);

    // Fucntions
    function parseData(line) {
        line.parsedData = line.data;

        if (!escapeCRLF && prettyJSON && isJSON(line.data)) {
            line.parsedData = JSON.stringify(JSON.parse(line.parsedData), true, 4);
        }
        if (escapeCRLF) {
            line.parsedData = String(line.parsedData).replace(/\r/g, "\\r");
            line.parsedData = String(line.parsedData).replace(/\n/g, "\\n");
        }
        return line.parsedData;
    }
    function isJSON(text) {
        try {
            JSON.parse(text);
        } catch (error) {
            return false;
        }
        return true;
    }
</script>

<!-- HTML -->
<section
    class:borders={showBorders}
    class:freeze-col1-col2={freezeCol1Col2}
    style="--col2-width: {timeColWidth};"
    bind:this={sectionElement}
    bind:offsetWidth={sectionElementWidth}
>
    <!-- Header -->
    <div class="header">
        <div class="row">
            <div class="col1"></div>
            <div class="col2">
                <button on:click={timePress}>
                    {timeColFormat === "datetime" ? "Date Time" : "Time"}
                </button>
            </div>
            <div class="col3">
                <div>
                    Sent
                    <X size=".8rem" strokeWidth="3" color="var(--color-text-orange)" />
                    / Received
                    <Circle size=".7rem" strokeWidth="3" color="var(--color-text-blue)" />
                </div>
            </div>
        </div>
    </div>

    <!-- Log -->
    <div class="log">
        {#each lines as line}
            <div class="row" class:mark={line.mark}>
                <!-- Col1 -->
                <div class="col1">
                    <button on:click={() => dispatch("lineClick", line)}>
                        <div>
                            {#if line.wasReceived}
                                <Circle size=".7rem" strokeWidth="3" color="var(--color-text-blue)" />
                            {:else}
                                <X size=".8rem" strokeWidth="3" color="var(--color-text-orange)" />
                            {/if}
                        </div>
                    </button>
                </div>

                <!-- Col2 -->
                <div class="col2">
                    <div>
                        {#if timeColFormat === "datetime"}
                            <span>
                                {line.timestamp ? line.timestamp.split("T")[0] : ""}
                            </span>
                            <span>
                                {line.timestamp ? line.timestamp.split("T")[1].split("Z")[0] : ""}
                            </span>
                        {:else if timeColFormat === "time"}
                            <span>
                                {line.timestamp ? line.timestamp.split("T")[1].split("Z")[0] : ""}
                            </span>
                        {:else}
                            <span>
                                {line.timestamp ? line.timestamp.split("T")[1].slice(3).split(".")[0] : ""}
                            </span>
                        {/if}
                    </div>
                </div>

                <!-- Col3 -->
                <div class="col3">
                    <div>
                        <pre>{parseData(line)}</pre>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</section>

<!-- CSS -->
<style>
    /*

section
- header
    - div .row
        - div .col1
        - div .col2
            - button
        - div .col3
            - span
- log
    - div .row
        - div .col1
            - button
        - div .col2
            - span
        - div .col3
            - pre

*/

    /* Elements */
    section {
        width: 100%;
        height: 100%;
        display: grid;
        align-content: start;
        font-family: var(--font-family-mono);
        overflow: auto;
    }

    button {
        border: none;
        border-radius: 0;
        background-color: transparent;
        text-align: left;
        padding: 0;
    }

    /* Columns */
    .col1 {
        min-width: 2.4rem;
        width: 2.4rem;
        max-width: 2.4rem;
        background-color: var(--color-bg-section);
    }
    .col2 {
        min-width: var(--col2-width);
        width: var(--col2-width);
        max-width: var(--col2-width);
        background-color: var(--color-bg-section);
    }
    .col3 {
        width: 100%;
        background-color: var(--color-bg-section);
    }

    /* Header */
    .header {
        position: sticky;
        top: 0;
        z-index: 1;
    }
    .header .row {
        display: flex;
        border-bottom: var(--border);
    }
    .header .col2 button {
        height: 2rem;
        width: 100%;
        background-color: var(--color-bg-section);
        padding: 0 var(--pad-x);
    }
    .header .col3 div {
        height: 2rem;
        display: flex;
        align-items: center;
        gap: var(--gap-sm);
        padding: 0 var(--pad-x);
    }

    /* Log */
    .log {
        flex-grow: 1;
        display: grid;
        align-content: flex-start;
    }
    .log .row {
        display: flex;
    }
    .log .row:hover,
    .log .row:active,
    .log .row:focus {
        background-color: var(--color-bg-section);
        filter: var(--filter-brightness-hover);
    }
    .log .col1 button {
        width: 100%;
        height: 100%;
        display: flex;
    }
    .log .col1 button div {
        width: 100%;
        height: 1.8rem;
        display: grid;
        place-items: center;
    }
    .log .col2 div {
        height: 100%;
        display: flex;
        padding: 0 var(--pad-x);
        gap: var(--gap);
    }
    .log .col2 div span {
        height: 1.8rem;
        display: grid;
        place-items: center;
    }
    .log .col3 div {
        height: 100%;
        display: flex;
        /* align-items: start; */
        padding: 0 var(--pad-x);
        gap: var(--gap-sm);
    }
    .log .col3 div pre {
        display: grid;
        place-items: center;
    }

    /* Freeze First and Second columns */
    .freeze-col1-col2 .col1 {
        position: sticky;
        left: 0;
        background-color: var(--color-bg-section);
    }
    .freeze-col1-col2 .col2 {
        position: sticky;
        left: 2.4rem;
        background-color: var(--color-bg-section);
    }

    /* Borders */
    .borders .col1 {
        border-right: var(--border);
        border-bottom: var(--border);
    }
    .borders .col2 {
        border-right: var(--border);
        border-bottom: var(--border);
    }
    .borders .col3 {
        border-bottom: var(--border);
    }
    .borders .header .row {
        border: none;
    }

    /* Marked Row */
    .log .mark .col1,
    .log .mark .col2,
    .log .mark .col3 {
        color: var(--color-text-purple);
        background-color: var(--color-bg-purple);
    }
</style>
