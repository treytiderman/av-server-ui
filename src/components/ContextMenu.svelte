<script>
    // Event Dispatcher
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Functions
    function checkBounds() {
        const browser = { w: window.innerWidth, h: window.innerHeight };
        if (browser.h - menu.position.y < menu.size.h) menu.position.y -= menu.size.h;
        if (browser.w - menu.position.x < menu.size.w) menu.position.x -= menu.size.w;
    }
    function getContextMenuDimensions(node) {
        menu.size.h = node.offsetHeight;
        menu.size.w = node.offsetWidth;
        checkBounds();
    }
    function focus(element, bool) {
        if (bool) element.focus();
    }

    // Variables
    export let menu = {
        show: false,
        position: { x: 0, y: 0 },
        size: { h: 0, w: 0 },
        showAtEvent: (event) => {
            if (event.pointerId === -1) {
                console.log("showAtEvent", event);
                console.log("target", event.target.getBoundingClientRect());
                const buttonPosition = event.target.getBoundingClientRect();
                menu.position = { x: buttonPosition.x, y: buttonPosition.y + buttonPosition.height };
            }
            else {
                menu.position = { x: event.clientX, y: event.clientY };
            }
            checkBounds();
            setTimeout(() => menu.show = true, 10);
        },
        showAtXY: (x, y) => {
            menu.position = { x: x, y: y };
            checkBounds();
            setTimeout(() => menu.show = true, 10);
        },
        hide: () => {
            menu.show = false;
        },
    };
    export let items = [
        {
            button: "Test Item",
            icon: "fa-solid fa-plus",
            // iconComponent: ExampleComponent
            onClick: () => {},
        },
        {
            hr: true,
        },
        {
            button: "Filter",
            icon: "fa-solid fa-filter",
            onClick: () => {},
        },
        {
            inputValue: "",
            inputPlaceholder: "filter...",
            onInput: () => {},
        },
        {
            button: "hr",
        },
        {
            button: "Test Item",
            icon: "fa-solid fa-plus",
            onClick: () => {},
        },
    ]
    export let data = ""

</script>

<svelte:window
    on:click={(e) => {
        if (e.target.id !== "dontHide") {
            dispatch("any_click")
        }
    }}
    on:contextmenu={() => {
        dispatch("any_contextmenu")
    }}
/>

{#if menu?.show}
    <nav
        use:getContextMenuDimensions
        style="top:{menu.position.y}px; left:{menu.position.x}px; z-index: 99"
    >
        <div class="navbar shadow" id="dontHide">
            {#each items as item, index}
                {#if item.hide === true}
                    <hr hidden/>
                {:else if item.hr}
                    <hr/>
                {:else if item.button}
                    <button
                        use:focus={index === 0}
                        class="flex nowrap gap-sm"
                        on:click={item.onClick(data)}
                    >
                        {#if item.iconComponent}
                            <svelte:component this={item.iconComponent} size=1.2rem strokeWidth=2.5/>
                        {:else}
                            <i class={item.icon}/>
                        {/if}
                        <span>{item.button}</span>
                    </button>
                {:else if item.inputValue || item.inputPlaceholder}
                    <input
                        id="dontHide"
                        type="text"
                        value={item.inputValue}
                        placeholder={item.inputPlaceholder}
                        on:input={item.onInput}
                    >
                {/if}
            {/each}
        </div>
    </nav>
{/if}

<style>
    nav {
        position: fixed;
    }
    .navbar {
        display: flex;
        /* gap: var(--gap-xs); */
        min-width: 15rem;
        overflow: hidden;
        background-color: var(--color-bg-section);
        border-radius: var(--border-radius);
        border: var(--border);
        flex-direction: column;
        padding: var(--gap-xs);
    }
    .shadow {
        box-shadow: 0px 0px 1rem 0px #00000055, 0px 0px .5rem 0px #00000055;
    }
    button {
        text-align: left;
        border: none;
        padding: var(--gap-sm);
    }
    hr {
        background-color: var(--color-border-grey);
        margin: var(--gap-sm);
    }
</style>
