<template>
    <section class="homePage" @scroll="onScroll">
        <HomeHeader/>

        <Hero
            title="Arguments are there to be resolved!"
            subtitle="If you feel that you are right, and want to rub it in the face of your pal, well then there is only one place to settle it."
            :image="{
                heroCss: 'hero type-1 parallax is-cover is-relative is-fullheight',
                imageUrl: '/assets/img/photo/hero.jpg',
                colour: '#333333',
                opacity: '.7',

            }"
            :coverShape="true"
            :nonTitle="true"
        />

        <div class="section is-medium">
            <div class="container">

                <!--Section title-->
                <div class="section-title has-text-centered">
                    <div class="title-wrap">
                        <h3 class="title is-3">Why not challenge one of the top argumentors</h3>
                        <p class="subtitle is-5">
                            Be warned... They do not like to lose!
                        </p>
                    </div>
                </div>

                <!--Business Types-->
                <div class="business-types">
                    <!--Colored Shapes-->

                    <div class="business-type">
                        <div class="inner">
                            <div class="inner-icon">
                                <img
                                    src="/assets/img/icons/types/1.svg"
                                    alt=""
                                />
                            </div>
                            <span class="inner-text">Business</span>
                        </div>
                    </div>
                    <div class="business-type">
                        <div class="inner">
                            <div class="inner-icon">
                                <img
                                    src="/assets/img/icons/types/2.svg"
                                    alt=""
                                />
                            </div>
                            <span class="inner-text">Books</span>
                        </div>
                    </div>
                    <div class="business-type">
                        <div class="inner">
                            <div class="inner-icon">
                                <img
                                    src="/assets/img/icons/types/3.svg"
                                    alt=""
                                />
                            </div>
                            <span class="inner-text">Beauty & Health</span>
                        </div>
                    </div>
                    <div class="business-type">
                        <div class="inner">
                            <div class="inner-icon">
                                <img
                                    src="/assets/img/icons/types/4.svg"
                                    alt=""
                                />
                            </div>
                            <span class="inner-text">Technology</span>
                        </div>
                    </div>
                    <div class="business-type">
                        <div class="inner">
                            <div class="inner-icon">
                                <img
                                    src="/assets/img/icons/types/5.svg"
                                    alt=""
                                />
                            </div>
                            <span class="inner-text">Pizza</span>
                        </div>
                    </div>
                    <div class="business-type">
                        <div class="inner">
                            <div class="inner-icon">
                                <img
                                    src="/assets/img/icons/types/6.svg"
                                    alt=""
                                />
                            </div>
                            <span class="inner-text">Flowers</span>
                        </div>
                    </div>
                    <div class="business-type">
                        <div class="inner">
                            <div class="inner-icon">
                                <img
                                    src="/assets/img/icons/types/7.svg"
                                    alt=""
                                />
                            </div>
                            <span class="inner-text">Pets</span>
                        </div>
                    </div>
                    <div class="business-type">
                        <div class="inner">
                            <div class="inner-icon">
                                <img
                                    src="/assets/img/icons/types/8.svg"
                                    alt=""
                                />
                            </div>
                            <span class="inner-text">Fast Food</span>
                        </div>
                    </div>
                    <div class="business-type">
                        <div class="inner">
                            <div class="inner-icon">
                                <img
                                    src="/assets/img/icons/types/9.svg"
                                    alt=""
                                />
                            </div>
                            <span class="inner-text">Furnitures</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!--Themes section-->
        <div class="section is-medium is-grey">
            <div class="container">
                <!--Title-->
                <div class="section-title is-flex">
                    <div class="title-wrap">
                        <h3 class="title is-3">Find an Argument</h3>
                        <p class="subtitle is-6">Here are some arguments you might like to have a look over.</p>
                    </div>

                </div>

                <!--Themes-->
                <div class="columns is-multiline theme-list">
                    <div class="column is-4">
                        <a
                        ><img
                            class="theme-preview"
                            src="/assets/img/interface/t-1.jpg"
                            alt=""
                        /></a>
                    </div>
                    <div class="column is-4">
                        <a
                        ><img
                            class="theme-preview"
                            src="/assets/img/interface/t-2.jpg"
                            alt=""
                        /></a>
                    </div>
                    <div class="column is-4">
                        <a
                        ><img
                            class="theme-preview"
                            src="/assets/img/interface/t-3.jpg"
                            alt=""
                        /></a>
                    </div>
                    <div class="column is-4">
                        <a
                        ><img
                            class="theme-preview"
                            src="/assets/img/interface/t-4.jpg"
                            alt=""
                        /></a>
                    </div>
                    <div class="column is-4">
                        <a
                        ><img
                            class="theme-preview"
                            src="/assets/img/interface/t-5.jpg"
                            alt=""
                        /></a>
                    </div>
                    <div class="column is-4">
                        <a
                        ><img
                            class="theme-preview"
                            src="/assets/img/interface/t-6.jpg"
                            alt=""
                        /></a>
                    </div>
                </div>

            </div>
        </div>

        <div id="main-features" class="section is-medium">
            <div class="container">
                <div class="columns is-vcentered is-side-feature">

                    <div class="column is-12">
                        <div class="title-wrap">
                            <h2 class="title is-3">Blog and News Articles</h2>
                            <p class="subtitle is-6">Keep up-to-date with the most recent news and blogs.</p>
                        </div>
                    </div>

                </div>
                <!--Side feature-->
                <div class="columns is-vcentered is-side-feature">

                    <div class="column is-5 is-offset-1 text-column">

                        <h3 class="title is-3">Creative UI</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Negare non possum. Zenonis est, inquam, hoc
                            Stoici. At iam decimum annum in spelunca iacet.
                            Negat enim summo bono afferre incrementum diem.
                        </p>
                        <br>
                        <button class="button is-danger">Read</button>
                    </div>
                    <div class="column is-6 media-column">
                        <img
                            class="pattern is-left"
                            src="/assets/img/illustrations/patterns/p-1.svg"
                            alt=""
                        />
                        <img
                            class="mockup"
                            src="/assets/img/interface/p-4.png"
                            alt=""
                        />
                    </div>
                </div>
                <!--Side feature-->
                <div class="columns is-vcentered is-side-feature">
                    <div class="column is-6 media-column is-hidden-mobile">
                        <img
                            class="pattern is-right"
                            src="/assets/img/illustrations/patterns/p-1.svg"
                            alt=""
                        />
                        <img
                            class="mockup"
                            src="/assets/img/interface/p-1.png"
                            alt=""
                        />
                    </div>
                    <div class="column is-5 text-column">
                        <h3 class="title is-3">Simple to Use</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Negare non possum. Zenonis est, inquam, hoc
                            Stoici. At iam decimum annum in spelunca iacet.
                            Negat enim summo bono afferre incrementum diem.
                        </p>
                        <br>
                        <button class="button is-danger">Read</button>
                    </div>
                    <div class="column is-6 media-column is-hidden-desktop">
                        <img
                            class="pattern is-right"
                            src="/assets/img/illustrations/patterns/p-1.svg"
                            alt=""
                        />
                        <img
                            class="mockup"
                            src="/assets/img/interface/p-1.png"
                            alt=""
                        />
                    </div>
                </div>
                <!--Side feature-->
                <div class="columns is-vcentered is-side-feature">
                    <div class="column is-5 is-offset-1 text-column">
                        <h3 class="title is-3">Increased Conversions</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Negare non possum. Zenonis est, inquam, hoc
                            Stoici. At iam decimum annum in spelunca iacet.
                            Negat enim summo bono afferre incrementum diem.
                        </p>
                        <br>
                        <button class="button is-danger">Read</button>
                    </div>
                    <div class="column is-6 media-column">
                        <img
                            class="pattern is-left"
                            src="/assets/img/illustrations/patterns/p-1.svg"
                            alt=""
                        />
                        <img
                            class="mockup"
                            src="/assets/img/interface/p-2.png"
                            alt=""
                        />
                    </div>
                </div>

            </div>
        </div>

        <!--Suppport Section-->
        <div class="section-wrap">
            <div class="section is-medium image-section">
                <div class="container">
                    <div class="section-title">
                        <div class="title-wrap">
                            <h3 class="title is-3">We're here to help!</h3>
                        </div>
                    </div>

                    <div class="support-features">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Quid est enim aliud esse versutum? Eadem nunc
                            mea adversum te oratio est. Utilitatis causa
                            amicitia est quaesita. Hoc non est positum in nostra
                            actione.
                        </p>

                        <div class="columns is-multiline">
                            <div class="column is-6">
                                <a class="support-card">
                                    <i class="im im-icon-Life-Safer"></i>
                                    <h3>Customer Support</h3>
                                    <p>
                                        We answer your questions and solve your
                                        technical problems
                                    </p>
                                </a>
                            </div>
                            <div class="column is-6">
                                <a class="support-card">
                                    <i class="im im-icon-Shop"></i>
                                    <h3>App Store</h3>
                                    <p>
                                        Enhance your store features by
                                        installing addons
                                    </p>
                                </a>
                            </div>
                            <div class="column is-6">
                                <a class="support-card">
                                    <i class="im im-icon-Notepad-2"></i>
                                    <h3>Developer Docs</h3>
                                    <p>
                                        Extend native features and develop
                                        unique stores
                                    </p>
                                </a>
                            </div>
                            <div class="column is-6">
                                <a class="support-card">
                                    <i class="im im-icon-Shop-4"></i>
                                    <h3>Ecommerce Expertise</h3>
                                    <p>
                                        Our ecommerce experts help you do more
                                        conversions
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="right has-background-image"
                data-background="https://via.placeholder.com/1920x1280"
                data-demo-background="/assets/img/photo/section.jpg"
            ></div>
        </div>

        <div id="pricing" class="section is-medium">
            <div class="container">
                <div class="section-title has-text-centered">
                    <div class="title-wrap">
                        <h3 class="title is-3">Available Plans</h3>
                        <p class="subtitle is-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </p>
                    </div>
                </div>

                <div class="pricing-wrapper">
                    <div class="columns">
                        <div class="column is-4">
                            <div class="pricing-box">
                                <img
                                    src="/assets/img/illustrations/pricing/1.svg"
                                    alt=""
                                />
                                <h3>Shop</h3>
                                <p>For starter projects</p>
                                <div class="price">
                                    <div class="price-number">
                                        <span>$12</span>
                                    </div>
                                </div>
                                <p>Up to 250 products</p>
                                <a
                                    class="button primary-button raised is-fullwidth"
                                >Try it free</a>
                            </div>
                        </div>
                        <div class="column is-4">
                            <div class="pricing-box">
                                <img
                                    src="/assets/img/illustrations/pricing/2.svg"
                                    alt=""
                                />
                                <h3>Store</h3>
                                <p>For established stores</p>
                                <div class="price">
                                    <div class="price-number">
                                        <span>$25</span>
                                    </div>
                                </div>
                                <p>Up to 2000 products</p>
                                <a
                                    class="button primary-button raised is-fullwidth"
                                >Try it free</a>
                            </div>
                        </div>
                        <div class="column is-4">
                            <div class="pricing-box">
                                <img
                                    src="/assets/img/illustrations/pricing/3.svg"
                                    alt=""
                                />
                                <h3>Flagship</h3>
                                <p>For bigger stores</p>
                                <div class="price">
                                    <div class="price-number">
                                        <span>$55</span>
                                    </div>
                                </div>
                                <p>Unlimited products</p>
                                <a
                                    class="button primary-button raised is-fullwidth"
                                >Try it free</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Back To Top Button -->
        <div id="backtotop" :class="{'visible' : !navFadeData}">
            <a href="#">
                <i class="mdi mdi-arrow-up"></i>
            </a>
        </div>

<!--        <template v-if="sectionsData">-->
<!--            <SiteSection-->
<!--                v-for="(section, i) in sectionsData"-->
<!--                :key="i"-->
<!--                :number="i + 1"-->
<!--                :title="section.title"-->
<!--                :description="section.description"-->
<!--                :btn="section.btn ? section.btn : ''"-->
<!--                :btn_link="section.btn_link ? section.btn_link : ''"-->
<!--                :image_centre="section.image_centre ? section.image_centre : ''"-->
<!--                :image_left="section.image_left ? section.image_left : ''"-->
<!--                :image_right="section.image_right ? section.image_right : ''"-->
<!--                :cards="section.cards"-->
<!--            />-->
<!--        </template>-->
        <HomeFooter :application="applicationData"/>
    </section>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import HomeHeader from "@partials/home/Header.vue";
import Hero from "@templates/application/Hero.vue";
import HomeFooter from "@partials/home/Footer.vue";
import {getModule} from "vuex-module-decorators";
import SystemsModule from "@store/system";
import ApplicationModule from "@store/application";
import SiteCard from "@includes/site/Card.vue";
import "jquery";

let SystemsStore = getModule(SystemsModule);
let ApplicationStore = getModule(ApplicationModule);

@Component({
    name: "Homepage",
    components: {
        HomeHeader,
        Hero,
        HomeFooter,
        SiteCard
    }
})
export default class Homepage extends Vue {
    mounted() {

        ApplicationStore.queryApplication();

        let scrollSpeed = 500;

        $('#backtotop a').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, scrollSpeed);
            return false;
        });
    }

    created() {
        document.addEventListener("scroll", this.onScroll);
    }

    destroyed() {
        document.removeEventListener("scroll", this.onScroll);
    }

    onScroll(e: any) {

        if (e.path[1].scrollY > 150) {
            SystemsStore.ACTIVATE_NAVFADE_FALSE();
        } else {
            SystemsStore.ACTIVATE_NAVFADE_TRUE();
        }
    }

    get applicationData() {
        return ApplicationStore.getApplication;
    }

    get navFadeData() {
        return SystemsStore.getNavFade;
    }
}
</script>
