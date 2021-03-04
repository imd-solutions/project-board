<template>
    <section>
        <SiteHeader :client="clientData" />
        <section class="section">
            <div class="container">
                <h1 class="title mb-20">There seems to be an error.</h1>
                <div class="clearfix"></div>
                <h2 class="subtitle">
                    Something seems to have gone wrong. Please try again.
                </h2>
                <p class="mb-15">
                    If you are still experiencing issues, please contact the
                    administrator.
                </p>
            </div>
        </section>
        <SiteFooter
            v-if="
                clientData &&
                    clientData.permalink !== 'dfc' &&
                        clientData.permalink !== 'harlands'
            "
            :client="clientData"
        />
    </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SiteHeader from "@partials/site/Header.vue";
import SiteFooter from "@partials/site/Footer.vue";
import { getModule } from "vuex-module-decorators";
import ClientsModule from "@store/client";

let ClientsStore = getModule(ClientsModule);

@Component({
    name: "Error",
    components: {
        SiteHeader,
        SiteFooter
    }
})
export default class Error extends Vue {
    get clientData() {
        return ClientsStore.getClient;
    }
}
</script>
