<template>
    <div class="is-user-avatar">
        <img :src="newUserAvatar" :alt="userName" />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
    name: "UserAvatar"
})
export default class UserAvatar extends Vue {
    public avatar: string = "Avatar";
    public userAvatar: string = "User Avatar";
    public userName: string = "Username Logo";

    get newUserAvatar() {
        // if (this.avatar) {
        //     return this.avatar
        // }
        //
        // if (this.userAvatar) {
        //     return this.userAvatar
        // }
        //
        // let name = 'somename'
        //
        // if (this.userName) {
        //     name = this.userName.replace(/[^a-z0-9]+/i, '')
        // }

        return "/images/users/no-user.png";
    }
}
</script>
