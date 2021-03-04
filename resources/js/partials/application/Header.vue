<template>
    <nav
        v-show="isNavBarVisible"
        id="navbar-main"
        class="navbar is-fixed-top"
        :class="{ sidebarPadding: sideBarData }"
    >
        <div class="navbar-brand">
            <a
                v-show="!sideBarData"
                class="navbar-item topbar is-hidden-desktop"
                @click.prevent="sidePanelToggle"
            >
                <b-icon :icon="menuToggleMobileIcon" />
            </a>
            <div class="navbar-item topbar has-control no-left-space-touch">
                <span v-show="!sideBarData" class="icon is-hidden-custom">
                    <i
                        class="mdi mdi-forwardburger mdi-24px"
                        @click="sidePanelToggle"
                    ></i>
                </span>
                <div class="control">
                    <input class="input" placeholder="Search everywhere..." />
                </div>
            </div>
        </div>
        <div class="navbar-brand is-right">
            <a
                class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
                @click.prevent="menuNavBarToggle"
            >
                <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
            </a>
        </div>
        <div
            class="navbar-menu fadeIn animated faster"
            :class="{ 'is-active': isMenuNavBarActive }"
        >
            <div class="navbar-end">
                <nav-bar-menu class="has-divider">
                    <b-icon icon="menu" custom-size="default" />
                    <span>Menu</span>
                    <div slot="dropdown" class="navbar-dropdown">
                        <router-link
                            to="/profile"
                            class="navbar-item"
                            exact-active-class="is-active"
                        >
                            <b-icon icon="account" custom-size="default" />
                            <span>My Services</span>
                        </router-link>
                    </div>
                </nav-bar-menu>
                <nav-bar-menu
                    class="has-divider has-user-avatar"
                    v-if="userData"
                >
                    <user-avatar />
                    <div class="is-user-name">
                        <span>{{ userData.name }}</span>
                    </div>
                    <div slot="dropdown" class="navbar-dropdown">
                        <router-link
                            to="/application/profile"
                            class="navbar-item"
                            exact-active-class="is-active"
                        >
                            <b-icon icon="account" custom-size="default" />
                            <span>My Profile</span>
                        </router-link>
                        <router-link
                            to="/application/contact"
                            class="navbar-item"
                        >
                            <b-icon icon="map" custom-size="default"></b-icon>
                            <span>Contact Information</span>
                        </router-link>
                        <a class="navbar-item">
                            <b-icon icon="email" custom-size="default"></b-icon>
                            <span>Messages</span>
                        </a>
                    </div>
                </nav-bar-menu>
                <a
                    href="https://justboil.me/bulma-admin-template/one"
                    class="navbar-item has-divider is-desktop-icon-only"
                    title="About"
                >
                    <b-icon icon="help-circle-outline" custom-size="default" />
                    <span>About</span>
                </a>
                <a
                    class="navbar-item is-desktop-icon-only"
                    title="Log out"
                    @click="logout"
                >
                    <b-icon icon="logout" custom-size="default" />
                    <span>Log out</span>
                </a>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NavBarMenu from "@includes/application/navbar/Menu.vue";
import UserAvatar from "@includes/user/Avatar.vue";
import { getModule } from "vuex-module-decorators";
import UsersModule from "@store/users";
import SystemsModule from "@store/system";
import SecureLS from "secure-ls/dist/secure-ls.min.js";

const ls = new SecureLS();
let UsersStore = getModule(UsersModule);
let SystemsStore = getModule(SystemsModule);

@Component({
    name: "ApplicationHeader",
    components: {
        NavBarMenu,
        UserAvatar
    }
})
export default class ApplicationHeader extends Vue {
    public isNavBarVisible: boolean = true;
    public isMenuNavBarActive: boolean = false;
    public isAsideMobileExpanded: boolean = false;

    async mounted() {
        await UsersStore.me();
    }

    sidePanelToggle() {
        SystemsStore.ACTIVATE_SIDEBAR();
    }

    menuToggleMobile() {
        // this.$store.commit('asideMobileStateToggle')
        this.isMenuNavBarActive = !this.isMenuNavBarActive;
    }

    menuNavBarToggle() {
        this.isMenuNavBarActive = !this.isMenuNavBarActive;
    }

    logout() {
        ls.remove("user");

        this.$buefy.snackbar.open({
            message: "Log out clicked",
            queue: false
        });

        this.$router.push({ name: "signin" });
    }

    get menuNavBarToggleIcon() {
        return this.isMenuNavBarActive ? "close" : "dots-vertical";
    }

    get menuToggleMobileIcon() {
        return this.isAsideMobileExpanded ? "backburger" : "forwardburger";
    }

    get userData() {
        return UsersStore.getUser;
    }

    get sideBarData() {
        return SystemsStore.getSideBar;
    }
}
</script>

<style scoped lang="scss">
#navbar-main {
    height: 25px !important;
}
.icon {
    padding-bottom: 2.5rem;
}
.is-user-name {
    margin-left: 15px;
}
.navbar-dropdown .navbar-item {
    height: 30px;
}
.taginput nav.navbar .navbar-item .control .taginput-container.is-focusable,
nav.navbar .navbar-item .control .input,
nav.navbar .navbar-item .control .taginput .taginput-container.is-focusable {
    color: #363636;
    border: 0;
    box-shadow: none;
    background: transparent;
}
</style>
