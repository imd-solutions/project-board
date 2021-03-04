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
                        <th v-if="actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(info, i) in tableInfo">
                        <tr class="lightGrey">
                            <td
                                v-for="column in columns"
                                v-text="
                                    column.secondField
                                        ? isFloat(
                                              info[column.field][
                                                  column.secondField
                                              ],
                                              column.float
                                          )
                                        : isFloat(
                                              info[column.field],
                                              column.float
                                          )
                                "
                            ></td>
                            <td></td>
                        </tr>
                        <tr
                            v-if="secondary"
                            v-for="(pay, index) in information[i][secondary]"
                            :class="[
                                redPaymentCodes.includes(pay['trans_code'])
                                    ? 'red'
                                    : '',
                                greenPaymentCodes.includes(pay['trans_code'])
                                    ? 'green'
                                    : '',
                                amberPaymentCodes.includes(pay['trans_code'])
                                    ? 'amber'
                                    : ''
                            ]"
                        >
                            <template v-if="index > 0">
                                <td
                                    v-for="column in columns"
                                    v-text="pay[column.field]"
                                ></td>
                                <td>
                                    <EventsButtons
                                        v-if="
                                            redPaymentCodes.includes(
                                                pay['trans_code']
                                            ) ||
                                                greenPaymentCodes.includes(
                                                    pay['trans_code']
                                                )
                                        "
                                        :buttons="
                                            redPaymentCodes.includes(
                                                pay['trans_code']
                                            )
                                                ? redButtons
                                                : greenButtons
                                        "
                                        :btnSide="true"
                                        :multiline="true"
                                        :data="
                                            JSON.stringify({
                                                payment_id: pay['payment_id'],
                                                trans_code: pay['trans_code']
                                            })
                                        "
                                        @submitForm="processBtn"
                                    ></EventsButtons>
                                </td>
                            </template>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import EventsButtons from "@includes/events/Buttons.vue";
import GlobalMixins from "@mixins/GlobalMixins";

@Component({
    name: "NormalTable",
    components: {
        EventsButtons
    }
})
export default class NoramlTable extends Mixins(GlobalMixins) {
    @Prop({ type: Array, required: true })
    private columns!: Array<any>;
    @Prop({ type: Array })
    private additionalColumns!: Array<any>;
    @Prop({ type: Array, required: true })
    private information!: Array<any>;
    @Prop({ type: String })
    private secondary!: string;
    @Prop({ type: Boolean })
    private actions!: false;

    public redPaymentCodes: any = ["UP", "DP", "PE"];
    public amberPaymentCodes: any = ["IC"];
    public greenPaymentCodes: any = ["SCP", "PC", "AC", "MC"];

    public redButtons: any = [
        {
            topCss: "btnMT",
            title: "Pay",
            css: "is-danger is-outlined ma-10",
            method: {
                name: "submitBtn",
                action: "payAmount"
            }
        }
    ];

    public greenButtons: any = [
        {
            topCss: "btnMT",
            title: "Refund",
            css: "button is-success is-outlined ma-10",
            method: {
                name: "submitBtn",
                action: "refundAmount"
            }
        }
    ];

    processBtn(action: string, data: string) {
        // ToDo: Speak with Oracle team about functionality.
        // Add modal component.
        // Parse the information into an object.
        // Open modal and pass information.
        console.log("Action", action);
        console.log("Data", data);
    }

    // Return a float.
    isFloat(data: any, float: boolean) {
        // Check to see if it is supposed to be a float.
        if (Number.isInteger(data) && float) {
            // Return the data with a float figure.
            return this.amountFormat(data);
        }
        // Return original data
        return data;
    }

    get tableInfo() {
        let data: any = [];

        for (let i = 0; i < this.information.length; i++) {
            let obj = {};
            for (let j = 0; j < this.columns.length; j++) {
                obj[this.columns[j].field] = this.information[i][
                    this.columns[j].field
                ];

                if (this.columns[j].field === "t_amount") {
                    obj[this.columns[j].field] = this.information[i].amount;
                }

                if (
                    this.information[i].payments > 0 &&
                    this.columns[j].field === "amount"
                ) {
                    obj[this.columns[j].field] = this.information[
                        i
                    ].payments[0].amount;
                }

                if (
                    this.information[i].payments &&
                    this.information[i].payments.length > 0 &&
                    (this.columns[j].field === "trans_code" ||
                        this.columns[j].field === "trans_date" ||
                        this.columns[j].field === "sort_code" ||
                        this.columns[j].field === "account_no")
                ) {
                    obj[this.columns[j].field] = this.information[
                        i
                    ].payments[0][this.columns[j].field];
                }
            }

            data.push(obj);
        }

        return data;
    }
}
</script>

<style scoped lang="scss">
/* ToDo: Hannah - Move this to global SCSS */

.normalContent {
    background: white;

    .table {
        width: 100%;

        .lightGrey {
            background-color: #e9e9e9;
            color: #333333;
            border: 3px solid #666666;
        }

        .red {
            background-color: #ffebea;
            color: red;
        }

        .amber {
            background-color: #ffe8c7;
            color: #fa9200;
        }

        .green {
            background-color: #d7f8ab;
            color: green;
        }
    }
}
</style>
