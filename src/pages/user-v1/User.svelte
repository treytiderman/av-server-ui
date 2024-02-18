<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { user_v1 } from "../../api/api.js";

    // Stores
    import { store as app_volatile_store } from "../../app-volatile-store.js";

    // Components
    import UserMain from "./UserMain.svelte";

    // State
    let isOffline = $app_volatile_store.url.query?.offline === "true";
    let groups = ["admin", "user", "guest"];
    let me = "admin";
    let users = [
        {
            username: "admin",
            groups: ["admin"],
        },
        {
            username: "arlo",
            groups: ["admin", "singer"],
        },
    ];
    let response = "";

    // Startup / Shutdown
    onMount(async () => {
        if (isOffline) return;
        user_v1.users.sub((res) => (users = res));
        user_v1.groups.sub((res) => (groups = res));
        user_v1.whoAmI.sub((res) => {
            if (res.username) me = res.username;
        });
    });
    onDestroy(async () => {
        if (isOffline) return;
        await user_v1.users.unsub();
        await user_v1.groups.unsub();
        await user_v1.whoAmI.unsub();
    });

    // Functions
    async function userCreate(event) {
        const obj = event.detail;
        console.log("userCreate", obj);
        response = await user_v1.user.create(
            obj.username,
            obj.password,
            obj.passwordConfirm,
            obj.groupsCommaSeparated.split(",").map((group) => group.trim()),
        );
    }
    async function userDelete(event) {
        const obj = event.detail;
        console.log("userDelete", obj);
        if (isOffline) return;
        response = await user_v1.user.delete(obj.username);
    }
    async function userAddGroup(event) {
        const obj = event.detail;
        console.log("userAddGroup", obj);
        if (isOffline) return;
        response = await user_v1.user.addGroup(obj.username, obj.group);
    }
    async function userRemoveGroup(event) {
        const obj = event.detail;
        console.log("userRemoveGroup", obj);
        if (isOffline) return;
        response = await user_v1.user.removeGroup(obj.username, obj.group);
    }
    async function userChangePassword(event) {
        const obj = event.detail;
        console.log("userChangePassword", obj);
        if (isOffline) return;
        response = await user_v1.user.changePassword(
            obj.username,
            obj.password,
            obj.passwordConfirm,
        );
    }
    async function groupCreate(event) {
        const obj = event.detail;
        console.log("groupCreate", obj);
        if (isOffline) return;
        response = await user_v1.groups.create(obj.group);
    }
    async function groupDelete(event) {
        const obj = event.detail;
        console.log("groupDelete", obj);
        if (isOffline) return;
        response = await user_v1.groups.delete(obj.group);
    }

    async function resetToDefault(event) {
        const obj = event.detail;
        console.log("resetToDefault", obj);
        if (isOffline) return;
        response = await user_v1.users.reset();
    }
</script>

<div class="page max-width">
    <small class="dim" class:hide={isOffline === false}> Offline </small>
    <UserMain
        {groups}
        {users}
        {me}
        {response}
        on:userCreate={userCreate}
        on:userDelete={userDelete}
        on:userAddGroup={userAddGroup}
        on:userRemoveGroup={userRemoveGroup}
        on:userChangePassword={userChangePassword}
        on:groupCreate={groupCreate}
        on:groupDelete={groupDelete}
        on:resetToDefault={resetToDefault}
    />
</div>
