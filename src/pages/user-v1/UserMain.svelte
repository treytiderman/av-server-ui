<script>
    // Components
    import UserUsers from "./UserUsers.svelte";
    import UserGroups from "./UserGroups.svelte";
    import UserFunctions from "./UserFunctions.svelte";

    // State - Groups
    export let groups = ["admin", "user", "guest"];

    // State - Users
    export let me = "admin";
    export let users = [
        {
            username: "admin",
            groups: ["admin"],
        },
    ];

    // State - Functions
    export let username = "arlo";
    export let response = "server response here...";
</script>

<div class="wrapper flex top gap">
    <div class="flex column gap grow">
        <div class="section flow">
            <UserGroups {groups} />
        </div>
        <div class="section flow">
            <UserUsers {users} {me} />
        </div>
    </div>

    <!-- Functions -->
    <div class="section flow grow">
        <UserFunctions
            {username}
            on:userCreate
            on:userDelete
            on:userAddGroup
            on:userRemoveGroup
            on:userChangePassword
            on:groupCreate
            on:groupDelete
            on:login
            on:logout
            on:resetToDefault
        />
        <div>{response}</div>
    </div>
</div>

<style>
</style>
