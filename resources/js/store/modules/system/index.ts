import {Module, VuexModule, Mutation, Action} from "vuex-module-decorators";
import store from "@mainStore/index";
import * as apollo from "@store/system/graphql";

@Module({
    namespaced: true,
    name: "systems",
    dynamic: true,
    store
})
export default class SystemsModule extends VuexModule {
    // State
    // logo: string = '/images/logo/logo.svg';
    logo: any = {
        src: '/images/logo/logo.svg',
        alt: 'Logo'
    }
    navFade: boolean = true;
    sideBar: boolean = false;
    sideBarItems: any = [
        "General",
        [
            {
                to: "/application/dashboard",
                icon: "desktop-mac",
                label: "Dashboard"
            }
        ],
        "Your Line",
        [
            {
                to: "#void",
                label: "Orders",
                icon: "cart-plus"
            },
            {
                to: "#void",
                label: "Events",
                icon: "table",
                updateMark: true
            },
            {
                to: "#void",
                label: "Notes",
                icon: "square-edit-outline"
            },
            {
                to: "#void",
                label: "Contacts",
                icon: "account-multiple"
            },
            {
                label: "Health",
                subLabel: "Submenus Example",
                icon: "heart",
                menu: [
                    {
                        href: "#void",
                        label: "Medical",
                        icon: "arrow-right"
                    },
                    {
                        href: "#void",
                        label: "Diet",
                        icon: "arrow-right"
                    }
                ]
            }
        ],
        "Information",
        [
            {
                href: "#void",
                label: "About",
                icon: "help-circle"
            }
        ]
    ];

    // Mutation: Change the current sidebar status.
    @Mutation
    ACTIVATE_SIDEBAR() {
        this.sideBar = !this.sideBar;
    }

    // Mutation: Change the current naveFade status: TRUE.
    @Mutation
    ACTIVATE_NAVFADE_TRUE() {
        this.navFade = true;
    }

    // Mutation: Change the current naveFade status: FALSE.
    @Mutation
    ACTIVATE_NAVFADE_FALSE() {
        this.navFade = false;
    }

    // Getter: Get the site logo.
    get getLogo() {
        return this.logo;
    }

    // Getter: Get the sidebar state.
    get getNavFade() {
        return this.navFade;
    }

    // Getter: Get the sidebar state.
    get getSideBar() {
        return this.sideBar;
    }

    // Getter: Get the sidebar state.
    get getSideBarItems() {
        return this.sideBarItems;
    }
}
