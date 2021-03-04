<template>
    <div
        @click="toggle"
        class="navbar-item has-dropdown has-dropdown-with-icons"
        :class="{ 'is-hoverable': isHoverable, 'is-active': isDropdownActive }"
    >
        <a class="navbar-link is-arrowless">
            <slot />
            <b-icon
                :icon="toggleDropdownIcon"
                custom-size="default"
                class="is-hidden-mobile"
            />
        </a>
        <slot name="dropdown" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "NavBarMenu"
})
export default class NavBarMenu extends Vue {
    public isHoverable: boolean = false;
    public isDropdownActive: boolean = false;

    toggle() {
        if (!this.isHoverable) {
            this.isDropdownActive = !this.isDropdownActive;
        }
    }

    // forceClose (e) {
    //     if (!this.$el.contains(e.target)) {
    //         this.isDropdownActive = false
    //     }
    // }

    get toggleDropdownIcon() {
        return this.isDropdownActive ? "chevron-up" : "chevron-down";
    }
}
</script>

<style lang="scss" scoped>
.icon {
    padding-bottom: 2.5rem;
}
@media screen and (max-width: 1023px) {
    nav.navbar .navbar-item.has-dropdown {
        padding-right: 0;
        padding-left: 0;
    }

    nav.navbar .navbar-item.has-divider {
        border-right: 1px solid hsla(0, 0%, 85.9%, 0.25);
    }

    nav.navbar .navbar-menu .navbar-item.has-dropdown > .navbar-link {
        background-color: #f5f5f5;
    }
    nav.navbar .navbar-item.has-dropdown .navbar-link {
        padding-right: 1.125rem;
        padding-left: 1.125rem;
    }

    .navbar-item,
    .navbar-link {
        color: #4a4a4a;
        display: block;
        line-height: 1.5;
        padding: 0.5rem 0.75rem;
        position: relative;
    }

    .navbar-link {
        span.icon {
            margin-top: 5px !important;
            padding-bottom: 0rem !important;
        }
    }
}
</style>
