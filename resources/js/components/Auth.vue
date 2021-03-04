<template>
    <div v-if="processing" class="pageloader is-active">
        <span class="title">Loading...</span>
    </div>
    <div v-else>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";

@Component({
    name: "Auth",
})
export default class Auth extends Vue {
    public processing: boolean = true;

    mounted() {
        this.processing = false;
    }
}
</script>
