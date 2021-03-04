<template>
    <section class="pl-15" :style="styleCss">
        <div
            v-if="name !== 'Contacts' && title != null && title !== ''"
            class="columns"
        >
            <label
                v-if="name"
                for
                class="checkbox column is-3"
                v-text="`${name}:`"
            ></label>
            <div class="column is-8">
                <input
                    type="checkbox"
                    name="checkbox[]"
                    :id="id"
                    :class="[nameClass]"
                    @change="check"
                    :value="title"
                    :disabled="disabled"
                    :checked="checked"
                />
                <label
                    :for="id"
                    v-if="showTitle === true"
                    v-text="title"
                ></label>
            </div>
        </div>
        <template v-else>
            <div v-for="(contact, index) in title" :key="index">
                <div class="columns">
                    <label for class="checkbox column is-3"
                        >Contact Person:</label
                    >
                    <div class="column is-8">
                        <input
                            type="checkbox"
                            name="checkbox[]"
                            @change="check"
                            :value="
                                title[index].first_name +
                                    ' ' +
                                    title[index].last_name
                            "
                        />
                        <span>
                            {{ contact.first_name }}
                            {{ contact.last_name }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    name: "CheckBox"
})
export default class CheckBox extends Vue {
    @Prop({ type: String })
    public name!: String;
    @Prop({ type: String })
    public styleCss!: String;
    @Prop({ type: [String, Array, Number, Boolean] })
    public title!: any;
    @Prop({ type: String })
    public id!: String;
    @Prop({ type: String })
    public nameClass!: String;
    @Prop({ type: Boolean })
    public showTitle: Boolean;
    @Prop({ type: Boolean })
    public checked: Boolean;
    @Prop({ type: [String, Array, Number, Boolean] })
    public disabled: Boolean;
    @Prop({ type: [String, Array, Number] })
    public checkArray: any;
    public checkedItems: Array<string> = [];
    public items: Array<string> = [];
    public show: Boolean;

    check(event: any) {
        // Get the value of the checkbox.
        let checkValue = event.target.value;
        // Send the value via emit to the Security page.
        this.$emit("items", checkValue);
    }
}
</script>
