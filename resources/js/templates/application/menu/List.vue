<template>
    <ul :class="{ 'menu-list': !isSubmenuList }">
        <AsideMenuItem
            v-for="(item, index) in menu"
            @menu-click="menuClick"
            :item="item"
            :key="index"
        />
    </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AsideMenuItem from "./Item.vue";

@Component({
    name: "AsideMenuList",
    components: {
        AsideMenuItem
    }
})
export default class AsideMenuList extends Vue {
    @Prop({ type: Boolean })
    public isSubmenuList!: boolean;
    @Prop({ type: Array })
    public menu!: [];

    menuClick(item: any) {
        this.$emit("menu-click", item);
    }
}
</script>
