<template>
    <section class="hero">
        <div
            :class="image.heroCss"
            :data-background="image.imageUrl"
            :data-color="image.colour"
            :data-color-opacity="image.opacity"
            :data-demo-background="image.imageURL"
        >
            <img
                v-if="coverShape"
                class="hero-shape"
                src="/assets/img/shapes/cut-circle.svg"
                alt=""
            />
            <!-- Hero caption -->
            <div id="main-hero" class="hero-body ">
                <div class="container">
                    <div class="columns is-vcentered is-hero-caption">
                        <div class="column is-5 is-offset-1">
                            <h1 class="title is-1 is-light" v-text="title"></h1>
                            <h2 class="subtitle is-5 is-light" v-text="subtitle"></h2>
                            <div v-if="nonTitle" class="field-wrap">
                                <div class="field is-grouped">
                                    <div class="control">
                                        <!--                                        <input-->
                                        <!--                                            class="input large-input"-->
                                        <!--                                            type="text"-->
                                        <!--                                            placeholder="Enter your email address"-->
                                        <!--                                        />-->
                                        <div class="select is-fullwidth">
                                            <select>
                                                <option>Select a Category</option>
                                                <option>Pubs</option>
                                                <option>Work</option>
                                                <option>Mates</option>
                                                <option>Women</option>
                                                <option>Growning Older</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="control">
                                        <button
                                            href="#"
                                            class="button primary-button">
                                            View Arguments
                                        </button>
                                    </div>
                                </div>
                                <small class="form-text"
                                >14 day trial, no credit card
                                    required.</small
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import "jquery";

@Component({
    name: "Hero"
})
export default class Hero extends Vue {
    @Prop({type: String, required: true})
    public title!: String;
    @Prop({type: String})
    public subtitle!: String;
    @Prop({type: Object})
    public image!: Object;
    @Prop({type: Boolean})
    public coverShape!: Boolean;
    @Prop({type: Boolean})
    public nonTitle!: Boolean;

    mounted() {
        $(".parallax").prepend('<div class="parallax-overlay"></div>');
        $(".parallax").each(function () {
            let attrImage = $(this).attr("data-background");
            let attrColor = $(this).attr("data-color");
            let attrOpacity = $(this).attr("data-color-opacity");
            let attrPositionX = $(this).attr("data-position-x");
            if (attrImage !== undefined) {
                $(this).css("background-image", "url(" + attrImage + ")");
            }
            if (attrColor !== undefined) {
                $(this)
                    .find(".parallax-overlay")
                    .css("background-color", "" + attrColor + "");
            }
            if (attrOpacity !== undefined) {
                $(this)
                    .find(".parallax-overlay")
                    .css("opacity", "" + attrOpacity + "");
            }
            if (attrPositionX !== undefined) {
                $(this).css("background-position-x", "" + attrPositionX + "");
            }
        });
    }
}
</script>
