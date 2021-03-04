<template>
    <section class="section is-title-bar">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <ul>
                        <li>Admin</li>
                        <li v-text="title"></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    name: "Breadcrumb"
})
export default class Breadcrumb extends Vue {
    @Prop({ type: String, required: true })
    public title!: String;
}
</script>
