<script>
    import CodeMain from "./CodeMain.svelte";
    import { store as settings_persistent_state } from "../settings-v1/settings-persistent-state.js";
</script>

<div class="page">
    <CodeMain
        theme={$settings_persistent_state.theme}
        fontSize={$settings_persistent_state.fontSize}
    />
</div>

<style>
</style>
