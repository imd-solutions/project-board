<template>
    <section>
        <SiteHeader />
        <CustomerNotification />
    </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SiteHeader from "@partials/site/Header.vue";
import CustomerNotification from "@templates/site/CustomerNotification.vue";

@Component({
    name: "Unrecognised",
    components: {
        SiteHeader,
        CustomerNotification
    }
})
export default class Unrecognised extends Vue {}
</script>
