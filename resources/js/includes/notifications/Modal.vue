<template>
    <div>
        <div class="modal" :class="{ 'is-active': showModal }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <div class="modal-card-title columns">
                        <p class="column is-11">
                            {{ contentTitle }}
                        </p>
                        <div class="column is-1">
                            <button class="delete" @click="close"></button>
                        </div>
                    </div>
                </header>
                <section class="modal-card-body">
                    <Tabs
                        v-if="contentType === 'tabs'"
                        :tabs="contentText"
                        :activeTab="activeTab"
                    >
                        <template
                            v-for="content in contentText"
                            :slot="content.tabContent"
                        >
                            <template v-for="(field, index) in content.fields">
                                <InputText
                                    v-if="field.type === 'text'"
                                    :name="field.vmodel"
                                    :inputData="field.value"
                                    :label="field.title"
                                    :topCss="content.cssClass"
                                    :key="index"
                                    v-model="form[field.vmodel]"
                                >
                                </InputText>
                            </template>
                        </template>
                    </Tabs>
                    <template
                        v-else-if="
                            contentType === 'fields' && contentText.length > 0
                        "
                        v-for="(field, index) in contentText"
                    >
                        <InputText
                            v-if="field.type === 'text'"
                            :name="field.vmodel"
                            :placeholder="field.placeHolder"
                            :inputData="
                                contentData[field.vmodel]
                                    ? contentData[field.vmodel]
                                    : ''
                            "
                            :label="field.title"
                            :key="index"
                            v-model="form[field.vmodel]"
                        >
                        </InputText>
                        <DatePicker
                            v-else-if="field.type === 'date'"
                            :name="field.vmodel"
                            :placeHolder="field.placeHolder"
                            :label="field.title"
                            :key="index"
                            v-model="form[field.vmodel]"
                            :disableField="field.disableField"
                        >
                        </DatePicker>
                        <InputSelect
                            v-else-if="field.type === 'select'"
                            :options="
                                selectData(
                                    field.selectCode,
                                    field.selectID,
                                    field.selectName
                                )
                            "
                            :name="field.vmodel"
                            :placeholder="field.placeHolder"
                            :label="field.title"
                            :key="index"
                            v-model="form[field.vmodel]"
                            @inputAction="changeInputInfo"
                        >
                        </InputSelect>
                        <InputTextArea
                            v-else-if="field.type === 'textarea'"
                            :name="field.vmodel"
                            :placeholder="field.placeHolder"
                            :inputData="
                                contentData[field.vmodel]
                                    ? contentData[field.vmodel]
                                    : ''
                            "
                            :label="field.title"
                            :key="index"
                            v-model="form[field.vmodel]"
                        >
                        </InputTextArea>
                        <template
                            v-else-if="field.type === 'multiselect'"
                            v-for="inputs in field.inputs"
                        >
                            <InputText
                                v-if="showInput && inputs.type === 'text'"
                                :name="inputs.vmodel"
                                :placeholder="inputs.placeHolder"
                                :inputData="
                                    contentData[inputs.vmodel]
                                        ? contentData[inputs.vmodel]
                                        : ''
                                "
                                :label="inputs.title"
                                v-model="form[inputs.vmodel]"
                            >
                            </InputText>
                            <DatePicker
                                v-if="!showInput && inputs.type === 'date'"
                                :name="inputs.vmodel"
                                :placeHolder="inputs.placeHolder"
                                :label="inputs.title"
                                :inputData="'01/01/2020'"
                                v-model="form[inputs.vmodel]"
                            >
                            </DatePicker>
                        </template>
                        <div v-else v-text="field.title"></div>
                    </template>
                    <div
                        v-else-if="contentText instanceof Array"
                        v-for="content in contentText"
                        :key="content.message"
                        v-html="content.message"
                    ></div>
                    <div class="wrap" v-else v-html="contentText"></div>
                </section>
                <footer
                    v-if="contentFooter"
                    class="modal-card-foot"
                    :style="contentFooter.style"
                >
                    <template v-if="contentFooter.buttons">
                        <EventButtons
                            :multiline="true"
                            :btnSide="true"
                            :buttons="contentFooter.buttons"
                            @submitForm="updateInformation"
                            @closeModal="close"
                        ></EventButtons>
                    </template>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import InputText from "@includes/input/Text.vue";
import InputTextArea from "@includes/input/Textarea.vue";
import EventButtons from "@includes/events/Buttons.vue";
import { getModule } from "vuex-module-decorators";
import ButtonsModule from "@store/button";
import InputSelect from "@includes/input/Select.vue";
import DatePicker from "@includes/date/Picker.vue";
import Header from "@partials/application/Header.vue";

let ButtonsStore = getModule(ButtonsModule);

@Component({
    name: "Modal",
    components: {
        Header,
        InputText,
        InputTextArea,
        EventButtons,
        InputSelect,
        DatePicker
    }
})
export default class Modal extends Vue {
    @Prop({ type: Boolean })
    public showModal!: boolean;
    @Prop({ type: String })
    public contentTitle!: String;
    @Prop({ type: String })
    public contentType!: String;
    @Prop({ type: Object })
    public contentData!: Object;
    @Prop({ type: Number })
    public activeTab: Number;
    @Prop({ type: [String, Array] })
    public contentText!: any;
    @Prop({ type: Object })
    public contentFooter!: Object;

    public form = {
        ...this.formData
    };

    public showInput: Boolean = true;

    changeInputInfo(event: boolean) {
        this.showInput = event;
    }

    updateForm(obj: any, key: any, value: any, index: any) {
        // Create a temp object and index variable
        let temp = {};
        let i = 0;

        // Loop through the original object
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                // If the indexes match, add the new item
                if (i === index && key && value) {
                    temp[key] = value;
                } else {
                    temp[key] = "";
                }

                // Add the current item in the loop to the temp obj
                temp[prop] = obj[prop];

                // Increase the count
                i++;
            }
        }

        // If no index, add to the end
        temp[key] = value;

        return temp;
    }

    // Select information dropdown data.
    selectData(code: string, id: string, name: string) {
        let data: any = [];

        if (this[code] && this[code].length > 0) {
            for (let j = 0; j < this[code].length; j++) {
                let obj = {};

                if (this[code][j]["dID"] > 0) {
                    obj["id"] = this[code][j][id];
                    obj["name"] = this[code][j][name];
                    data.push(obj);
                } else {
                    obj["id"] = this[code][j][id];
                    obj["name"] =
                        this[code][j][id] + " - " + this[code][j][name];
                    data.push(obj);
                }
            }
        }

        return data;
    }

    // Send back the data to be processed.
    updateInformation(action: string): void {
        // Check that there is someting to log.
        if (action !== undefined) {
            // ToDo: Investigate if this log is needed here.
        }

        this.$emit("updateInformation", {
            action: action,
            ...this.form
        });
    }

    // Send back the data to close modal.
    close() {
        this.$emit("closeModal");
    }

    // Get the form data and populate it.
    get formData() {
        let formData = {};

        if (this.contentType === "fields") {
            for (let i = 0; i < this.contentText.length; i++) {
                formData = this.updateForm(
                    formData,
                    this.contentText[i].vmodel,
                    this.contentData &&
                        this.contentData[this.contentText[i].vmodel]
                        ? this.contentData[this.contentText[i].vmodel]
                        : "",
                    i
                );
            }
        } else if (this.contentType === "tabs") {
            for (let i = 0; i < this.contentText.length; i++) {
                for (let j = 0; j < this.contentText[i].fields.length; j++) {
                    formData = this.updateForm(
                        formData,
                        this.contentText[i].fields[j].vmodel,
                        this.contentText[i].fields[j].value,
                        i
                    );
                }
            }
        } else if (this.contentType === "" && this.contentData) {
            formData = this.updateForm(
                formData,
                "info",
                this.contentData.valueOf(),
                0
            );
        }

        return formData;
    }
}
</script>
