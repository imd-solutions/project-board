<template>
    <li :class="{ 'is-active': isDropdownActive }">
        <component
            :is="componentIs"
            :to="itemTo"
            :href="itemHref"
            @click="menuClick"
            exact-active-class="is-active"
            :class="{
                'has-icon': !!item.icon,
                'has-dropdown-icon': hasDropdown
            }"
        >
            <b-icon
                v-if="item.icon"
                :icon="item.icon"
                :class="{ 'has-update-mark': item.updateMark }"
                custom-size="default"
            />
            <span
                v-if="item.label"
                :class="{ 'menu-item-label': !!item.icon }"
                >{{ item.label }}</span
            >
            <div v-if="hasDropdown" class="dropdown-icon">
                <b-icon :icon="dropdownIcon" custom-size="default" />
            </div>
        </component>
        <AsideMenuList
            v-if="hasDropdown"
            :menu="item.menu"
            :isSubmenuList="true"
        />
    </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    name: "AsideMenuItem",
    components: {
        AsideMenuList: () => import("./List.vue")
    }
})
export default class AsideMenuItem extends Vue {
    @Prop({ type: Object })
    public item!: any;

    public isDropdownActive: boolean = true;

    menuClick() {
        this.$emit("menu-click", this.item);

        if (this.hasDropdown) {
            this.isDropdownActive = !this.isDropdownActive;
        }
    }

    get componentIs() {
        return this.item.to ? "router-link" : "a";
    }
    get hasDropdown() {
        return !!this.item.menu;
    }
    get dropdownIcon() {
        return this.isDropdownActive ? "minus" : "plus";
    }
    get itemTo() {
        return this.item.to ? this.item.to : null;
    }
    get itemHref() {
        return this.item.href ? this.item.href : null;
    }
}
</script>
