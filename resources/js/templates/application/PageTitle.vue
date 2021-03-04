<template>
    <section class="hero is-hero-bar">
        <div class="hero-body">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <h1 class="title" v-text="title"></h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    name: "PageTitle"
})
export default class PageTitle extends Vue {
    @Prop({ type: String, required: true })
    public title!: String;
}
</script>
