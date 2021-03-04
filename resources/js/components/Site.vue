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
    name: "Site",
    components: {}
})
export default class Site extends Vue {
    public processing: boolean = false;
}
</script>
