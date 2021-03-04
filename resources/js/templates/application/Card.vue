<template>
    <div :class="{ 'tile is-parent': hasParent }">
        <div class="card tile is-child">
            <header class="card-header">
                <p class="card-header-title">
                    <span class="icon">
                        <i :class="iconCss"></i>
                    </span>
                    {{ title }}
                </p>
            </header>
            <div class="card-content">
                <section v-for="(section, i) in sections" :key="i">
                    <template v-for="(field, j) in section.fields">
                        <div v-if="field.title" class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label
                                    class="label"
                                    v-text="field.title"
                                ></label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <section v-html="field.body"></section>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div
                                v-if="field.type === 'image'"
                                class="is-user-avatar image has-max-width is-aligned-center"
                            >
                                <img :src="field.data" alt="John Doe" />
                            </div>
                            <section v-else-if="field.type === 'text'">
                                <label
                                    class="label"
                                    v-text="field.label"
                                ></label>
                                <div class="control is-clearfix">
                                    <input
                                        v-if="userData && userData[field.name]"
                                        type="text"
                                        autocomplete="on"
                                        readonly="readonly"
                                        class="input is-static"
                                        :value="userData[field.name]"
                                    />
                                </div>
                            </section>
                            <section
                                v-else-if="field.type === 'input'"
                                class="field is-horizontal mb-10"
                            >
                                <div class="field-label is-normal">
                                    <label
                                        class="label"
                                        v-text="field.input.label"
                                    ></label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <div class="control">
                                            <InputText
                                                :name="field.input.name"
                                                type="text"
                                                :placeholder="
                                                    field.input.placeholder
                                                "
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </template>
                    <hr v-if="section.hr" />
                </section>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import InputText from "@includes/input/Text.vue";
import UsersModule from "@store/users";
import { getModule } from "vuex-module-decorators";

let UsersStore = getModule(UsersModule);

@Component({
    name: "Card",
    components: {
        InputText
    }
})
export default class Card extends Vue {
    @Prop({ type: String })
    public iconCss!: String;
    @Prop({ type: String, required: true })
    public title!: String;
    @Prop({ type: Boolean })
    public hasParent!: boolean;
    @Prop({ type: Array, required: true })
    public sections!: [];

    get userData() {
        return UsersStore.getUser;
    }
}
</script>
