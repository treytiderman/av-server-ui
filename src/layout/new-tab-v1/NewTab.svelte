<script>
    // Imports
    import NewTab from "./NewTab_Main.svelte";

    // State - Main
    let username = "admin";
    let isAdmin = true;

    // Functions
    function tabAdd(event) {
        const name = event.detail;
    }
    function logout() {

    }
</script>

<NewTab {username} {isAdmin} on:logout={logout} on:tabAdd={tabAdd} />
