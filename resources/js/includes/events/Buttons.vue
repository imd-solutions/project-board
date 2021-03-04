<template>
    <section :class="{ columns: btnSide, 'is-multiline': multiline }">
        <div v-for="(btn, index) in buttons" :class="btn.topCss">
            <button
                :id="btn.id"
                :key="index"
                :disabled="disable"
                :title="btn.btnTitle ? btn.btnTitle : btn.title"
                @click.prevent="
                    processMethods(
                        btn.method.name,
                        btn.method.action,
                        btn.method.additional
                    )
                "
                :class="[
                    { 'is-primary is-loading': loading },
                    'button',
                    btn.css,
                    btn.size,
                    btn.width
                ]"
            >
                <i v-if="btn.icon" :class="[btn.icon]"></i>
                <span>{{ btn.title }} </span>
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import {Button} from "./types";
import {getModule} from "vuex-module-decorators";
import ButtonsModule from "@store/button";

let ButtonsStore = getModule(ButtonsModule);

@Component({
    name: "EventButtons"
})
export default class EventButtons extends Vue {
    @Prop({type: String})
    public nameCss!: string | null;
    @Prop({type: Array})
    public buttons!: Button;
    @Prop({type: Boolean})
    public valid!: boolean;
    @Prop({type: Boolean})
    public btnSide!: boolean;
    @Prop({type: Boolean})
    public multiline!: boolean;
    @Prop({type: String})
    public additionalCss!: string | null;
    @Prop({type: [String, Number, Object, Array]})
    public data!: [string, number, object, []] | null;

    // Process the function calls from the parent component.
    processMethods(
        function_name: string,
        function_action: string,
        additional_action: string
    ): void {
        this[function_name](function_action, additional_action);
    }

    close() {
        this.$emit("closeModal");
    }

    goto(action: string) {
        this.$router.push(action);
    }

    submitBtn(action: string) {
        // If the validation has been passed.
        if (!this.valid) {
            ButtonsStore.ACTIVATE_PROCESSING();
            ButtonsStore.ACTIVATE_DISABLE();
        }
        this.$emit("processBtn", action, this.data);
    }

    get loading() {
        return ButtonsStore.getLoading;
    }

    get disable() {
        return ButtonsStore.getDisable;
    }
}
</script>
