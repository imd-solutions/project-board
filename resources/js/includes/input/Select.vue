<template>
    <div :class="topCss">
        <label class="label" v-text="label" :for="fieldReference"></label>

        <div class="select" :class="[nameClass, { 'is-danger': error }]" :style="styleCSS">
            <select
                ref="input"
                :id="fieldReference"
                :value="currentValue"
                :style="styleCSS"
                @change="updateValue($event.target.value)"
            >
                <!-- placeholder -->
                <option
                    v-if="placeholder"
                    disabled
                    :selected="isPlaceholderSelected"
                    >{{ selectValue !== "" ? selectValue : placeholder }}
                </option>
                <option
                    v-for="option in options"
                    :key="option[selectID] ? option[selectID] : option.id"
                    :value="option[selectID] ? option[selectID] : option.id"
                    :selected="
                        currentValue ===
                            (option[selectID] ? option[selectID] : option.id)
                    "
                    >{{ option[selectName] ? option[selectName] : option.name }}
                </option>
            </select>
        </div>
        <p
            class="help is-danger"
            v-if="error && !errorMessage.required"
            v-text="`The ${humanReadable} field is required!`"
        ></p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    name: "InputSelect",
    filters: {
        removeArray(val: any) {
            if (typeof val === "object") return val[0];
            return val;
        }
    }
})
export default class InputSelect extends Vue {
    @Prop({ type: String })
    public topCss: String;
    @Prop({ type: String })
    public name!: String;
    @Prop({ type: [String, Boolean] })
    public label: [String, Boolean];
    @Prop({ type: String })
    public id: String;
    @Prop({ type: String })
    public nameClass: String;
    @Prop({ type: String })
    public css: String;
    @Prop({ type: String })
    public styleCSS: String;
    @Prop({ type: Boolean })
    public disabled: Boolean;
    @Prop({ type: [String, Boolean] })
    public placeholder: [String, Boolean];
    @Prop({ type: [String, Boolean] })
    public addon: [String, Boolean];
    @Prop({ type: Boolean })
    public required: Boolean;
    @Prop({ type: [String, Boolean, Array, Object] })
    public value: any;
    @Prop({ type: [String, Boolean, Array, Object] })
    public options: any;
    @Prop({ type: [String, Boolean] })
    public error: [String, Boolean];
    @Prop({ type: [Object, String] })
    public errorMessage: [Object, String];
    @Prop({ type: String })
    public selectID: String;
    @Prop({ type: String })
    public selectName: String;

    public selectValue: String = "";

    get humanReadable() {
        let newName = this.name;
        return newName.replace("_", " ");
    }

    get currentValue() {
        let options = this.options;
        if (this.value && this.value.id) {
            let currentValue = options;
            let val = JSON.stringify(this.value.id),
                filtered = options.map((result: { id: string }) => {
                    return JSON.stringify(parseInt(result.id));
                });

            if (currentValue[filtered.indexOf(val)] !== undefined) {
                // return our index
                return parseInt(currentValue[filtered.indexOf(val)].id);
            } else {
                return this.value.id;
            }
        } else {
            return this.placeholder;
        }
    }

    // get unique field reference
    get fieldReference() {
        let uniqId = Math.floor(new Date().valueOf() * Math.random()).toString(
            36
        );
        return "field-" + uniqId;
    }

    // check if a value is already selected
    get isPlaceholderSelected() {
        return !this.value;
    }

    public updateValue(index: any) {
        let options = this.options;
        if (parseInt(index) === 1) {
            this.$emit("inputAction", true);
        } else {
            this.$emit("inputAction", false);
        }

        for (let i = 0; i < options.length; i++) {
            if (parseInt(options[i].id) === parseInt(index)) {
                let optionID = parseInt(options[i].id);
                let optionName = options[i].name;

                // Populate the input with the email data.
                if (options[i].email) {
                    let optionEmail = options[i].email;
                    this.$emit("input", {
                        id: optionID,
                        name: optionName,
                        email: optionEmail
                    });
                }

                // Populate the input with the status code data.
                else if (options[i].code) {
                    let code = options[i].code;
                    this.$emit("input", {
                        id: optionID,
                        name: optionName,
                        code: code
                    });
                }

                // Normal select with name and ID.
                else {
                    this.$emit("input", {
                        id: optionID,
                        name: optionName
                    });
                }
            } else if (options[i].id === index) {
                let optionID = options[i].id;
                let optionName = options[i].name;

                this.$emit("input", {
                    id: optionID,
                    name: optionName
                });
            } else if (options[i].code === index) {
                let code = options[i].code;
                let desc = options[i].display_desc;
                this.$emit("input", {
                    id: code,
                    name: desc
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.is-one-third {
    .select {
        width: 25em;

        select:not([multiple]) {
            width: 25em;
        }
    }
}

.is-half {
    .select {
        width: 40em;

        select:not([multiple]) {
            width: 40em;
        }
    }
}
</style>
