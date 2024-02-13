<script>
    // Components
    import Layout_Window from "./Layout_Window.svelte";

    // State
    export let isOffline = true
    let id = 1
    let type = "split"
    let parentId = 0
    let childrenIds = []
    let state = {}
</script>

<Layout_Window {type} />
