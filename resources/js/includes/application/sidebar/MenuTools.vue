<template>
    <div class="aside-tools">
        <div class="aside-tools-label">
            <b-icon v-if="icon" :icon="icon" custom-size="default" />
            <slot name="label" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
    name: "MenuTools"
})
export default class MenuTools extends Vue {
    @Prop({ type: String })
    public icon!: string;
    @Prop({ type: String })
    public label!: string;
}
</script>
