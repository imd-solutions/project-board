<template>
    <div :class="topCss">
        <label for class="label" v-text="label"></label>
        <datepicker
            :class="[{ 'is-danger': error }]"
            :placeHolder="placeHolder"
            :config="{
                dateFormat: 'd-m-Y',
                static: false,
                minDate: notToday ? '' : today,
                defaultDate: notToday ? '' : today
            }"
            :value="inputData"
            @input="updateValue($event)"
            :disabled="disableField"
        ></datepicker>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Datepicker from "vue-bulma-datepicker";

@Component({
    name: "DatePicker",
    components: {
        Datepicker
    }
})
export default class DatePicker extends Vue {
    @Prop({ type: String })
    public name!: String;
    @Prop({ type: String })
    public inputData!: String;
    @Prop({ type: String })
    public placeHolder!: String;
    @Prop({ type: String })
    public label!: String;
    @Prop({ type: String })
    public topCss!: String;
    @Prop({ type: Object })
    public icon!: Object;
    @Prop({ type: Boolean })
    public error!: Boolean;
    @Prop({ type: Boolean })
    public notToday!: Boolean;
    @Prop({ type: Boolean })
    public disableField!: Boolean;
    @Prop({ type: Object })
    public errorMessage!: Object;

    // Get today's date.
    // ToDo: Use the mixin
    get today() {
        return new Date();
    }

    updateValue(value: String) {
        // emit an input to our parent
        this.$emit("input", String(value));
    }
}
</script>
