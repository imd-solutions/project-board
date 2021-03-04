<template>
    <section>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">
                    <img
                        src="/images/logo/logo.png"
                        width="auto"
                        height="auto"
                    />
                </router-link>
            </div>
        </nav>
        <div class="mt-15">
            <notification-alerts></notification-alerts>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NotificationAlerts from "@includes/notifications/Alerts.vue";
import { getModule } from "vuex-module-decorators";
import AlertsModule from "@store/alerts";

let AlertsStore = getModule(AlertsModule);

@Component({
    name: "SiteHeader",
    components: {
        NotificationAlerts
    }
})
export default class SiteHeader extends Vue {
    mounted() {
        AlertsStore.REMOVE_ALERT();
    }
}
</script>

<style scoped>
.navbar-item img {
    max-height: 4.75rem;
    margin: 10px;
}
</style>
