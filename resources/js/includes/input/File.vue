<template>
    <div class="field column">
        <label class="label" v-text="label"></label>
        <label class="file-label">
            <input
                :id="id"
                type="file"
                class="file-input"
                :class="[nameClass]"
                :name="name"
                ref="uploadFile"
                @change="handleFileChange($event)"
            />
            <span class="file-cta">
                <span class="file-icon">
                    <i class="fa fa-upload"></i>
                </span>
                <span class="file-label">Choose a file…</span>
            </span>
            <span class="file-name" v-text="inputDataInfo"></span>
        </label>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
    name: "InputFile"
})
export default class InputFile extends Vue {
    @Prop({type: Boolean})
    public title: boolean;
    @Prop({type: String})
    public id!: String;
    @Prop({type: String})
    public nameClass!: String;
    @Prop({type: String})
    public name!: String;
    @Prop({type: String})
    public label: String;

    public inputData: any = {};

    public handleFileChange(event: any) {
        // Populate the image name.
        this.inputData.name = event.target.files[0].name;
        // Emit the value to change the name of the image.
        this.$emit("changeValue", 1);

        // Send the information back.
        this.$emit("input", event.target.files[0]);
    }

    get inputDataInfo() {
        // check if the title can be added.
        if (this.title) {
            return this.inputData.name;
        }
        this.$emit("input", "");
        return "";
    }
}
</script>
