<template>
    <section class="dashboard">
        <Breadcrumb :title="title" />
        <PageTitle :title="title" />

        <section class="section is-main-section">
            <div class="tile is-ancestor">
                <div class="tile is-parent">
                    <div class="card tile is-child">
                        <div class="card-content">
                            <div class="level is-mobile">
                                <div class="level-item">
                                    <div class="is-widget-label">
                                        <h3 class="subtitle is-spaced">
                                            Clients
                                        </h3>
                                        <h1 class="title">
                                            <div>512</div>
                                        </h1>
                                    </div>
                                </div>
                                <div class="level-item has-widget-icon">
                                    <div class="is-widget-icon">
                                        <span
                                            class="icon has-text-primary is-large"
                                        >
                                            <i
                                                class="mdi mdi-account-multiple mdi-48px"
                                            ></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tile is-parent">
                    <div class="card tile is-child">
                        <div class="card-content">
                            <div class="level is-mobile">
                                <div class="level-item">
                                    <div class="is-widget-label">
                                        <h3 class="subtitle is-spaced">
                                            Sales
                                        </h3>
                                        <h1 class="title">
                                            <div>$7,770</div>
                                        </h1>
                                    </div>
                                </div>
                                <div class="level-item has-widget-icon">
                                    <div class="is-widget-icon">
                                        <span
                                            class="icon has-text-info is-large"
                                        >
                                            <i
                                                class="mdi mdi-cart-outline mdi-48px"
                                            ></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tile is-parent">
                    <div class="card tile is-child">
                        <div class="card-content">
                            <div class="level is-mobile">
                                <div class="level-item">
                                    <div class="is-widget-label">
                                        <h3 class="subtitle is-spaced">
                                            Performance
                                        </h3>
                                        <h1 class="title">
                                            <div>256%</div>
                                        </h1>
                                    </div>
                                </div>
                                <div class="level-item has-widget-icon">
                                    <div class="is-widget-icon">
                                        <span
                                            class="icon has-text-success is-large"
                                        >
                                            <i
                                                class="mdi mdi-chart-timeline-variant mdi-48px"
                                            ></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Breadcrumb from "@templates/application/Breadcrumb.vue";
import PageTitle from "@templates/application/PageTitle.vue";

@Component({
    name: "Dashboard",
    components: {
        Breadcrumb,
        PageTitle
    }
})
export default class Dashboard extends Vue {
    public title: string = "Dashboard";
}
</script>
