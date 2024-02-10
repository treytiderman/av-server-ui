<script>
    // Components
    import Layout_Window from "./Layout_Window.svelte";

    // State
    export let isOffline = true
    export let id = 1
    export let type = "tabs"
    export let parentId = 0
    export let childrenIds = []
    export let state = {}
</script>

<Layout_Window {isOffline} {type} />
