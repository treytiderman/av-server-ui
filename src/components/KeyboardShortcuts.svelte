<script>
    // Imports
    import { state } from "../js/store_state";
    import { settings } from "../js/store_settings";
    import { numMinMax } from "../js/helper";

    // Functions
    function onKeyDown(event) {
        // console.log(event.key, "ctrlKey", event.ctrlKey, "altKey", event.altKey, "shiftKey", event.shiftKey, "keyCode", event.keyCode)
        $state.keys = {
            key: event.key,
            ctrlKey: event.ctrlKey,
            altKey: event.altKey,
            shiftKey: event.shiftKey,
            keyCode: event.keyCode,
        }
        if (event.ctrlKey && event.key === "=") {
            $settings.fontSize = numMinMax($settings.fontSize += 1, 8, 36)
        }
        else if (event.ctrlKey && event.key === "-") {
            $settings.fontSize = numMinMax($settings.fontSize -= 1, 8, 36)
        }
        else if (event.ctrlKey && event.key === "t") {
            $settings.isAlwaysOnTop = !$settings.isAlwaysOnTop
        }
    }
</script>

<svelte:window on:keydown={onKeyDown} />