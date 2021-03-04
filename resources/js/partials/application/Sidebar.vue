<template>
    <aside
        ref="componentOne"
        v-show="sideBarData"
        class="aside is-placed-left is-expanded"
        style="display: block"
    >
        <SideMenuTools :is-main-menu="true">
            <span slot="label">
                <b>Your</b>Line
                <i
                    data-v-60afd6db=""
                    class="mdi mdi-backburger mdi-24px white is-pulled-left"
                    @click="sidePanelToggle"
                ></i>
            </span>
        </SideMenuTools>

        <div class="menu is-menu-main">
            <template v-for="(menuGroup, index) in menu">
                <p
                    class="menu-label"
                    v-if="typeof menuGroup === 'string'"
                    :key="index"
                >
                    {{ menuGroup }}
                </p>
                <AsideMenuList
                    v-else
                    :key="index"
                    @menu-click="menuClick"
                    :menu="menuGroup"
                    :isSubmenuList="false"
                />
            </template>
        </div>
    </aside>

</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import SideMenuTools from "@includes/application/sidebar/MenuTools.vue";
import AsideMenuList from "@templates/application/menu/List.vue";
import {getModule} from "vuex-module-decorators";
import SystemsModule from "@store/system";

let SystemsStore = getModule(SystemsModule);

@Component({
    name: "Sidebar",
    components: {
        SideMenuTools,
        AsideMenuList
    }
})
export default class Sidebar extends Vue {
    @Prop({type: Array})
    public menu!: [];

    sidePanelToggle() {
        SystemsStore.ACTIVATE_SIDEBAR();
    }

    menuClick() {
        // this.$emit('menu-click', this.item)
        //
        // if (this.hasDropdown) {
        //     this.isDropdownActive = (!this.isDropdownActive)
        // }
    }

    get sideBarData() {
        return SystemsStore.getSideBar;
    }
}
</script>

<style>
.white {
    color: #ffffff !important;
    margin-right: 20px;
}
</style>
