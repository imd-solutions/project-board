<template>
    <section>
        <div class="normalContent column is-12">
            <table class="table">
                <thead>
                    <tr>
                        <th
                            v-for="column in columns"
                            v-html="column.label"
                        ></th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="(info, i) in tableInfo">
                        <tr class="lightGrey">
                            <td v-for="column in columns">
                                <p
                                    v-if="column.type === 'text'"
                                    v-text="info[column.field]"
                                ></p>
                                <InputCheckBox
                                    v-if="
                                        column.type === 'check' &&
                                            column.field === 'refund_paid'
                                    "
                                    :title="info[column.field]"
                                    @items="disable"
                                    @click="getChecked"
                                    v-model="form[column.field]"
                                />
                                <input-text
                                    v-if="
                                        column.type === 'textBox' &&
                                            (column.field ===
                                                'partial_refund' ||
                                                column.field === 'admin_paid')
                                    "
                                    :name="column.field"
                                    :disableField="getDisabled(getDisable, i)"
                                    :placeholder="column.placeholder"
                                    :topClass="column.topClass"
                                    :styleCSS="'width: 100% !important'"
                                    v-model="form[column.field]"
                                />
                                <InputCheckBox
                                    v-if="
                                        column.type === 'check' &&
                                            column.field === 'refund_admin'
                                    "
                                    :id="info[column.field]"
                                    :title="info[column.field]"
                                    v-model="form[column.field]"
                                />
                                <input-text
                                    v-if="
                                        column.type === 'textBox' &&
                                            column.field ===
                                                'partial_admin_refund'
                                    "
                                    :name="column.field"
                                    :placeholder="column.placeholder"
                                    :topClass="column.topClass"
                                    :styleCSS="'width: 100% !important'"
                                    v-model="form[column.field]"
                                />
                                <InputCheckBox
                                    v-if="
                                        column.type === 'check' &&
                                            (column.field === 'apply_fp' ||
                                                column.field === 'apply_pc' ||
                                                column.field ===
                                                    'apply_free_month')
                                    "
                                    :title="info[column.field]"
                                    :disabled="getDisabled(getChecked, i)"
                                    v-model="form[column.field]"
                                />
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import InputCheckBox from "@includes/input/Checkbox.vue";
import InputText from "@includes/input/Text.vue";

@Component({
    name: "InputTable",
    components: { InputCheckBox, InputText }
})
export default class InputTable extends Vue {
    @Prop({ type: Array, required: true })
    private columns!: Array<any>;
    @Prop({ type: Array })
    private additionalColumns!: Array<any>;
    @Prop({ type: Array, required: true })
    private information!: Array<any>;
    @Prop({ type: String })
    private secondary!: string;
    public checkedItems: Array<boolean> = [];
    public hide: Array<boolean> = [];
    public checked: Array<boolean> = [];
    public hidden: boolean = false;
    public check: boolean = true;
    public show: Boolean;
    public form: any = {
        refund_paid: "",
        partial_refund: "",
        admin_paid: "",
        refund_admin: "",
        partial_admin_refund: "",
        apply_fp: "",
        apply_pc: "",
        apply_free_month: ""
    };
    get tableInfo() {
        let data: any = [];
        //Loop through the information and columns Array and add the fields to the data array for the table
        for (let i = 0; i < this.information.length; i++) {
            let obj = {};
            for (let j = 0; j < this.columns.length; j++) {
                obj[this.columns[j].field] = this.information[i][
                    this.columns[j].field
                ];
                if (
                    this.columns[j].field === "refund_paid" ||
                    this.columns[j].field === "refund_admin" ||
                    this.columns[j].field === "apply_fp" ||
                    this.columns[j].field === "apply_pc" ||
                    this.columns[j].field === "apply_free_month"
                ) {
                    obj[this.columns[j].field] = i;
                }
                if (this.columns[j].field === "hide") {
                    obj[this.columns[j].field] = false;
                }
                if (this.columns[j].field === "checked") {
                    obj[this.columns[j].field] = true;
                }
            }

            data.push(obj);
        }

        return data;
    }

    public disable(value: any) {
        // ToDo This needs major re-work to disable one row at a time - Need help with this
        // Check that the value is not already in the CheckItems

        if (this.checkedItems.indexOf(value) === -1) {
            // Add the the checkItems.
            this.checkedItems.push(value);
            // Disable the partial refund text box and enable the FP,PC & free month check boxes
            this.hide[value] = true;
            this.checked[value] = false;
        } else {
            // Get the index of the value in the checkItems.
            let index = this.checkedItems.indexOf(value);
            // Remove from the checkItems.
            this.checkedItems.splice(index, 1);
            // Enable the partial refund text box and disable the FP,PC & free month check boxes
            this.hide[value] = false;
            this.checked[value] = true;
        }
    }

    get getDisable() {
        return this.hide;
    }
    get getChecked() {
        return this.checked;
    }
    public getDisabled(value: any, id: any) {
        if (value[id]) {
            this.show = value[id];
        } else {
            this.show = false;
        }
        return this.show;
    }
    // Refund form action button
    refundFormAction(action: any) {
        this.$emit("processActionBtn", "tableData", this.form);
    }
}
</script>

<style scoped lang="scss">
.normalContent {
    background: white;
    .table {
        width: 100%;
        .lightGrey {
            background-color: #e9e9e9;
            color: #333333;
        }
        .red {
            background-color: red;
            color: #ffffff;
        }
    }
}
</style>
