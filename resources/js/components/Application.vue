<template>
    <div v-if="processing" class="pageloader is-active">
        <span class="title">Loading...</span>
    </div>
    <div v-else>
        <ApplicationHeader />
        <ApplicationSidebar :menu="sideBarMenuItems" />
        <div :class="{ mainBody: sideBarData }">
            <router-view></router-view>
        </div>
        <ApplicationFooter />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ApplicationHeader from "@partials/application/Header.vue";
import ApplicationFooter from "@partials/application/Footer.vue";
import ApplicationSidebar from "@partials/application/Sidebar.vue";
import { getModule } from "vuex-module-decorators";
import SystemsModule from "@store/system";

let SystemsStore = getModule(SystemsModule);

@Component({
    name: "Application",
    components: {
        ApplicationHeader,
        ApplicationFooter,
        ApplicationSidebar
    }
})
export default class Application extends Vue {
    public processing: boolean = false;

    get sideBarData() {
        return SystemsStore.getSideBar;
    }

    get sideBarMenuItems() {
        return SystemsStore.getSideBarItems;
    }
}
</script>
