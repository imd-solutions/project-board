<template>
    <div class="field" :class="topCss">
        <label class="label" v-text="label"></label>
        <textarea
            class="textarea"
            :class="[nameClass, { 'is-danger': error }]"
            :placeholder="placeholder"
            :value="extraData ? extraData.note_text : value"
            :rows="row"
            :disabled="disableField"
            @input="updateValue($event.target.value)"
        ></textarea>
        <span v-if="extraData && extraData.created_by">
            added by <strong>{{ extraData.created_by }}</strong> on
            {{ extraData.created_date }}</span
        >
        <p
            class="help is-danger"
            v-if="error && !errorMessage.required"
            v-text="`The ${name} field is required!`"
        ></p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    name: "InputTextArea"
})
export default class InputTextArea extends Vue {
    @Prop({ type: String })
    public name!: String;
    @Prop({ type: String })
    public id!: String;
    @Prop({ type: String })
    public nameClass!: String;
    @Prop({ type: [String, Number] })
    public inputData!: [String, Number];
    @Prop({ type: String })
    public placeholder!: String;
    @Prop({ type: String })
    public label!: String;
    @Prop({ type: String })
    public cssClass!: String;
    @Prop({ type: [String, Number, Boolean] })
    public value!: [String, Number, Boolean];
    @Prop({ type: String })
    public topCss!: String;
    @Prop({ type: Number })
    public row!: Number;
    @Prop({ type: Boolean })
    public error!: Boolean;
    @Prop({ type: Object })
    public errorMessage!: Object;
    @Prop({ type: Object })
    public extraData!: Object;
    @Prop({ type: Boolean })
    public disableField!: Boolean;

    updateValue(value: String) {
        // emit an input to our parent

        this.$emit("input", String(value));
    }
}
</script>

<style lang="scss" scoped>
.is-full-width {
    padding: 0px;
}
</style>
