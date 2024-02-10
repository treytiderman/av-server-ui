<script>
    import Debug_Main from "./Debug_Main.svelte";
    import { stores } from "../../js/store.js";
</script>

<Debug_Main stores={$stores} />
