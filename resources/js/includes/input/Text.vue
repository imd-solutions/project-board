<template>
    <div v-if="type !== 'hidden'" :class="topCss">
        <label v-if="label" for class="label" :class="labelCss" v-text="label"></label>
        <div
            :class="[
                divCss,
                iconAlign,
                { 'required has-error': error },

            ]"
        >
            <input
                ref="input"
                :id="id"
                :name="name"
                :disabled="disableField"
                :placeholder="placeholder"
                :type="type"
                class="input"
                :class="[inputCss, nameClass, { 'is-danger': error }]"
                :value="inputData"
                @input="updateValue($event.target.value)"
                required
            />
            <template v-if="error">
                <small
                    class="validation-info"
                    v-if="errorMessage.email == true"
                    v-text="`The ${humanReadable} is not a valid!`"
                ></small>
                <small
                    class="validation-info"
                    v-else-if="errorMessage.sameAsPassword == false"
                    v-text="`The password fields do not match!`"
                ></small>
                <small
                    class="validation-info"
                    v-else-if="errorMessage.numeric == true"
                    v-text="`The ${humanReadable} field must be numeric!`"
                ></small>
                <small
                    class="validation-info"
                    v-else-if="errorMessage.minLength == true"
                    v-text="
                    `The ${humanReadable} field is has a minimum character!`
                "
                ></small>
                <small
                    class="validation-info"
                    v-else-if="errorDisplay"
                    v-text="errorDisplay"
                ></small>
                <small
                    class="validation-info"
                    v-else
                    v-text="`The ${humanReadable} field is required!`"
                ></small>
            </template>
            <span class="icon" :class="[icon.align]" v-if="icon">
                <i class="fa" :class="[icon.name, { faError: error }]"></i>
            </span>
        </div>

    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component({
    name: "InputText"
})
export default class InputText extends Vue {
    @Prop({type: String})
    public name!: String;
    @Prop({type: [String, Number]})
    public inputData!: [String, Number];
    @Prop({type: String})
    public placeholder!: String;
    @Prop({type: String})
    public type!: String;
    @Prop({type: [String, Number]})
    public value!: [String, Number];
    @Prop({ type: String })
    public id: String;
    @Prop({ type: String })
    public nameClass: String;
    @Prop({type: String})
    public label!: String;
    @Prop({type: String})
    public topCss!: String;
    @Prop({type: String})
    public labelCss!: String;
    @Prop({type: String})
    public divCss!: String;
    @Prop({type: String})
    public inputCss!: String;
    @Prop({type: String})
    public inputClass!: String;
    @Prop({type: Object})
    public icon!: Object;
    @Prop({type: Boolean})
    public error!: Boolean;
    @Prop({type: Boolean})
    public disableField!: Boolean;
    @Prop({type: Object})
    public errorMessage!: Object;
    @Prop({type: String})
    public errorDisplay!: String;

    updateValue(value: String) {
        // emit an input to our parent
        this.$emit("input", String(value));
    }

    // Remove any "_" from the name so the users read it.
    get humanReadable() {
        let newName = this.name;
        return newName.replace("_", " ");
    }

    get iconAlign() {
        if (this.icon) {
            return this.icon['divAlign'];
        }
        return '';
    }
}
</script>

<style lang="scss" scoped>
.faError {
    color: red;
}
</style>
