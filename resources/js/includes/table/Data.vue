<template>
    <section>
        <Modal
            v-if="modalInfo"
            v-show="showModal"
            :contentTitle="modalInfo.contentTitle"
            :contentType="'fields'"
            :contentText="modalInfo.contentText"
            :contentFooter="modalInfo.contentFooter"
            :showModal="showModal"
            @closeModal="openModal"
            @updateInformation="updateInformation"
        ></Modal>
        <div class="tableContent column is-12">
            <div v-show="isPaginated" class="columns is-12">
                <b-field
                    label="Results Per Page"
                    class="column"
                    :class="additionalAction ? 'is-4' : 'is-6'"
                >
                    <b-select v-model="perPage">
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="15">15 per page</option>
                        <option value="20">20 per page</option>
                    </b-select>
                </b-field>

                <b-field
                    v-if="additionalAction"
                    label="Additional Actions"
                    class="column is-4"
                >
                    <events-buttons
                        :buttons="buttonInfo"
                        @openModal="openModal"
                    ></events-buttons>
                </b-field>

                <b-field
                    label="Search"
                    class="tableSearch column"
                    :class="additionalAction ? 'is-4' : 'is-6'"
                >
                    <b-input
                        placeholder="Search..."
                        v-model="search_query.name"
                    />
                </b-field>
            </div>

            <b-table
                :data="filter"
                class="dataTable"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :default-sort="defaultsort"
                :default-sort-direction="defaultSortDirection"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
            >
                <template slot-scope="props">
                    <b-table-column
                        v-for="column in displayColumns"
                        :field="column.field"
                        :key="column.field"
                        :label="column.label"
                        :width="column.width"
                        :sortable="shouldSort"
                    ><strong
                    >{{ propRowField(props.row[column.field]) }}
                    </strong></b-table-column
                    >

                    <b-table-column
                        v-if="showActions"
                        field="action"
                        label="Actions"
                        width="20%"
                        height="50px"
                    >
                        <div
                            v-if="
                                !superUsers.includes(username) &&
                                    displayInfo &&
                                    displayInfo.length > 0
                            "
                        >
                            <template v-for="info in displayInfo">
                                <i
                                    v-if="info.icon === props.row.status"
                                    class="fa"
                                    :class="[
                                        info.icon,
                                        info.size,
                                        info.cssClass
                                    ]"
                                    :title="info.title"
                                ></i>
                            </template>
                        </div>

                        <div
                            v-else
                            class="buttons is-right"
                            :class="{ noMarginButton: noMargin }"
                        >
                            <EventsButtons
                                :buttons="actionBtn"
                                :btnSide="true"
                                :multiline="true"
                                :data="props.row"
                                @submitForm="processBtn($event, props.row)"
                            />
                        </div>
                    </b-table-column>
                </template>
            </b-table>
        </div>
    </section>
</template>

<script lang="ts">
import {Component, Prop, Mixins} from "vue-property-decorator";
import EventsButtons from "@includes/events/Buttons.vue";
import {getModule} from "vuex-module-decorators";
import ButtonsModule from "@store/button";
import AlertsModule from "@store/alerts";
import Modal from "@includes/notifications/Modal.vue";
import GlobalMixins from "@mixins/GlobalMixins";
import SecureLS from "secure-ls/dist/secure-ls.min.js";

let ls = new SecureLS();

let AlertsStore = getModule(AlertsModule);
let ButtonsStore = getModule(ButtonsModule);

@Component({
    name: "DataTable",
    components: {EventsButtons, Modal}
})
export default class DataTable extends Mixins(GlobalMixins) {
    @Prop({type: Array, required: true})
    private columns!: Array<any>;
    @Prop({type: Array, required: true})
    private information!: Array<any>;
    @Prop({type: Boolean, required: true})
    private isPaginated!: boolean;
    @Prop({type: Boolean})
    private additionalAction!: boolean;
    @Prop({type: Boolean})
    private noMargin!: boolean;
    @Prop({type: Boolean})
    public stopSortable: boolean;
    @Prop({type: String})
    private additionalTextButtons!: string;
    @Prop({type: String})
    private actionText!: string;
    @Prop({type: Array})
    private actionBtn!: Array<any>;
    @Prop({type: Array})
    private displayInfo!: Array<any>;
    @Prop({type: Boolean})
    private showActions!: boolean;
    @Prop({type: Boolean})
    private additionalButtons!: boolean;
    @Prop({type: String})
    private additionalButtonsText!: string;
    @Prop({type: Object})
    public modalInfo!: Object;
    @Prop({type: String})
    public defaultsort!: string;
    @Prop({type: String})
    public defaultSortDirection!: string;

    public showModal: boolean = false;
    public showDrop: boolean = false;

    public username: string = ls.get("username");

    perPage: number = 5;

    currentPage: number = 1;

    search_query: any = {
        name: ""
    };

    buttonInfo: any = [
        {
            title: "Add " + this.additionalTextButtons,
            css: "is-primary",
            undisable: true,
            method: {
                name: "openModal"
            }
        }
    ];

    processBtn(action: string, data: any) {
        this.$emit(action, data);
    }

    // Open the modal.
    openModal() {
        this.showModal = !this.showModal;
    }

    onlyUnique(value: any, index: any, self: any) {
        return self.indexOf(value) === index;
    }

    propRowField(data: string) {
        if (data) {
            //convert data to a string and replace line breaks
            let string = data.toString().replace(/<br ?\/?>/g, " ");
            let length = 50;
            let trimmedString =
                string.length > length
                    ? string.substring(0, length) + "..."
                    : string;

            return trimmedString;
        }

        return data;
    }

    // Update the information from the buttons.
    async updateInformation(data: any) {
        // Remove any "undefined" properties.
        delete data.undefined;

        let code = "CustomersStore. " + data.action + "(data);";
        // Update the log action.
        LogsStore.updateLogAction(data.action);

        await eval(code).then((response: any) => {
            // Change the button status.
            ButtonsStore.ACTIVATE_PROCESSING();
            ButtonsStore.ACTIVATE_DISABLE();
            // Send the information to the alert store.
            AlertsStore.INSERT_ALERT({
                ...response
            });
            // Close the modal
            this.showModal = !this.showModal;
        });

        // ToDo: Global function as this is used in 2 places.
        // ToDo: Right the function and close the modal when done.
        //this.showModal = !this.showModal;
    }

    get displayColumns() {
        let data = [];

        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i].display) {
                data.push(this.columns[i]);
            }
        }
        return data;
    }

    get filter() {
        let name_re = new RegExp(this.search_query.name, "i");
        let data = [];

        for (let i = 0; i < this.information.length; i++) {
            for (let ic = 0; ic < this.columns.length; ic++) {
                const name = JSON.parse(
                    JSON.stringify(this.information[i][this.columns[ic].field])
                );

                let dataField = this.information[i][this.columns[ic].field];

                if (name !== null && dataField.toString().match(name_re)) {
                    data.push(this.information[i]);
                }
            }
        }

        if (data.length < this.information.length + 1) {
            return data;
        } else {
            return this.information;
        }
    }

    // Get the boolean value for the sortable.
    get shouldSort() {
        if (this.stopSortable) {
            return false;
        } else {
            return true;
        }
    }
}
</script>
