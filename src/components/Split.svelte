<script>
    import { onMount } from "svelte";
    import { throttle, debounce } from "../modules/helper";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Exports
    export let showSize = true;
    export let showSizeInPx = false;
    export let isVertical = false;
    export let isResizable = false;
    export let oneInit_percent = 50;
    export let divider_px = 2;
    export let step_percent = 1;

    // Variables
    let bindContainerWidth;
    let bindContainerHeight;

    let one_percent;
    let two_percent;

    let containerWidth_px;
    let containerHeight_px;
    let oneWidth_px;
    let oneHeight_px;
    let oneWidthLast_px;
    let oneHeightLast_px;
    let twoWidth_px;
    let twoHeight_px;
    let dividerWidth;
    let dividerHeight;

    let throttleTime_ms = 10;
    let isPointerdown = false;
    let everPointerdown = false;
    let pointerdownPosition_px;
    let mouseOffset_px;

    // Startup
    onMount(() => setInit());

    // Dynamic
    $: dividerWidth = isVertical ? "100%" : divider_px + "px";
    $: dividerHeight = isVertical ? divider_px + "px" : "100%";

    $: containerWidth_px = isVertical
        ? bindContainerWidth
        : bindContainerWidth - divider_px;
    $: containerHeight_px = isVertical
        ? bindContainerHeight - divider_px
        : bindContainerHeight;

    $: one_percent = Math.ceil(one_percent / step_percent) * step_percent;
    $: two_percent = 100 - one_percent;

    $: oneWidth_px = isVertical
        ? containerWidth_px
        : containerWidth_px * (one_percent / 100);
    $: oneWidth_px = Math.ceil(oneWidth_px / step_percent) * step_percent;
    $: twoWidth_px = isVertical
        ? containerWidth_px
        : containerWidth_px - oneWidth_px;

    $: oneHeight_px = isVertical
        ? containerHeight_px * (one_percent / 100)
        : containerHeight_px;
    $: oneHeight_px = Math.ceil(oneHeight_px / step_percent) * step_percent;
    $: twoHeight_px = isVertical
        ? containerHeight_px - oneHeight_px
        : containerHeight_px;

    // Functions
    function setInit() {
        one_percent = oneInit_percent;
    }
    function pointerdown(event) {
        isPointerdown = true;
        everPointerdown = true;

        mouseOffset_px = 0;
        oneWidthLast_px = oneWidth_px;
        oneHeightLast_px = oneHeight_px;

        if (isVertical) pointerdownPosition_px = event.clientY;
        else pointerdownPosition_px = event.clientX;

        // console.log("pointerdownPosition_px", Math.ceil(pointerdownPosition_px));
    }
    function pointermove(event) {
        if (isPointerdown === false) return;
        pointermoveThrottle(event);
    }
    const pointermoveThrottle = throttle(event => {
        if (isVertical) {
            mouseOffset_px = event.clientY - pointerdownPosition_px;
            one_percent = (100 * (oneHeightLast_px + mouseOffset_px)) / containerHeight_px;
        } else {
            mouseOffset_px = event.clientX - pointerdownPosition_px;
            one_percent = (100 * (oneWidthLast_px + mouseOffset_px)) / containerWidth_px;
        }
        one_percent = Math.ceil(one_percent / step_percent) * step_percent;
        dispatch("resize", one_percent)
        // console.log("mouseOffset_px", Math.ceil(mouseOffset_px));
    }, throttleTime_ms);
    function pointerup() {
        pointerupDebounce();
    }
    const pointerupDebounce = debounce(event => {
        isPointerdown = false;
    }, throttleTime_ms);
    function resetPosition() {
        one_percent = 50
        dispatch("resize", one_percent)
    }
</script>

<div
    class="container"
    class:isVertical
    bind:clientWidth={bindContainerWidth}
    bind:clientHeight={bindContainerHeight}
    on:pointerup={pointerup}
    on:pointerleave={pointerup}
    on:pointermove={pointermove}
>
    <!-- One -->
    <div
        class="one"
        class:pointerdown={showSize && isPointerdown}
        style="width: {oneWidth_px}px; height: {oneHeight_px}px;"
    >
        <span>
            {#if showSizeInPx}
                {oneWidth_px}x{oneHeight_px}
            {:else}
                {one_percent}%
            {/if}
        </span>
        <slot name="one" />
    </div>

    <!-- Divider -->
    {#if isResizable}
        <button
            class="divider"
            style="width: {dividerWidth}; height: {dividerHeight};"
            on:pointerdown={pointerdown}
            on:dblclick={resetPosition}
        />
    {:else}
        <div
            class="divider"
            style="width: {dividerWidth}; height: {dividerHeight};"
        />
    {/if}

    <!-- Two -->
    <div 
        class="two"
        class:pointerdown={showSize && isPointerdown}
        style="width: {twoWidth_px}px; height: {twoHeight_px}px;"
    >
        <span>
            {#if showSizeInPx}
                {twoWidth_px}x{twoHeight_px}
            {:else}
                {two_percent}%
            {/if}
        </span>
        <slot name="two" />
    </div>
</div>

<style>
    div.container {
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
    }

    div.one,
    div.two {
        height: 100%;
        overflow: auto;
        position: relative;
    }

    /* Divider */
    .divider {
        background-color: var(--color-text-0);
        background-color: var(--color-border);
        border: none;
        border-radius: 0;
        padding: 0;
        margin: 0;
    }
    button.divider {
        z-index: 2;
        cursor: ew-resize;
    }
    button.divider::after {
        content: "";
        z-index: 2;
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: -1px;
        width: 4px;
    }

    .isVertical > button.divider {
        z-index: 2;
        cursor: ns-resize;
    }
    .isVertical > button.divider::after {
        content: "";
        z-index: 2;
        width: 100%;
        position: absolute;
        left: 0px;
        right: 0px;
        top: -1px;
        height: 4px;
    }

    button.divider:hover::after {
        background-color: var(--color-text-0);
        background-color: var(--color-border);
    }
    button.divider:active::after {
        opacity: 0;
    }
    button.divider:active {
        cursor: auto;
    }

    /* isVertical */
    .isVertical {
        flex-direction: column;
    }

    /* Size overlay */
    span {
        display: none;

        z-index: 2;
        position: absolute;
        top: 0;
        right: 0;

        /* font-size: 0.75rem; */
        font-weight: bold;

        margin: var(--gap);
        padding: var(--gap-xs) var(--gap-sm);

        color: var(--color-text-purple);
        background-color: var(--color-bg-purple);

        border: var(--border);
        border-color: var(--color-border-purple);
        border-radius: var(--border-radius);
    }

    /* Pointerdown */
    .pointerdown > span {
        display: block;
    }
    .one.pointerdown > span {
        color: var(--color-text-blue);
        background-color: var(--color-bg-blue);
        border-color: var(--color-border-blue);
    }
    .two.pointerdown > span {
        color: var(--color-text-orange);
        background-color: var(--color-bg-orange);
        border-color: var(--color-border-orange);
    }
    div.one.pointerdown::after,
    div.two.pointerdown::after {
        content: "";
        z-index: 1;
        position: absolute;
        inset: 0;

        padding: var(--gap);

        font-weight: bold;
        font-size: 2rem;

    }
    div.one.pointerdown::after {
        content: "";
        background-color: color-mix(in srgb, var(--color-bg-blue), transparent 90%);
        outline: 2px solid var(--color-border-blue);
        outline-offset: -2px;
    }
    div.two.pointerdown::after {
        content: "";
        background-color: color-mix(in srgb, var(--color-bg-orange), transparent 90%);
        outline: 2px solid var(--color-border-orange);
        outline-offset: -2px;
        
    }
</style>
