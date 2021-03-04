<template>
    <section class="homeHeader">
        <!--        <div v-if="!carouselData" class="pageloader is-active">-->
        <!--            <span class="title">Loading...</span>-->
        <!--        </div>-->

        <nav
            class="navbar nav-light is-fixed-top is-hidden-mobile"
            :class="[{ 'is-faded': navFadeData }, { 'is-transparent': !navFadeData }]"
        >
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                        <img
                            class="light-logo svg"
                            :src="logo.src"
                            :alt="logo.alt"
                            height="25px"
                        />
                        <img
                            class="dark-logo is-hidden svg"
                            :src="logo.src"
                            :alt="logo.alt"
                            height="25px"
                        />
                    </a>

                    <a
                        role="button"
                        class="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        @click="activeNavBar =! activeNavBar"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div class="navbar-menu" :class="{'is-active': activeNavBar}">
                    <div class="navbar-start">

                        <div class="navbar-item has-dropdown is-hoverable is-hidden-mobile">
                            <a class="navbar-link navbar-item has-hover" href="#demos">
                                Home Sections
                            </a>
                            <div class="navbar-dropdown is-boxed is-medium">
                                <!-- Dropdown item -->
                                <a class="navbar-item is-menu" href="/agency/index.html">
                                    <i class="material-icons">weekend</i>
                                    <span>Featured Blog</span>
                                </a>

                            </div>
                        </div>

                        <router-link v-for="(page, i) in pagesLink" :to="page.link" :class="page.css"
                                     v-text="page.name" :key="i"></router-link>

                    </div>

                    <div class="navbar-end has-hover">
                        <div class="navbar-item">
                            <button
                                id="submitArgument"
                                class="button is-danger is-outlined"
                                :class="{'is-inverted': navFadeData }"
                            >
                                <i class="ti-pencil-alt"></i>
                                SUBMIT AN ARGUMENT
                            </button>
                        </div>

                        <div class="navbar-item">
                            <button
                                id="logIn"
                                class="button is-danger is-outlined"
                                :class="{'is-inverted': navFadeData }"
                                @click="$router.push('/auth/signin')"
                            >
                                <i class="ti-lock"></i>
                                LOG IN
                            </button>
                        </div>

                        <div class="navbar-item">
                            <button
                                id="registerIn"
                                class="button large-button is-danger"
                                @click="$router.push('/auth/register')"
                            >
                                <i class="ti-key"></i>
                                REGISTER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <nav
            class="navbar nav-light is-fixed-top is-transparent is-hidden-desktop"
        >
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                        <img
                            class="light-logo svg_mobile"
                            :src="logo.src"
                            :alt="logo.alt"
                        />
                        <img
                            class="dark-logo is-hidden svg_mobile"
                            :src="logo.src"
                            :alt="logo.alt"
                        />
                    </a>

                    <a
                        role="button"
                        class="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        @click="activeNavBar =! activeNavBar"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div class="navbar-menu" :class="{'is-active': activeNavBar}">
                    <div class="navbar-start">

                        <router-link v-for="(page, i) in pagesLink" :to="page.link" :class="page.css"
                                     v-text="page.name" :key="i"></router-link>

                    </div>

                    <div class="navbar-end has-hover">
                        <div class="navbar-item">
                            <button
                                class="button is-danger is-outlined"
                            >
                                <i class="ti-pencil-alt"></i>
                                SUBMIT AN ARGUMENT
                            </button>
                        </div>

                        <div class="navbar-item">
                            <button
                                class="button is-danger is-outlined"
                                @click="$router.push('/auth/signin')"
                            >
                                <i class="ti-lock"></i>
                                LOG IN
                            </button>
                        </div>

                        <div class="navbar-item">
                            <button
                                class="button large-button is-danger"
                                @click="$router.push('/auth/register')"
                            >
                                <i class="ti-key"></i>
                                REGISTER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    </section>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Carousel, Slide} from "vue-carousel";
import {getModule} from "vuex-module-decorators";
import SystemsModule from "@store/system";

let SystemsStore = getModule(SystemsModule);

@Component({
    name: "Homepage",
    components: {
        Carousel,
        Slide
    }
})
export default class HomeHeader extends Vue {
    public mobileActive: boolean = false;
    public activeNavBar: boolean = false;

    pagesLink: any = [
        {
            name: 'About',
            link: '/auth/signin',
            css: 'navbar-item has-hover'
        },
        {
            name: 'Blog',
            link: '/auth/signin',
            css: 'navbar-item has-hover'
        },
        {
            name: 'Contact',
            link: '/auth/signin',
            css: 'navbar-item has-hover'
        },
    ];

    // Get the company logo.
    get logo() {
        return SystemsStore.getLogo;
    }

    // Get the navbar fade details.
    get navFadeData() {
        return SystemsStore.getNavFade;
    }

    // Work out the height to add the css.
    get heightCompute() {
        if (SystemsStore.getNavFade === true) {
            return 'margin20';
        } else {
            return 'margin10';
        }
    }
}
</script>

<style>
.svg {
    width: 200px;
    height: auto;
}

.svg_mobile {
    width: 100px;
    height: auto;
}
</style>
